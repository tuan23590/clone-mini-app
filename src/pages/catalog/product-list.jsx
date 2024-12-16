import HorizontalDivider from "../../components/horizontal-divider";
import ProductGrid from "../../components/product-grid";
import { useStore } from "../../store";
import ProductFilter from "./product-filter";

export default function ProductListPage() {
 const [products,_] =useStore.products();
  return (
    <>
      <ProductFilter />
      <HorizontalDivider />
      <ProductGrid products={products} className="pt-4 pb-[13px]" />
    </>
  );
}
