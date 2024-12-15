import Checkbox from "../../components/checkbox";
import { RemoveIcon } from "../../components/vectors";
import { useStore } from "../../store";

export default function SelectAll() {
  const [cart, setCart] = useStore.cart();
  const [selectedItemIds, setSelectedItemIds] = useStore.selectedItemIds();
  const checkedAll =
    selectedItemIds.length > 0 &&
    !cart.some((item) => !selectedItemIds.includes(item.id));
  const checkAll = () => {
    setSelectedItemIds(cart.map((item) => item.id));
  };
  const uncheckAll = () => {
    setSelectedItemIds([]);
  };

  return (
    <div className="px-4 py-3 flex items-center space-x-4">
      <Checkbox
        checked={checkedAll}
        onChange={checkedAll ? uncheckAll : checkAll}
      />
      <div className="text-sm font-medium flex-1">Tất cả</div>
      {selectedItemIds.length > 0 && (
        <RemoveIcon
          className="cursor-pointer"
          onClick={() => {
            setCart(cart.filter((item) => !selectedItemIds.includes(item.id)));
            setSelectedItemIds([]);
          }}
        />
      )}
    </div>
  );
}
