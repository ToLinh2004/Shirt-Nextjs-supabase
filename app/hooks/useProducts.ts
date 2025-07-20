import { ProductDetail } from "@/types/product";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export function useProducts() {
  const [data, setData] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createBrowserSupabaseClient();

      const { data, error } = await supabase.from("products").select(`
          *,
          product_details (*),
          product_sizes (size),
          product_colors (color),
          product_images (image_url)
        `);

      if (error) setError(error);
      else setData(data);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { data, loading, error };
}


export async function fetchProductDetail(
  productId: number
): Promise<ProductDetail | null> {
  const supabase = createBrowserSupabaseClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_sizes(*),
      product_images(*)
    `
    )
    .eq("id", productId)
    .single(); // Chỉ lấy 1 sản phẩm

  if (error) {
    console.error("Error fetching product detail:", error.message);
    return null;
  }
  return data as ProductDetail;
}