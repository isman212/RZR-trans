import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/routes';

const GENERAL_WA_URL = buildWhatsAppUrl(
  'Halo RZR trans, saya ingin menanyakan jadwal dan memesan travel. Mohon informasinya.'
);

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#rute-harga', label: 'Rute & Harga' },
    { href: '#pesan-cepat', label: 'Form Pesan' },
    { href: '#armada', label: 'Armada' },
    { href: '#cara-pesan', label: 'Cara Pesan' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#beranda"
          className="text-xl font-extrabold tracking-tight text-[#0B2545] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0369A1] rounded-sm"
        >
          RZR <span className="text-[#0369A1]">trans</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#334E68]"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#0369A1] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#0369A1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0369A1]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={GENERAL_WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#0369A1] hover:bg-[#0B2545] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
          >
            Pesan Travel
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#0B2545] hover:bg-[#F4EFE6] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E6DEC8] bg-[#FAF8F4] px-4 py-4 space-y-2">
          <nav aria-label="Navigasi seluler" className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium text-[#0B2545] hover:bg-[#F4EFE6] hover:text-[#0369A1] transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E6DEC8]">
            <a
              href={GENERAL_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-[#0369A1] hover:bg-[#0B2545] rounded-lg transition-colors min-h-[44px]"
            >
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
