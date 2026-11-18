// Procedural lasers and airborne particles; interface stays at native resolution.
const vertexSource=`attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`;
const fragmentSource=`
precision highp float;
uniform vec2 resolution;
uniform float aspect,time,sourceY;
uniform vec3 beamColor;
uniform sampler2D dotBackground;
uniform vec4 trail[HISTORY_COUNT];
uniform vec4 innerTrail[HISTORY_COUNT];
float hash(vec3 p){p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float field(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(vec3(i,4.)),hash(vec3(i+vec2(1,0),4.)),f.x),mix(hash(vec3(i+vec2(0,1),4.)),hash(vec3(i+1.,4.)),f.x),f.y);}
// Independent density scales: soft bodies, curled boundaries, and fine edge erosion.
float fineMist(vec2 p){
 vec2 q=p+vec2(time*.009,-time*.006);
 q+=(vec2(field(q*8.+9.),field(q*8.7+31.))-.5)*.035;
 float n=field(q*83.+4.)*.25+field(q*167.+17.)*.45+field(q*331.+29.)*.3;
 return smoothstep(.34,.66,n);
}
float mist(vec2 p,float seed,vec2 velocity){
 vec2 q=p+time*velocity+seed;
 // Bounded local eddies deform each layer without accumulating stretch over time.
 float speed=length(velocity);
 float rate=.22+speed*2.;
 float phase=time*rate+seed*1.7;
 vec2 cell=p*5.2+vec2(seed*.7,seed*.3);
 vec2 eddy=vec2(cos(cell.x+phase)*sin(cell.y-phase*.73),
                -sin(cell.x+phase)*cos(cell.y-phase*.73));
 vec2 direction=normalize(velocity+vec2(.00001));
 float localSlip=sin(cell.x*.63+cell.y*.47+phase*.8);
 q+=eddy*(.032+min(speed,.09)*.65)+direction*localSlip*.045;
 vec2 curl=vec2(field(q*3.7+vec2(phase*.12,3.)),field(q*4.1+vec2(19.,-phase*.1)))-.5;
 q+=curl*.24;
 vec2 r=mat2(.8,-.6,.6,.8)*q;
 float body=field(q*12.8)*.32+field(r*25.7+8.)*.36+field(q*51.6+13.)*.22+field(r*103.5+29.)*.1;
 float erosion=field(q*91.+5.)*.6+field(r*177.+31.)*.4;
 // Fine detail erodes the boundary while dense interiors remain connected.
 float mass=smoothstep(.35,.67,body+(erosion-.5)*.12);
 float pockets=smoothstep(.24,.75,field(r*4.3+23.));
 float filaments=smoothstep(.49,.66,body)*fineMist(q+seed)*.12;
 return (mass+filaments)*mix(.07,1.65,pockets);
}
float particles(vec2 p,float frequency,float seed){
 vec2 drift=vec2(time*.004*(seed+1.),time*.009);
 vec2 grid=(p+drift)*frequency,cell=floor(grid);
 vec2 center=vec2(hash(vec3(cell,seed)),hash(vec3(cell+17.,seed+3.)))*.7+.15;
 float d=length(fract(grid)-center);
 float radius=mix(.07,.16,hash(vec3(cell,seed+8.)));
 vec2 flow=(cell+center)/frequency+vec2(time*.006,-time*.004);
 float cluster=smoothstep(.23,.75,field(flow*3.+field(flow*7.)));
 return (1.-smoothstep(radius*.2,radius,d))*step(1.-cluster*.88,hash(vec3(cell,seed+12.)));
}
// Subpixel dust has a resolution-aware footprint, avoiding large snow-like flakes.
float microParticles(vec2 p){
 vec2 grid=(p+vec2(time*.0015,time*.003))*390.;
 vec2 cell=floor(grid),local=fract(grid);
 vec2 center=vec2(hash(vec3(cell,41.)),hash(vec3(cell+23.,57.)))*.7+.15;
 float size=mix(.32,.85,pow(hash(vec3(cell,62.)),3.));
 float radius=max(.075,390./resolution.y*size);
 float d=length(local-center)/radius;
 return (1.-smoothstep(.3,.85,d))*step(.88,hash(vec3(cell,83.)));
}
// A few larger, gently tumbling dust flecks float independently of the smoke.
float floatingDust(vec2 p){
 vec2 grid=(p+vec2(time*.003,-time*.004))*34.;
 vec2 cell=floor(grid),local=fract(grid);
 float seed=hash(vec3(cell,109.));
 vec2 center=vec2(hash(vec3(cell,127.)),hash(vec3(cell,139.)))*.5+.25;
 center+=vec2(sin(time*.35+seed*41.),cos(time*.27+seed*29.))*.1;
 float angle=time*.18+seed*6.283;
 vec2 delta=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*(local-center);
 float radius=max(.022,34./resolution.y*1.8)*mix(.8,1.35,pow(hash(vec3(cell,151.)),3.));
 float shape=length(delta/vec2(radius*2.2,radius*.65));
 return exp(-shape*shape*2.)*step(.978,seed);
}
float sheet(vec2 p,vec2 source,vec2 target,float width){
 vec2 direction=normalize(target-source+vec2(.0001));vec2 delta=p-source;
 float along=dot(delta,direction),distance=abs(delta.x*direction.y-delta.y*direction.x);
 float spread=width*(.7+max(along,0.)*.25);
 float beam=exp(-distance*distance/max(.000001,spread*spread));
 return beam*smoothstep(0.,.08,along)*exp(-max(along,0.)*1.25);
}
// Very soft continuous scattering around the hairline core, without a visible halo boundary.
float diffusion(vec2 p,vec2 source,vec2 target){
 vec2 direction=normalize(target-source+vec2(.0001)),delta=p-source;
 float along=dot(delta,direction);
 float distance=abs(delta.x*direction.y-delta.y*direction.x);
 float widening=.7+max(along,0.)*.25;
 float normalized=distance/max(.0001,.007*widening);
 // No shoulder or finite-radius cut: scattered light tapers continuously into the air.
 float body=exp(-pow(normalized,1.1));
 float tail=.045*pow(1.+distance/(.023*widening),-1.65);
 float outerFade=exp(-pow(distance/(.32*widening),2.));
 return .46*(body+tail)/1.045*outerFade*smoothstep(0.,.08,along)*exp(-max(along,0.)*1.25);
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;vec2 screen=vec2((uv.x-.5)*aspect,uv.y);
 vec3 light=vec3(0.);
 vec2 sourceA=vec2(-aspect*.5,sourceY),sourceB=vec2(aspect*.5,sourceY);
 vec2 liveA=sourceA+vec2(cos(trail[0].x),sin(trail[0].x));
 vec2 liveB=sourceB+vec2(cos(trail[0].y),sin(trail[0].y));
 vec2 sourceC=vec2(-aspect/6.,sourceY),sourceD=vec2(aspect/6.,sourceY);
 vec2 liveC=sourceC+vec2(cos(innerTrail[0].x),sin(innerTrail[0].x));
 vec2 liveD=sourceD+vec2(cos(innerTrail[0].y),sin(innerTrail[0].y));
 // Narrow live cores and restrained halos keep the air clear between particles.
 float coreA=sheet(screen,sourceA,liveA,.00055);
 float coreB=sheet(screen,sourceB,liveB,.00055);
 float a=coreA*2.6,b=coreB*2.6;
 float illuminationA=diffusion(screen,sourceA,liveA);
 float illuminationB=diffusion(screen,sourceB,liveB);
 a=max(a,sheet(screen,sourceC,liveC,.00055)*2.6);b=max(b,sheet(screen,sourceD,liveD,.00055)*2.6);
 illuminationA=max(illuminationA,diffusion(screen,sourceC,liveC));illuminationB=max(illuminationB,diffusion(screen,sourceD,liveD));
 float beamCore=max(max(sheet(screen,sourceA,liveA,.00045),sheet(screen,sourceB,liveB,.00045)),
                    max(sheet(screen,sourceC,liveC,.00045),sheet(screen,sourceD,liveD,.00045)));
 float coreHalo=max(max(sheet(screen,sourceA,liveA,.0032),sheet(screen,sourceB,liveB,.0032)),
                    max(sheet(screen,sourceC,liveC,.0032),sheet(screen,sourceD,liveD,.0032)));
 for(int j=1;j<HISTORY_COUNT;j++){
  if(trail[j].z>=.4&&trail[j].w>=.4&&innerTrail[j].z>=.4&&innerTrail[j].w>=.4)continue;
  vec2 previousA=sourceA+vec2(cos(trail[j].x),sin(trail[j].x));
  vec2 previousB=sourceB+vec2(cos(trail[j].y),sin(trail[j].y));
  float lifeA=1.-smoothstep(.2,.4,trail[j].z);
  float lifeB=1.-smoothstep(.2,.4,trail[j].w);
  a=max(a,sheet(screen,sourceA,previousA,.00055)*2.6*lifeA);
  b=max(b,sheet(screen,sourceB,previousB,.00055)*2.6*lifeB);
  illuminationA=max(illuminationA,diffusion(screen,sourceA,previousA)*lifeA);
  illuminationB=max(illuminationB,diffusion(screen,sourceB,previousB)*lifeB);
  vec2 previousC=sourceC+vec2(cos(innerTrail[j].x),sin(innerTrail[j].x));
  vec2 previousD=sourceD+vec2(cos(innerTrail[j].y),sin(innerTrail[j].y));
  float lifeC=1.-smoothstep(.2,.4,innerTrail[j].z),lifeD=1.-smoothstep(.2,.4,innerTrail[j].w);
  a=max(a,sheet(screen,sourceC,previousC,.00055)*2.6*lifeC);b=max(b,sheet(screen,sourceD,previousD,.00055)*2.6*lifeD);
  illuminationA=max(illuminationA,diffusion(screen,sourceC,previousC)*lifeC);illuminationB=max(illuminationB,diffusion(screen,sourceD,previousD)*lifeD);
  beamCore=max(beamCore,sheet(screen,sourceA,previousA,.00045)*lifeA);
  coreHalo=max(coreHalo,sheet(screen,sourceA,previousA,.0032)*lifeA);
  beamCore=max(beamCore,sheet(screen,sourceB,previousB,.00045)*lifeB);
  coreHalo=max(coreHalo,sheet(screen,sourceB,previousB,.0032)*lifeB);
  beamCore=max(beamCore,sheet(screen,sourceC,previousC,.00045)*lifeC);
  coreHalo=max(coreHalo,sheet(screen,sourceC,previousC,.0032)*lifeC);
  beamCore=max(beamCore,sheet(screen,sourceD,previousD,.00045)*lifeD);
  coreHalo=max(coreHalo,sheet(screen,sourceD,previousD,.0032)*lifeD);
 }
 float dust=particles(screen,210.,1.)*.7+particles(screen,310.,3.)*.5+particles(screen,150.,5.)*.65;
 light=beamColor*(max(a,b)+max(illuminationA,illuminationB)*.018);
 // Near smoke has crisp torn edges; distant smoke forms a softer overlapping veil.
 float fine=fineMist(screen);
 float nearLayer=mist(screen,0.,vec2(.015,-.00875))*.7;
 float middleLayer=mist(screen*.79,5.3,vec2(.006,-.0035))*.7;
 float frontLayer=mist(screen*1.32,12.7,vec2(.033,-.01925))*.7;
 float backLayer=mist(screen*.63,24.1,vec2(.002,-.001167))*.7;
 float closeLayer=mist(screen*1.58,38.6,vec2(.058,-.033833))*.7;
 float deepLayer=mist(screen*.48,51.2,vec2(.001,-.000583))*.7;
 vec2 distant=screen*.57+vec2(time*.0006,-time*.00035);
 float farLayer=smoothstep(.22,.78,field(distant*3.4+11.)*.65+field(distant*7.1+4.)*.35)*.7;
 // Clear pockets move in the same flow as the smoke instead of masking fixed screen locations.
 vec2 airFlow=screen+vec2(time*.012,-time*.007);
 vec2 airWarp=(vec2(field(airFlow*3.7+vec2(time*.017,8.)),field(airFlow*4.1+vec2(21.,-time*.013)))-.5)*.12;
 float openAir=smoothstep(.2,.73,field((airFlow+airWarp)*2.1+17.));
 float nearDensity=nearLayer*(1.2+fine*.45)*mix(.25,1.,openAir)+frontLayer*.46+closeLayer*.3;
 float middleDensity=middleLayer*.65+backLayer*.42+deepLayer*.28;
 float farDensity=farLayer*.2;
 float transmission=exp(-nearDensity*.32);
 float density=nearDensity+transmission*(middleDensity+farDensity);
 // Several gently warped scales break up broad cut-out patches into organic gaps.
 vec2 bankFlow=airFlow;
 bankFlow+=(vec2(field(airFlow*4.7+vec2(time*.019,8.)),field(airFlow*5.3+vec2(21.,-time*.016)))-.5)*.18;
 float banks=field(bankFlow*7.6+8.)*.3+field(bankFlow*14.3+19.)*.4+field(bankFlow*27.1+31.)*.3;
 float bankMask=smoothstep(.2,.79,banks);
 density*=mix(.24,1.7,bankMask);
 density*=mix(.3,1.4,smoothstep(.05,.52,density));
 // Shader y grows upward: smoke collects below and gradually thins overhead.
 float heightDensity=.003+.517*(exp(-3.*uv.y)-exp(-3.))/(1.-exp(-3.));
 density*=heightDensity*.65;
 // A very thin uniform haze keeps a faint laser trace in otherwise clear air.
 density+=.018;
 // Side-view laser visibility comes from local scattering, not a solid luminous line.
 float scatteringVisibility=pow(smoothstep(.07,.4,density+dust*.15),1.7);
 light*=mix(.002,1.,scatteringVisibility);
 // A shared physical density field is revealed by the existing beam masks.
 // Cyan chroma survives bright intersections instead of clipping toward white.
 vec3 scattered=beamColor*min(max(illuminationA,illuminationB),2.4);
 float scatteringResponse=density*mix(.5,1.65,smoothstep(.02,.42,density));
 light+=scatteringResponse*scattered*2.6;
 float veil=(farLayer*.75+middleLayer*.28+backLayer*.22+deepLayer*.15)*mix(.09,1.25,bankMask)*heightDensity*.65;
 light+=veil*vec3(.027,.03,.04)+nearDensity*heightDensity*vec3(.004,.007,.009);
 light+=dust*scattered*.1;
 float microDust=microParticles(screen);
 light+=microDust*(scattered*.65+beamColor*.006);
 float flecks=floatingDust(screen);
 float sparkLight=min(max(illuminationA,illuminationB),2.);
 light+=flecks*(scattered*.9+mix(beamColor,vec3(1.),.8)*sparkLight*1.8+vec3(.012,.017,.014));
 // A small high-luminance core and local bloom give the light a polished sparkle.
 float glintPattern=smoothstep(.42,.72,field(screen*41.+vec2(time*.025,-time*.018)));
 float glintVisibility=smoothstep(.04,.22,density+dust*.1);
 float glintStrength=glintVisibility*(.35+glintPattern*2.4+dust);
 light+=mix(beamColor,vec3(1.),.72)*beamCore*glintStrength*3.0;
 light+=beamColor*coreHalo*glintPattern*glintVisibility*.08;

 // Compress brightness equally across channels to retain the light colour.
 light=light*1.65/(1.+max(light.r,max(light.g,light.b))*1.15);
 // Preserve small white-hot highlights after compressing the diffuse green light.
 float specular=clamp(beamCore*glintStrength,0.,1.);
 light=mix(light,vec3(.85,1.,.91),specular*.88);
 // Keep rare particle flashes crisp rather than flattening them in the tone curve.
 float spark=clamp(flecks*sparkLight*3.,0.,1.);
 light=mix(light,vec3(.94,1.,.96),spark*.95);
 vec4 stars=texture2D(dotBackground,gl_FragCoord.xy/resolution);
 // Dots share the live and historical beam illumination and smoke transmission.
 float starLight=clamp(max(illuminationA,illuminationB),0.,1.);
 vec3 starColor=mix(stars.rgb, mix(beamColor,vec3(.86,1.,.91),.65),starLight);
 // Both the crisp body and its existing halo are behind the moving smoke.
 // Use optical depth rather than the much weaker visible-smoke brightness.
 float dotTransmission=exp(-density*14.-nearDensity*.85);
 vec2 dotStep=vec2(3.)/resolution;
 vec4 haloA=texture2D(dotBackground,uv+vec2(dotStep.x,0.));
 vec4 haloB=texture2D(dotBackground,uv-vec2(dotStep.x,0.));
 vec4 haloC=texture2D(dotBackground,uv+vec2(0.,dotStep.y));
 vec4 haloD=texture2D(dotBackground,uv-vec2(0.,dotStep.y));
 vec3 scatteredDots=(haloA.rgb*haloA.a+haloB.rgb*haloB.a+haloC.rgb*haloC.a+haloD.rgb*haloD.a)*.25;
 light+=starColor*stars.a*dotTransmission*(1.5+starLight*5.);
 light+=scatteredDots*(1.-dotTransmission)*.65;
 gl_FragColor=vec4(light,1.);
}`;

export function installContactLasers(main){
 const canvas=document.createElement('canvas');canvas.className='contact-lasers';canvas.setAttribute('aria-hidden','true');main.prepend(canvas);
 const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
 if(!gl)return()=>canvas.remove();
 const historyCapacity=Math.min(128,Math.max(16,Math.floor((gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS)-8)/2)));
 const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);return null;}return shader;};
 const vertex=compile(gl.VERTEX_SHADER,vertexSource),fragment=compile(gl.FRAGMENT_SHADER,fragmentSource.replaceAll('HISTORY_COUNT',String(historyCapacity)));
 if(!vertex||!fragment){if(vertex)gl.deleteShader(vertex);if(fragment)gl.deleteShader(fragment);canvas.remove();return()=>{};}
 const program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);canvas.remove();return()=>{};}
 gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
 const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
 const uniforms=Object.fromEntries(['resolution','aspect','time','sourceY','beamColor','dotBackground','trail[0]','innerTrail[0]'].map(name=>[name,gl.getUniformLocation(program,name)]));
 const dots=main.querySelector('.hero-dots'),dotTexture=gl.createTexture();let dotRevision=null;
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,dotTexture);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(4));gl.uniform1i(uniforms.dotBackground,0);
 // Upload only when the interactive dot field changes; smoke passes in front.
 // Resolve the actual theme accent once, including any CSS colour format.
 const swatch=document.createElement('canvas');swatch.width=swatch.height=1;
 const paint=swatch.getContext('2d');paint.fillStyle=getComputedStyle(main).getPropertyValue('--accent').trim()||'#00f050';paint.fillRect(0,0,1,1);
 const rgb=paint.getImageData(0,0,1,1).data;gl.uniform3f(uniforms.beamColor,rgb[0]/255,rgb[1]/255,rgb[2]/255);
 const controller=new AbortController(),{signal}=controller,reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(pointer:coarse)');
 let frame=0,last=0,elapsed=0,scale=1,disposed=false,restoredCleanup=null,slowFrames=0;
 const stripe=main.querySelector('.landing-stripe');
 let sourceHeight=0;
 function syncStripe(){const top=Math.max(0,Math.min(innerHeight,stripe?.getBoundingClientRect().top??innerHeight));sourceHeight=1-top/innerHeight;canvas.style.clipPath=`inset(0 0 ${innerHeight-top}px 0)`;}
 const stripeObserver=new ResizeObserver(syncStripe);if(stripe)stripeObserver.observe(stripe);
 let target={x:.5,y:.36},aim={a:0,b:Math.PI,c:0,d:Math.PI};const history={a:[],b:[],c:[],d:[]},values=new Float32Array(historyCapacity*4),innerValues=new Float32Array(historyCapacity*4);let initialized=false;
 const anchors={a:0,b:0,c:0,d:0};
 const maxAngularSpeed=3.2;
 // Fit a full lifetime at maximum speed; sampling density is independent of FPS.
 const angularSpacing=9*1.2*.5/126;
 const angleDelta=(to,from)=>Math.atan2(Math.sin(to-from),Math.cos(to-from));
 function resize(){syncStripe();const limit=(mobile.matches?720:1280)*scale;const ratio=Math.min(1,limit/Math.max(innerWidth,innerHeight));canvas.width=Math.max(1,Math.round(innerWidth*ratio));canvas.height=Math.max(1,Math.round(innerHeight*ratio));gl.viewport(0,0,canvas.width,canvas.height);}
 function move(e){target={x:Math.max(0,Math.min(1,e.clientX/innerWidth)),y:Math.max(0,Math.min(1,e.clientY/innerHeight))};if(reduced.matches)start();}
 function draw(now){frame=0;if(disposed||document.hidden||gl.isContextLost())return;
  const interval=1000/60;if(last&&now-last<interval-1){frame=requestAnimationFrame(draw);return;}
  const raw=last?now-last:interval,dt=Math.min(.08,raw/1000);last=now;elapsed+=reduced.matches?0:dt;
  // Back off automatically on slower devices; never increase pixel load mid-session.
  slowFrames=elapsed>2&&raw>70?slowFrames+1:0;
  if(slowFrames>=8&&scale>.55){scale*=.9;slowFrames=0;resize();}
  const aspect=innerWidth/innerHeight,px=(target.x-.5)*aspect,py=1-target.y;
  const wanted={a:Math.atan2(py-sourceHeight,px+aspect*.5),b:Math.atan2(py-sourceHeight,px-aspect*.5),c:Math.atan2(py-sourceHeight,px+aspect*(1/6)),d:Math.atan2(py-sourceHeight,px-aspect*(1/6))};
  if(!initialized||reduced.matches){aim={...wanted};initialized=true;for(const key of Object.keys(history)){history[key].length=0;anchors[key]=aim[key];}}
  if(!reduced.matches){
   for(const key of ['a','b','c','d']){
    const points=history[key];for(const point of points)point.age+=dt;
    while(points.length&&points.at(-1).age>.4)points.pop();
    const before=aim[key],delta=angleDelta(wanted[key],before);
    const travel=Math.sign(delta)*Math.min(Math.abs(delta),maxAngularSpeed*dt);
    aim[key]+=travel;
    let remaining=angleDelta(aim[key],anchors[key]);
    while(Math.abs(remaining)>=angularSpacing){
     anchors[key]+=Math.sign(remaining)*angularSpacing;
     const fraction=Math.abs(travel)>0?Math.min(1,Math.abs(angleDelta(anchors[key],before)/travel)):1;
     points.unshift({angle:anchors[key],age:dt*(1-fraction)});
     remaining=angleDelta(aim[key],anchors[key]);
    }
    points.splice(historyCapacity-1);
   }
  }
  values[0]=aim.a;values[1]=aim.b;values[2]=values[3]=0;
  innerValues[0]=aim.c;innerValues[1]=aim.d;innerValues[2]=innerValues[3]=0;
  for(let i=1;i<historyCapacity;i++){
   const a=history.a[i-1],b=history.b[i-1];
   values[i*4]=a?.angle??aim.a;values[i*4+1]=b?.angle??aim.b;
   values[i*4+2]=a?.age??3;values[i*4+3]=b?.age??3;
   const c=history.c[i-1],d=history.d[i-1];innerValues[i*4]=c?.angle??aim.c;innerValues[i*4+1]=d?.angle??aim.d;innerValues[i*4+2]=c?.age??3;innerValues[i*4+3]=d?.age??3;
  }
  if(dots?.width&&dots?.height&&dotRevision!==dots.dataset.paintRevision){
   gl.bindTexture(gl.TEXTURE_2D,dotTexture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,dots);dotRevision=dots.dataset.paintRevision;
  }
  gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);gl.uniform1f(uniforms.aspect,innerWidth/innerHeight);gl.uniform1f(uniforms.time,elapsed);gl.uniform1f(uniforms.sourceY,sourceHeight);gl.uniform4fv(uniforms['trail[0]'],values);gl.uniform4fv(uniforms['innerTrail[0]'],innerValues);gl.drawArrays(gl.TRIANGLES,0,3);
  if(!reduced.matches)frame=requestAnimationFrame(draw);
 }
 function start(){cancelAnimationFrame(frame);last=0;if(!document.hidden&&!disposed)frame=requestAnimationFrame(draw);}
 window.addEventListener('pointermove',move,{passive:true,signal});window.addEventListener('pointerdown',move,{passive:true,signal});
 window.addEventListener('resize',()=>{resize();start();},{passive:true,signal});document.addEventListener('visibilitychange',start,{signal});reduced.addEventListener('change',start,{signal});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);},{signal});
 canvas.addEventListener('webglcontextrestored',()=>{stop();restoredCleanup=installContactLasers(main);},{signal});
 function stop(){stripeObserver.disconnect();disposed=true;controller.abort();cancelAnimationFrame(frame);gl.deleteTexture(dotTexture);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);canvas.remove();}
 resize();start();return()=>{stop();restoredCleanup?.();};
}
