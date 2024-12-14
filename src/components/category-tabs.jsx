import { useState } from "preact/hooks";
import { useStore } from "../store";
import Tabs from "./tabs";

export default function CategoryTabs() {
  const [tabs,_] = useStore.tabs();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Tabs
      items={["Tất cả", "Nam", "Nữ", "Trẻ em"]}
      value={tabs[selectedIndex]}
      onChange={(tab) => setSelectedIndex(tabs.indexOf(tab))}
      renderLabel={(item) => item}
    />
  );
}
