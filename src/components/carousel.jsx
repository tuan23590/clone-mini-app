import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "preact/hooks";
import styled from "styled-components";

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export default function Carousel(props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ active: !props.disabled }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <Wrapper ref={emblaRef}>
      <div className="list-slider">
        {props.slides.map((slide, i) => (
          <div key={i} className="list-slider-item">
            {slide}
          </div>
        ))}
      </div>

      <ListDot>
        {scrollSnaps.map((_, index) => (
          <Button
            key={index}
            onClick={() => onDotButtonClick(index)}
            isActived={index === selectedIndex && !props.disabled}
          />
        ))}
      </ListDot>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
  .list-slider {
    display: flex;
  }
  .list-slider-item {
    flex: none;
    flex-basis: 100%;
    padding: 1rem;
    padding-bottom: 0px;
  }
`;
const ListDot = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }
  button {
    border: none;
    border-radius: 100%;
    width: 0.25rem;
    height: 0.25rem;
    background-color: rgb(0 0 0 / 0.1);
  }
`;
const Button = styled.button`
  background-color: ${(props) => (props.isActived ? "var(--primary) !important" : "")};
`;