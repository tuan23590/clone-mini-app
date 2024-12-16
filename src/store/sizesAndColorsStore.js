import createStore from "teaful";

export const { useStore: useSizesAndColorsStore } = createStore({
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
