import { ArrowRight, MessageCircle } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { buildWhatsAppUrl, DISPLAY_PHONE } from '../data/routes';
import heroCoastalImg from '../assets/images/hero_coastal_travel_1794581630658.jpg';

export function HeroSection() {
  const quickWaUrl = buildWhatsAppUrl(
    'Halo RZR trans, saya ingin memesan kursi travel. Mohon info jadwal keberangkatan hari ini.'
  );

  return (
    <section id="beranda" className="bg-[#FAF8F4] border-b border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16">
        {/* 2-Column Hero Split with balanced height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Value Proposition & Primary CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold text-[#0369A1] tracking-wide mb-3">
              Travel Eksekutif Jawa Timur &amp; Bali · Door-to-Door
            </p>

            <h1 className="text-[clamp(2.15rem,4vw,3.5rem)] font-extrabold leading-[1.12] tracking-tight text-[#0B2545] text-balance mb-5">
              Perjalanan nyaman lintas Banyuwangi, Bali, Surabaya, Malang &amp; Jember.
            </h1>

            <p className="text-base sm:text-lg text-[#334E68] leading-relaxed max-w-xl mb-8">
              Layanan antar-jemput langsung dari alamat Anda dengan armada terawat, jadwal teratur pagi hingga malam, serta konfirmasi kursi cepat tanpa perantara melalui WhatsApp{' '}
              <span className="font-semibold text-[#0B2545] tabular-nums">{DISPLAY_PHONE}</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={quickWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#0369A1] hover:bg-[#0B2545] rounded-xl transition-colors duration-150 min-h-[48px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Pesan via WhatsApp</span>
              </a>

              <a
                href="#rute-harga"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B2545] bg-[#F4EFE6] hover:bg-[#E6DEC8] border border-[#D4C8AE] rounded-xl transition-colors duration-150 min-h-[48px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
              >
                <span>Lihat Daftar Harga</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Impact 16:9 Coastal Travel Image */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#E6DEC8] bg-[#0B2545] min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]">
              <SafeImage
                src={heroCoastalImg}
                alt="Armada travel eksekutif RZR trans melintasi jalur pesisir antara Jawa Timur dan Bali"
                fallbackTitle="Armada RZR trans Lintas Jawa Timur & Bali"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071A30]/75 via-[#071A30]/15 to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                <p className="text-xs font-medium text-[#E0F2FE] mb-1">
                  Ketapang – Gilimanuk · Jalur Tol Trans Jawa
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  Berangkat setiap hari · Penjemputan langsung ke lokasi Anda
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column Service Summary Strip below the hero split */}
        <div className="mt-10 pt-8 border-t border-[#E6DEC8] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tabular-nums">6 Rute</p>
            <p className="text-sm text-[#475E75] mt-1">
              Banyuwangi, Bali, Surabaya, Malang &amp; Jember
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0369A1] tabular-nums">Rp 200 rb</p>
            <p className="text-sm text-[#475E75] mt-1">
              Tarif mulai per kursi sudah termasuk fasilitas
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tabular-nums">3 Jadwal</p>
            <p className="text-sm text-[#475E75] mt-1">
              Keberangkatan rutin pagi, sore, dan malam
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tabular-nums">24 Jam</p>
            <p className="text-sm text-[#475E75] mt-1">
              Admin WhatsApp siap melayani pemesanan cepat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
