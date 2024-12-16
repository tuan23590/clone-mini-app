import { Suspense } from "preact/compat";
import { useStore } from "../../store";
import { Select } from "../../components/lazyloaded";

export default function ProductFilter() {
  const [initSizes, _] = useStore.initSizes();
  const [size, setSize] = useStore.size();
  const [initColors, __] = useStore.initColors();
  const [color, setColor] = useStore.color();

  return (
    <div className="flex px-4 py-3 space-x-2 overflow-x-auto">
      <Suspense
        fallback={
          // <SelectSkeleton width={110} />
          <div>loading...</div>
        }
      >
        <Select
          items={initSizes}
          value={size}
          onChange={setSize}
          renderTitle={(selectedSize) =>
            `Kích thước${selectedSize ? `: ${selectedSize}` : ""}`
          }
          renderItemKey={(size) => String(size)}
        />
      </Suspense>
      <Suspense fallback={
        // <SelectSkeleton width={95} />
        <div>loading...</div>
      }>
        <Select
          items={initColors}
          value={color}
          onChange={setColor}
          renderTitle={(selectedColor) =>
            `Màu sắc${selectedColor ? `: ${selectedColor.name}` : ""}`
          }
          renderItemLabel={(color) => color.name}
          renderItemKey={(color) => color.name}
        />
      </Suspense>
      {(color !== undefined || size !== undefined) && (
        <button
          className="bg-primary text-white rounded-full h-8 flex-none px-3"
          onClick={() => {
            setColor(undefined);
            setSize(undefined);
          }}
        >
          Xoá bộ lọc
        </button>
      )}
    </div>
  );
}
