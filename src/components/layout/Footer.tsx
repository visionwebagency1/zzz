import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '../../lib/images';

export default function Footer() {
  return (
    <footer className="bg-dark text-ivory">
      {/* Top divider */}
      <div className="gold-line" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-3xl font-light tracking-[0.28em] text-ivory hover:text-gold transition-colors duration-300 block mb-4">
              DYOTA
            </Link>
            <p className="text-xs font-light text-white/30 leading-relaxed tracking-wide mb-6">
              Lab-grown diamanten & fijn juwelen.<br />
              Handgemaakt in Amstelveen.<br />
              Uitsluitend op afspraak.
            </p>
            <img src={IMAGES.logo} alt="DYOTA Monogram" className="w-14 h-14 opacity-15 invert" />
          </div>

          {/* Collectie */}
          <div>
            <p className="text-[9px] font-medium tracking-[0.24em] uppercase text-gold mb-5">Collectie</p>
            <ul className="flex flex-col gap-3">
              {['Ringen', 'Oorbellen', 'Kettingen', 'Armbanden', 'Lab Diamanten'].map(item => (
                <li key={item}>
                  <Link to="/collecties" className="text-[13px] font-light text-white/35 hover:text-ivory transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom */}
          <div>
            <p className="text-[9px] font-medium tracking-[0.24em] uppercase text-gold mb-5">Showroom</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Bezoek Ons', href: '/showroom' },
                { label: 'Afspraak Maken', href: '/afspraak' },
                { label: 'Bespoke Ontwerp', href: '/afspraak' },
                { label: 'Over DYOTA', href: '/showroom' },
                { label: 'Contact', href: '/contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="text-[13px] font-light text-white/35 hover:text-ivory transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[9px] font-medium tracking-[0.24em] uppercase text-gold mb-5">Exclusieve Updates</p>
            <p className="text-[13px] font-light text-white/30 leading-relaxed mb-5">
              Previews & uitnodigingen voor privé showroom events.
            </p>
            <div className="flex border border-white/10">
              <input
                type="email"
                placeholder="Uw e-mailadres"
                className="flex-1 bg-transparent border-none px-4 py-3 text-[12px] font-light text-ivory placeholder:text-white/20 outline-none"
              />
              <button className="bg-gold px-4 text-dark text-lg hover:bg-gold-light transition-colors duration-200">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/18 tracking-wide">
            © 2026 DYOTA Amstelveen — Alle rechten voorbehouden
          </p>
          <p className="font-display text-[11px] tracking-[0.22em] text-white/18 uppercase">
            Amstelveen · By Appointment Only
          </p>
          <p className="text-[11px] text-white/18 tracking-wide">
            Est. 2024 · IGI Gecertificeerd
          </p>
        </div>
      </div>
    </footer>
  );
}
