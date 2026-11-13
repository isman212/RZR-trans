export type RouteOriginGroup = 'all' | 'banyuwangi' | 'denpasar';

export interface TravelRoute {
  id: string;
  origin: string;
  destination: string;
  originGroup: 'banyuwangi' | 'denpasar';
  categoryLabel: string;
  regularPrice: number;
  charterPrice: number;
  duration: string;
  distance: string;
  schedules: string[];
  vehicleTypes: string;
  includesFerry: boolean;
  pickupAreas: string;
  dropoffAreas: string;
  notes: string;
}

export const WHATSAPP_NUMBER = '6285331399699';
export const DISPLAY_PHONE = '0853-3139-9699';
export const RAW_PHONE = '085331399699';

export const TRAVEL_ROUTES: TravelRoute[] = [
  {
    id: 'banyuwangi-bali',
    origin: 'Banyuwangi',
    destination: 'Bali (Denpasar / Kuta / Bandara)',
    originGroup: 'banyuwangi',
    categoryLabel: 'Lintas Selat Bali',
    regularPrice: 200000,
    charterPrice: 1200000,
    duration: '4 – 5 jam',
    distance: '145 km',
    schedules: ['06:00 WIB', '13:00 WIB', '20:00 WIB'],
    vehicleTypes: 'Hiace Premio · Innova Reborn',
    includesFerry: true,
    pickupAreas: 'Kota Banyuwangi, Rogojampi, Genteng, Ketapang',
    dropoffAreas: 'Denpasar, Kuta, Seminyak, Bandara Ngurah Rai, Sanur',
    notes: 'Sudah termasuk tiket kapal penyeberangan Ketapang–Gilimanuk.',
  },
  {
    id: 'banyuwangi-surabaya',
    origin: 'Banyuwangi',
    destination: 'Surabaya (Kota / Bandara Juanda)',
    originGroup: 'banyuwangi',
    categoryLabel: 'Jalur Pantura / Tol',
    regularPrice: 220000,
    charterPrice: 1350000,
    duration: '6 – 7 jam',
    distance: '290 km',
    schedules: ['07:00 WIB', '16:00 WIB', '21:00 WIB'],
    vehicleTypes: 'Hiace Commuter · Innova Reborn',
    includesFerry: false,
    pickupAreas: 'Kota Banyuwangi, Kalibaru, Glenmore, Genteng, Srono',
    dropoffAreas: 'Surabaya Pusat, Bandara Juanda, Stasiun Gubeng, Tanjung Perak',
    notes: 'Akses tol Probolinggo–Surabaya untuk perjalanan lebih cepat.',
  },
  {
    id: 'banyuwangi-malang',
    origin: 'Banyuwangi',
    destination: 'Malang (Kota / Batu)',
    originGroup: 'banyuwangi',
    categoryLabel: 'Jalur Selatan / Tol',
    regularPrice: 230000,
    charterPrice: 1400000,
    duration: '6 – 7 jam',
    distance: '285 km',
    schedules: ['07:00 WIB', '15:00 WIB', '20:30 WIB'],
    vehicleTypes: 'Innova Reborn · Hiace Executive',
    includesFerry: false,
    pickupAreas: 'Kota Banyuwangi, Jajag, Genteng, Kalibaru, Muncar',
    dropoffAreas: 'Kota Malang, Terminal Arjosari, Kampus UB/UM, Kota Batu',
    notes: 'Antar-jemput langsung ke alamat rumah, hotel, atau area kampus.',
  },
  {
    id: 'denpasar-malang',
    origin: 'Denpasar',
    destination: 'Malang (Kota / Batu)',
    originGroup: 'denpasar',
    categoryLabel: 'Lintas Pulau · Tol',
    regularPrice: 320000,
    charterPrice: 1950000,
    duration: '9 – 11 jam',
    distance: '410 km',
    schedules: ['09:00 WITA', '17:00 WITA', '20:00 WITA'],
    vehicleTypes: 'Hiace Premio · Innova Zenix',
    includesFerry: true,
    pickupAreas: 'Denpasar, Kuta, Canggu, Jimbaran, Nusa Dua, Gianyar',
    dropoffAreas: 'Kota Malang, Sawojajar, Soekarno-Hatta, Batu',
    notes: 'Sudah termasuk tiket ferry Gilimanuk–Ketapang dan air mineral.',
  },
  {
    id: 'denpasar-surabaya',
    origin: 'Denpasar',
    destination: 'Surabaya (Kota / Bandara Juanda)',
    originGroup: 'denpasar',
    categoryLabel: 'Lintas Pulau · Tol',
    regularPrice: 300000,
    charterPrice: 1850000,
    duration: '9 – 10 jam',
    distance: '415 km',
    schedules: ['08:00 WITA', '16:00 WITA', '19:30 WITA'],
    vehicleTypes: 'Hiace Premio · Innova Reborn',
    includesFerry: true,
    pickupAreas: 'Denpasar, Badung, Sanur, Bandara Ngurah Rai, Tabanan',
    dropoffAreas: 'Surabaya Kota, Sidoarjo, Bandara Juanda T1/T2',
    notes: 'Sudah termasuk tiket penyeberangan serta istirahat makan 1x.',
  },
  {
    id: 'denpasar-jember',
    origin: 'Denpasar',
    destination: 'Jember (Kota / Ambulu)',
    originGroup: 'denpasar',
    categoryLabel: 'Lintas Selat Bali',
    regularPrice: 250000,
    charterPrice: 1550000,
    duration: '6 – 7 jam',
    distance: '245 km',
    schedules: ['09:00 WITA', '15:00 WITA', '20:00 WITA'],
    vehicleTypes: 'Innova Reborn · Avanza Veloz',
    includesFerry: true,
    pickupAreas: 'Denpasar, Kuta, Mengwi, Tabanan, Negara',
    dropoffAreas: 'Jember Kota, Sumbersari, Kaliwates, Kampus UNEJ, Tanggul',
    notes: 'Sudah termasuk tiket penyeberangan Gilimanuk–Ketapang.',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildQuickRouteMessage(
  route: TravelRoute,
  serviceType: 'reguler' | 'carter' = 'reguler'
): string {
  const price =
    serviceType === 'reguler'
      ? `${formatRupiah(route.regularPrice)} / kursi`
      : `${formatRupiah(route.charterPrice)} (Carter Privat 1 Mobil)`;

  return [
    `Halo RZR trans, saya ingin memesan perjalanan travel:`,
    ``,
    `• Rute: ${route.origin} → ${route.destination}`,
    `• Layanan: ${serviceType === 'reguler' ? 'Travel Reguler' : 'Carter Privat'}`,
    `• Estimasi Tarif: ${price}`,
    ``,
    `Mohon info ketersediaan kursi untuk keberangkatan terdekat. Terima kasih.`,
  ].join('\n');
}
