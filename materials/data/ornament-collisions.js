// Equal-density circular bodies: exchange normal momentum and retain tangential motion.
export function collideOrnaments(a,b,restitution=.82){
  const dx=b.x-a.x,dy=b.y-a.y,distance=Math.hypot(dx,dy),reach=a.radius+b.radius;
  if(distance>=reach)return null;
  const nx=distance?dx/distance:1,ny=distance?dy/distance:0;
  const inverseMass=a.inverseMass+b.inverseMass;
  if(!inverseMass)return null;
  const penetration=reach-distance+.01;
  const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
  const impulse=relative<0?-(1+restitution)*relative/inverseMass:0;
  return [
    {impactSpeed:Math.max(0,-relative),nx,ny,dx:-nx*penetration*a.inverseMass/inverseMass,dy:-ny*penetration*a.inverseMass/inverseMass,vx:a.vx-impulse*nx*a.inverseMass,vy:a.vy-impulse*ny*a.inverseMass},
    {impactSpeed:Math.max(0,-relative),nx:-nx,ny:-ny,dx:nx*penetration*b.inverseMass/inverseMass,dy:ny*penetration*b.inverseMass/inverseMass,vx:b.vx+impulse*nx*b.inverseMass,vy:b.vy+impulse*ny*b.inverseMass}
  ];
}
export function createOrnamentCollisionWorld(){
  const bodies=new Set();
  return {
    add(body){bodies.add(body);return()=>bodies.delete(body);},
    resolve(body,impactTime=performance.now()){
      for(const other of bodies){
        if(other===body)continue;
        const a=body.body(),b=other.body();
        if(!a||!b)continue;
        const hit=collideOrnaments(a,b);
        if(hit){body.collide({...hit[0],impactTime});other.collide({...hit[1],impactTime});}
      }
    }
  };
}
