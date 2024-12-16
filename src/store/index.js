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
  initSizes: ["S", "M", "L", "XL"],
  initColors: [
    {
      name: "Đỏ",
      hex: "#FFC7C7",
    },
    {
      name: "Xanh dương",
      hex: "#DBEBFF",
    },
    {
      name: "Xanh lá",
      hex: "#D1F0DB",
    },
    {
      name: "Xám",
      hex: "#D9E2ED",
    },
  ],
  size: undefined,
  color: undefined,
});
