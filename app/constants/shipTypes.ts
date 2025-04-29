export type ShipType = {
  value: string;
  label?: string;
  description?: string;
};

export const SHIP_TYPE_VALUES = [
  'yacht',
  'sailboat',
  'fishing-boat',
  'speedboat',
  'pontoon',
  'cruiser',
  'houseboat',
  'trawler',
  'bowrider',
  'catamaran',
  'custom'
] as const;

export type ShipTypeValue = typeof SHIP_TYPE_VALUES[number];

export const SHIP_TYPES: ShipType[] = SHIP_TYPE_VALUES.map(value => ({ value })); 