import ProductItem from "./product-item";

export default function ProductGrid({
  products,
  className,
  replace,
  ...props
}) {
  return (
    <div
      className={"grid grid-cols-2 px-4 py-2 gap-4 ".concat(className ?? "")}
      {...props}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} replace={replace} />
      ))}
    </div>
  );
}
