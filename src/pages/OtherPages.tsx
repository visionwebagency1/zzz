import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition, { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../components/ui/PageTransition';
import { IMAGES } from '../lib/images';

// ─── DiamantPage ─────────────────────────────────────────────
export function DiamantPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative bg-dark-brown min-h-[60vh] flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img src={IMAGES.img8} alt="Diamond" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-dark-brown/60 to-dark-brown/20" />
        </motion.div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 pt-36">
          <FadeIn>
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-gold" />De Wetenschap van Schittering
            </p>
            <h1 className="font-display text-display-lg font-light text-ivory">
              De Schoonheid van<br /><em className="italic text-gold">Lab-Grown Diamanten</em>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-dark-brown py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <p className="text-[15px] font-light text-white/55 leading-relaxed mb-6">
                Chemisch, fysisch en optisch identiek aan gedolven diamanten — maar gecreëerd met een fractie van de ecologische impact. Elke steen wordt met precisie gekweekt, geslepen door meester-ambachtslieden en gecertificeerd volgens de hoogste internationale standaarden.
              </p>
              <p className="font-display text-xl italic text-white/35">
                Geen compromis op schittering. Geen compromis op geweten.
              </p>
            </FadeInLeft>
            <FadeInRight>
              <div className="grid grid-cols-3 gap-0">
                {[
                  { val: '100%', label: 'Identiek aan gedolven' },
                  { val: '70%', label: 'Minder milieu impact' },
                  { val: 'IGI', label: 'Gecertificeerd' },
                ].map(s => (
                  <div key={s.val} className="text-center p-6 border border-white/[0.06]">
                    <div className="font-display text-4xl font-light text-ivory mb-2">{s.val}</div>
                    <div className="text-[10px] font-light text-white/35 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-dark py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-12">
            <h2 className="font-display text-display-sm font-light text-ivory">
              Lab vs <em className="italic text-gold">Gemijnd</em>
            </h2>
          </FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[9px] tracking-[0.2em] uppercase text-white/30 py-3 pr-8">Eigenschap</th>
                  <th className="text-left text-[9px] tracking-[0.2em] uppercase text-gold py-3 pr-8">Lab · DYOTA</th>
                  <th className="text-left text-[9px] tracking-[0.2em] uppercase text-white/25 py-3">Gemijnd</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Chemische samenstelling', 'Identiek', 'Identiek'],
                  ['Hardheid (Mohs)', '10 / 10', '10 / 10'],
                  ['Certificering', 'IGI / GIA', 'IGI / GIA'],
                  ['Ecologische impact', 'Minimaal', 'Significant'],
                  ['Traceerbare oorsprong', 'Volledig', 'Beperkt'],
                  ['Prijs per karaat', 'Voordelig', 'Premium'],
                ].map(([prop, lab, mined]) => (
                  <tr key={prop} className="border-b border-white/[0.05]">
                    <td className="text-[12px] font-light text-white/30 py-4 pr-8 tracking-wide">{prop}</td>
                    <td className="font-display text-lg font-light text-gold py-4 pr-8">{lab}</td>
                    <td className="font-display text-lg font-light text-white/20 py-4">{mined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory py-20 text-center">
        <FadeIn>
          <h2 className="font-display text-display-sm font-light text-charcoal mb-6">
            Ontdek onze <em className="italic">collectie</em>
          </h2>
          <div className="flex gap-4 justify-center">
            <Link to="/collecties" className="btn-primary">Bekijk Collectie</Link>
            <Link to="/afspraak" className="btn-ghost">Maak Afspraak</Link>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}

// ─── ShowroomPage ────────────────────────────────────────────
export function ShowroomPage() {
  return (
    <PageTransition>
      <section className="bg-ivory pt-28 md:pt-36 pb-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-24">
            <FadeInLeft>
              <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-gold" />Amstelveen
              </p>
              <h1 className="font-display text-display-lg font-light text-charcoal mb-6">
                Ons <em className="italic">Showroom</em>
              </h1>
              <p className="text-[15px] font-light text-mid leading-relaxed mb-10">
                Een ruimte ontworpen voor één ding: u. Privé, intiem en volledig op uw wensen afgestemd. Uitsluitend op afspraak — zodat elk bezoek voelt als het enige dat telt.
              </p>

              <div className="flex flex-col gap-6 mb-10">
                {[
                  { label: 'Adres', val: 'Amstelveen, Noord-Holland' },
                  { label: 'Openingstijden', val: 'Op afspraak · Ma–Za' },
                  { label: 'Telefoon', val: '+31 6 — op aanvraag' },
                  { label: 'E-mail', val: 'info@dyota.nl' },
                ].map(item => (
                  <div key={item.label} className="flex gap-6 border-b border-stone pb-5">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-gold min-w-[100px]">{item.label}</span>
                    <span className="text-[14px] font-light text-charcoal">{item.val}</span>
                  </div>
                ))}
              </div>

              <Link to="/afspraak" className="btn-primary inline-flex">
                Reserveer Uw Bezoek
              </Link>
            </FadeInLeft>

            <FadeInRight>
              <div className="aspect-[4/5] overflow-hidden bg-stone/30">
                <motion.img
                  src={IMAGES.img3}
                  alt="DYOTA Showroom"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Experience cards */}
      <section className="bg-stone/30 py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.1}>
            {[
              { title: 'Privé Consultatie', desc: 'Een-op-een begeleiding zonder haast. Uw wensen, ons vakmanschap.' },
              { title: 'Bespoke Ontwerp', desc: 'Van eerste idee tot definitief stuk — volledig op maat gemaakt voor u.' },
              { title: 'Lifetime Service', desc: 'Elk DYOTA stuk wordt levenslang onderhouden. Reiniging, aanpassing, altijd.' },
            ].map(card => (
              <StaggerItem key={card.title}>
                <div className="bg-ivory p-8 border border-stone">
                  <h3 className="font-display text-2xl font-light text-charcoal mb-3">{card.title}</h3>
                  <p className="text-[13px] font-light text-mid leading-relaxed">{card.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </PageTransition>
  );
}

// ─── AfspraakPage ────────────────────────────────────────────
export function AfspraakPage() {
  return (
    <PageTransition>
      <section className="bg-ivory pt-28 md:pt-36 pb-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <FadeIn className="mb-16 text-center">
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4">Privé Bezoek</p>
            <h1 className="font-display text-display-lg font-light text-charcoal mb-4">
              Maak een <em className="italic">Afspraak</em>
            </h1>
            <p className="text-[14px] font-light text-mid max-w-md mx-auto">
              Reserveer uw persoonlijke showroom bezoek. Wij nemen binnen 24 uur contact op om uw afspraak te bevestigen.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Name */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Voornaam</label>
                <input type="text" placeholder="Uw voornaam" className="input-luxury" />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Achternaam</label>
                <input type="text" placeholder="Uw achternaam" className="input-luxury" />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">E-mailadres</label>
                <input type="email" placeholder="uw@email.nl" className="input-luxury" />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Telefoonnummer</label>
                <input type="tel" placeholder="+31 6 xxxxxxxx" className="input-luxury" />
              </div>

              {/* Type */}
              <div className="md:col-span-2">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-3">Type Afspraak</label>
                <div className="flex flex-wrap gap-3">
                  {['Privé Consultatie', 'Bespoke Ontwerp', 'Cadeauadvies', 'Verlovingsring'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="type" className="sr-only" />
                      <span className="w-4 h-4 border border-stone group-hover:border-gold transition-colors duration-300 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-gold hidden" />
                      </span>
                      <span className="text-[12px] font-light text-mid group-hover:text-charcoal transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Voorkeursdatum</label>
                <input type="date" className="input-luxury" />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Voorkeurstijd</label>
                <select className="input-luxury cursor-pointer bg-transparent appearance-none">
                  <option>Ochtend (10:00–12:00)</option>
                  <option>Middag (13:00–15:00)</option>
                  <option>Middag laat (15:00–17:30)</option>
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Toelichting</label>
                <textarea
                  rows={4}
                  placeholder="Vertel ons meer over uw wensen, een speciale gelegenheid of specifieke vragen..."
                  className="input-luxury resize-none"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-between items-center border-t border-stone pt-8 mt-2">
                <p className="text-[11px] font-light text-mid">
                  Wij bevestigen uw afspraak binnen 24 uur.
                </p>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Verstuur Aanvraag
                </motion.button>
              </div>
            </form>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}

// ─── ContactPage ─────────────────────────────────────────────
export function ContactPage() {
  return (
    <PageTransition>
      <section className="bg-ivory pt-28 md:pt-36 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <FadeInLeft>
              <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-gold" />Contact
              </p>
              <h1 className="font-display text-display-md font-light text-charcoal mb-6">
                Neem <em className="italic">Contact</em><br />met Ons Op
              </h1>
              <p className="text-[15px] font-light text-mid leading-relaxed mb-12">
                Heeft u een vraag over een stuk, wilt u een offerte aanvragen of gewoon meer weten over DYOTA? Wij helpen u graag.
              </p>

              <div className="flex flex-col gap-6">
                {[
                  { label: 'E-mail', val: 'info@dyota.nl', sub: 'Reactie binnen 1 werkdag' },
                  { label: 'Showroom', val: 'Amstelveen, Noord-Holland', sub: 'Op afspraak, ma–za' },
                  { label: 'Instagram', val: '@dyota.diamonds', sub: 'DM\'s worden gelezen' },
                ].map(item => (
                  <div key={item.label} className="flex gap-6 border-b border-stone pb-5">
                    <div className="min-w-[90px]">
                      <span className="text-[9px] tracking-[0.18em] uppercase text-gold">{item.label}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-light text-charcoal">{item.val}</p>
                      <p className="text-[11px] font-light text-mid">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInLeft>

            <FadeInRight delay={0.1}>
              <form className="flex flex-col gap-8">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Naam</label>
                  <input type="text" placeholder="Uw naam" className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">E-mail</label>
                  <input type="email" placeholder="uw@email.nl" className="input-luxury" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase text-mid mb-2">Bericht</label>
                  <textarea rows={5} placeholder="Uw bericht..." className="input-luxury resize-none" />
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary self-start"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Verstuur Bericht
                </motion.button>
              </form>
            </FadeInRight>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
