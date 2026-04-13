import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../../lib/images';

const links = [
  { label: 'Collecties', href: '/collecties' },
  { label: 'Showroom', href: '/showroom' },
  { label: 'Diamanten', href: '/diamanten' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = isHome
    ? scrolled ? 'bg-ivory/95 backdrop-blur-md border-b border-stone/60' : 'bg-transparent border-b border-white/0'
    : 'bg-ivory border-b border-stone/60';

  const textColor = isHome && !scrolled ? 'text-white/80' : 'text-mid';
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-charcoal';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-[72px]">

          {/* Left links */}
          <div className="hidden md:flex items-center gap-10">
            {links.slice(0, 2).map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-[10px] font-light tracking-[0.2em] uppercase transition-colors duration-300 hover:text-gold ${textColor}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link
            to="/"
            className={`font-display text-xl md:text-2xl font-light tracking-[0.28em] transition-colors duration-300 ${logoColor} absolute left-1/2 -translate-x-1/2`}
          >
            DYOTA
          </Link>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-10 ml-auto">
            {links.slice(2).map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-[10px] font-light tracking-[0.2em] uppercase transition-colors duration-300 hover:text-gold ${textColor}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/afspraak"
              className={`text-[10px] font-light tracking-[0.18em] uppercase border px-5 py-2.5 transition-all duration-300 ${
                isHome && !scrolled
                  ? 'border-white/40 text-white hover:border-gold hover:text-gold'
                  : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory'
              }`}
            >
              Afspraak
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ml-auto flex flex-col gap-[5px] p-2 ${logoColor}`}
            aria-label="Menu"
          >
            <motion.span
              className={`block w-6 h-px transition-colors duration-300 ${isHome && !scrolled ? 'bg-white' : 'bg-charcoal'}`}
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`block w-6 h-px transition-colors duration-300 ${isHome && !scrolled ? 'bg-white' : 'bg-charcoal'}`}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-6 h-px transition-colors duration-300 ${isHome && !scrolled ? 'bg-white' : 'bg-charcoal'}`}
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-dark flex flex-col justify-center items-center"
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="text-center flex flex-col gap-8">
              {[...links, { label: 'Afspraak', href: '/afspraak' }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  <Link
                    to={link.href}
                    className="font-display text-4xl font-light text-ivory hover:text-gold transition-colors duration-300 tracking-wider"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="absolute bottom-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <img src={IMAGES.logo} alt="DYOTA" className="w-16 h-16 mx-auto opacity-20 invert" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
