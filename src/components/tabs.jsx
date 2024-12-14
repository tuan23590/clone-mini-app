import styled from "styled-components"

export default function Tabs(props) {
  return (
    <Wrapper
      itemsLength={props.items.length}
      className="grid h-11 border-b-[0.5px] border-black/10"
    >
      {props.items.map((item, i) => (
        <div
          key={i}
          className="h-full flex flex-col px-3 cursor-pointer"
          onClick={() => props.onChange(item)}
        >
          <div className="flex-1 flex items-center justify-center">
            <span
              className={"truncate font-medium ".concat(
                item === props.value ? "" : "text-inactive"
              )}
            >
              {props.renderLabel(item)}
            </span>
          </div>
          {props.value === item && (
            <div className="bg-tabIndicator h-[1.5px] rounded-t-sm -mt-px" />
          )}
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
grid-template-columns: ${(props) => `repeat(${props.itemsLength}, minmax(0, 1fr))`};
`