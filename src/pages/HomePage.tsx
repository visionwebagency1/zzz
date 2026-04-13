import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PageTransition, { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../components/ui/PageTransition';
import { IMAGES } from '../lib/images';
import { PRODUCTS } from '../lib/theme';

// ─── Hero Section ───────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[700px] overflow-hidden bg-dark flex items-end">
      {/* Background video */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={IMAGES.img1}
        >
          <source src="/hero-diamond.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full"
        style={{ y, opacity }}
      >
        <motion.p
          className="text-[10px] font-light tracking-[0.28em] uppercase text-gold mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="w-8 h-px bg-gold" />
          Amstelveen — Est. 2024
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-display-xl font-light text-ivory leading-[0.95] mb-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Waar Elk Juweel
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-display-xl font-light italic text-gold leading-[0.95] mb-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Een Verhaal Vertelt
          </motion.h1>
        </div>

        <motion.p
          className="text-[14px] font-light text-white/60 mb-2 max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Lab-grown diamanten, met toewijding handgemaakt.
        </motion.p>
        <motion.p
          className="font-display text-[15px] italic text-white/40 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Geboren uit licht, niet uit de aarde.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <Link to="/collecties" className="btn-white-outline">
            Ontdek Collecties
          </Link>
          <Link to="/afspraak" className="btn-gold">
            Maak een Afspraak
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="w-px h-12 bg-white/20 overflow-hidden relative">
          <motion.div
            className="absolute inset-x-0 bg-gold"
            style={{ height: '50%' }}
            animate={{ top: ['-50%', '150%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <span className="text-[9px] tracking-[0.22em] uppercase text-white/30 writing-mode-vertical">Scroll</span>
      </motion.div>
    </section>
  );
}

// ─── Marquee ────────────────────────────────────────────────
function Marquee() {
  const items = ['Lab-Grown Diamanten', 'Handgemaakt in Amstelveen', 'IGI Gecertificeerd', 'Privé Showroom', 'Bespoke Ontwerp', 'Duurzaam & Ethisch'];
  const doubled = [...items, ...items];
  return (
    <div className="bg-charcoal overflow-hidden py-4 border-y border-white/5">
      <div className="marquee-track flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 px-10">
            <span className="text-[10px] font-light tracking-[0.22em] uppercase text-white/35">{item}</span>
            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Three Promises ─────────────────────────────────────────
function ThreePromises() {
  const cards = [
    { img: IMAGES.img2, title: 'Vakmanschap', desc: 'Elk stuk wordt met de hand gezet door onze meester-goudsmeden in Amstelveen.', italic: 'Perfectie in elk detail.' },
    { img: IMAGES.img5, title: 'Duurzaamheid', desc: 'Onze lab-grown diamanten zijn identiek aan gedolven stenen — zonder de ecologische voetafdruk.', italic: 'Bewuste luxe.' },
    { img: IMAGES.img9, title: 'Persoonlijk', desc: 'Van eerste schets tot eindresultaat begeleiden wij u persoonlijk door het hele creatieproces.', italic: 'Uw verhaal, ons ambacht.' },
  ];

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-16">
          <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4">Ons Ambacht</p>
          <h2 className="font-display text-display-md font-light text-charcoal">
            Drie Beloftes, <em className="italic">Één Visie</em>
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6" staggerDelay={0.12}>
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="group">
                <div className="relative overflow-hidden aspect-[3/4] mb-6">
                  <motion.img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  {/* Monogram watermark visible on hover */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                    <img src={IMAGES.logo} alt="" className="w-12 h-12 invert" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-light text-charcoal mb-2">{card.title}</h3>
                <p className="text-[13px] font-light text-mid leading-relaxed">
                  {card.desc}{' '}
                  <em className="font-display italic text-charcoal/60">{card.italic}</em>
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── Featured Collection ─────────────────────────────────────
function FeaturedCollection() {
  const featured = PRODUCTS.slice(0, 5);

  return (
    <section className="bg-stone/30 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-baseline justify-between mb-12">
          <FadeIn>
            <h2 className="font-display text-display-md font-light text-charcoal">
              De Collectie
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link to="/collecties" className="text-[10px] tracking-[0.18em] uppercase text-mid border-b border-gold pb-0.5 hover:text-charcoal transition-colors duration-300">
              Bekijk Alles →
            </Link>
          </FadeIn>
        </div>

        {/* First large card + two small */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          {/* Large card */}
          <FadeInLeft className="md:col-span-5">
            <Link to={`/collecties/${featured[0].id}`} className="group block relative overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  src={IMAGES[featured[0].imageKey as keyof typeof IMAGES]}
                  alt={featured[0].name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[9px] tracking-[0.18em] uppercase text-gold mb-1">{featured[0].category}</p>
                <h3 className="font-display text-2xl font-light italic text-ivory mb-1">{featured[0].name}</h3>
                <p className="text-[11px] font-light text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                  v.a. €{featured[0].price.toLocaleString('nl-NL')}
                </p>
              </div>
            </Link>
          </FadeInLeft>

          {/* Right column: 2 stacked */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {featured.slice(1, 3).map((p, i) => (
              <FadeIn key={p.id} delay={0.1 + i * 0.08} className="flex-1">
                <Link to={`/collecties/${p.id}`} className="group block relative overflow-hidden h-full">
                  <div className="aspect-[4/3] md:h-full overflow-hidden">
                    <motion.img
                      src={IMAGES[p.imageKey as keyof typeof IMAGES]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-xl font-light italic text-ivory">{p.name}</h3>
                    <p className="text-[10px] font-light text-gold/70">{p.metal}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Far right: 1 tall */}
          <FadeInRight className="md:col-span-3">
            <Link to={`/collecties/${featured[3].id}`} className="group block relative overflow-hidden h-full">
              <div className="aspect-[3/4] md:h-full overflow-hidden">
                <motion.img
                  src={IMAGES[featured[3].imageKey as keyof typeof IMAGES]}
                  alt={featured[3].name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[9px] tracking-[0.16em] uppercase text-gold mb-1">{featured[3].category}</p>
                <h3 className="font-display text-xl font-light italic text-ivory">{featured[3].name}</h3>
              </div>
            </Link>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}

// ─── Lab Diamond Section ─────────────────────────────────────
function LabDiamond() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="bg-dark-brown py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-gold" />
              De Wetenschap van Schittering
            </p>
            <h2 className="font-display text-display-md font-light text-ivory mb-6">
              De Schoonheid van<br />
              <em className="italic text-gold">Lab-Grown Diamanten</em>
            </h2>
            <p className="text-[15px] font-light text-white/55 leading-relaxed mb-3">
              Chemisch, fysisch en optisch identiek aan gedolven diamanten — maar gecreëerd met een fractie van de ecologische impact. Elke steen wordt met precisie gekweekt, geslepen door meester-ambachtslieden en gecertificeerd volgens de hoogste internationale standaarden.
            </p>
            <p className="font-display text-[15px] italic text-white/35 mb-10">
              Geen compromis op schittering. Geen compromis op geweten.
            </p>

            <div className="flex gap-12 mb-10">
              {[
                { val: '100%', label: 'Identiek aan gedolven' },
                { val: '70%', label: 'Minder impact op milieu' },
                { val: 'IGI', label: 'Gecertificeerd & gegradeerd' },
              ].map(stat => (
                <div key={stat.val}>
                  <div className="font-display text-3xl font-light text-ivory mb-1">{stat.val}</div>
                  <div className="text-[10px] font-light text-white/35 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link to="/diamanten" className="btn-white-outline inline-flex">
              Meer Over Lab Diamanten →
            </Link>
          </FadeInLeft>

          {/* Circular image */}
          <FadeInRight>
            <motion.div
              className="relative mx-auto"
              style={{ y: imgY }}
            >
              <div className="w-80 h-80 md:w-[420px] md:h-[420px] rounded-full overflow-hidden mx-auto relative">
                <img
                  src={IMAGES.img8}
                  alt="Lab-grown diamond"
                  className="w-full h-full object-cover scale-110"
                />
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full border-[0.5px] border-gold/30 shadow-[0_0_60px_rgba(196,168,130,0.15)] pointer-events-none" />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-[-20px] rounded-full border border-gold/10 pointer-events-none" />
            </motion.div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}

// ─── VIP Experience ──────────────────────────────────────────
function VIPExperience() {
  const cards = [
    {
      num: '01',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="3" y="4" width="18" height="18" rx="1"/><path d="M3 9h18M9 4v5M15 4v5"/>
        </svg>
      ),
      title: 'Privé Consultatie',
      desc: 'Persoonlijke afspraken in onze showroom in Amstelveen,',
      italic: 'volledig op u afgestemd.',
    },
    {
      num: '02',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M12 2l2 6 6.5 0-5 4 2 6.5L12 15l-5.5 3.5 2-6.5-5-4 6.5 0z"/>
        </svg>
      ),
      title: 'Op Maat Ontwerp',
      desc: 'Van schets tot zetting — een stuk ontworpen rondom uw visie en uw steen.',
      italic: '',
    },
    {
      num: '03',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z"/>
        </svg>
      ),
      title: 'Levenslange Service',
      desc: 'Gratis reiniging, vermaken en onderhoud voor elke DYOTA creatie,',
      italic: 'voor altijd.',
    },
  ];

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-16">
          <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4">De DYOTA Ervaring</p>
          <h2 className="font-display text-display-md font-light text-charcoal">
            Een Ervaring <em className="italic">Als Geen Ander</em>
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.1}>
          {cards.map(card => (
            <StaggerItem key={card.num}>
              <motion.div
                className="bg-stone/40 p-8 md:p-10 relative overflow-hidden group"
                whileHover={{ backgroundColor: 'rgba(232,226,217,0.7)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Background number */}
                <div className="absolute top-4 right-5 font-display text-7xl font-light text-stone leading-none pointer-events-none select-none group-hover:text-gold/20 transition-colors duration-500">
                  {card.num}
                </div>

                {/* Gold line on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="text-gold mb-6">{card.icon}</div>
                <h3 className="font-display text-2xl font-light text-charcoal mb-3">{card.title}</h3>
                <p className="text-[13px] font-light text-mid leading-relaxed">
                  {card.desc}{' '}
                  {card.italic && <em className="font-display italic text-charcoal/50">{card.italic}</em>}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── Instagram Strip ─────────────────────────────────────────
function InstagramStrip() {
  const imgs = [IMAGES.img1, IMAGES.img3, IMAGES.img4, IMAGES.img6, IMAGES.img7];
  return (
    <section className="bg-stone/20 py-16">
      <FadeIn className="text-center mb-8">
        <p className="text-[10px] tracking-[0.24em] uppercase text-mid">@dyota.diamonds</p>
      </FadeIn>
      <div className="flex gap-1 overflow-hidden">
        {imgs.map((src, i) => (
          <motion.div
            key={i}
            className="flex-1 min-w-[160px] aspect-square overflow-hidden"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Quote Banner ────────────────────────────────────────────
function QuoteBanner() {
  return (
    <section className="bg-charcoal py-20 md:py-28 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[200px] md:text-[280px] font-light text-white/[0.02] leading-none">"</span>
      </div>
      <FadeIn className="relative max-w-3xl mx-auto px-6">
        <p className="font-display text-display-sm font-light italic text-ivory leading-relaxed mb-6">
          "Wij geloven dat het mooiste sieraad het verhaal draagt van degene die het draagt."
        </p>
        <span className="text-[10px] tracking-[0.22em] uppercase text-gold">— DYOTA Amsterdam</span>
      </FadeIn>
    </section>
  );
}

// ─── Showroom CTA ────────────────────────────────────────────
function ShowroomCTA() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeInLeft>
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src={IMAGES.img6}
                alt="DYOTA Showroom"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </FadeInLeft>

          <FadeInRight>
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-gold" />
              Het Showroom
            </p>
            <h2 className="font-display text-display-md font-light text-charcoal mb-6">
              Bezoek Ons in<br />
              <em className="italic">Amstelveen</em>
            </h2>
            <p className="text-[15px] font-light text-mid leading-relaxed mb-8">
              Ons showroom is ontworpen voor één ding: u. In een stille, intieme omgeving begeleidt ons team u door elke stap — van eerste inspiratie tot het perfecte stuk. Geen haast. Alleen aandacht.
            </p>

            <div className="flex gap-12 mb-10">
              {[
                { val: 'Privé', label: 'Toegang' },
                { val: '1-op-1', label: 'Begeleiding' },
                { val: 'Op Maat', label: 'Ervaring' },
              ].map(item => (
                <div key={item.val}>
                  <div className="font-display text-xl font-light text-charcoal mb-1">{item.val}</div>
                  <div className="text-[9px] tracking-[0.16em] uppercase text-mid">{item.label}</div>
                </div>
              ))}
            </div>

            <Link to="/afspraak" className="btn-primary inline-flex">
              Reserveer Uw Bezoek
            </Link>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}

// ─── HomePage ────────────────────────────────────────────────
export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <ThreePromises />
      <FeaturedCollection />
      <LabDiamond />
      <VIPExperience />
      <InstagramStrip />
      <QuoteBanner />
      <ShowroomCTA />
    </PageTransition>
  );
}
