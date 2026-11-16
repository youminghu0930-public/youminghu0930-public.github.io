import { installOrnamentScene } from './materials/data/ornament-scene.js';
import ClipperLib from './materials/data/vendor/clipper/clipper.js';
import { design } from './design-settings.js';

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function link(label, url, className) {
  const node = element('a', label, className);
  node.href = url;
  const destination = new URL(url, location.href);
  if (['http:', 'https:'].includes(destination.protocol) && destination.origin !== location.origin) {
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
  }
  return node;
}
export function measureRenderedLines(reserved, text) {
  const range = document.createRange();
  const source = reserved.firstChild;
  const lines = [];
  let line = '', top = null, offset = 0, space = '';
  function add(value, y) {
    if (top !== null && Math.abs(y - top) > 1) {
      lines.push(line.trimEnd()); line = ''; space = '';
    }
    if (line) line += space;
    space = '';
    line += value;
    top = y;
  }
  for (const token of text.match(/\n|[^\S\n]+|[^\s]+/gu) || []) {
    if (token === '\n') {
      lines.push(line.trimEnd()); line = ''; space = ''; top = null;
    } else if (/^\s+$/u.test(token)) {
      // Collapsed wrap-boundary spaces do not define the next line's position.
      space += token;
    } else {
      range.setStart(source, offset);
      range.setEnd(source, offset + token.length);
      const rects = Array.from(range.getClientRects()).filter(rect => rect.height > 0 && rect.width > 0);
      const rows = new Set(rects.map(rect => Math.round(rect.top)));
      if (rows.size <= 1) {
        add(token, rects[0]?.top ?? top ?? 0);
      } else {
        // Only a genuinely oversized word is measured character by character.
        let start = offset;
        for (const character of Array.from(token)) {
          range.setStart(source, start); start += character.length; range.setEnd(source, start);
          const rect = range.getBoundingClientRect();
          add(character, rect.top);
        }
      }
    }
    offset += token.length;
  }
  lines.push(line.trimEnd());
  return lines;
}
function installPageEntrance(hero, header, stripe = null, {animateHeader = true} = {}) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const settings = design.effects;
  const track = stripe?.querySelector('.stripe-track');
  function sizeTicker() {
    const width = track.firstElementChild.getBoundingClientRect().width;
    if (width > 0) track.style.setProperty('--stripe-duration', `${width / settings.stripePixelsPerSecond}s`);
  }
  let disposed = false;
  const controller = new AbortController();
  const tickerObserver = new ResizeObserver(sizeTicker);
  let stripeVisible = true;
  function updateTickerPlayback() {
    if (track) track.style.animationPlayState = stripeVisible && !document.hidden ? 'running' : 'paused';
  }
  const visibilityObserver = new IntersectionObserver(entries => {
    stripeVisible = entries[0].isIntersecting;
    updateTickerPlayback();
  }, {threshold:0});
  if (stripe) {
    const rect = stripe.getBoundingClientRect();
    stripeVisible = rect.bottom > 0 && rect.top < window.innerHeight;
    visibilityObserver.observe(stripe);
    updateTickerPlayback();
  }
  document.addEventListener('visibilitychange', updateTickerPlayback, {signal:controller.signal});
  if (track) {
    sizeTicker();
    tickerObserver.observe(track.firstElementChild);
    document.fonts?.ready.then(() => { if (!disposed) sizeTicker(); });
  }
  const ornamentEntrances = [];
  const stopTicker = () => {
    disposed = true;
    tickerObserver.disconnect(); visibilityObserver.disconnect(); controller.abort();
    ornamentEntrances.forEach(animation => animation.cancel());
  };
  if (motion.matches) return stopTicker;
  hero.querySelectorAll('.hero-ornament > .ornament-visual').forEach((svg,index) => {
    ornamentEntrances.push(svg.animate([
      {opacity:0,transform:`translateY(${settings.ornamentEntranceDistance}px) scale(.86)`},
      {opacity:1,transform:'translateY(0) scale(1)'}
    ],{duration:settings.ornamentEntranceDuration,delay:settings.ornamentEntranceDelay+index*settings.ornamentEntranceStagger,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
  });
  const jobs = [];
  const lineObservers = [];
  function prepare(node, delay, maxDuration = Infinity, fixedDuration = null, parallelLines = false) {
    if (!node) return;
    const text = node.textContent;
    const shell = element('span', undefined, 'type-shell');
    const reserved = element('span', text, 'type-reserved');
    reserved.setAttribute('aria-hidden', 'true');
    const visible = element('span', '', 'type-visible');
    visible.setAttribute('aria-hidden', 'true');
    const accessible = element('span', text, 'visually-hidden');
    shell.append(reserved, visible, accessible);
    node.replaceChildren(shell);
    node.dataset.typing = 'true';
    node.classList.add('typing-active');
    const chars = Array.from(text);
    const duration = fixedDuration ?? Math.min(chars.length * settings.typeCharacterMs, maxDuration);
    const lines = parallelLines ? measureRenderedLines(reserved, text).map(line => Array.from(line)) : null;
    const lineNodes = lines?.map(() => element('span', '', 'type-line'));
    if (lineNodes) visible.replaceChildren(...lineNodes);
    const job = {node, visible, text, chars, lines, lineNodes, delay, duration, done:false};
    jobs.push(job);
    if (parallelLines) {
      let width = node.getBoundingClientRect().width;
      const remeasure = () => {
        if (disposed) return;
        const measured = measureRenderedLines(reserved, text).map(line => Array.from(line));
        if (JSON.stringify(measured) === JSON.stringify(job.lines)) return;
        job.lines = measured;
        job.lineNodes = job.lines.map(line => element('span', line.join(''), 'type-line'));
        visible.replaceChildren(...job.lineNodes);
        finish(job);
      };
      document.fonts?.ready.then(remeasure);
      const observer = new ResizeObserver(() => {
        const nextWidth = node.getBoundingClientRect().width;
        if (Math.abs(nextWidth - width) <= 1) return;
        width = nextWidth;
        remeasure();
      });
      observer.observe(node);
      lineObservers.push(observer);
    }
  }
  prepare(hero.querySelector('.current-work'), settings.typeStatusDelay);
  prepare(hero.querySelector('.local-status > span'), settings.typeLocationDelay);
  prepare(hero.querySelector('.local-status time'), settings.typeLocationDelay);
  const title = hero.querySelector('.eyebrow');
  const paragraph = hero.querySelector('.intro, .section-intro');
  const sharedDuration = Array.from(title?.textContent || hero.querySelector('h1')?.textContent || '').length * settings.typeCharacterMs;
  prepare(title, settings.heroTypingDelay, Infinity, sharedDuration);
  prepare(paragraph, settings.heroTypingDelay, Infinity, sharedDuration, true);
  function finish(job) {
    if (job.lines) {
      // Keep the exact same boxes and line breaks on the final animation frame.
      job.lines.forEach((line, index) => { job.lineNodes[index].textContent = line.join(''); });
    } else job.node.textContent = job.text;
    job.node.classList.remove('typing-active');
    delete job.node.dataset.typing;
    job.done = true;
  }
  const start = performance.now();
  let frame;
  function tick(now) {
    let pending = false;
    for (const job of jobs) {
      if (job.done) continue;
      const progress = Math.max(0, (now - start - job.delay) / Math.max(1, job.duration));
      if (progress >= 1) finish(job);
      else {
        if (job.lines) {
          job.lines.forEach((line, index) => {
            job.lineNodes[index].textContent = line.slice(0, Math.floor(progress * line.length)).join('');
          });
        } else job.visible.textContent = job.chars.slice(0, Math.floor(progress * job.chars.length)).join('');
        pending = true;
      }
    }
    if (pending) frame = requestAnimationFrame(tick);
  }
  frame = requestAnimationFrame(tick);
  function complete() { cancelAnimationFrame(frame); jobs.filter(job => !job.done).forEach(finish); }
  motion.addEventListener('change', event => { if (event.matches) complete(); }, {signal:controller.signal});
  window.addEventListener('pagehide', complete, {once:true, signal:controller.signal});
  if (animateHeader) header.querySelectorAll('nav a').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
    item.classList.add('nav-entrance');
  });
  if (animateHeader) header.querySelector('.header-identity').classList.add('identity-entrance');
  stripe?.classList.add('stripe-entrance');
  prepare(hero.querySelector('.section-number'), settings.typeStatusDelay);
  hero.querySelector('.landing-actions')?.classList.add('actions-entrance');
  const breadcrumb = hero.querySelector('.breadcrumbs');
  breadcrumb?.classList.add('identity-entrance');
  return () => { complete(); lineObservers.forEach(observer => observer.disconnect()); stopTicker(); };
}

function createTitle(config) {
  const title = element('h1');
  title.id = 'landing-heading';
  const text = config.title.replace(/[.。]+$/, '') + (config.terminalDot ? '.' : '');
  title.setAttribute('aria-label', text);
  const line = element('span', undefined, 'name-line');
  line.setAttribute('aria-hidden', 'true');
  const words = text.split(/\s+/);
  let letterIndex = 0;
  words.forEach((text, wordIndex) => {
    const last = wordIndex === words.length - 1;
    const word = element('span', undefined, config.accentLastWord && last ? 'title-word title-accent' : 'title-word');
    for (const character of Array.from(text)) {
      const letter = element('span', character, character === '.' ? 'name-letter title-dot' : 'name-letter');
      letter.style.setProperty('--letter-index', letterIndex++);
      word.append(letter);
    }
    line.append(word);
    if (!last) { line.append(' '); letterIndex++; }
  });
  title.append(line);
  return title;
}
// Extrude only edges whose outward normal faces the projected depth direction.
// Bézier segments are split exactly at silhouette tangencies, not sampled.
function createVisibleSidewall(path, dx, dy) {
  const segments = [];
  let point, first;
  for (const match of path.matchAll(/([MLCQZ])([^MLCQZ]*)/g)) {
    const command = match[1];
    const numbers = (match[2].match(/-?\d*\.?\d+/g) || []).map(Number);
    const points = [];
    for (let i = 0; i < numbers.length; i += 2) points.push([numbers[i], numbers[i + 1]]);
    if (command === 'M') { point = points[0]; first = point; }
    else {
      const curve = [point, ...(command === 'Z' ? [first] : points)];
      if (curve.some(p => p[0] !== point[0] || p[1] !== point[1])) segments.push(curve);
      point = curve.at(-1);
    }
  }
  const winding = Math.sign(segments.reduce((sum, curve) => sum + curve[0][0] * curve.at(-1)[1] - curve.at(-1)[0] * curve[0][1], 0)) || 1;
  function split(curve, t) {
    const left = [curve[0]], right = [curve.at(-1)];
    let row = curve;
    while (row.length > 1) {
      row = row.slice(0, -1).map((p, i) => p.map((v, axis) => v * (1 - t) + row[i + 1][axis] * t));
      left.push(row[0]); right.unshift(row.at(-1));
    }
    return [left, right];
  }
  const scalar = p => dx * p[1] - dy * p[0];
  const surfaces = [];
  for (const curve of segments) {
    const values = curve.map(scalar);
    let a = 0, b = 0, c;
    if (curve.length === 4) {
      a = 3 * (-values[0] + 3 * values[1] - 3 * values[2] + values[3]);
      b = 6 * (values[0] - 2 * values[1] + values[2]);
      c = 3 * (values[1] - values[0]);
    } else if (curve.length === 3) {
      b = 2 * (values[0] - 2 * values[1] + values[2]);
      c = 2 * (values[1] - values[0]);
    } else c = values[1] - values[0];
    const roots = [];
    if (Math.abs(a) < 1e-9) {
      if (Math.abs(b) > 1e-9) roots.push(-c / b);
    } else {
      const discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) {
        roots.push((-b - Math.sqrt(discriminant)) / (2 * a), (-b + Math.sqrt(discriminant)) / (2 * a));
      }
    }
    const cuts = [0, ...new Set(roots.filter(t => t > 1e-8 && t < 1 - 1e-8).sort((x,y) => x-y)), 1];
    for (let i = 0; i < cuts.length - 1; i++) {
      const start = cuts[i], end = cuts[i + 1], middle = (start + end) / 2;
      if (winding * (a * middle * middle + b * middle + c) <= 1e-8) continue;
      let part = end === 1 ? curve : split(curve, end)[0];
      if (start > 0) part = split(part, start / end)[1];
      const back = part.map(([x,y]) => [x+dx,y+dy]).reverse();
      const command = part.length === 4 ? 'C' : part.length === 3 ? 'Q' : 'L';
      const coords = points => points.map(p => p.map(n => Number(n.toFixed(5))).join(' ')).join(' ');
      surfaces.push(`M${coords([part[0]])} ${command}${coords(part.slice(1))} L${coords([back[0]])} ${command}${coords(back.slice(1))} Z`);
    }
  }
  return surfaces.join(' ');
}
// Flatten smooth curves well below a screen pixel, then union the actual visible
// surfaces before applying a constant-distance, round-join paper offset.
function createOrnamentPatch(paths, expansion, cornerRadius = 3) {
  const precision = 10000;
  const tolerance = .005;
  function flatten(curve, polygon, depth = 0) {
    const first = curve[0], last = curve.at(-1);
    const length = Math.hypot(last[0]-first[0], last[1]-first[1]);
    const error = Math.max(0, ...curve.slice(1,-1).map(p => length
      ? Math.abs((last[0]-first[0])*(first[1]-p[1]) - (first[0]-p[0])*(last[1]-first[1])) / length
      : Math.hypot(p[0]-first[0],p[1]-first[1])));
    if (error <= tolerance || depth >= 16) { polygon.push(last); return; }
    let row = curve;
    const left = [first], right = [last];
    while (row.length > 1) {
      row = row.slice(0,-1).map((p,i) => p.map((v,axis) => (v+row[i+1][axis])/2));
      left.push(row[0]); right.unshift(row.at(-1));
    }
    flatten(left, polygon, depth+1); flatten(right, polygon, depth+1);
  }
  const polygons = [];
  for (const path of paths) {
    let point, first, polygon;
    for (const [,command,values] of path.matchAll(/([MLCQZ])([^MLCQZ]*)/g)) {
      const numbers = (values.match(/-?\d*\.?\d+/g) || []).map(Number);
      const controls = [];
      for (let i=0; i<numbers.length; i+=2) controls.push([numbers[i],numbers[i+1]]);
      if (command === 'M') { point=controls[0];first=point;polygon=[point]; }
      else if (command === 'Z') {
        const converted=polygon.map(([x,y])=>({X:Math.round(x*precision),Y:Math.round(y*precision)}));
        if (!ClipperLib.Clipper.Orientation(converted)) converted.reverse();
        polygons.push(converted);point=first;
      } else {
        flatten([point,...controls],polygon);point=controls.at(-1);
      }
    }
  }
  const clipper = new ClipperLib.Clipper();
  clipper.AddPaths(polygons,ClipperLib.PolyType.ptSubject,true);
  const silhouette = new ClipperLib.Paths();
  clipper.Execute(ClipperLib.ClipType.ctUnion,silhouette,ClipperLib.PolyFillType.pftNonZero,ClipperLib.PolyFillType.pftNonZero);
  function offset(paths, distance) {
    const operation = new ClipperLib.ClipperOffset(2,.01*precision);
    operation.AddPaths(paths,ClipperLib.JoinType.jtRound,ClipperLib.EndType.etClosedPolygon);
    const result = new ClipperLib.Paths();
    operation.Execute(result,distance*precision);
    return result;
  }
  let patch = offset(silhouette,expansion);
  // Round concave notches too, preserving constant spacing along the other edges.
  if (cornerRadius > 0) patch = offset(offset(patch,cornerRadius),-cornerRadius);
  return patch.map(polygon => 'M'+polygon.map(p=>`${p.X/precision} ${p.Y/precision}`).join(' L')+' Z').join(' ');
}
export function createOrnament(kind) {
  const button = element('button', undefined, `hero-ornament ornament-${kind}`);
  button.type = 'button';
  button.setAttribute('aria-label', `Animate ${kind === 'star' ? 'star' : 'lightning bolt'}`);
  const path = kind === 'star'
    ? 'M48 7 C58 7 57 24 65 31 C73 39 89 38 89 48 C89 58 72 57 65 65 C57 73 58 89 48 89 C38 89 39 72 31 65 C23 57 7 58 7 48 C7 38 24 39 31 31 C39 23 38 7 48 7Z'
    : 'M62 8 C69 2 74 7 71 15 L60 36 C57 42 59 45 65 47 L76 50 C83 52 83 58 77 63 L34 96 C26 102 20 96 24 87 L34 65 C37 59 35 56 29 54 L20 51 C12 48 14 42 20 37 L62 8Z';
  const id = `ornament-${kind}`;
  const sidewall = createVisibleSidewall(path, design.effects.ornamentDepthX, design.effects.ornamentDepthY);
  const paper = createOrnamentPatch([path], design.effects.ornamentPatchExpansion, design.effects.ornamentPatchCornerRadius);
  const visibleOutline = createOrnamentPatch([path, sidewall], 0, 0);
  function outlineCenter(outline) {
    const coordinates = outline.match(/-?\d*\.?\d+/g).map(Number);
    const xs = coordinates.filter((_, index) => index % 2 === 0);
    const ys = coordinates.filter((_, index) => index % 2 === 1);
    return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
  }
  const objectCenter = outlineCenter(visibleOutline);
  const patchCenter = outlineCenter(paper);
  const patchOffset = objectCenter.map((value, axis) => Number((value - patchCenter[axis]).toFixed(5)));
  const patchShape = `<path d="${paper}" class="ornament-patch" transform="translate(${patchOffset.join(' ')})"/>`;
  // Use the same user-space light direction for both shapes, independent of
  // their different aspect ratios. The shimmer travels along this same vector.
  const faceLeft=0,faceTop=0;
  const shineX=104*design.effects.ornamentGradientX;
  const shineY=104*design.effects.ornamentGradientY;
  const sparkArm=design.effects.ornamentSparkArm;
  const frontOutline=createOrnamentPatch([path],0,0);
  const outlineCoordinates=frontOutline.match(/-?\d*\.?\d+/g).map(Number);
  const silhouettePoints=[];
  for(let i=0;i<outlineCoordinates.length;i+=2)silhouettePoints.push({x:outlineCoordinates[i],y:outlineCoordinates[i+1]});
  const rightEdge=Math.max(...silhouettePoints.map(point=>point.x));
  const edgePoints=silhouettePoints.filter(point=>point.x>=rightEdge-.03);
  const sparkOrigin={x:rightEdge,y:edgePoints.reduce((sum,point)=>sum+point.y,0)/edgePoints.length};
  button.innerHTML = `<span class="ornament-visual"><svg class="ornament-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 104" aria-hidden="true" focusable="false" shape-rendering="geometricPrecision">
    <defs>
      <clipPath id="${id}-metal-surface">
        <path d="${path}"/><path d="${sidewall}"/>
      </clipPath>
      <linearGradient id="${id}-shine" gradientUnits="userSpaceOnUse" x1="${faceLeft}" y1="${faceTop}" x2="${faceLeft+shineX}" y2="${faceTop+shineY}">
        <stop offset="0" class="ornament-shine-stop" stop-opacity="0"/>
        <stop offset=".25" class="ornament-shine-stop" stop-opacity=".03"/>
        <stop offset=".5" class="ornament-shine-stop" stop-opacity=".35"/>
        <stop offset=".75" class="ornament-shine-stop" stop-opacity=".03"/>
        <stop offset="1" class="ornament-shine-stop" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="${id}-chrome" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="104" y2="104">
        <stop offset="0" class="metal-silver"/>
        <stop offset=".32" class="metal-dark"/>
        <stop offset=".48" class="metal-white"/>
        <stop offset=".57" class="metal-silver"/>
        <stop offset=".66" class="metal-green-dark"/>
        <stop offset=".76" class="metal-green"/>
        <stop offset=".8" class="metal-green-glint"/>
        <stop offset=".84" class="metal-green"/>
        <stop offset=".94" class="metal-green-dark"/>
        <stop offset="1" class="metal-silver"/>
      </linearGradient>
      <linearGradient id="${id}-face" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${shineX}" y2="${shineY}">
        <stop offset="0" class="metal-face-mid"/><stop offset=".35" class="metal-face-light"/>
        <stop offset=".48" class="metal-face-mid"/><stop offset="1" class="metal-face-dark"/>
      </linearGradient>
      <linearGradient id="${id}-reflection" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" class="metal-white" stop-opacity=".65"/>
        <stop offset=".35" class="metal-silver" stop-opacity=".25"/>
        <stop offset=".58" class="metal-green" stop-opacity="0"/>
        <stop offset=".86" class="metal-green" stop-opacity=".4"/>
        <stop offset="1" class="metal-white" stop-opacity=".6"/>
      </linearGradient>
    </defs>
    ${patchShape}
    <g class="ornament-object">
      <path d="${sidewall}" fill="url(#${id}-chrome)"/>
      <path d="${path}" fill="url(#${id}-face)" stroke="url(#${id}-reflection)" stroke-width="1.2" stroke-linejoin="round"/>
      <g clip-path="url(#${id}-metal-surface)">
        <rect class="ornament-shimmer" x="-170" y="-170" width="440" height="440" fill="url(#${id}-shine)" opacity="0"/>
      </g>
    </g>
  </svg>
  <svg class="ornament-sparks-overlay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 104" aria-hidden="true" focusable="false">
    <g class="ornament-sparks">
      ${Array.from({length:5},()=>`<g transform="translate(${sparkOrigin.x} ${sparkOrigin.y})"><path class="ornament-spark" d="M${-sparkArm} 0 L${sparkArm} 0 M0 ${-sparkArm} L0 ${sparkArm}" opacity="0"/></g>`).join('')}
    </g>
  </svg></span>`;
  let animation, shimmer, shimmerTimer;
  let visible = false, destroyed = false;
  const sparks = new Set();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function pauseEffects() {
    clearTimeout(shimmerTimer);
    shimmer?.cancel();
    sparks.forEach(effect=>effect.cancel());sparks.clear();
    animation?.cancel();
  }
  function queueShimmer(delay = design.effects.ornamentShimmerInitialDelay) {
    clearTimeout(shimmerTimer);
    if(destroyed || motion.matches || !visible || document.hidden) return;
    shimmerTimer=setTimeout(()=>{
      if(destroyed || motion.matches || !visible || document.hidden) return;
      shimmer?.cancel();
      shimmer=button.querySelector('.ornament-shimmer').animate([
        {transform:`translate(${-shineX}px,${-shineY}px)`,opacity:0},
        {opacity:.65,offset:.35},
        {opacity:.65,offset:.7},
        {transform:`translate(${shineX*1.3}px,${shineY*1.3}px)`,opacity:0}
      ],{duration:design.effects.ornamentShimmerDuration,easing:'linear'});
    },delay);
  }
  function sparkBurst() {
    button.querySelectorAll('.ornament-spark').forEach((spark,index)=>{
      const angle=(-60+index*30)*Math.PI/180;
      const travel=design.effects.ornamentSparkDistance;
      const effect=spark.animate([
        {transform:'translate(0,0) scale(.25)',opacity:0},
        {transform:`translate(${Math.cos(angle)*travel*.15}px,${Math.sin(angle)*travel*.15}px) scale(1.4)`,opacity:1,offset:.25},
        {transform:`translate(${Math.cos(angle)*travel*.7}px,${Math.sin(angle)*travel*.7}px) scale(1)`,opacity:.85,offset:.7},
        {transform:`translate(${Math.cos(angle)*travel}px,${Math.sin(angle)*travel}px) scale(.4)`,opacity:0}
      ],{duration:design.effects.ornamentSparkDuration,delay:index*25,easing:'cubic-bezier(.2,.7,.3,1)'});
      sparks.add(effect);
      effect.onfinish=()=>sparks.delete(effect);
    });
  }
  function shake() {
    if (motion.matches || destroyed || document.hidden) return;
    pauseEffects();
    sparkBurst();
    animation = button.querySelector('.ornament-object').animate([
      {transform:'perspective(260px) rotateY(0deg) rotateZ(0deg)'},
      {transform:'perspective(260px) rotateY(-28deg) rotateZ(-5deg)', offset:0.22},
      {transform:'perspective(260px) rotateY(22deg) rotateZ(4deg)', offset:0.46},
      {transform:'perspective(260px) rotateY(-12deg) rotateZ(-2deg)', offset:0.68},
      {transform:'perspective(260px) rotateY(6deg) rotateZ(1deg)', offset:0.84},
      {transform:'perspective(260px) rotateY(0deg) rotateZ(0deg)'}
    ], {duration:design.effects.ornamentShakeDuration, easing:'ease-in-out'});
    queueShimmer(design.effects.ornamentShakeDuration+design.effects.ornamentShimmerPause);
  }
  button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') shake(); });
  button.addEventListener('click', event => { if (event.pointerType !== 'mouse') shake(); });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if(visible) queueShimmer(); else pauseEffects();
  });
  observer.observe(button);
  const timer = setInterval(() => {
    if (visible && !document.hidden && animation?.playState !== 'running') shake();
  }, design.effects.ornamentWobbleInterval);
  const stopMotion = () => { if (motion.matches) pauseEffects(); else queueShimmer(); };
  const onVisibility = () => { if(document.hidden) pauseEffects(); else queueShimmer(); };
  motion.addEventListener('change', stopMotion);
  document.addEventListener('visibilitychange',onVisibility);
  button.destroy = () => {
    destroyed=true;
    clearInterval(timer);pauseEffects();
    observer.disconnect();
    motion.removeEventListener('change', stopMotion);
    document.removeEventListener('visibilitychange',onVisibility);
  };
  return button;
}
function createStripe(items) {
  const stripe = element('div', undefined, 'landing-stripe');
  const track = element('div', undefined, 'stripe-track');
  // Equal groups longer than a wide viewport make the half-track loop seamless.
  const repeats = Math.ceil(32 / items.length);
  for (let group = 0; group < 2; group++) {
    const list = element('ul');
    if (group) list.setAttribute('aria-hidden', 'true');
    for (let repeat = 0; repeat < repeats; repeat++) {
      for (const text of items) {
        const item = element('li', text);
        if (repeat) item.setAttribute('aria-hidden', 'true');
        list.append(item);
      }
    }
    track.append(list);
  }
  stripe.append(track);
  return stripe;
}
function createStatus(work) {
  const status = element('div', undefined, 'hero-status');
  const text = `${work.label} ${work.role}${work.company ? ` ${work.connector} ${work.company}` : ''}`;
  const role = work.companyUrl ? link(text, work.companyUrl, 'current-work') : element('p', text, 'current-work');
  const local = element('div', undefined, 'local-status');
  const clock = element('time');
  clock.setAttribute('aria-label', work.clockLabel);
  clock.setAttribute('aria-live', 'off');
  const format = new Intl.DateTimeFormat('en-GB', {timeZone:work.timeZone, hour:'2-digit', minute:'2-digit', hourCycle:'h23'});
  function update() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    if (clock.dataset.typing !== 'true') clock.textContent = `${format.format(now)} ${work.timeZoneLabel}`;
  }
  update();
  const timer = setInterval(update, 1000);
  const stop = () => clearInterval(timer);
  window.addEventListener('pagehide', stop, {once:true});
  status.destroy = () => { stop(); window.removeEventListener('pagehide', stop); };
  local.append(element('span', work.location), clock);
  status.append(role, local);
  return status;
}
export function createLanding(config, {page, navigation}) {
  const root = element('div', undefined, 'landing');
  const hero = element('section', undefined, 'hero');
  hero.setAttribute('aria-labelledby', 'landing-heading');
  const dots = element('canvas', undefined, 'hero-dots');
  dots.setAttribute('aria-hidden', 'true');
  hero.append(dots);
  const status = config.showCurrentWork && page.currentWork ? createStatus(page.currentWork) : null;
  if (status) hero.append(status);
  if (config.showBreadcrumb) {
    const path = element('nav', undefined, 'breadcrumbs');
    path.setAttribute('aria-label', page.breadcrumbLabel);
    const list = element('ol');
    const home = element('li');
    home.append(link(navigation[0].label, navigation[0].url));
    const current = element('li', config.label);
    current.setAttribute('aria-current', 'page');
    list.append(home, current);
    path.append(list);
    hero.append(path);
  }
  const content = element('div', undefined, 'landing-content');
  if (config.showBreadcrumb) content.append(element('p', config.label, 'section-number'));
  const composition = element('div', undefined, 'landing-title-composition');
  composition.append(createTitle(config));
  content.append(composition);
  const details = element('div', undefined, 'hero-details');
  if (config.role) details.append(element('p', config.role, 'eyebrow'));
  details.append(element('p', config.description, 'intro'));
  content.append(details);
  if (config.actions?.length) {
    root.classList.add('landing--actions');
    const actions = element('div', undefined, 'landing-actions');
    for (const action of config.actions) {
      const item = action.url ? link(action.label, action.url) : element('button', action.label);
      item.className = `landing-action action-${action.style}`;
      if (!action.url) item.type = 'button';
      if (action.arrow) {
        const arrow = element('span', action.arrow, 'action-arrow');
        arrow.setAttribute('aria-hidden', 'true');
        item.append(arrow);
      }
      actions.append(item);
    }
    content.append(actions);
  }
  hero.append(content);
  const ornamentScene=config.ornaments?.length
    ? installOrnamentScene({hero,createOrnament,kinds:config.ornaments,design})
    : null;
  const stripe = createStripe(config.stripeItems);
  root.append(hero, stripe);
  return {root, hero, stripe, destroy:() => { status?.destroy(); ornamentScene?.destroy(); }};
}
export function installLandingEntrance(landing, header, options) {
  return installPageEntrance(landing.hero, header, landing.stripe, options);
}
