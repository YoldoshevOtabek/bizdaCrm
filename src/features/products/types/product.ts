export type ProductImageInput = {
  url: string;
  alt?: string;
  isMain?: boolean;
  sortOrder?: number;
};

export type ProductVariantInput = {
  sku: string;
  price?: number;
  stock?: number;
  attributes?: {
    storage?: string;
    ram?: string;
  };
  isActive?: boolean;
};

export type ProductFormValues = {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  sku: string;
  barcode?: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  stock?: number;
  lowStockThreshold?: number;
  brandId: string;
  categoryId: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  images?: ProductImageInput[];
  variants?: ProductVariantInput[];
};

export type ProductDetails = ProductFormValues & {
  id: string;
  brand?: { id: string; name: string };
  category?: { id: string; name: string };
  images?: (ProductImageInput & { id?: string })[];
  variants?: (ProductVariantInput & { id?: string })[];
  createdAt?: string;
  updatedAt?: string;
};

export function toProductPayload(values: ProductFormValues): ProductFormValues {
  return {
    name: values.name,
    slug: values.slug,
    description: values.description ?? "",
    shortDescription: values.shortDescription ?? "",
    sku: values.sku,
    barcode: values.barcode ?? "",
    price: Number(values.price ?? 0),
    oldPrice: Number(values.oldPrice ?? 0),
    discountPercent: Number(values.discountPercent ?? 0),
    stock: Number(values.stock ?? 0),
    lowStockThreshold: Number(values.lowStockThreshold ?? 5),
    brandId: values.brandId,
    categoryId: values.categoryId,
    isActive: Boolean(values.isActive),
    isFeatured: Boolean(values.isFeatured),
    isNew: Boolean(values.isNew),
    isPopular: Boolean(values.isPopular),
    images: (values.images ?? [])
      .filter((image) => Boolean(image.url))
      .map((image, index) => ({
        url: image.url,
        alt: image.alt ?? "",
        isMain: Boolean(image.isMain),
        sortOrder: Number(image.sortOrder ?? index),
      })),
    variants: (values.variants ?? []).map((variant) => ({
      sku: variant.sku,
      price: Number(variant.price ?? 0),
      stock: Number(variant.stock ?? 0),
      attributes: {
        storage: variant.attributes?.storage ?? "",
        ram: variant.attributes?.ram ?? "",
      },
      isActive: variant.isActive ?? true,
    })),
  };
}

export function toProductFormValues(data: ProductDetails): ProductFormValues {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description,
    shortDescription: data.shortDescription,
    sku: data.sku,
    barcode: data.barcode,
    price: data.price,
    oldPrice: data.oldPrice,
    discountPercent: data.discountPercent,
    stock: data.stock,
    lowStockThreshold: data.lowStockThreshold,
    brandId: data.brandId,
    categoryId: data.categoryId,
    isActive: data.isActive,
    isFeatured: data.isFeatured,
    isNew: data.isNew,
    isPopular: data.isPopular,
    images: (data.images ?? []).map((image, index) => ({
      url: image.url,
      alt: image.alt,
      isMain: image.isMain,
      sortOrder: image.sortOrder ?? index,
    })),
    variants: (data.variants ?? []).map((variant) => ({
      sku: variant.sku,
      price: variant.price,
      stock: variant.stock,
      attributes: {
        storage: variant.attributes?.storage,
        ram: variant.attributes?.ram,
      },
      isActive: variant.isActive ?? true,
    })),
  };
}
