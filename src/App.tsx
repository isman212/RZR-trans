import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoutePricingSection } from './components/RoutePricingSection';
import { QuickBookingSection } from './components/QuickBookingSection';
import { FleetAndBenefitsSection } from './components/FleetAndBenefitsSection';
import { HowToBookAndFooter } from './components/HowToBookAndFooter';
import { TRAVEL_ROUTES } from './data/routes';

export default function App() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(TRAVEL_ROUTES[0].id);
  const [selectedServiceType, setSelectedServiceType] = useState<'reguler' | 'carter'>('reguler');

  const handleSelectRouteForBooking = (
    routeId: string,
    serviceType: 'reguler' | 'carter'
  ) => {
    setSelectedRouteId(routeId);
    setSelectedServiceType(serviceType);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#0B2545]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <RoutePricingSection onSelectRouteForBooking={handleSelectRouteForBooking} />
        <QuickBookingSection
          selectedRouteId={selectedRouteId}
          selectedServiceType={selectedServiceType}
        />
        <FleetAndBenefitsSection />
      </main>
      <HowToBookAndFooter />
    </div>
  );
}
