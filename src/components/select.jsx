import { useState } from "preact/hooks";
import { Picker } from "zmp-ui";
import { ChevronDown } from "./vectors";

export default function Select(props) {
  const [localValue, setLocalValue] = useState(
    props.value ? props.renderItemKey(props.value) : ""
  );

  const flush = () => {
    const selectedItem = props.items.find(
      (item) => props.renderItemKey(item) === localValue
    );
    props.onChange(selectedItem);
  };

  return (
    <div className=" overflow-hidden flex-none h-8 border border-black/15 rounded-full relative [&>.zaui-picker-input]:absolute [&>.zaui-picker-input]:inset-0 [&>.zaui-picker-input]:opacity-0">
      <Picker
        className="min-h-min"
        mask
        maskClosable
        title={props.renderTitle()}
        data={[
          {
            name: "localValue",
            options: props.items.map((item) => ({
              displayName:
                props.renderItemLabel?.(item) ?? props.renderItemKey(item),
              key: props.renderItemKey(item),
              value: props.renderItemKey(item),
            })),
          },
        ]}
        value={{
          localValue,
        }}
        onChange={({ localValue }) => {
          setLocalValue(localValue.key ?? "");
        }}
        action={{
          text: "OK",
          close: true,
          onClick: () => {
            flush();
          },
        }}
      />
      <div className="h-full relative flex justify-center items-center px-3 space-x-1.5 pointer-events-none">
        <div className="text-xs">
          {props.renderTitle
            ? props.renderTitle(props.value)
            : String(props.value)}
        </div>
        <ChevronDown />
      </div>
    </div>
  );
}
