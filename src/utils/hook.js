import { useMatches } from "react-router-dom";
import { getDefaultOptions, isIdentical } from "./cart";
import { useLayoutEffect, useMemo, useState } from "preact/hooks";
import toast from "react-hot-toast";
import { purchase } from "zmp-sdk";
import { useCartStore } from "../store/cartStore";
import { useProductsStore } from "../store/productsStore";
import { produce } from "immer";

export function useRouteHandle() {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];

  return [lastMatch.handle, lastMatch, matches];
}

export function useAddToCart(product, editingCartItemId) {
  const [cart, setCart] = useCartStore.cart();
  const editing = useMemo(
    () => cart.find((item) => item.id === editingCartItemId),
    [cart, editingCartItemId]
  );

  const [options, setOptions] = useState(
    editing ? editing.options : getDefaultOptions(product)
  );

  const addToCart = (quantity) => {
    setCart((cart) =>
      produce(cart, (draft) => {
        if (editing) {
          // Chỉnh sửa sản phẩm đã tồn tại
          if (quantity === 0) {
            // Xóa sản phẩm nếu số lượng = 0
            const index = draft.findIndex((item) => item.id === editingCartItemId);
            if (index !== -1) draft.splice(index, 1);
          } else {
            const existed = draft.find(
              (item) =>
                item.id !== editingCartItemId &&
                item.product.id === product.id &&
                isIdentical(item.options, options)
            );
            if (existed) {
              // Xóa sản phẩm trùng lặp và cập nhật số lượng
              const existedIndex = draft.indexOf(existed);
              draft.splice(existedIndex, 1);
              editing.quantity += existed.quantity; // Cộng dồn số lượng
            }
            const index = draft.findIndex((item) => item.id === editingCartItemId);
            if (index !== -1) {
              draft[index] = {
                ...editing,
                options,
                quantity,
              };
            }
          }
        } else {
          // Thêm mới sản phẩm vào giỏ hàng
          const existed = draft.find(
            (item) => item.product.id === product.id && isIdentical(item.options, options)
          );
          if (existed) {
            // Cộng dồn số lượng nếu sản phẩm đã tồn tại
            existed.quantity += quantity;
          } else {
            // Thêm sản phẩm mới vào giỏ hàng
            draft.push({
              id: draft.length + 1,
              product,
              options,
              quantity,
            });
          }
        }
      })
    );
  };

  return { addToCart, options, setOptions };
}


export function useRealHeight(element, defaultValue) {
  const [height, setHeight] = useState(defaultValue ?? 0);

  useLayoutEffect(() => {
    if (element.current && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver((entries) => {
        const [{ contentRect }] = entries;
        setHeight(contentRect.height);
      });

      ro.observe(element.current);

      return () => {
        ro.disconnect();
      };
    }

    return () => {};
  }, [element.current]);

  if (typeof ResizeObserver === "undefined") {
    return -1;
  }

  return height;
}

export function useToBeImplemented() {
  return () =>
    toast("Chức năng dành cho các bên tích hợp phát triển...", {
      icon: "🛠️",
    });
}

export function useCustomerSupport() {
  return () =>
    toast("Chức năng hỗ trợ khách hàng đang được phát triển...", {
      icon: "🛠️",
    });
}

export function useCheckout() {
  const [totalAmount, _] = useCartStore.totalAmount();
  const [__, setCart] = useCartStore.cart();
  return async () => {
    try {
      await purchase({
        amount: totalAmount,
        desc: "Thanh toán đơn hàng",
        method: "",
      });
      toast.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng!", {
        icon: "🎉",
      });
      setCart([]);
    } catch (error) {
      toast.error(
        "Thanh toán thất bại. Vui lòng kiểm tra nội dung lỗi bên trong Console."
      );
      console.warn(error);
    }
  };
}


export function useSearchResult() {
  const [products,_] = useProductsStore.products();
  const [keyword,__] = useProductsStore.keyword();

  if (keyword === "") {
    return [];
  }

  const result = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return result;
}