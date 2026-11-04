(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
/* icons (flat tiles in Minterest-stijl) */
const G={
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  db:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  phone:'<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M11 18h2"/>',
  cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  agenda:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 14h3M8 17h6"/>',
  card:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  wa:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  tag:'<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><path d="M7.5 7.5h.01"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  zero:'<circle cx="12" cy="12" r="9"/><path d="M8 8l8 8"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  link:'<path d="M8 7h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z"/><path d="M8 11h8"/><path d="M4 17l-1.5 3M20 17l1.5 3M12 15v5"/>',
  dash:'<path d="M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 3v6h8V3z"/>',
  inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  build:'<path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>',
  code:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  scale:'<path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
};
document.querySelectorAll('i.ico[data-i]').forEach((el,i)=>{const fill=el.dataset.fill||(i%2?'#0b5a56':'#1f9f86');el.outerHTML=`<svg class="ico" viewBox="0 0 40 40"><rect width="40" height="40" rx="11" fill="${fill}"/><g transform="translate(9.5 9.5) scale(0.875)" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${G[el.dataset.i]||''}</g></svg>`});
document.querySelectorAll('i.ck').forEach(el=>{const ok=el.classList.contains('ok');el.outerHTML=ok?'<svg class="ck" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#dff2ea"/><path d="M6 10.2l2.6 2.6L14.2 7.2" fill="none" stroke="#0b6b64" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>':'<svg class="ck" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#fbe7e5"/><path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="#b4372f" stroke-width="2.2" stroke-linecap="round"/></svg>'});

/* slides */
const slides=[...document.querySelectorAll('.slide')];
const n=slides.length;let cur=0;const seen=new Set();
const dots=$('#dots');dots.innerHTML=slides.map((s,i)=>`<button data-i="${i}" aria-label="Slide ${i+1}"></button>`).join('');
dots.querySelectorAll('button').forEach(b=>b.onclick=()=>go(+b.dataset.i));
function go(i,dir){
  if(i<0||i>=n)return;
  slides.forEach((s,k)=>{s.classList.toggle('on',k===i);s.classList.toggle('prev',k<i)});
  cur=i;seen.add(i);
  $('#counter').textContent=(i+1)+' / '+n;
  $('#prog').style.width=((i+1)/n*100)+'%';
  $('#prev').disabled=i===0;$('#next').disabled=i===n-1;
  dots.querySelectorAll('button').forEach((b,k)=>{b.classList.toggle('on',k===i);b.classList.toggle('seen',seen.has(k)&&k!==i)});
  slides[i].scrollTop=0;
  history.replaceState(null,'','#'+(i+1));
  loadFrames(slides[i]);
}
function loadFrames(sl){sl.querySelectorAll('iframe[data-src]').forEach(f=>{f.src=f.dataset.src;f.removeAttribute('data-src')});fit()}
function fit(){
  document.querySelectorAll('.phone .scr').forEach(sc=>{const f=sc.querySelector('iframe');if(!f)return;const w=sc.clientWidth,h=sc.clientHeight;const base=390;const s=w/base;f.style.width=base+'px';f.style.height=(h/s)+'px';f.style.transform=`scale(${s})`});
  document.querySelectorAll('.laptop .scr').forEach(sc=>{const f=sc.querySelector('iframe');if(!f)return;const w=sc.clientWidth,h=sc.clientHeight;const base=1280;const s=w/base;f.style.width=base+'px';f.style.height=(h/s)+'px';f.style.transform=`scale(${s})`});
}
$('#prev').onclick=()=>go(cur-1);$('#next').onclick=()=>go(cur+1);
document.addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(cur+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(cur-1)}if(e.key==='Home')go(0);if(e.key==='End')go(n-1)});
let tx=null,ty=null;
const stage=$('#stage');
stage.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
stage.addEventListener('touchend',e=>{if(tx==null)return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5){go(cur+(dx<0?1:-1))}tx=ty=null},{passive:true});
$('#fs').onclick=()=>{const d=document.documentElement;if(!document.fullscreenElement){(d.requestFullscreen||d.webkitRequestFullscreen||function(){}).call(d)}else{(document.exitFullscreen||document.webkitExitFullscreen||function(){}).call(document)}};
window.addEventListener('resize',fit);
const start=Math.min(n-1,Math.max(0,(parseInt(location.hash.slice(1))||1)-1));
go(start);
})();
