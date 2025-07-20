import {  Tables } from "@/types/supabase";


export type Product = Tables<"products">;
// Trong file @/types/product.ts (hoặc tạo type riêng cho CartItem)
export type CartItem = Product & {
  quantity: number;
  selected_size?: string;
  selected_color?: string;
};

export type ProductDetail = CartItem & {
  product_sizes: Tables<"product_sizes">[];
  product_images: Tables<"product_images">[];
};
