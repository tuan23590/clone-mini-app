import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useState } from "preact/hooks";
import categoriesData from "./mock/categories.json";
import productsData from "./mock/products.json";
import bannersData from "./mock/banners.json";
import { useStore } from "./store";
import { produce } from "immer";
function App() {
  const [_, setCategories] = useStore.categories();
  const [__, setProducts] = useStore.products();
  const [___, setBanners] = useStore.banners();
  const [____, setLoading] = useStore.loading();
  useEffect(() => {
    setLoading(true);
    setCategories(categoriesData);

    const listProductsWithCategory = produce(productsData, (draft) => {
      draft.forEach(product => {
        const category = categoriesData.find(category => category.id === product.categoryId);
        product.category = category;
      });
    });
    
    setProducts(listProductsWithCategory);
    setBanners(bannersData);
    setLoading(false);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
