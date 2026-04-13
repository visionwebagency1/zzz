import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition, { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/PageTransition';
import { IMAGES } from '../lib/images';
import { PRODUCTS, type Product } from '../lib/theme';

const categories = ['Alle', 'Ringen', 'Oorbellen', 'Kettingen', 'Armbanden'];

export default function CollectiesPage() {
  const [activeCategory, setActiveCategory] = useState('Alle');

  const filtered = activeCategory === 'Alle'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-ivory pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <FadeIn>
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-gold" />
              Onze Collectie
            </p>
            <h1 className="font-display text-display-lg font-light text-charcoal">
              Lab-Grown Juwelen
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 md:top-[72px] z-30 bg-ivory/95 backdrop-blur-sm border-b border-stone/60">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative text-[10px] font-light tracking-[0.18em] uppercase px-6 py-4 whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === cat ? 'text-charcoal' : 'text-mid hover:text-charcoal'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                    layoutId="filterLine"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className="bg-ivory py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to={`/collecties/${product.id}`} className="group block">
        <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-stone/20">
          <motion.img
            src={IMAGES[product.imageKey as keyof typeof IMAGES]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Tags */}
          {product.tags[0] && (
            <div className="absolute top-3 left-3">
              <span className="text-[9px] tracking-[0.14em] uppercase bg-gold text-charcoal px-2 py-1">
                {product.tags[0]}
              </span>
            </div>
          )}

          {/* View on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
            <span className="text-[10px] tracking-[0.2em] uppercase text-ivory border border-ivory/60 px-5 py-2.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
              Bekijk
            </span>
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.14em] uppercase text-gold mb-1">{product.category}</p>
          <h3 className="font-display text-lg font-light text-charcoal mb-1 group-hover:text-dark-brown transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-[12px] font-light text-mid">{product.metal}</p>
          <p className="text-[13px] font-light text-charcoal mt-1">
            v.a. €{product.price.toLocaleString('nl-NL')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
