import { useMatches } from "react-router-dom";
import { getDefaultOptions, isIdentical } from "./cart";
import { useLayoutEffect, useMemo, useState } from "preact/hooks";
import toast from "react-hot-toast";
import { purchase } from "zmp-sdk";
import { useCartStore } from "../store/cartStore";
import { useProductsStore } from "../store/productsStore";

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

  function handleReplace(quantity, cart, editing) {
    if (quantity === 0) {
      // the user wants to remove this item.
      cart.splice(cart.indexOf(editing), 1);
    } else {
      const existed = cart.find(
        (item) =>
          item.id !== editingCartItemId &&
          item.product.id === product.id &&
          isIdentical(item.options, options)
      );
      if (existed) {
        // there's another identical item in the cart; let's remove it and update the quantity in the editing item.
        cart.splice(cart.indexOf(existed), 1);
      }
      cart.splice(cart.indexOf(editing), 1, {
        ...editing,
        options,
        quantity: existed
          ? existed.quantity + quantity // updating the quantity of the identical item.
          : quantity,
      });
    }
  }

  function handleAppend(quantity, cart) {
    const existed = cart.find(
      (item) =>
        item.product.id === product.id && isIdentical(item.options, options)
    );
    if (existed) {
      // merging with another identical item in the cart.
      cart.splice(cart.indexOf(existed), 1, {
        ...existed,
        quantity: existed.quantity + quantity,
      });
    } else {
      // this item is new, appending it to the cart.
      cart.push({
        id: cart.length + 1,
        product,
        options,
        quantity,
      });
    }
  }

  const addToCart = (quantity) => {
    setCart((cart) => {
      const res = [...cart];
      if (editing) {
        handleReplace(quantity, res, editing);
      } else {
        handleAppend(quantity, res);
      }
      return res;
    });
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