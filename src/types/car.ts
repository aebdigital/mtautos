export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  images?: string[];
  features?: string[];
  engine?: string;
  power?: string;
  bodyType?: string;
  drivetrain?: string;
  vin?: string;
  description?: string;
  source?: 'xml' | 'admin'; // Track if car is from XML feed or admin-added
  reservedUntil?: string; // ISO date string for reservation expiry
  showOnHomepage?: boolean; // Flag to show in "Najnovšie vozidlá" section
  vatDeductible?: boolean; // Flag for VAT deductible
  priceWithoutVat?: number; // Price without VAT
  reserved?: boolean; // Flag for reserved status
}