import { useMemo } from "preact/hooks";
import ProductGrid from "../../components/product-grid";
import { useProductsStore } from "../../store/productsStore";


export default function RelatedProducts(props) {
  const [products,_] = useProductsStore.products();
  const otherProducts = useMemo(
    () => products.filter((product) => product.id !== props.currentProductId),
    [products, props.currentProductId]
  );

  return <ProductGrid replace products={otherProducts} />;
}
