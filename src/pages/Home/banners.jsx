import styled from "styled-components";
import Carousel from "../../components/carousel";
import { useStore } from "../../store";

export default function Banners() {
  const [banners,_] = useStore.banners();
  return (
    <Carousel
      slides={banners.map((banner) => (
        <Image src={banner} />
      ))}
    />
  )
}

const Image = styled.img`
  width: 100%;
  border-radius: 0.25rem
`;
