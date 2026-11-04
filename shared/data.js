/* Rijschool KAS demo: gedeelde data voor website en backend (fictief). Opgeslagen in de browser zodat een boeking op de site in de backend verschijnt. */
window.KAS=(function(){
  const KEY='kas-demo-v2';
  const DEF={
    packages:[
      {id:'proef',name:'Proefles',price:49,unit:'eenmalig',hours:1,desc:'Eén uur kennismaken met de motor en met Kas. Ervaring is niet nodig.',items:['60 minuten op de motor','Motor en kleding geregeld','Direct advies over jouw traject'],live:true,tag:'Start hier'},
      {id:'avb',name:'AVB-pakket',price:699,unit:'incl. examen',hours:10,desc:'Tien uur voertuigbeheersing plus het AVB-examen. De ideale start van je motorrijbewijs.',items:['10 uur AVB-les','AVB-examen inbegrepen','Beste prijs-kwaliteit','Betalen in 2 termijnen mogelijk'],live:true,tag:'Aanbevolen'},
      {id:'avd',name:'AVD-les',price:65,unit:'per uur',hours:1,desc:'Losse lessen verkeersdeelname. Flexibel in te plannen rond jouw agenda.',items:['Individuele rijles','Flexibele planning','Praktijkervaring op de weg'],live:true,tag:''},
      {id:'avd5',name:'AVD 5-lessenkaart',price:310,unit:'5 uur',hours:5,desc:'Vijf AVD-uren met korting, vooruit betaald.',items:['5 uur AVD-les','€ 15 voordeel','Zelf inplannen'],live:false,tag:''}
    ],
    students:[
      {id:1,name:'Noud Verheijen',ini:'NV',col:'#0b6b64',phone:'06 12 34 56 78',stage:'AVD',avb:{done:10,total:10,passed:true},avd:{done:4,total:8},open:0,note:'Rustig in bochten, goed verkeersinzicht. Examen AVD aanvragen na les 7.'},
      {id:2,name:'Piotr Nowak',ini:'PN',col:'#2853b9',phone:'06 23 45 67 89',stage:'AVD',avb:{done:10,total:10,passed:true},avd:{done:2,total:8},open:130,note:'Let op spiegels bij afslaan.'},
      {id:3,name:'Fatima el Idrissi',ini:'FI',col:'#b8860b',phone:'06 34 56 78 90',stage:'AVB',avb:{done:6,total:10,passed:false},avd:{done:0,total:8},open:0,note:'Snelle leerling. Slalom en noodstop al prima.'},
      {id:4,name:'Kayhan Demir',ini:'KD',col:'#6a2bc4',phone:'06 45 67 89 01',stage:'AVB',avb:{done:3,total:10,passed:false},avd:{done:0,total:8},open:349.5,note:'Tweede termijn AVB-pakket nog open.'},
      {id:5,name:'Emre Yilmaz',ini:'EY',col:'#b4372f',phone:'06 56 78 90 12',stage:'Geslaagd',avb:{done:10,total:10,passed:true},avd:{done:7,total:7,passed:true},open:0,note:'Geslaagd AVD. Reviewverzoek verstuurd.'},
      {id:6,name:'Wouter Peeters',ini:'WP',col:'#111111',phone:'06 67 89 01 23',stage:'Geslaagd',avb:{done:10,total:10,passed:true},avd:{done:9,total:9,passed:true},open:0,note:'Geslaagd. Google-review geplaatst.'}
    ],
    events:[
      {d:0,h:9,len:2,t:'avb',who:'Fatima el Idrissi',sub:'AVB les 7 en 8 · terrein'},
      {d:0,h:14,len:1,t:'avd',who:'Noud Verheijen',sub:'AVD les 5 · Venlo-Zuid'},
      {d:0,h:16,len:1,t:'avd',who:'Piotr Nowak',sub:'AVD les 3 · Roermond'},
      {d:1,h:10,len:1,t:'proef',who:'Sanne Jacobs',sub:'Proefles · betaald'},
      {d:1,h:13,len:2,t:'avb',who:'Kayhan Demir',sub:'AVB les 4 en 5 · terrein'},
      {d:1,h:18,len:1,t:'avd',who:'Noud Verheijen',sub:'AVD les 6 · Tegelen'},
      {d:2,h:9,len:3,t:'ex',who:'CBR Venlo',sub:'AVB-examen Fatima'},
      {d:2,h:15,len:1,t:'avd',who:'Piotr Nowak',sub:'AVD les 4 · Blerick'},
      {d:2,h:18,len:2,t:'avb',who:'Kayhan Demir',sub:'AVB les 6 en 7 · terrein'},
      {d:3,h:8,len:1,t:'blk',who:'Onderhoud motor',sub:'Geblokkeerd'},
      {d:3,h:14,len:1,t:'avd',who:'Noud Verheijen',sub:'AVD les 7 · snelweg'},
      {d:3,h:16,len:1,t:'proef',who:'Tom Hendriks',sub:'Proefles · betaald'},
      {d:4,h:10,len:2,t:'avb',who:'Fatima el Idrissi',sub:'AVB les 9 en 10 · terrein'},
      {d:4,h:16,len:1,t:'avd',who:'Piotr Nowak',sub:'AVD les 5 · Peel en Maas'},
      {d:5,h:9,len:1,t:'proef',who:'Lars de Wit',sub:'Proefles · betaald'},
      {d:5,h:11,len:2,t:'avb',who:'Kayhan Demir',sub:'AVB les 8 en 9 · terrein'}
    ],
    requests:[
      {id:'r1',name:'Mila Janssen',type:'Proefles',when:'Zaterdag 14 nov · 10:00',paid:49,msg:'Hoi! Ik heb nog nooit op een motor gezeten, is dat een probleem?',d:5,h:10,len:1,src:'Website · iDEAL betaald'},
      {id:'r2',name:'Daan Cuypers',type:'AVB-pakket',when:'Start donderdag 12 nov · 10:00',paid:349.5,msg:'Wil graag in 2 dagdelen per week lessen, kan dat?',d:3,h:10,len:2,src:'Website · 1e termijn betaald'}
    ],
    payments:[
      {who:'Fatima el Idrissi',what:'AVB-pakket',amt:699,st:'paid',when:'Vandaag 09:12',via:'iDEAL'},
      {who:'Mila Janssen',what:'Proefles',amt:49,st:'paid',when:'Vandaag 08:40',via:'iDEAL'},
      {who:'Daan Cuypers',what:'AVB-pakket · termijn 1 van 2',amt:349.5,st:'paid',when:'Gisteren',via:'iDEAL'},
      {who:'Kayhan Demir',what:'AVB-pakket · termijn 2 van 2',amt:349.5,st:'rem',when:'Herinnering verstuurd',via:'Betaallink'},
      {who:'Piotr Nowak',what:'AVD-les × 2',amt:130,st:'open',when:'Vervalt over 3 dagen',via:'Betaallink'},
      {who:'Lars de Wit',what:'Proefles',amt:49,st:'paid',when:'Ma 21:14',via:'iDEAL'},
      {who:'Noud Verheijen',what:'AVD 5-lessenkaart',amt:310,st:'paid',when:'Vorige week',via:'iDEAL'}
    ],
    log:[]
  };
  const clone=o=>JSON.parse(JSON.stringify(o));
  let db;
  function load(){try{const s=localStorage.getItem(KEY);db=s?JSON.parse(s):clone(DEF)}catch(e){db=clone(DEF)}return db}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}}
  function reset(){db=clone(DEF);save();return db}
  const DAYS=['Ma','Di','Wo','Do','Vr','Za'];
  const LONG=['maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];
  const DATES=[9,10,11,12,13,14];
  const SLOTS=['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  function isTaken(d,h,len){len=len||1;return db.events.some(e=>e.d===d&&h<e.h+e.len&&h+len>e.h)||db.requests.some(r=>r.d===d&&h<r.h+(r.len||1)&&h+len>r.h)}
  function pkg(id){return db.packages.find(p=>p.id===id)}
  function book(o){
    const p=pkg(o.pkgId);const len=p.id==='avb'?2:1;
    const nm=(o.name||'').trim()||'Nieuwe leerling';
    const ev={d:o.day,h:o.hour,len,t:p.id==='avb'?'avb':p.id==='proef'?'proef':'avd',who:nm,sub:p.name+' · betaald via iDEAL',fresh:true,phone:o.phone||''};
    db.events.push(ev);
    db.payments.unshift({who:nm,what:p.name+(o.terms?' · termijn 1 van 2':''),amt:o.terms?p.price/2:p.price,st:'paid',when:'Zojuist',via:o.via||'iDEAL'});
    db.log.unshift({t:Date.now(),txt:nm+' boekte '+p.name+' voor '+LONG[o.day]+' '+DATES[o.day]+' nov om '+String(o.hour).padStart(2,'0')+':00'});
    save();return ev;
  }
  const eur=n=>'€ '+n.toLocaleString('nl-NL',{minimumFractionDigits:2,maximumFractionDigits:2});
  const eur0=n=>'€ '+n.toLocaleString('nl-NL');
  load();
  return {get db(){return db},load,save,reset,DAYS,LONG,DATES,SLOTS,isTaken,pkg,book,eur,eur0,KEY};
})();
