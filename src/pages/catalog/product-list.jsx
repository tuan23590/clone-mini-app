import HorizontalDivider from "../../components/horizontal-divider";
import ProductGrid from "../../components/product-grid";
import { useProductsStore } from "../../store/productsStore";
import ProductFilter from "./product-filter";

export default function ProductListPage() {
 const [products,_] =useProductsStore.products();
  return (
    <>
      <ProductFilter />
      <HorizontalDivider />
      <ProductGrid products={products} className="pt-4 pb-[13px]" />
    </>
  );
}
