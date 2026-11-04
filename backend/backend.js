(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const K=window.KAS; let db=K.db;
const {DAYS,DATES,LONG,eur,eur0}=K;
const view=$('#view');
let st={v:'dash',sel:null,student:null};
function toast(t){const el=document.createElement('div');el.className='toast';el.textContent=t;document.body.appendChild(el);setTimeout(()=>el.remove(),2800)}
const h2=h=>String(h).padStart(2,'0')+':00';
function badge(t){return {avb:'<span class="badge avb">AVB</span>',avd:'<span class="badge avd">AVD</span>',proef:'<span class="badge proef">Proefles</span>',ex:'<span class="badge ex">Examen</span>',blk:'<span class="badge">Blok</span>'}[t]||''}
function pst(s){return {paid:'<span class="badge paid">Betaald</span>',open:'<span class="badge open">Open</span>',rem:'<span class="badge rem">Herinnerd</span>'}[s]}
const NAV=[['dash','Vandaag'],['agenda','Agenda'],['aanvragen','Aanvragen'],['leerlingen','Leerlingen'],['betalingen','Betalingen'],['pakketten','Pakketten'],['berichten','Berichten'],['instellingen','Instellingen']];
$('#mnavb').innerHTML=NAV.map(n=>`<button data-v="${n[0]}">${n[1]}</button>`).join('');
document.querySelectorAll('#snav button,#mnavb button').forEach(b=>b.addEventListener('click',()=>go(b.dataset.v)));
$('#mburger').onclick=()=>$('#mnavb').classList.toggle('open');
$('#reset').onclick=()=>{db=K.reset();st={v:'dash',sel:null,student:null};go('dash');toast('Demo opnieuw ingesteld.')};
$('#bell').onclick=()=>{go('aanvragen')};
document.querySelectorAll('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));
window.addEventListener('storage',e=>{if(e.key===K.KEY){db=K.load();render();const fresh=db.events.filter(x=>x.fresh);if(fresh.length)toast('Nieuwe boeking via de website: '+fresh[fresh.length-1].who)}});
function go(v){st.v=v;st.student=null;st.sel=null;document.querySelectorAll('#snav button,#mnavb button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#mnavb').classList.remove('open');render();window.scrollTo({top:0})}

function vDash(){
  const today=db.events.filter(e=>e.d===0).sort((a,b)=>a.h-b.h);
  const open=db.payments.filter(p=>p.st!=='paid').reduce((a,p)=>a+p.amt,0);
  const paid=db.payments.filter(p=>p.st==='paid').reduce((a,p)=>a+p.amt,0)+2340;
  const fresh=db.events.filter(e=>e.fresh);
  return `<div class="vh"><div><h1>Goedemorgen Kas</h1><p>Maandag 9 november · ${today.length} lessen vandaag · ${db.requests.length} nieuwe aanvragen${fresh.length?' · '+fresh.length+' nieuwe boeking'+(fresh.length>1?'en':'')+' via de website':''}</p></div><div class="acts"><button class="btn lt" data-go="aanvragen">Aanvragen</button><button class="btn" data-go="agenda">Open agenda</button></div></div>
  <div class="kpis"><div class="kpi gold"><small>Omzet november</small><b>${eur0(Math.round(paid))}</b><span>via iDEAL, automatisch verwerkt</span></div><div class="kpi"><small>Deze week</small><b>${db.events.filter(e=>e.t!=='blk').length} lessen</b><span class="up">+3 t.o.v. vorige week</span></div><div class="kpi"><small>Openstaand</small><b>${eur(open)}</b><span>herinneringen gaan automatisch</span></div><div class="kpi"><small>Actieve leerlingen</small><b>${db.students.filter(s=>s.stage!=='Geslaagd').length+2}</b><span>2 examens deze maand</span></div></div>
  <div class="grid2"><div class="card"><h3>Vandaag <a data-go="agenda">Hele week</a></h3><div class="today">${today.map(e=>`<div><time>${h2(e.h)}</time><div><b>${e.who}</b><small>${e.sub}</small></div>${badge(e.t)}</div>`).join('')}</div></div>
  <div class="card"><h3>Zojuist gebeurd <a data-go="betalingen">Betalingen</a></h3><div class="feed">
  ${db.log.slice(0,2).map(l=>`<div><i class="o"></i><div><b>Website:</b> ${l.txt}<small>Zojuist · betaald via iDEAL</small></div></div>`).join('')}
  ${db.payments.slice(0,3).map(p=>`<div><i class="g"></i><div>${p.who} betaalde <b>${eur(p.amt)}</b> voor ${p.what}<small>${p.when} · ${p.via}</small></div></div>`).join('')}
  <div><i class="o"></i><div>Nieuwe aanvraag: <b>Mila Janssen</b>, proefles zaterdag 10:00<small>Vandaag 08:40 · via website</small></div></div>
  <div><i></i><div>Herinnering verstuurd aan <b>Noud Verheijen</b> voor AVD-les 14:00<small>Vandaag 07:00 · WhatsApp</small></div></div>
  <div><i></i><div>Examenaanvraag AVD voor <b>Noud</b> klaar om in te dienen<small>Na les 7 · CBR</small></div></div>
  </div></div></div>`;
}
function vAgenda(){
  const hours=[];for(let h=8;h<=19;h++)hours.push(h);
  let grid=`<div class="hd"></div>${DAYS.map((d,i)=>`<div class="hd ${i===0?'tod':''}">${d} <b>${DATES[i]}</b><small>nov</small></div>`).join('')}`;
  hours.forEach(h=>{grid+=`<div class="tm">${h2(h)}</div>`;for(let d=0;d<6;d++){const ev=db.events.find(e=>e.d===d&&e.h===h);const inside=db.events.find(e=>e.d===d&&h>e.h&&h<e.h+e.len);grid+=`<div class="cell ${ev||inside?'':'free'}">${ev?`<div class="ev ${ev.t} ${ev.fresh?'new':''}" style="height:${ev.len*48-4}px" data-ev="${db.events.indexOf(ev)}"><b>${ev.who}</b>${ev.sub.split(' · ')[0]}</div>`:''}</div>`}});
  const sel=st.sel!=null?db.events[st.sel]:null;
  return `<div class="vh"><div><h1>Agenda</h1><p>Week 46 · één instructeur, één motor. Klik op een les of op een leeg vak.</p></div><div class="ag-tools"><div class="seg"><button class="on">Week</button><button data-toast="Dagweergave: per les het ophaaladres, notities en de knop 'les gegeven'.">Dag</button><button data-toast="Maandoverzicht met bezetting per dag.">Maand</button></div><button class="btn lt" data-toast="Blokkeer vakantie, onderhoud of privé. Die tijden zijn direct niet meer boekbaar op de site.">Blokkeren</button><button class="btn" data-toast="Nieuwe les: kies leerling, type en tijd. De leerling krijgt meteen een WhatsApp.">+ Les</button></div></div>
  <div class="ag"><div class="ag-grid">${grid}</div></div>
  <div class="ag-detail ${sel?'show':''}" id="agd">${sel?`<h4>${sel.who} ${badge(sel.t)}</h4><div class="meta">${LONG[sel.d]} ${DATES[sel.d]} november · ${h2(sel.h)} tot ${h2(sel.h+sel.len)} · ${sel.sub}${sel.phone?' · '+sel.phone:''}</div><div class="acts"><button class="btn sm g" data-toast="Les afgevinkt. Uren bijgewerkt in het dossier en zichtbaar in Mijn KAS.">Les gegeven</button><button class="btn sm lt" data-toast="Kies een nieuw moment. De leerling krijgt automatisch een WhatsApp met de nieuwe tijd.">Verplaatsen</button><button class="btn sm lt" data-toast="Opent WhatsApp met het nummer van de leerling.">WhatsApp</button><button class="btn sm lt" data-open-student="${sel.who}">Dossier</button></div>`:''}</div>
  <div class="legend"><span style="--c:var(--blue)">AVB</span><span style="--c:var(--orange)">AVD</span><span style="--c:var(--green)">Proefles</span><span style="--c:var(--violet)">Examen</span><span style="--c:#b5b1a7">Geblokkeerd</span><span style="--c:var(--gold2)">Nieuw via website</span></div>`;
}
function vReq(){
  return `<div class="vh"><div><h1>Aanvragen</h1><p>Boekingen vanaf de website die je nog bevestigt. Betaald is al betaald.</p></div></div>
  <div class="req">${db.requests.length?db.requests.map(r=>`<div class="rq" data-rq="${r.id}"><div class="h"><div><b>${r.name}</b><div class="meta">${r.type} · ${r.when} · ${r.src} · ${eur(r.paid)}</div></div><span class="badge new">Nieuw</span></div><div class="msg">"${r.msg}"</div><div class="acts"><button class="btn sm g" data-acc="${r.id}">Accepteren en inplannen</button><button class="btn sm lt" data-toast="Stel een ander moment voor. De leerling kiest in Mijn KAS.">Ander moment</button><button class="btn sm lt" data-toast="Opent WhatsApp met ${r.name}.">Antwoorden</button></div></div>`).join(''):'<div class="empty"><b>Alles afgehandeld</b>Nieuwe aanvragen komen hier binnen, met een pushmelding op je telefoon.</div>'}</div>`;
}
function vStudents(){
  if(st.student){return vStudent(db.students.find(x=>x.id===st.student))}
  return `<div class="vh"><div><h1>Leerlingen</h1><p>Klik op een leerling voor het dossier.</p></div><div class="acts"><button class="btn lt" data-toast="Exporteer de lijst naar Excel.">Exporteren</button><button class="btn" data-toast="Nieuwe leerling toevoegen of importeren uit je huidige lijst.">+ Leerling</button></div></div>
  <div class="tbl-wrap"><table class="tbl"><tr><th>Leerling</th><th>Fase</th><th>AVB</th><th>AVD</th><th>Volgende les</th><th>Openstaand</th></tr>
  ${db.students.map(s=>{const n=db.events.filter(e=>e.who===s.name).sort((a,b)=>a.d-b.d||a.h-b.h)[0];return `<tr class="clk" data-st="${s.id}"><td><span class="nm"><span class="av" style="background:${s.col}">${s.ini}</span>${s.name}</span></td><td><span class="badge ${s.stage==='AVB'?'avb':s.stage==='AVD'?'avd':'paid'}">${s.stage}</span></td><td><span class="pbar"><i class="${s.avb.passed?'ok':''}" style="width:${s.avb.done/s.avb.total*100}%"></i></span>${s.avb.passed?'Geslaagd':s.avb.done+'/'+s.avb.total}</td><td><span class="pbar"><i class="${s.avd.passed?'ok':''}" style="width:${s.avd.done/s.avd.total*100}%"></i></span>${s.avd.passed?'Geslaagd':s.avd.done+'/'+s.avd.total}</td><td>${n?DAYS[n.d]+' '+DATES[n.d]+' nov · '+h2(n.h):'<span style="color:var(--soft)">geen</span>'}</td><td class="money">${s.open?'<span class="badge open">'+eur(s.open)+'</span>':'<span style="color:var(--green)">€ 0,00</span>'}</td></tr>`}).join('')}
  </table></div>`;
}
function vStudent(s){
  const lessons=db.events.filter(e=>e.who===s.name);
  return `<div class="vh"><div><button class="btn lt sm" data-back="1">← Alle leerlingen</button></div></div>
  <div class="sd"><div class="card"><div class="sd-top"><span class="av" style="background:${s.col}">${s.ini}</span><div><b>${s.name}</b><small>${s.phone} · fase ${s.stage}</small></div></div>
  <div class="sd-stat"><div><b>${s.avb.done+s.avd.done}</b><small>uur gereden</small></div><div><b>${s.avb.total-s.avb.done+s.avd.total-s.avd.done}</b><small>uur te gaan</small></div><div><b>${s.open?eur0(s.open):'€ 0'}</b><small>openstaand</small></div></div>
  <div class="track"><div><span>AVB</span><span class="pbar" style="width:100%"><i class="${s.avb.passed?'ok':''}" style="width:${s.avb.done/s.avb.total*100}%"></i></span><span>${s.avb.passed?'<span class="badge paid">Geslaagd</span>':s.avb.done+' / '+s.avb.total+' uur'}</span></div><div><span>AVD</span><span class="pbar" style="width:100%"><i class="${s.avd.passed?'ok':''}" style="width:${s.avd.done/s.avd.total*100}%"></i></span><span>${s.avd.passed?'<span class="badge paid">Geslaagd</span>':s.avd.done+' / '+s.avd.total+' uur'}</span></div></div>
  <div class="note"><b>Notitie van Kas:</b> ${s.note}</div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px"><button class="btn sm" data-toast="Opent WhatsApp met ${s.name.split(' ')[0]}.">WhatsApp</button><button class="btn sm lt" data-toast="Nieuwe les ingepland, leerling krijgt bevestiging.">+ Les plannen</button><button class="btn sm lt" data-toast="Betaallink verstuurd via WhatsApp en e-mail.">Betaallink</button><button class="btn sm lt" data-toast="Examen aanvragen bij het CBR met de gegevens uit het dossier.">Examen aanvragen</button></div></div>
  <div class="card"><h3>Lessen en documenten</h3><div class="ll">${lessons.map(e=>`<div><span><b>${e.sub}</b><br><small>${LONG[e.d]} ${DATES[e.d]} nov · ${h2(e.h)}</small></span>${badge(e.t)}<span class="badge">Gepland</span></div>`).join('')}
  <div><span><b>AVB les 1 t/m ${Math.min(s.avb.done,10)}</b><br><small>oktober</small></span><span class="badge avb">AVB</span><span class="badge paid">Gegeven</span></div>
  <div><span><b>Theoriecertificaat</b><br><small>geüpload door leerling</small></span><span class="badge">PDF</span><span class="badge paid">Geldig</span></div>
  <div><span><b>AVB-pakket</b><br><small>€ 699 ${s.open?'· termijn 2 open':'· betaald'}</small></span><span class="badge">iDEAL</span>${s.open?'<span class="badge open">Open</span>':'<span class="badge paid">Betaald</span>'}</div></div></div></div>`;
}
function vPay(){
  const paid=db.payments.filter(p=>p.st==='paid').reduce((a,p)=>a+p.amt,0);
  const open=db.payments.filter(p=>p.st!=='paid').reduce((a,p)=>a+p.amt,0);
  return `<div class="vh"><div><h1>Betalingen</h1><p>Alles via Mollie: iDEAL, Apple Pay, betaallinks en termijnen. Uitbetaling op jouw rekening.</p></div><div class="acts"><button class="btn lt" data-toast="Exporteer naar Excel of rechtstreeks naar je boekhouder.">Exporteren</button><button class="btn" data-toast="Maak een betaallink en stuur hem via WhatsApp.">+ Betaallink</button></div></div>
  <div class="kpis"><div class="kpi gold"><small>Ontvangen deze week</small><b>${eur0(Math.round(paid))}</b><span>automatisch gematcht</span></div><div class="kpi"><small>Openstaand</small><b>${eur(open)}</b><span>herinnering gaat vanzelf</span></div><div class="kpi"><small>Termijnen lopend</small><b>2</b><span>AVB-pakketten in 2×</span></div><div class="kpi"><small>Tijd kwijt aan incasso</small><b>0 min</b><span>was: elke week appen</span></div></div>
  <div class="tbl-wrap"><table class="tbl"><tr><th>Wie</th><th>Wat</th><th>Bedrag</th><th>Status</th><th>Wanneer</th><th>Via</th><th></th></tr>
  ${db.payments.map((p,i)=>`<tr><td><b>${p.who}</b></td><td>${p.what}</td><td class="money">${eur(p.amt)}</td><td>${pst(p.st)}</td><td>${p.when}</td><td>${p.via}</td><td>${p.st!=='paid'?`<button class="btn sm lt" data-remind="${i}">Herinner</button>`:''}</td></tr>`).join('')}
  </table></div>`;
}
function vPk(){
  return `<div class="vh"><div><h1>Pakketten en tarieven</h1><p>Pas een prijs aan of zet een pakket uit. De website past zich direct aan.</p></div><div class="acts"><button class="btn" data-toast="Nieuw pakket: naam, prijs, aantal uren, zichtbaar op site, termijnen toegestaan.">+ Pakket</button></div></div>
  <div class="pk">${db.packages.map(p=>`<div class="pkc"><div class="rowx"><b>${p.name}</b><button class="sw ${p.live?'on':''}" data-live="${p.id}" aria-label="Zichtbaar op website"></button></div><div class="pr">€ <input type="number" value="${p.price}" data-price="${p.id}"> <span style="font-size:12px;color:var(--muted);font-weight:600">${p.unit}</span></div><p>${p.desc}</p><p>${p.live?'<span class="badge paid">Live op site</span>':'<span class="badge">Verborgen</span>'} ${p.id==='avb'?'<span class="badge avb">2 termijnen toegestaan</span>':''}</p></div>`).join('')}</div>
  <p class="note-line">Ook mogelijk: actieprijs met einddatum, kortingscode en cadeaubon voor een proefles.</p>`;
}
function vMsg(){
  const rows=[['WA','#25D366','Mila Janssen','Bevestiging proefles zaterdag 10:00 verstuurd','Vandaag 08:41'],['WA','#25D366','Noud Verheijen','Herinnering: morgen 14:00 AVD-les, ophalen Station Venlo','Vandaag 07:00'],['@','#2853b9','Daan Cuypers','Factuur AVB-pakket termijn 1 verstuurd','Gisteren 19:20'],['WA','#25D366','Kayhan Demir','Betaalherinnering termijn 2 met betaallink','Gisteren 09:00'],['★','#d9a521','Wouter Peeters','Reviewverzoek na slagen: review geplaatst','Vorige week']];
  return `<div class="vh"><div><h1>Berichten</h1><p>Alles wat automatisch naar leerlingen gaat. Jij hoeft niets te typen.</p></div><div class="acts"><button class="btn lt" data-toast="Pas de teksten van bevestiging, herinnering en betaalherinnering aan.">Teksten aanpassen</button></div></div>
  <div class="msgs">${rows.map(r=>`<div class="msg"><span class="ch" style="background:${r[1]}">${r[0]}</span><div><b>${r[2]}</b> · ${r[3]}<small>${r[4]}</small></div><span class="badge paid">Verstuurd</span></div>`).join('')}</div>`;
}
function vSet(){
  const av=[['Ma',9,19],['Di',9,19],['Wo',9,20],['Do',8,19],['Vr',9,18],['Za',9,14],['Zo',0,0]];
  return `<div class="vh"><div><h1>Instellingen</h1><p>Jouw beschikbaarheid bepaalt wat leerlingen online kunnen boeken.</p></div></div>
  <div class="set"><div class="card"><h3>Beschikbaarheid <a data-toast="Sleep de balk om tijden aan te passen. Vakantie? Blokkeer een periode.">Aanpassen</a></h3><div class="avail">${av.map(a=>`<div><span>${a[0]}</span><span class="bar">${a[2]?`<i style="left:${(a[1]-8)/12*100}%;width:${(a[2]-a[1])/12*100}%"></i>`:''}</span><span>${a[2]?h2(a[1])+' tot '+a[2]+':00':'<span style=color:var(--soft)>vrij</span>'}</span></div>`).join('')}</div></div>
  <div class="card"><h3>Automatisch geregeld</h3><div class="feed">
  <div><i class="g"></i><div><b>Bevestiging</b> direct na boeking<small>WhatsApp en e-mail · route, wat meenemen</small></div></div>
  <div><i class="g"></i><div><b>Herinnering</b> 24 uur vooraf<small>WhatsApp · met knop 'verplaatsen'</small></div></div>
  <div><i class="g"></i><div><b>Betaalherinnering</b> 3 dagen na vervaldatum<small>Betaallink · automatisch</small></div></div>
  <div><i class="g"></i><div><b>Reviewverzoek</b> na slagen<small>Google-review link · 1× per leerling</small></div></div>
  <div><i class="o"></i><div><b>Instructeurs en motoren</b><small>Nu: Kas · Lesmotor 1. Tweede instructeur toevoegen kan altijd.</small></div></div>
  </div></div></div>`;
}
function render(){
  view.innerHTML={dash:vDash,agenda:vAgenda,aanvragen:vReq,leerlingen:vStudents,betalingen:vPay,pakketten:vPk,berichten:vMsg,instellingen:vSet}[st.v]();
  $('#reqBadge').textContent=db.requests.length||'';
  $('#bellDot').classList.toggle('on',db.requests.length>0||db.events.some(e=>e.fresh));
  view.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
  view.querySelectorAll('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));
  view.querySelectorAll('[data-ev]').forEach(b=>b.onclick=e=>{e.stopPropagation();st.sel=+b.dataset.ev;render();$('#agd').scrollIntoView({behavior:'smooth',block:'nearest'})});
  view.querySelectorAll('.cell.free').forEach(c=>c.onclick=()=>toast('Leeg vak: hier plan je direct een les of blokkeer je de tijd.'));
  view.querySelectorAll('[data-open-student]').forEach(b=>b.onclick=()=>{const s=db.students.find(x=>x.name===b.dataset.openStudent);if(s){go('leerlingen');st.student=s.id;render()}else toast('Nieuwe leerling: het dossier wordt aangemaakt bij de eerste les.')});
  view.querySelectorAll('[data-acc]').forEach(b=>b.onclick=()=>{const r=db.requests.find(x=>x.id===b.dataset.acc);view.querySelector(`[data-rq="${r.id}"]`).classList.add('gone');setTimeout(()=>{db.requests=db.requests.filter(x=>x!==r);db.events.push({d:r.d,h:r.h,len:r.len||1,t:r.type==='Proefles'?'proef':'avb',who:r.name,sub:r.type+' · bevestigd',fresh:true});K.save();toast(r.name+' staat in de agenda. Bevestiging via WhatsApp verstuurd.');go('agenda')},400)});
  view.querySelectorAll('[data-st]').forEach(r=>r.onclick=()=>{st.student=+r.dataset.st;render();window.scrollTo({top:0})});
  view.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{st.student=null;render()});
  view.querySelectorAll('[data-remind]').forEach(b=>b.onclick=()=>{const p=db.payments[+b.dataset.remind];p.st='rem';p.when='Herinnering zojuist verstuurd';K.save();toast('Betaalherinnering verstuurd via WhatsApp en e-mail.');render()});
  view.querySelectorAll('[data-live]').forEach(b=>b.onclick=()=>{const p=K.pkg(b.dataset.live);p.live=!p.live;K.save();render();toast(p.name+(p.live?' staat nu live op de website.':' is verborgen op de website.'))});
  view.querySelectorAll('[data-price]').forEach(i=>i.onchange=()=>{const p=K.pkg(i.dataset.price);p.price=+i.value||p.price;K.save();toast(p.name+' is nu '+eur0(p.price)+' op de website.')});
}
render();
})();
