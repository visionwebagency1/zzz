(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const K=window.KAS, db=K.db;
const IMG={
  a:'https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=1400&auto=format&fit=crop',
  b:'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1400&auto=format&fit=crop',
  c:'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1000&auto=format&fit=crop',
  d:'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1000&auto=format&fit=crop',
  e:'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1000&auto=format&fit=crop',
  f:'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop'
};
function bg(el,url,fallback){if(!el)return;const im=new Image();im.onload=()=>el.style.backgroundImage=`url(${url})`;im.onerror=()=>el.style.backgroundImage=`url(${fallback})`;im.src=url}
function toast(t){const el=document.createElement('div');el.className='toast';el.textContent=t;document.body.appendChild(el);setTimeout(()=>el.remove(),2600)}

/* reveal + burger */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=((i%3)*80)+'ms';io.observe(el)});
const burger=$('#burger');if(burger){burger.onclick=()=>$('#mnav').classList.toggle('open');document.querySelectorAll('#mnav a').forEach(a=>a.onclick=()=>$('#mnav').classList.remove('open'))}

/* ===== HOME ===== */
if($('#pk')){
  bg($('#heroImg'),IMG.a,IMG.b);bg($('#matImg'),IMG.b,IMG.a);
  const live=db.packages.filter(p=>p.live);
  $('#pk').innerHTML=live.map(p=>`<div class="pc ${p.id==='avb'?'hl':''} rv">${p.tag?`<span class="tag">${p.tag}</span>`:''}<h3>${p.name}</h3><div class="pr"><i>€</i> ${p.price.toLocaleString('nl-NL')}<small>${p.unit}</small></div><p>${p.desc}</p><ul>${p.items.map(i=>`<li>${i}</li>`).join('')}</ul><a class="btn ${p.id==='avb'?'gold':'dark'}" href="boeken.html?pkg=${p.id}">Boek ${p.name.toLowerCase()}</a></div>`).join('');
  document.querySelectorAll('#pk .rv').forEach(el=>io.observe(el));
  const gal=[[IMG.c,'Noud en Piotr: AVB in één keer'],[IMG.d,'Wouter: geslaagd AVD'],[IMG.e,'Kayhan: AVB met weinig lessen'],[IMG.f,'Emre: geslaagd AVD'],[IMG.b,'Nieuw pand, nieuwe kansen']];
  $('#gal').innerHTML=gal.map((g,i)=>`<div data-i="${i}"><span>${g[1]}</span></div>`).join('');
  document.querySelectorAll('#gal div').forEach((el,i)=>bg(el,gal[i][0],i%2?IMG.a:IMG.b));
  /* volgende vrije plek */
  outer:for(let d=0;d<6;d++){for(const s of K.SLOTS){const h=+s.slice(0,2);if(!K.isTaken(d,h,1)){$('#nextFree').textContent=K.LONG[d][0].toUpperCase()+K.LONG[d].slice(1)+' '+K.DATES[d]+' nov · '+s;break outer}}}
}

/* ===== BOEKEN ===== */
if($('#bkMain')){
  const q=new URLSearchParams(location.search);
  const live=()=>db.packages.filter(p=>p.live);
  let st={step:1,pkg:live().some(p=>p.id===q.get('pkg'))?q.get('pkg'):'proef',day:5,slot:'',name:'',phone:'',done:null,terms:false};
  const main=$('#bkMain'),sum=$('#bkSum');
  function P(){return K.pkg(st.pkg)}
  function render(){
    const p=P();const len=p.id==='avb'?2:1;
    document.querySelectorAll('#prog div').forEach((d,i)=>{d.className=i+1===st.step?'on':i+1<st.step?'done':''});
    let h='';
    if(st.done){
      const e=st.done;
      h=`<div class="done"><div class="ok"></div><h2>Je staat ingepland!</h2><p class="sub">${p.name} · ${K.LONG[e.d]} ${K.DATES[e.d]} november · ${String(e.h).padStart(2,'0')}:00</p>
      <div class="detail"><div><small>Locatie</small><b>Oefenterrein Venlo</b></div><div><small>Instructeur</small><b>Kas</b></div><div><small>Betaald</small><b>${K.eur(st.terms?p.price/2:p.price)}</b></div><div><small>Via</small><b>iDEAL</b></div></div>
      <div class="wa"><i>W</i><div><b>Bevestiging verstuurd via WhatsApp</b><br>Met route, wat je meeneemt en een knop om te verplaatsen. 24 uur vooraf krijg je een herinnering.</div></div>
      <div class="acts" style="justify-content:center"><a class="btn gold" href="mijn.html">Naar Mijn KAS</a><a class="btn line" href="./">Terug naar de site</a></div></div>`;
    } else if(st.step===1){
      h=`<h2>Wat wil je boeken?</h2><p class="sub">Kies je les. Prijzen zijn inclusief btw.</p><div class="opt">${live().map(x=>`<button class="op ${st.pkg===x.id?'on':''}" data-pk="${x.id}"><span><b>${x.name}</b><small>${x.desc}</small></span><span class="pr">${K.eur0(x.price)}</span></button>`).join('')}</div>
      <div class="acts"><span></span><button class="btn gold" data-next="2">Kies een moment<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>`;
    } else if(st.step===2){
      h=`<h2>Kies een moment</h2><p class="sub">Live uit de agenda van Kas. Week van 9 november.</p>
      <div class="days">${K.DAYS.map((d,i)=>`<button data-day="${i}" class="${st.day===i?'on':''}">${d}<small>${K.DATES[i]} nov</small></button>`).join('')}<button disabled>Zo<small>15 nov</small></button></div>
      <div class="slots">${K.SLOTS.map(s=>{const tk=K.isTaken(st.day,+s.slice(0,2),len);return `<button data-slot="${s}" class="${st.slot===s?'on':''}" ${tk?'disabled':''}>${s}</button>`}).join('')}</div>
      <p class="hint">Doorgestreepte tijden zijn bezet. ${p.id==='avb'?'Bij het AVB-pakket plan je nu de eerste twee uur, de rest plan je samen met Kas.':'Een les duurt 60 minuten.'}</p>
      <div class="acts"><button class="btn line" data-next="1">Terug</button><button class="btn gold" data-next="3" ${st.slot?'':'disabled'}>Verder</button></div>`;
    } else if(st.step===3){
      h=`<h2>Jouw gegevens</h2><p class="sub">Zodat Kas weet wie er komt en je een bevestiging krijgt.</p>
      <div class="form"><div><label>Voornaam en achternaam</label><input id="fName" value="${st.name}" placeholder="Bijv. Lars de Wit"></div><div><label>Telefoon (WhatsApp)</label><input id="fPhone" value="${st.phone}" placeholder="06 12345678"></div><div><label>E-mail</label><input placeholder="naam@mail.nl"></div><div><label>Geboortedatum</label><input placeholder="dd-mm-jjjj"></div><div class="full"><label>Ervaring op de motor</label><select><option>Geen ervaring</option><option>Scooter of brommer</option><option>Al eens gereden</option><option>Opfriscursus</option></select></div></div>
      <div class="acts"><button class="btn line" data-next="2">Terug</button><button class="btn gold" data-next="4">Naar betalen</button></div>`;
    } else {
      h=`<h2>Afrekenen</h2><p class="sub">Veilig betalen via Mollie. Je plek is pas definitief na betaling.</p>
      <div class="pay"><button data-pay="iDEAL"><span class="lg" style="background:#cc0066">iDEAL</span><span>Betaal met iDEAL<small>Direct vanuit je eigen bank</small></span></button><button data-pay="Apple Pay"><span class="lg" style="background:#111">Pay</span><span>Apple Pay<small>Met Face ID of Touch ID</small></span></button>${p.id==='avb'?`<button data-pay="iDEAL" data-terms="1"><span class="lg" style="background:#0b6b64">2×</span><span>Betaal in 2 termijnen<small>Nu ${K.eur(p.price/2)}, de rest na les 5</small></span></button>`:''}</div>
      <div class="acts"><button class="btn line" data-next="3">Terug</button><span></span></div>`;
    }
    main.innerHTML=h;
    sum.innerHTML=`<h3>Jouw boeking</h3><div><span>Les</span><b>${p.name}</b></div><div><span>Duur</span><b>${len} uur</b></div><div><span>Moment</span><b>${st.slot?K.DAYS[st.day]+' '+K.DATES[st.day]+' nov · '+st.slot:'nog te kiezen'}</b></div><div><span>Instructeur</span><b>Kas</b></div><div><span>Locatie</span><b>Oefenterrein Venlo</b></div><div class="tot"><span>Totaal</span><b>${K.eur(p.price)}</b></div><p>Gratis verplaatsen tot 24 uur vooraf. Vragen? App 06 25 26 16 20.</p>`;
    main.querySelectorAll('[data-pk]').forEach(b=>b.onclick=()=>{st.pkg=b.dataset.pk;st.slot='';render()});
    main.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>{if(st.step===3){st.name=$('#fName').value;st.phone=$('#fPhone').value}st.step=+b.dataset.next;render();window.scrollTo({top:0,behavior:'smooth'})});
    main.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{st.day=+b.dataset.day;st.slot='';render()});
    main.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{st.slot=b.dataset.slot;render()});
    main.querySelectorAll('[data-pay]').forEach(b=>b.onclick=()=>{b.innerHTML='<span class="lg" style="background:#999">…</span><span>Bezig met betalen<small>Even geduld</small></span>';main.querySelectorAll('[data-pay]').forEach(x=>x.disabled=true);setTimeout(()=>{st.terms=!!b.dataset.terms;st.done=K.book({pkgId:st.pkg,day:st.day,hour:+st.slot.slice(0,2),name:st.name,phone:st.phone,via:b.dataset.pay,terms:st.terms});render();window.scrollTo({top:0,behavior:'smooth'})},1400)});
  }
  render();
}

/* ===== MIJN KAS ===== */
if($('#mk')){
  const s=db.students[0];
  const next=db.events.filter(e=>e.who===s.name).sort((a,b)=>a.d-b.d||a.h-b.h)[0];
  $('#mk').innerHTML=`<div class="hello"><span class="av">${s.ini}</span><div><span class="kick" style="margin:0">Mijn KAS</span><h1 class="h-display h2">Hoi ${s.name.split(' ')[0]}.</h1></div></div>
  <p class="lead" style="margin-bottom:22px">Je bent lekker bezig. Nog ${s.avd.total-s.avd.done} AVD-uren tot je examen.</p>
  <div class="mk-grid">
    <div class="card"><h3>Volgende les <span class="badge g">Bevestigd</span></h3><div class="big">${next?K.LONG[next.d][0].toUpperCase()+K.LONG[next.d].slice(1)+' '+K.DATES[next.d]+' nov · '+String(next.h).padStart(2,'0')+':00':'Nog niets gepland'}</div><p style="color:var(--muted);margin:6px 0 16px">${next?next.sub+' · ophalen bij Station Venlo':''}</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn line sm" data-toast="Kies zelf een nieuw vrij moment. Kas krijgt automatisch bericht.">Verplaatsen</button><a class="btn dark sm" href="boeken.html?pkg=avd">Extra les boeken</a></div></div>
    <div class="card"><h3>Voortgang</h3><div class="row"><span>AVB voertuigbeheersing</span><span class="badge g">Geslaagd</span></div><div class="bar"><i style="width:100%"></i></div><div class="row" style="margin-top:14px"><span>AVD verkeersdeelname</span><b>${s.avd.done} van ${s.avd.total} uur</b></div><div class="bar"><i style="width:${s.avd.done/s.avd.total*100}%"></i></div><p style="font-size:14px;color:var(--muted);margin-top:12px">Notitie van Kas: "${s.note}"</p></div>
    <div class="card"><h3>Betalingen <span class="badge g">Niets open</span></h3><div class="list"><div><span>AVD 5-lessenkaart</span><span><b>€ 310,00</b> <small>betaald</small></span></div><div><span>AVB-pakket</span><span><b>€ 699,00</b> <small>betaald</small></span></div><div><span>Proefles</span><span><b>€ 49,00</b> <small>betaald</small></span></div></div></div>
    <div class="card"><h3>Documenten</h3><div class="list"><div><span>Theoriecertificaat</span><span class="badge g">Geldig</span></div><div><span>AVB-uitslag</span><span class="badge g">Geslaagd 21 okt</span></div><div><span>Examenafspraak AVD</span><span class="badge o">Volgt na les 7</span></div><div><span>Factuur AVB-pakket</span><span class="badge">PDF</span></div></div></div>
  </div>`;
  document.querySelectorAll('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));
}
})();
