import { useMemo } from "preact/hooks";
import { useStore } from "../../store";
import ProductGrid from "../../components/product-grid";


export default function RelatedProducts(props) {
  const [products,_] = useStore.products();
  const otherProducts = useMemo(
    () => products.filter((product) => product.id !== props.currentProductId),
    [products, props.currentProductId]
  );

  return <ProductGrid replace products={otherProducts} />;
}
