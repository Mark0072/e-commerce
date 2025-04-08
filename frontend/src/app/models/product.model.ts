export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  image_url?: string | null;
  category: Category | null;
  stock: number;
  created_at: string;
  updated_at: string;
}

// Re-exportar la interfaz para asegurar la disponibilidad
export type { Product as ProductType }; 