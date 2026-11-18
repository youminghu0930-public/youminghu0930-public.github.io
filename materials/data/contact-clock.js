import { design } from '../../design-settings.js';

export function installContactClock(main){
 const clock=main.querySelector('.contact-live-clock');if(!clock)return()=>{};
 const seconds=clock.querySelector('.contact-clock-seconds'),fraction=clock.querySelector('.contact-clock-fraction');
 const zone=clock.dataset.zone||'Asia/Taipei';
 const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
 const update=()=>{if(document.hidden)return;const now=new Date();seconds.textContent=formatter.format(now);fraction.textContent=`.${String(Math.floor(now.getMilliseconds()/10)).padStart(2,'0')}`;clock.dateTime=now.toISOString();};
 const decoration=main.querySelector('.contact-decorations');
 const location=decoration?.querySelector('.contact-location-intro');
 const measure=document.createElement('canvas').getContext('2d');
 const fit=()=>{
  if(!decoration||!location)return;
  // Derive the preferred width from the numeral typography, never from its fitted result.
  const clockStyle=getComputedStyle(clock);measure.font=`900 100px ${clockStyle.fontFamily}`;
  const secondsWidth=measure.measureText('88:88:88').width-7*3.5;
  measure.font=`900 65px ${clockStyle.fontFamily}`;
  const fractionWidth=measure.measureText('.88').width-2*1.95;
  const mobile=matchMedia(`(max-width: ${design.mobileBreakpoint})`).matches;
  const baseSize=mobile?Math.max(32,Math.min(innerWidth*.09,42)):Math.max(44,Math.min(innerWidth*.075,112));
  const preferredWidth=Math.round((secondsWidth+fractionWidth)*baseSize/100);
  decoration.style.width=mobile?'100%':`${preferredWidth}px`;
  const width=decoration.clientWidth;if(!width)return;
  const title=location.querySelector('strong'),zoneLabel=location.querySelector('.contact-location-zone');
  const face=getComputedStyle(title).fontFamily;
  measure.font=`600 100px ${face}`;const titleWidth=measure.measureText(title.textContent).width;
  measure.font=`400 55px ${face}`;const zoneWidth=measure.measureText(zoneLabel.textContent).width;
  const locationSize=width/(titleWidth+zoneWidth)*100;
  location.style.fontSize=`${locationSize}px`;
  clock.style.fontSize=`${width/(secondsWidth+fractionWidth)*100}px`;
 };
 const observer=new ResizeObserver(fit);if(decoration)observer.observe(decoration);
 window.addEventListener('resize',fit,{passive:true});
 document.fonts.ready.then(()=>{if(clock.isConnected)fit();});
 update();const timer=setInterval(update,20);document.addEventListener('visibilitychange',update);
 return()=>{window.removeEventListener('resize',fit);observer.disconnect();clearInterval(timer);document.removeEventListener('visibilitychange',update);};
}
