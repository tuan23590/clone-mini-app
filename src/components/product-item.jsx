import { useState } from "preact/hooks";
import TransitionLink from "./transition-link";
import { formatPrice } from "../utils/format";
import styled from "styled-components";

export default function ProductItem(props) {
    const [selected, setSelected] = useState(false);
    return (
      <TransitionLink
        className="flex flex-col cursor-pointer group"
        to={`/product/${props.product.id}`}
        replace={props.replace}
        onClick={() => setSelected(true)}
      >
        {({ isTransitioning }) => (
          <>
            <ImageWrapper
              className="w-full aspect-square object-cover rounded-t-lg"
              src={props.product.image}
              alt={props.product?.name}
              isTransitioning={isTransitioning}
              selected={selected}
              productId={props.product.id}
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

  
  const ImageWrapper = styled.img`
  ${({ isTransitioning, selected, productId }) =>
    isTransitioning && selected
      ? `view-transition-name: product-image-${productId};`
      : ''}
`;