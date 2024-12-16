import styled from "styled-components";
import { MinusIcon, PlusIcon } from "./vectors";

export default function QuantityInput(props) {
  const onQuantityChange = (type, quantity = null) => {
    if (type === "increment") {
      props.onChange(props.value + 1);
    } else if (type === "decrement") {
      props.onChange(Math.max(props.minValue ?? 0, props.value - 1));
    } else if (type === "input") {
      props.onChange(
        Math.max(props.minValue ?? 0, quantity)
      );
    }
  };
  return (
    <div className="flex items-center">
      <button
        className="p-1 bg-secondary rounded"
        onClick={() => onQuantityChange("decrement")}
      >
        <MinusIcon width={10} height={10} />
      </button>
      <Input
        quantity={String(props.value).length}
        className="px-2 text-xs focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={props.value}
        type="number"
        inputMode="numeric"
        onChange={(e) => onQuantityChange("input", Number(e.target.value))}
      />
      <button
        className="p-1 bg-secondary rounded"
        onClick={() => onQuantityChange("increment")}
      >
        <PlusIcon width={10} height={10} />
      </button>
    </div>
  );
}

const Input = styled.input`
  width: calc(${(props) => props.quantity}ch + 16px);
`;
