export type BrandProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  isActive: boolean;
  image?: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { products: number };
  products?: BrandProduct[];
};

export type BrandFormValues = {
  name: string;
  slug: string;
  description?: string;
  logo: string;
  isActive: boolean;
};
