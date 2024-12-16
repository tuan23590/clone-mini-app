import createStore from "teaful";

export const { useStore: useCartStore } = createStore({
  cart: [],
  selectedItemIds: [],
  totalItems: 0,
  totalAmount: 0,
});
