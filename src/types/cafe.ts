export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'matcha' | 'pastries' | 'signatures';
  price: number; // in EGP
  description: string;
  image: string;
  notes?: string;
  origin?: string;
  tags?: string[];
  customizable?: boolean;
}

export type MenuCategory = 'all' | 'coffee' | 'matcha' | 'pastries' | 'signatures';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Atmosphere' | 'Craft' | 'Pastry' | 'Brews';
  image: string;
  caption: string;
  span?: string;
}

export interface CafeInfo {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  address: string;
  neighborhood: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  hoursWeekdays: string;
  hoursWeekends: string;
  instagram: string;
  currency: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  milk?: 'Whole' | 'Oat' | 'Almond' | 'None';
  sweetness?: 'Unsweetened' | 'Subtle (25%)' | 'Standard';
  temperature?: 'Hot' | 'Iced';
  specialInstructions?: string;
}
