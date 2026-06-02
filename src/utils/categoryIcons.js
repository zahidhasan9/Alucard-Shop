import {
  AirVent,
  BatteryCharging,
  Utensils,
  Camera,
  Tablet,
  Tv,
  Refrigerator,
  Smartphone,
  Cable,
  HardDrive,
  Scissors,
  Watch,
  Headphones,
  Gamepad2,
  Monitor,
  Laptop,
  Cpu,
  Router,
  Printer,
  Shirt,
  Sparkles,
  Baby,
  ShoppingBag,
  Gift,
  Home,
  Package,
} from 'lucide-react';

export const CATEGORY_ICONS = {
  // Star Tech Featured Category style
  'air-vent': AirVent,
  'battery-charging': BatteryCharging,
  utensils: Utensils,

  // Drone icon unavailable in your current lucide-react version.
  // So we use Camera as safe replacement.
  drone: Camera,

  camera: Camera,
  tablet: Tablet,
  tv: Tv,
  refrigerator: Refrigerator,
  smartphone: Smartphone,
  cable: Cable,
  'hard-drive': HardDrive,
  scissors: Scissors,
  watch: Watch,
  headphones: Headphones,
  gamepad: Gamepad2,

  // General ecommerce
  monitor: Monitor,
  laptop: Laptop,
  cpu: Cpu,
  router: Router,
  printer: Printer,
  shirt: Shirt,
  sparkles: Sparkles,
  baby: Baby,
  'shopping-bag': ShoppingBag,
  gift: Gift,
  home: Home,
  package: Package,
};

const normalizeText = (value = '') => {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .trim();
};

const ICON_RULES = [
  {
    iconKey: 'air-vent',
    keywords: ['ac', 'air conditioner', 'air conditioning'],
  },
  {
    iconKey: 'battery-charging',
    keywords: ['portable power station', 'power station', 'ups', 'power bank'],
  },
  {
    iconKey: 'utensils',
    keywords: ['air fryer', 'oven', 'kitchen', 'cooker'],
  },
  {
    iconKey: 'drone',
    keywords: ['drone'],
  },
  {
    iconKey: 'camera',
    keywords: ['gimbal', 'wifi camera', 'camera', 'cctv', 'ip camera'],
  },
  {
    iconKey: 'tablet',
    keywords: ['tablet pc', 'tab', 'tablet', 'ipad'],
  },
  {
    iconKey: 'tv',
    keywords: ['tv', 'television'],
  },
  {
    iconKey: 'refrigerator',
    keywords: ['fridge', 'refrigerator'],
  },
  {
    iconKey: 'smartphone',
    keywords: ['mobile phone', 'smartphone', 'phone', 'mobile'],
  },
  {
    iconKey: 'cable',
    keywords: ['mobile accessories', 'accessories', 'charger', 'cable'],
  },
  {
    iconKey: 'hard-drive',
    keywords: ['portable ssd', 'ssd', 'hard disk', 'hdd', 'storage'],
  },
  {
    iconKey: 'scissors',
    keywords: ['trimmer', 'grooming'],
  },
  {
    iconKey: 'watch',
    keywords: ['smart watch', 'smartwatch', 'watch'],
  },
  {
    iconKey: 'headphones',
    keywords: ['earbuds', 'earphone', 'headphone', 'audio'],
  },
  {
    iconKey: 'gamepad',
    keywords: ['gaming console', 'console', 'gaming', 'game'],
  },
  {
    iconKey: 'monitor',
    keywords: ['desktop', 'desktop pc', 'pc', 'computer'],
  },
  {
    iconKey: 'laptop',
    keywords: ['laptop', 'notebook'],
  },
  {
    iconKey: 'cpu',
    keywords: ['component', 'processor', 'motherboard', 'graphics card', 'ram'],
  },
  {
    iconKey: 'router',
    keywords: ['router', 'network', 'networking'],
  },
  {
    iconKey: 'printer',
    keywords: ['printer', 'scanner', 'office equipment'],
  },
  {
    iconKey: 'shirt',
    keywords: ['men', 'shirt'],
  },
  {
    iconKey: 'sparkles',
    keywords: ['women', 'beauty'],
  },
  {
    iconKey: 'baby',
    keywords: ['baby', 'kids', 'child'],
  },
  {
    iconKey: 'gift',
    keywords: ['gift', 'gifts'],
  },
  {
    iconKey: 'home',
    keywords: ['home appliance', 'home appliances', 'home'],
  },
  {
    iconKey: 'shopping-bag',
    keywords: ['fashion', 'shopping', 'bag'],
  },
];

export const getCategoryIcon = (category) => {
  const iconKey = normalizeText(category?.iconKey);

  if (iconKey && CATEGORY_ICONS[iconKey]) {
    return CATEGORY_ICONS[iconKey];
  }

  const searchableText = normalizeText(
    `${category?.name || ''} ${category?.slug || ''}`
  );

  const matchedRule = ICON_RULES.find((rule) =>
    rule.keywords.some((keyword) => searchableText.includes(keyword))
  );

  if (matchedRule && CATEGORY_ICONS[matchedRule.iconKey]) {
    return CATEGORY_ICONS[matchedRule.iconKey];
  }

  return ShoppingBag;
};