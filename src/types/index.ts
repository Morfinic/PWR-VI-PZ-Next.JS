// === Category Params ===
export type CreateCategoryParams = {
  name: string;
  attrs: string[];
}

// === Product Params ===
export type CreateProductParams = {
  product: {
    name: string;
    description?: string;
    imageUrl: string;
    price: number;
    categoryId: string;
  }
}

export type GetAllProductsParams = {
  name?: string;
  category?: string;
  limit: number;
}
