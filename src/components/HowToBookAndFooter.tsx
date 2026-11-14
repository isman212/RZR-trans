import { useState } from 'react';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, DISPLAY_PHONE } from '../data/routes';

const STEPS = [
  {
    step: 'Langkah 01',
    title: 'Pilih Rute & Jadwal',
    detail:
      'Tentukan rute perjalanan Anda (Banyuwangi, Denpasar, Surabaya, Malang, atau Jember) serta jadwal keberangkatan pagi, sore, atau malam.',
  },
  {
    step: 'Langkah 02',
    title: 'Kirim Lokasi via WhatsApp',
    detail:
      'Tekan tombol Pesan WhatsApp atau isi formulir pemesanan cepat. Tim admin kami di nomor 0853-3139-9699 segera mengonfirmasi kursi.',
  },
  {
    step: 'Langkah 03',
    title: 'Dijemput di Alamat Anda',
    detail:
      'Driver kami menghubungi Anda sebelum jam penjemputan dan langsung mengantar hingga titik tujuan dengan aman.',
  },
];

const FAQS = [
  {
    question: 'Apakah harga travel Banyuwangi–Bali dan Denpasar–Jawa Timur sudah termasuk tiket kapal?',
    answer:
      'Ya, seluruh rute penyeberangan Selat Bali (Banyuwangi–Bali, Denpasar–Malang, Denpasar–Surabaya, dan Denpasar–Jember) sudah mencakup tiket kapal ferry Ketapang–Gilimanuk untuk penumpang.',
  },
  {
    question: 'Apakah RZR trans melayani arah sebaliknya (pulang-pergi)?',
    answer:
      'Tentu. Seluruh 6 rute beroperasi dua arah setiap hari dengan tarif reguler maupun carter yang sama.',
  },
  {
    question: 'Bagaimana cara pembayaran tiket travel?',
    answer:
      'Anda dapat memesan kursi terlebih dahulu melalui WhatsApp 085331399699 tanpa proses rumit. Pembayaran bisa dilakukan via transfer bank atau tunai kepada driver saat penjemputan.',
  },
  {
    question: 'Berapa maksimal barang bawaan gratis per penumpang?',
    answer:
      'Setiap penumpang berhak membawa 1 koper ukuran kabin/sedang dan 1 tas jinjing tanpa biaya tambahan. Jika membawa barang lebih banyak, silakan informasikan lebih awal melalui WhatsApp.',
  },
];

export function HowToBookAndFooter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const directWaUrl = buildWhatsAppUrl(
    'Halo RZR trans, saya ingin memesan perjalanan travel. Mohon dibantu.'
  );

  return (
    <>
      {/* How to Book & FAQ Section */}
      <section id="cara-pesan" className="bg-[#FAF8F4] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#0369A1] mb-2">
              04. Cara Pemesanan &amp; Informasi
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] text-balance">
              Pesan Kursi dalam Tiga Langkah Mudah
            </h2>
          </div>

          {/* 3-Step Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-[#FFFFFF] border border-[#E6DEC8] p-6"
              >
                <p className="font-mono text-xs font-semibold text-[#0369A1] mb-2">
                  {item.step}
                </p>
                <h3 className="text-lg font-bold text-[#0B2545] mb-2">{item.title}</h3>
                <p className="text-sm text-[#475E75] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* FAQ + Direct CTA Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B2545] mb-5">
                Pertanyaan yang Sering Diajukan
              </h3>
              <div className="divide-y divide-[#E6DEC8] border-t border-b border-[#E6DEC8]">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={faq.question}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                      >
                        <span className="text-sm sm:text-base font-semibold text-[#0B2545]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#0369A1] shrink-0 transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="pb-4 text-sm text-[#475E75] leading-relaxed pr-6">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct WhatsApp Conversion Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0B2545] text-[#FAF8F4] p-7 sm:p-8">
              <p className="text-xs font-semibold text-[#7DD3FC] mb-2">
                Layanan Pelanggan 24 Jam
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 text-balance">
                Butuh Keberangkatan Hari Ini atau Carter Mendadak?
              </h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6">
                Hubungi admin RZR trans secara langsung untuk pengecekan kursi kosong, penjemputan bandara, atau permintaan jadwal khusus rombongan.
              </p>

              <div className="flex items-center gap-3 text-base font-bold text-white mb-6 tabular-nums">
                <Phone className="w-5 h-5 text-[#7DD3FC] shrink-0" aria-hidden="true" />
                <span>{DISPLAY_PHONE}</span>
              </div>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B2545] bg-[#FAF8F4] hover:bg-[#E0F2FE] rounded-xl transition-colors duration-150 min-h-[48px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="w-5 h-5 text-[#0369A1] shrink-0" aria-hidden="true" />
                <span>Chat WhatsApp Sekarang</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#071A30] text-[#CBD5E1] py-10 sm:py-12 border-t border-[#0F3B63]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <p className="text-xl font-extrabold tracking-tight text-white">
                RZR <span className="text-[#7DD3FC]">trans</span>
              </p>
              <p className="text-sm text-[#9FB3C8] mt-1">
                Travel Eksekutif Banyuwangi · Bali · Surabaya · Malang · Jember
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a href="#rute-harga" className="hover:text-white transition-colors">
                Rute &amp; Harga
              </a>
              <a href="#pesan-cepat" className="hover:text-white transition-colors">
                Formulir Pesan
              </a>
              <a href="#armada" className="hover:text-white transition-colors">
                Armada
              </a>
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7DD3FC] font-semibold hover:text-white transition-colors tabular-nums"
              >
                WhatsApp: {DISPLAY_PHONE}
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9FB3C8]">
            <p>© {new Date().getFullYear()} RZR trans. Layanan Transportasi Jawa Timur &amp; Bali.</p>
            <p>Operasional Penjemputan Setiap Hari · Pagi, Sore &amp; Malam</p>
          </div>
        </div>
      </footer>
    </>
  );
}
