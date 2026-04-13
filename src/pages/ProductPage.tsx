import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition, { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '../components/ui/PageTransition';
import { IMAGES } from '../lib/images';
import { PRODUCTS } from '../lib/theme';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <p className="font-display text-2xl text-charcoal mb-4">Product niet gevonden</p>
          <Link to="/collecties" className="btn-primary">Terug naar collectie</Link>
        </div>
      </div>
    );
  }

  const related = PRODUCTS.filter(p => p.id !== id && p.category === product.category).slice(0, 3);
  const tabs = ['Beschrijving', 'Details', 'Verzending', 'Certificaat'];

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          {/* Breadcrumb */}
          <FadeIn className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase text-mid mb-10">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collecties" className="hover:text-gold transition-colors">Collecties</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">

            {/* Image */}
            <FadeInLeft>
              <div className="relative overflow-hidden aspect-[3/4] bg-stone/20">
                <motion.img
                  src={IMAGES[product.imageKey as keyof typeof IMAGES]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                {product.tags[0] && (
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] tracking-[0.14em] uppercase bg-gold text-charcoal px-2 py-1">
                      {product.tags[0]}
                    </span>
                  </div>
                )}
              </div>
            </FadeInLeft>

            {/* Info */}
            <FadeInRight className="flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-2">{product.category}</p>
              <h1 className="font-display text-display-md font-light text-charcoal mb-2">{product.name}</h1>
              <p className="font-display text-lg italic text-mid mb-6">{product.subtitle}</p>

              {/* Price */}
              <div className="mb-8">
                <p className="font-display text-3xl font-light text-charcoal">
                  €{product.price.toLocaleString('nl-NL')}
                </p>
                <p className="text-[11px] text-mid mt-1">Incl. IGI certificaat & luxe verpakking</p>
              </div>

              {/* Metal badge */}
              <div className="flex gap-3 mb-8">
                {['Wit Goud 18k', 'Geel Goud 18k', 'Rosé Goud 18k'].map(m => (
                  <button
                    key={m}
                    className={`text-[10px] tracking-[0.12em] uppercase border px-3 py-2 transition-all duration-300 ${
                      product.metal.includes(m.split(' ')[0])
                        ? 'border-charcoal text-charcoal bg-stone/30'
                        : 'border-stone text-mid hover:border-gold hover:text-gold'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-3 mb-8">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary relative overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}>
                        ✓ Toegevoegd
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}>
                        Voeg toe aan winkelwagen
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <Link to="/afspraak" className="btn-ghost px-5">
                  Afspraak
                </Link>
              </div>

              {/* Tabs */}
              <div className="border-t border-stone">
                <div className="flex gap-0">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      className={`relative text-[10px] tracking-[0.14em] uppercase py-3 px-4 transition-colors duration-300 ${
                        activeTab === i ? 'text-charcoal' : 'text-mid hover:text-charcoal'
                      }`}
                    >
                      {tab}
                      {activeTab === i && (
                        <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-px bg-gold" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    className="py-5"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 0 && (
                      <p className="text-[14px] font-light text-mid leading-relaxed">{product.description}</p>
                    )}
                    {activeTab === 1 && (
                      <ul className="flex flex-col gap-2">
                        {product.details.map(d => (
                          <li key={d} className="flex items-center gap-3 text-[13px] font-light text-mid">
                            <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 2 && (
                      <p className="text-[14px] font-light text-mid leading-relaxed">
                        Gratis bezorging in Nederland en België. Verwerkingstijd 2–5 werkdagen voor bestaande stukken. Bespoke orders 3–6 weken. Veilig verzonden in DYOTA luxeverpakking.
                      </p>
                    )}
                    {activeTab === 3 && (
                      <p className="text-[14px] font-light text-mid leading-relaxed">
                        Elk stuk wordt geleverd met een officieel IGI certificaat dat de kwaliteit, afmetingen en authenticiteit van uw lab-grown diamant bevestigt.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Trust badges */}
              <div className="flex gap-6 mt-4 pt-5 border-t border-stone/60">
                {['IGI Gecertificeerd', 'Gratis Bezorging', 'Levenslang Onderhoud'].map(badge => (
                  <div key={badge} className="flex items-center gap-2">
                    <span className="text-gold text-xs">✓</span>
                    <span className="text-[10px] tracking-[0.1em] text-mid">{badge}</span>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="bg-stone/30 py-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <FadeIn className="mb-10">
                <h2 className="font-display text-display-sm font-light text-charcoal">
                  U vindt misschien ook <em className="italic">mooi</em>
                </h2>
              </FadeIn>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
                {related.map(p => (
                  <StaggerItem key={p.id}>
                    <Link to={`/collecties/${p.id}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden bg-stone/20 mb-4">
                        <motion.img
                          src={IMAGES[p.imageKey as keyof typeof IMAGES]}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7 }}
                        />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-gold mb-1">{p.category}</p>
                      <h3 className="font-display text-xl font-light text-charcoal">{p.name}</h3>
                      <p className="text-[13px] text-mid mt-1">€{p.price.toLocaleString('nl-NL')}</p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
