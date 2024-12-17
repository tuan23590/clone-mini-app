import createStore from "teaful";

export const { useStore: useBannersStore } = createStore({
  banners: [],
});
