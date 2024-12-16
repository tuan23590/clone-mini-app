import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect } from "preact/hooks";
import categoriesData from "./mock/categories.json";
import productsData from "./mock/products.json";
import bannersData from "./mock/banners.json"; 
import { produce } from "immer";
import { useCategoriesStore } from "./store/categoriesStore";
import { useProductsStore } from "./store/productsStore";
import { useBannersStore } from "./store/bannersStore";
function App() {
  const [_, setCategories] = useCategoriesStore.categories();
  const [__, setProducts] = useProductsStore.products();
  const [___, setBanners] = useBannersStore.banners();
  const [____, setLoading] = useProductsStore.loading();
  const [______, setRecommendedProducts] = useProductsStore.recommendedProducts();
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
    setRecommendedProducts(listProductsWithCategory);
    setBanners(bannersData);
    setLoading(false);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
