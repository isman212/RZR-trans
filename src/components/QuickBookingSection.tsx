import { useEffect, useMemo, useState, MouseEvent } from 'react';
import { Check, Copy, MessageCircle, AlertCircle } from 'lucide-react';
import {
  TRAVEL_ROUTES,
  DISPLAY_PHONE,
  formatRupiah,
  buildWhatsAppUrl,
} from '../data/routes';

interface QuickBookingSectionProps {
  selectedRouteId: string;
  selectedServiceType: 'reguler' | 'carter';
}

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function QuickBookingSection({
  selectedRouteId,
  selectedServiceType,
}: QuickBookingSectionProps) {
  const [routeId, setRouteId] = useState<string>(selectedRouteId);
  const [reverseDirection, setReverseDirection] = useState<boolean>(false);
  const [serviceType, setServiceType] = useState<'reguler' | 'carter'>(selectedServiceType);
  const [departureDate, setDepartureDate] = useState<string>(getTodayIso);
  const [schedule, setSchedule] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [dropoffAddress, setDropoffAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const activeRoute = useMemo(
    () => TRAVEL_ROUTES.find((r) => r.id === routeId) || TRAVEL_ROUTES[0],
    [routeId]
  );

  useEffect(() => {
    setRouteId(selectedRouteId);
  }, [selectedRouteId]);

  useEffect(() => {
    setServiceType(selectedServiceType);
  }, [selectedServiceType]);

  useEffect(() => {
    setSchedule(activeRoute.schedules[0]);
  }, [activeRoute]);

  const routeDisplay = reverseDirection
    ? `${activeRoute.destination} → ${activeRoute.origin}`
    : `${activeRoute.origin} → ${activeRoute.destination}`;

  const estimatedTotal =
    serviceType === 'reguler'
      ? activeRoute.regularPrice * passengers
      : activeRoute.charterPrice;

  const formattedMessage = useMemo(() => {
    const layananLabel =
      serviceType === 'reguler'
        ? `Travel Reguler (${passengers} kursi)`
        : `Carter Privat 1 Mobil (${passengers} penumpang)`;

    return [
      `Halo RZR trans, saya ingin memesan perjalanan travel:`,
      ``,
      `• Nama Pemesan: ${customerName.trim() || '-'}`,
      `• Rute: ${routeDisplay}`,
      `• Layanan: ${layananLabel}`,
      `• Tanggal Berangkat: ${departureDate || '-'}`,
      `• Jadwal Pilihan: ${schedule || activeRoute.schedules[0]}`,
      `• Alamat Jemput: ${pickupAddress.trim() || '-'}`,
      `• Alamat Tujuan: ${dropoffAddress.trim() || '-'}`,
      `• Estimasi Tarif: ${formatRupiah(estimatedTotal)}`,
      notes.trim() ? `• Catatan Tambahan: ${notes.trim()}` : '',
      ``,
      `Mohon konfirmasi ketersediaan kursi dan penjemputan. Terima kasih.`,
    ]
      .filter(Boolean)
      .join('\n');
  }, [
    customerName,
    routeDisplay,
    serviceType,
    passengers,
    departureDate,
    schedule,
    activeRoute.schedules,
    pickupAddress,
    dropoffAddress,
    estimatedTotal,
    notes,
  ]);

  const waUrl = buildWhatsAppUrl(formattedMessage);

  const validateForm = (): boolean => {
    if (!customerName.trim()) {
      setErrorMsg('Mohon isi nama pemesan terlebih dahulu.');
      return false;
    }
    if (!departureDate) {
      setErrorMsg('Mohon pilih tanggal keberangkatan.');
      return false;
    }
    if (!pickupAddress.trim()) {
      setErrorMsg('Mohon isi alamat penjemputan agar driver dapat menjangkau lokasi Anda.');
      return false;
    }
    if (!dropoffAddress.trim()) {
      setErrorMsg('Mohon isi alamat atau area tujuan pengantaran.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleWhatsAppClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  };

  const handleCopyMessage = async () => {
    if (!validateForm()) return;
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setErrorMsg('Gagal menyalin otomatis. Silakan langsung klik tombol Pesan via WhatsApp.');
    }
  };

  return (
    <section id="pesan-cepat" className="bg-[#FAF8F4] py-14 sm:py-20 border-b border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side: Guidance & Live Price Summary */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-[#0369A1] mb-2">
              02. Formulir Pemesanan Cepat
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B2545] text-balance mb-4">
              Pesan Kursi Langsung ke WhatsApp Admin
            </h2>
            <p className="text-sm sm:text-base text-[#475E75] leading-relaxed mb-8">
              Lengkapi data penjemputan di samping untuk menghitung estimasi biaya dan mengirim format pesanan otomatis ke WhatsApp resmi RZR trans ({DISPLAY_PHONE}).
            </p>

            {/* Ocean Navy Summary Card */}
            <div className="rounded-2xl bg-[#0B2545] text-[#FAF8F4] p-6 sm:p-7">
              <p className="text-xs font-semibold text-[#7DD3FC] mb-2">
                Ringkasan Estimasi Perjalanan
              </p>
              <p className="text-lg sm:text-xl font-bold leading-snug mb-4">
                {routeDisplay}
              </p>

              <dl className="space-y-3 text-sm border-t border-white/15 pt-4 mb-6">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#CBD5E1]">Jenis Layanan</dt>
                  <dd className="font-semibold text-white">
                    {serviceType === 'reguler' ? 'Travel Reguler' : 'Carter Privat'}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#CBD5E1]">Jumlah Penumpang</dt>
                  <dd className="font-semibold text-white tabular-nums">
                    {passengers} Orang
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#CBD5E1]">Jadwal &amp; Durasi</dt>
                  <dd className="font-semibold text-white tabular-nums">
                    {schedule || activeRoute.schedules[0]} · {activeRoute.duration}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/15">
                  <dt className="text-[#E0F2FE] font-medium">Estimasi Total</dt>
                  <dd className="text-2xl font-extrabold text-[#7DD3FC] tabular-nums">
                    {formatRupiah(estimatedTotal)}
                  </dd>
                </div>
              </dl>

              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {activeRoute.includesFerry
                  ? 'Sudah termasuk biaya penyeberangan kapal ferry Ketapang–Gilimanuk.'
                  : 'Tarif per kursi transparan. Pembayaran dapat dilakukan saat penjemputan atau transfer.'}
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl bg-[#FFFFFF] border border-[#E6DEC8] p-6 sm:p-8 space-y-5"
            >
              {/* Route & Direction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-route"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Pilih Rute Utama
                  </label>
                  <select
                    id="booking-route"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm font-medium text-[#0B2545] focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                  >
                    {TRAVEL_ROUTES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.origin} → {r.destination}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="booking-direction"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Arah Perjalanan
                  </label>
                  <select
                    id="booking-direction"
                    value={reverseDirection ? 'reverse' : 'normal'}
                    onChange={(e) => setReverseDirection(e.target.value === 'reverse')}
                    className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm font-medium text-[#0B2545] focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                  >
                    <option value="normal">
                      {activeRoute.origin} → {activeRoute.destination.split(' ')[0]}
                    </option>
                    <option value="reverse">
                      {activeRoute.destination.split(' ')[0]} → {activeRoute.origin} (Sebaliknya)
                    </option>
                  </select>
                </div>
              </div>

              {/* Service Type & Passenger Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm font-semibold text-[#0B2545] mb-1.5">
                    Pilihan Layanan
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setServiceType('reguler')}
                      className={`px-3 py-2.5 rounded-xl text-sm font-semibold border transition-colors min-h-[46px] cursor-pointer ${
                        serviceType === 'reguler'
                          ? 'bg-[#0369A1] text-white border-[#0369A1]'
                          : 'bg-[#FAF8F4] text-[#334E68] border-[#D4C8AE] hover:border-[#0369A1]'
                      }`}
                    >
                      Reguler
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('carter')}
                      className={`px-3 py-2.5 rounded-xl text-sm font-semibold border transition-colors min-h-[46px] cursor-pointer ${
                        serviceType === 'carter'
                          ? 'bg-[#0369A1] text-white border-[#0369A1]'
                          : 'bg-[#FAF8F4] text-[#334E68] border-[#D4C8AE] hover:border-[#0369A1]'
                      }`}
                    >
                      Carter Privat
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-passengers"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Jumlah Penumpang
                  </label>
                  <select
                    id="booking-passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm font-medium text-[#0B2545] tabular-nums focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>
                        {num} Penumpang
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Tanggal Berangkat
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={getTodayIso()}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm font-medium text-[#0B2545] tabular-nums focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-schedule"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Jam Keberangkatan
                  </label>
                  <select
                    id="booking-schedule"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm font-medium text-[#0B2545] tabular-nums focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                  >
                    {activeRoute.schedules.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                    <option value="Fleksibel (Sesuai Kesepakatan Admin)">
                      Fleksibel (Konsultasi Admin)
                    </option>
                  </select>
                </div>
              </div>

              {/* Passenger Name */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                >
                  Nama Pemesan
                </label>
                <input
                  id="booking-name"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#0B2545] placeholder:text-[#7B8FA3] focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                />
              </div>

              {/* Pickup & Dropoff Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-pickup"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Alamat Jemput
                  </label>
                  <input
                    id="booking-pickup"
                    type="text"
                    placeholder="Jalan, Kelurahan, Kecamatan / Hotel"
                    value={pickupAddress}
                    onChange={(e) => {
                      setPickupAddress(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#0B2545] placeholder:text-[#7B8FA3] focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-dropoff"
                    className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                  >
                    Alamat Tujuan
                  </label>
                  <input
                    id="booking-dropoff"
                    type="text"
                    placeholder="Tujuan akhir / Bandara / Stasiun"
                    value={dropoffAddress}
                    onChange={(e) => {
                      setDropoffAddress(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#0B2545] placeholder:text-[#7B8FA3] focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                  />
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-sm font-semibold text-[#0B2545] mb-1.5"
                >
                  Catatan Tambahan <span className="font-normal text-[#475E75]">(Opsional)</span>
                </label>
                <input
                  id="booking-notes"
                  type="text"
                  placeholder="Contoh: Bawa 2 koper besar, jemput depan lobi"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-[#D4C8AE] bg-[#FAF8F4] px-3.5 py-3 text-sm text-[#0B2545] placeholder:text-[#7B8FA3] focus:border-[#0369A1] focus:outline-none min-h-[46px]"
                />
              </div>

              {/* Inline Validation Feedback */}
              {errorMsg && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#991B1B]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#0369A1] hover:bg-[#0B2545] rounded-xl transition-colors duration-150 min-h-[48px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Kirim Pesanan ke WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#0B2545] bg-[#FAF8F4] hover:bg-[#F4EFE6] border border-[#D4C8AE] rounded-xl transition-colors duration-150 min-h-[48px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Salin Format</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
