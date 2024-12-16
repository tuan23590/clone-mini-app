import createStore from "teaful";

export const { useStore: useCategoriesStore } = createStore({
  categories: [],
  tabs: ["Tất cả", "Nam", "Nữ", "Trẻ em"],
});
