import { useState } from 'react';
import { Clock, MapPin, MessageCircle, Ship, ArrowRight } from 'lucide-react';
import {
  TRAVEL_ROUTES,
  RouteOriginGroup,
  TravelRoute,
  formatRupiah,
  buildWhatsAppUrl,
  buildQuickRouteMessage,
} from '../data/routes';

interface RoutePricingSectionProps {
  onSelectRouteForBooking: (routeId: string, serviceType: 'reguler' | 'carter') => void;
}

export function RoutePricingSection({ onSelectRouteForBooking }: RoutePricingSectionProps) {
  const [originFilter, setOriginFilter] = useState<RouteOriginGroup>('all');
  const [serviceMode, setServiceMode] = useState<'reguler' | 'carter'>('reguler');

  const filteredRoutes = TRAVEL_ROUTES.filter((route) => {
    if (originFilter === 'all') return true;
    return route.originGroup === originFilter;
  });

  const handleChooseForm = (route: TravelRoute) => {
    onSelectRouteForBooking(route.id, serviceMode);
    const formEl = document.getElementById('pesan-cepat');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="rute-harga" className="bg-[#FFFFFF] py-14 sm:py-20 border-b border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0369A1] mb-2">
              01. Daftar Harga &amp; Rute Resmi
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] text-balance">
              Pilihan Rute Travel &amp; Tarif Transparan
            </h2>
            <p className="text-sm sm:text-base text-[#475E75] mt-3 leading-relaxed">
              Semua rute melayani penjemputan dan pengantaran langsung ke alamat tujuan. Pilih rute Anda lalu tekan tombol WhatsApp untuk konfirmasi kursi seketika.
            </p>
          </div>

          {/* Filter & Service Mode Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Origin Filter Tabs */}
            <div
              role="group"
              aria-label="Filter kota keberangkatan"
              className="inline-flex items-center p-1 bg-[#F4EFE6] border border-[#E6DEC8] rounded-xl overflow-x-auto"
            >
              {[
                { key: 'all', label: 'Semua (6)' },
                { key: 'banyuwangi', label: 'Dari Banyuwangi' },
                { key: 'denpasar', label: 'Dari Denpasar' },
              ].map((tab) => {
                const active = originFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setOriginFilter(tab.key as RouteOriginGroup)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] ${
                      active
                        ? 'bg-[#0369A1] text-white'
                        : 'text-[#334E68] hover:text-[#0B2545]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Reguler vs Carter Mode Toggle */}
            <div
              role="group"
              aria-label="Jenis layanan"
              className="inline-flex items-center p-1 bg-[#F4EFE6] border border-[#E6DEC8] rounded-xl"
            >
              <button
                type="button"
                onClick={() => setServiceMode('reguler')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer ${
                  serviceMode === 'reguler'
                    ? 'bg-[#0B2545] text-white'
                    : 'text-[#334E68] hover:text-[#0B2545]'
                }`}
              >
                Reguler / Kursi
              </button>
              <button
                type="button"
                onClick={() => setServiceMode('carter')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer ${
                  serviceMode === 'carter'
                    ? 'bg-[#0B2545] text-white'
                    : 'text-[#334E68] hover:text-[#0B2545]'
                }`}
              >
                Carter 1 Mobil
              </button>
            </div>
          </div>
        </div>

        {/* Route Cards Grid (Responsive 1 col mobile -> 2 col tablet -> 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => {
            const activePrice =
              serviceMode === 'reguler' ? route.regularPrice : route.charterPrice;
            const waUrl = buildWhatsAppUrl(buildQuickRouteMessage(route, serviceMode));

            return (
              <article
                key={route.id}
                className="flex flex-col justify-between rounded-2xl bg-[#FAF8F4] border border-[#E6DEC8] p-6 transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div>
                  {/* Quiet 1-line text kicker (no pills) */}
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#475E75] mb-3">
                    <span>{route.categoryLabel}</span>
                    <span className="tabular-nums font-mono">{route.distance}</span>
                  </div>

                  {/* Route Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B2545] leading-snug mb-2">
                    {route.origin} <span className="text-[#0369A1]" aria-hidden="true">→</span>{' '}
                    {route.destination}
                  </h3>

                  {/* Price Callout */}
                  <div className="flex items-baseline gap-2 pb-4 mb-4 border-b border-[#E6DEC8]">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0369A1] tabular-nums">
                      {formatRupiah(activePrice)}
                    </span>
                    <span className="text-xs sm:text-sm text-[#475E75]">
                      {serviceMode === 'reguler' ? '/ penumpang' : '/ unit privat'}
                    </span>
                  </div>

                  {/* Key Route Details */}
                  <dl className="space-y-2.5 text-sm text-[#334E68] mb-5">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Estimasi Durasi &amp; Jadwal</dt>
                        <dd>
                          <span className="font-semibold text-[#0B2545]">{route.duration}</span>
                          <span className="mx-1.5 text-[#9FB3C8]" aria-hidden="true">·</span>
                          <span className="tabular-nums">{route.schedules.join(' · ')}</span>
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Area Jemput dan Antar</dt>
                        <dd className="leading-relaxed">
                          <span className="font-medium text-[#0B2545]">Jemput:</span> {route.pickupAreas}
                        </dd>
                      </div>
                    </div>

                    {route.includesFerry && (
                      <div className="flex items-start gap-2.5">
                        <Ship className="w-4 h-4 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <dt className="sr-only">Fasilitas Penyeberangan</dt>
                          <dd className="text-[#0B2545] font-medium">
                            Termasuk tiket kapal penyeberangan Selat Bali
                          </dd>
                        </div>
                      </div>
                    )}
                  </dl>

                  <p className="text-xs text-[#475E75] leading-relaxed mb-6">
                    {route.vehicleTypes} · {route.notes}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#0369A1] hover:bg-[#0B2545] rounded-xl transition-colors duration-150 min-h-[44px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Pesan WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleChooseForm(route)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#0B2545] bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#D4C8AE] rounded-xl transition-colors duration-150 min-h-[44px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                  >
                    <span>Isi Form</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Compact Summary Table for Desktop Quick Comparison */}
        <div className="mt-12 rounded-2xl border border-[#E6DEC8] bg-[#FAF8F4] overflow-hidden">
          <div className="px-6 py-4 bg-[#F4EFE6] border-b border-[#E6DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base font-bold text-[#0B2545]">
              Ringkasan Tarif Semua Rute RZR trans
            </h3>
            <p className="text-xs text-[#475E75]">
              Berlaku juga untuk rute arah sebaliknya (pulang-pergi) dengan tarif sama
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-[#E6DEC8] text-xs font-semibold text-[#475E75]">
                  <th className="py-3.5 px-6">Rute Perjalanan</th>
                  <th className="py-3.5 px-4">Jadwal Harian</th>
                  <th className="py-3.5 px-4">Tarif Reguler</th>
                  <th className="py-3.5 px-4">Tarif Carter Privat</th>
                  <th className="py-3.5 px-6 text-right">Pemesanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DEC8] text-sm">
                {TRAVEL_ROUTES.map((route) => (
                  <tr key={route.id} className="hover:bg-[#F4EFE6]/60 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#0B2545]">
                      {route.origin} → {route.destination}
                    </td>
                    <td className="py-3.5 px-4 text-[#475E75] tabular-nums">
                      {route.schedules.join(', ')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0369A1] tabular-nums">
                      {formatRupiah(route.regularPrice)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0B2545] tabular-nums">
                      {formatRupiah(route.charterPrice)}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <a
                        href={buildWhatsAppUrl(buildQuickRouteMessage(route, 'reguler'))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:text-[#0B2545] whitespace-nowrap"
                      >
                        <span>Pesan WA</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
