import { useState } from "preact/hooks";
import TransitionLink from "./transition-link";
import { formatPrice } from "../utils/format";

export default function ProductItem(props) {
    const [selected, setSelected] = useState(false);
    console.log("props.product", props);
    return (
      <TransitionLink
        className="flex flex-col cursor-pointer group"
        to={`/product/${props.product.id}`}
        replace={props.replace}
        onClick={() => setSelected(true)}
      >
        {({ isTransitioning }) => (
          <>
            <img
              src={props.product.image}
              className="w-full aspect-square object-cover rounded-t-lg"
              style={{
                viewTransitionName:
                  isTransitioning && selected // only animate the "clicked" product item in related products list
                    ? `product-image-${props.product.id}`
                    : undefined,
              }}
              alt={props.product?.name}
            />
            <div className="py-2">
              <div className="text-3xs text-subtitle truncate">
                {props.product.category?.name}
              </div>
              <div className="text-xs h-9 line-clamp-2">{props.product.name}</div>
              <div className="mt-0.5 text-sm font-medium">
                {formatPrice(props.product.price)}
              </div>
              <div className="text-3xs text-subtitle line-through">
                {formatPrice(props.product.price)}
              </div>
            </div>
          </>
        )}
      </TransitionLink>
    );
  }