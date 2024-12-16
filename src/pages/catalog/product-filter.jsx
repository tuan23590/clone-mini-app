import { Suspense } from "preact/compat";
import { Select } from "../../components/lazyloaded";
import { SelectSkeleton } from "../../components/skeleton";
import { useSizesAndColorsStore } from "../../store/sizesAndColorsStore";

export default function ProductFilter() {
  const [initSizes, _] = useSizesAndColorsStore.initSizes();
  const [size, setSize] = useSizesAndColorsStore.size();
  const [initColors, __] = useSizesAndColorsStore.initColors();
  const [color, setColor] = useSizesAndColorsStore.color();

  return (
    <div className="flex px-4 py-3 space-x-2 overflow-x-auto">
      <Suspense
        fallback={
          <SelectSkeleton width={110} />
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
        <SelectSkeleton width={95} />
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
