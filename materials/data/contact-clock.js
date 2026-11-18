export function installContactClock(main){
 const clock=main.querySelector('.contact-live-clock');if(!clock)return()=>{};
 const seconds=clock.querySelector('.contact-clock-seconds'),fraction=clock.querySelector('.contact-clock-fraction');
 const zone=clock.dataset.zone||'Asia/Taipei';
 const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
 const update=()=>{if(document.hidden)return;const now=new Date();seconds.textContent=formatter.format(now);fraction.textContent=`.${String(Math.floor(now.getMilliseconds()/10)).padStart(2,'0')}`;clock.dateTime=now.toISOString();};
 update();const timer=setInterval(update,20);document.addEventListener('visibilitychange',update);
 return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',update);};
}
