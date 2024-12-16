import { useCartStore } from "../../store/cartStore";
import CartItem from "./cart-item";

export default function CartList() {
  const [cart,_] = useCartStore.cart();

  return (
    <div className="flex-1 overflow-y-auto">
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  );
}
