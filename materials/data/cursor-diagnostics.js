// Opt-in local diagnostic only. No logging, network requests, or normal-page UI.
export function installCursorDiagnostics() {
  const root=document.documentElement;
  const host=document.createElement('aside');
  host.style.cssText='position:fixed;left:16px;bottom:16px;z-index:10000;max-width:calc(100vw - 32px)';
  const shadow=host.attachShadow({mode:'open'});
  shadow.innerHTML=`<style>
    :host{font:13px/1.5 system-ui;color:#eee}section{padding:12px;background:#181818;border:1px solid #666;border-radius:8px;box-shadow:0 3px 16px #0008}nav{display:flex;gap:12px;align-items:center;flex-wrap:wrap}button,a{font:inherit;color:#eee;cursor:pointer}button{padding:4px 8px;background:#333;border:1px solid #777;border-radius:4px}a{padding:4px;text-decoration:underline}output{display:block;margin-top:8px;max-width:600px;overflow-wrap:anywhere}
  </style><section aria-label="Cursor diagnostics"><nav><a href="#projects">Native hand reference</a><button type="button" data-option="corners" aria-pressed="true">Corners: on</button><button type="button" data-option="motion" aria-pressed="true">Motion: on</button></nav><output>Hover a project title or technology tag.</output></section>`;
  const rules=document.createElement('style');
  rules.textContent=`html[data-cursor-debug-corners="off"] .pointer-diamond{display:none!important}html[data-cursor-debug-motion="off"] main,html[data-cursor-debug-motion="off"] main *{translate:none!important;transform:none!important;animation:none!important;transition:none!important;opacity:1!important}`;
  document.head.append(rules);document.body.append(host);
  for(const button of shadow.querySelectorAll('button'))button.addEventListener('click',()=>{
    const option=button.dataset.option,key=option==='corners'?'cursorDebugCorners':'cursorDebugMotion';
    const enabled=root.dataset[key]==='off';root.dataset[key]=enabled?'on':'off';
    button.setAttribute('aria-pressed',String(enabled));button.textContent=`${option==='corners'?'Corners':'Motion'}: ${enabled?'on':'off'}`;
  });
  let captured='none';
  document.addEventListener('gotpointercapture',event=>{captured=event.target.tagName;},true);
  document.addEventListener('lostpointercapture',()=>{captured='none';},true);
  document.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||event.composedPath().includes(host))return;
    const hit=document.elementFromPoint(event.clientX,event.clientY);if(!hit)return;
    const control=hit.closest('a[href],button,[role="button"]');
    shadow.querySelector('output').textContent=`Hit: ${hit.tagName.toLowerCase()}.${[...hit.classList].join('.')} | Cursor: ${getComputedStyle(hit).cursor} | Control: ${control?.tagName.toLowerCase()||'none'} | Capture: ${captured}`;
  },{capture:true,passive:true});
}
