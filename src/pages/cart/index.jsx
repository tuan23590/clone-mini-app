import { useEffect } from "preact/hooks";
import HorizontalDivider from "../../components/horizontal-divider";
import { EmptyBoxIcon } from "../../components/vectors";
import ApplyVoucher from "./apply-voucher";
import CartList from "./cart-list";
import CartSummary from "./cart-summary";
import SelectAll from "./select-all";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const [cart, _] = useCartStore.cart();
  const [selectedItemIds, __] = useCartStore.selectedItemIds();
  const [___, setTotalItems] = useCartStore.totalItems();
  const [____, setTotalAmount] = useCartStore.totalAmount();

  useEffect(() => {
    const listSelectedItems = cart.filter((item) => selectedItemIds.includes(item.id));
    const totalItems = listSelectedItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = listSelectedItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    setTotalItems(totalItems);
    setTotalAmount(totalAmount);
  }, [selectedItemIds,cart]);


  if (!cart.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
        <EmptyBoxIcon />
        <div className="text-2xs text-inactive text-center">
          Không có sản phẩm trong giỏ hàng
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col">
      <SelectAll />
      <HorizontalDivider />
      <CartList />
      <HorizontalDivider />
      <ApplyVoucher />
      <HorizontalDivider />
      <CartSummary />
    </div>
  );
}
