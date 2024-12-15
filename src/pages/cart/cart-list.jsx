import { useStore } from "../../store";
import CartItem from "./cart-item";

export default function CartList() {
  const [cart,_] = useStore.cart();

  return (
    <div className="flex-1 overflow-y-auto">
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  );
}
