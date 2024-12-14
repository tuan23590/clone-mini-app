import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useState } from "preact/hooks";
import categoriesData from "./mock/categories.json";
import productsData from "./mock/products.json";
import bannersData from "./mock/banners.json";
import { useStore } from "./store";
function App() {
  const [_, setCategories] = useStore.categories();
  const [__, setProducts] = useStore.products();
  const [___, setBanners] = useStore.banners();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setCategories(categoriesData);
    setProducts(productsData);
    setBanners(bannersData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
