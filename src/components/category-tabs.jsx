import { useState } from "preact/hooks";
import Tabs from "./tabs";
import { useCategoriesStore } from "../store/categoriesStore";

export default function CategoryTabs() {
  const [tabs,_] = useCategoriesStore.tabs();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Tabs
      items={tabs}
      value={tabs[selectedIndex]}
      onChange={(tab) => setSelectedIndex(tabs.indexOf(tab))}
      renderLabel={(item) => item}
    />
  );
}
