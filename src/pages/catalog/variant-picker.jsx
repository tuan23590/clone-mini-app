

  export default function VariantPicker(props) {
    const handleSelected = (variant) => {
      props.onChange(variant);
    }
    return (
      <div className="py-4 space-y-2">
        <div className="text-base font-medium text-inactive">{props.title}</div>
        <div className="flex overflow-x-auto space-x-2">
          {props.variants.map((variant, index) => (
            <div
              key={"variant-" + index}
              className="flex-none w-8 h-8 rounded-full overflow-hidden cursor-pointer"
              onClick={() => handleSelected(variant)}
            >
              {props.renderVariant(variant, props.value === variant)}
            </div>
          ))}
        </div>
      </div>
    );
  }
  