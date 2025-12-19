import { supabase, SITE_ID } from "./supabaseClient";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL!;

export interface PublicCar {
  id: string;
  brand: string;
  model: string;
  year: number | null;
  price: number | null;
  mileage: number | null;
  fuel: string | null;
  transmission: string | null;
  image: string;
  power?: string | null;
  showOnHomepage?: boolean;
  vatDeductible?: boolean | null;
  priceWithoutVat?: number | null;
}

export interface PublicCarDetail extends PublicCar {
  features?: string[] | null;
  images?: string[] | null;
  engine?: string | null;
  bodyType?: string | null;
  drivetrain?: string | null;
  vin?: string | null;
  description?: string | null;
  reservedUntil?: string | null;
}

// Helper to build full image URL from storage path
export function getImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http')) return imagePath;
  // Build URL from Supabase storage
  return `${SUPABASE_URL}/storage/v1/object/public/site-uploads/${imagePath}`;
}

export async function getCarsForPonuka(): Promise<PublicCar[]> {
  const { data, error } = await supabase
    .from("cars")
    .select(
      `
      id,
      brand,
      model,
      year,
      price,
      mileage,
      fuel,
      transmission,
      image,
      power,
      show_on_homepage,
      vat_deductible,
      price_without_vat
    `
    )
    .eq("site_id", SITE_ID)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading cars:", error);
    throw error;
  }

  return (data ?? []).map(car => ({
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    fuel: car.fuel,
    transmission: car.transmission,
    image: getImageUrl(car.image),
    power: car.power,
    showOnHomepage: car.show_on_homepage,
    vatDeductible: car.vat_deductible,
    priceWithoutVat: car.price_without_vat,
  }));
}

export async function getCarById(carId: string): Promise<PublicCarDetail | null> {
  const { data, error } = await supabase
    .from("cars")
    .select(
      `
      id,
      site_id,
      brand,
      model,
      year,
      price,
      mileage,
      fuel,
      transmission,
      image,
      images,
      features,
      engine,
      power,
      body_type,
      drivetrain,
      vin,
      description,
      reserved_until,
      show_on_homepage
    `
    )
    .eq("id", carId)
    .eq("site_id", SITE_ID)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    console.error("Error loading car:", error);
    throw error;
  }

  if (!data) return null;

  return {
    id: data.id,
    brand: data.brand,
    model: data.model,
    year: data.year,
    price: data.price,
    mileage: data.mileage,
    fuel: data.fuel,
    transmission: data.transmission,
    image: getImageUrl(data.image),
    images: (data.images ?? []).map((img: string) => getImageUrl(img)),
    features: data.features ?? [],
    engine: data.engine,
    power: data.power,
    bodyType: data.body_type,
    drivetrain: data.drivetrain,
    vin: data.vin,
    description: data.description,
    reservedUntil: data.reserved_until,
    showOnHomepage: data.show_on_homepage,
  };
}

// Extended interface with computed image URLs and new fields
export interface PublicCarFull extends PublicCarDetail {
  mainImageUrl: string;
  galleryImageUrls: string[];
  // New fields
  doors?: string | null;
  color?: string | null;
  reserved?: boolean | null;
  month?: number | null;
  vatDeductible?: boolean | null;
  priceWithoutVat?: number | null;
  transmissionType?: string | null;
  transmissionGears?: string | null;
  airbagCount?: number | null;
  radioCd?: boolean | null;
  radioCdMp3?: boolean | null;
  androidAuto?: boolean | null;
  acType?: string | null;
  acZones?: string | null;
  parkingSensors?: string | null;
  electricWindows?: string | null;
  heatedSeats?: string | null;
}

export async function getCarFullById(carId: string): Promise<PublicCarFull | null> {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", carId)
    .eq("site_id", SITE_ID)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    console.error("Error loading car:", error);
    throw error;
  }

  if (!data) return null;

  const mainImageUrl = getImageUrl(data.image);
  const galleryImageUrls = (data.images ?? []).map((img: string) => getImageUrl(img));

  return {
    id: data.id,
    brand: data.brand,
    model: data.model,
    year: data.year,
    price: data.price,
    mileage: data.mileage,
    fuel: data.fuel,
    transmission: data.transmission,
    image: mainImageUrl,
    images: galleryImageUrls,
    features: data.features ?? [],
    engine: data.engine,
    power: data.power,
    bodyType: data.body_type,
    drivetrain: data.drivetrain,
    vin: data.vin,
    description: data.description,
    reservedUntil: data.reserved_until,
    showOnHomepage: data.show_on_homepage,
    mainImageUrl,
    galleryImageUrls,
    // New fields
    doors: data.doors,
    color: data.color,
    reserved: data.reserved,
    month: data.month,
    vatDeductible: data.vat_deductible,
    priceWithoutVat: data.price_without_vat,
    transmissionType: data.transmission_type,
    transmissionGears: data.transmission_gears,
    airbagCount: data.airbag_count,
    radioCd: data.radio_cd,
    radioCdMp3: data.radio_cd_mp3,
    androidAuto: data.android_auto,
    acType: data.ac_type,
    acZones: data.ac_zones,
    parkingSensors: data.parking_sensors,
    electricWindows: data.electric_windows,
    heatedSeats: data.heated_seats,
  };
}
