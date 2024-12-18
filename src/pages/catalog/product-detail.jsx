import { useEffect, useState } from "preact/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useAddToCart } from "../../utils/hook";
import { formatPrice } from "../../utils/format";
import ShareButton from "./share-buttont";
import VariantPicker from "./variant-picker";
import HorizontalDivider from "../../components/horizontal-divider";
import Collapse from "../../components/collapse";
import RelatedProducts from "./related-products";
import Button from "../../components/button";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useProductsStore } from "../../store/productsStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, _] = useProductsStore.products();
  const product = products.find((p) => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  useEffect(() => {
    setSelectedColor(product.colors?.[0]);
    setSelectedSize(product.sizes?.[0]);
  }, [id]);

  const { addToCart, setOptions } = useAddToCart(product);

  useEffect(() => {
    setOptions({
      size: selectedSize,
      color: selectedColor?.name,
    });
  }, [selectedSize, selectedColor]);

  const onAddToCart = () => {
    addToCart(1);
    toast.success("Đã thêm vào giỏ hàng");
  };

  const onBuyNow = () => {
    addToCart(1);
    navigate("/cart");
  };

  return <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4">
          <div className="py-2">
            <ImageProduct
              key={product.id}
              src={product.image}
              alt={product.name}
              productId={product.id}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="text-xl font-medium text-primary">
            {formatPrice(product.price)}
          </div>
          {!!product.originalPrice && (
            <div className="text-2xs text-subtitle line-through">
              {formatPrice(product.price)}
            </div>
          )}
          <div className="text-sm mt-1">{product.name}</div>
          <div className="py-2">
            <ShareButton product={product} />
          </div>
          {product.colors && (
            <VariantPicker
              title="Color"
              variants={product.colors}
              value={selectedColor}
              onChange={(color) => {
                console.log("color", color);
                setSelectedColor(color)
              }}
              renderVariant={(variant, selected) => (
                <div
                  className={"w-full h-full rounded-full ".concat(
                    selected ? "border-2 border-primary p-0.5" : ""
                  )}
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: variant?.hex }}
                  />
                </div>
              )}
            />
          )}
          <HorizontalDivider />
          {product.sizes && (
            <VariantPicker
              title="Size"
              variants={product.sizes}
              value={selectedSize}
              onChange={(size) => setSelectedSize(size)}
              renderVariant={(variant, selected) => (
                <div
                  className={"w-full h-full flex justify-center items-center ".concat(
                    selected ? "bg-primary text-white" : ""
                  )}
                >
                  <div className="truncate">{variant}</div>
                </div>
              )}
            />
          )}
        </div>
        {product.details && (
          <>
            <div className="bg-section h-2 w-full"></div>
            <Collapse items={product.details} />
          </>
        )}
        <div className="bg-section h-2 w-full"></div>
        <div className="font-medium py-2 px-4">
          <div className="pt-2 pb-2.5">Sản phẩm khác</div>
          <HorizontalDivider />
        </div>
        <RelatedProducts currentProductId={product.id} />
      </div>

      <HorizontalDivider />
      <div className="flex-none grid grid-cols-2 gap-2 py-3 px-4">
        <Button
          large
          onClick={onAddToCart}
        >
          Thêm vào giỏ
        </Button>
        <Button
          large
          primary
          onClick={onBuyNow}
        >
          Mua ngay
        </Button>
      </div>
    </div>;
}

const ImageProduct = styled.img`
viewTransitionName: product-image-${(props) => props.productId};
`;