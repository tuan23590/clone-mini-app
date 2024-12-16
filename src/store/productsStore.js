import createStore from "teaful";

export const { useStore: useProductsStore } = createStore({
  products: [],
  loading: true,
  recommendedProducts: [],
  keyword: "",
});
