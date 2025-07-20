import ProductCard from "@/components/product-card";
import { createServerSupabaseClient } from "@/utils/supabase/server";


export async function  FeaturedProducts() {
   const supabase = await createServerSupabaseClient();
   const { data: products } = await supabase.from("products").select("*").eq("is_new", true).limit(8);
          
  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
        <p className="text-muted-foreground max-w-[600px]">
          Our most popular items, handpicked for you
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

