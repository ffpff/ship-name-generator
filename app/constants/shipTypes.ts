export type ShipType = {
  value: string;
  label: string;
  description: string;
};

export const SHIP_TYPES: ShipType[] = [
  { value: 'yacht', label: 'Yacht', description: 'Luxury recreational vessel' },
  { value: 'sailboat', label: 'Sailboat', description: 'Wind-powered vessel for recreation' },
  { value: 'fishing-boat', label: 'Fishing Boat', description: 'Commercial or recreational fishing vessel' },
  { value: 'speedboat', label: 'Speedboat', description: 'High-performance recreational boat' },
  { value: 'pontoon', label: 'Pontoon', description: 'Flat-bottomed recreational boat' },
  { value: 'cruiser', label: 'Cruiser', description: 'Comfortable long-distance vessel' },
  { value: 'houseboat', label: 'Houseboat', description: 'Live-aboard watercraft' },
  { value: 'trawler', label: 'Trawler', description: 'Long-range displacement vessel' },
  { value: 'bowrider', label: 'Bowrider', description: 'Family-friendly day boat' },
  { value: 'catamaran', label: 'Catamaran', description: 'Dual-hull stable vessel' },
  { value: 'custom', label: 'Custom', description: 'Enter your own ship type' }
]; 