import createStore from "teaful";

export const { useStore } = createStore({
    products: [],
    categories: [],
    banner: [],
    cart: [],
    tabs: ["Tất cả", "Nam", "Nữ", "Trẻ em"],
    selectedItemIds: [],
    totalItems: 0,
    totalAmount: 0,
});