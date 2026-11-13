import { SafeImage } from './SafeImage';
import fleetInteriorImg from '../assets/images/fleet_executive_interior_1794581630978.jpg';
import baliStraitImg from '../assets/images/route_bali_strait_1794581631423.jpg';

const SERVICE_STANDARDS = [
  {
    index: '01.',
    title: 'Penjemputan Langsung Door-to-Door',
    description:
      'Anda tidak perlu repot datang ke terminal atau pool. Driver RZR trans menjemput langsung dari rumah, hotel, kampus, stasiun, atau bandara sesuai titik yang disepakati.',
  },
  {
    index: '02.',
    title: 'Kabin Nyaman & Armada Terawat',
    description:
      'Menggunakan unit Toyota Hiace Premio, Hiace Commuter, dan Innova Reborn dengan AC merata, kursi reclining bersih, serta ruang bagasi yang memadai untuk perjalanan jarak jauh.',
  },
  {
    index: '03.',
    title: 'Lintas Selat Bali Tanpa Ribet',
    description:
      'Untuk seluruh rute Banyuwangi–Bali dan Denpasar–Jawa Timur, tiket kapal penyeberangan Ketapang–Gilimanuk sudah diurus tim kami dalam satu harga transparan.',
  },
  {
    index: '04.',
    title: 'Driver Berpengalaman & Ramah',
    description:
      'Pengemudi menguasai rute Pantura, Tol Trans Jawa, jalur selatan Jember–Malang, hingga area Denpasar dan Kuta demi ketepatan waktu serta keamanan perjalanan.',
  },
];

export function FleetAndBenefitsSection() {
  return (
    <section id="armada" className="bg-[#FFFFFF] py-14 sm:py-20 border-b border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-[#0369A1] mb-2">
            03. Armada &amp; Standar Layanan
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] text-balance">
            Kenyamanan Perjalanan dari Jawa Timur Hingga Pulau Dewata
          </h2>
        </div>

        {/* Asymmetric Visual Showcase + Numbered Editorial Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Visual Column: 2 Stacked Editorial Photos */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border border-[#E6DEC8] bg-[#FAF8F4]">
              <div className="aspect-[4/3] overflow-hidden">
                <SafeImage
                  src={fleetInteriorImg}
                  alt="Interior kabin eksekutif RZR trans dengan kursi kulit warna cream yang nyaman dan luas"
                  fallbackTitle="Interior Kabin Eksekutif RZR trans"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-[#0369A1] mb-1">
                  Hiace Premio · Innova Reborn
                </p>
                <p className="text-sm font-semibold text-[#0B2545]">
                  Kabin bersih, kursi ergonomis, dan pendingin udara sejuk sepanjang rute.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E6DEC8] bg-[#FAF8F4]">
              <div className="aspect-[4/3] overflow-hidden">
                <SafeImage
                  src={baliStraitImg}
                  alt="Penyeberangan Selat Bali antara Pelabuhan Ketapang Banyuwangi dan Gilimanuk Bali"
                  fallbackTitle="Penyeberangan Ketapang – Gilimanuk"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-[#0369A1] mb-1">
                  Ketapang – Gilimanuk
                </p>
                <p className="text-sm font-semibold text-[#0B2545]">
                  Tiket kapal penyeberangan Jawa–Bali sudah termasuk pada tarif rute lintas pulau.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Column: Clean Numbered Standards */}
          <div className="lg:col-span-7 flex flex-col justify-between divide-y divide-[#E6DEC8] border-t border-b border-[#E6DEC8]">
            {SERVICE_STANDARDS.map((item) => (
              <div key={item.index} className="py-6 sm:py-8 first:pt-6 last:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
                  <span className="font-mono text-sm font-semibold text-[#0369A1] tabular-nums shrink-0">
                    {item.index}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#475E75] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
