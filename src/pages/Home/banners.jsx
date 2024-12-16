import styled from "styled-components";
import Carousel from "../../components/carousel";
import { useBannersStore } from "../../store/bannersStore";

export default function Banners() {
  const [banners,_] = useBannersStore.banners();
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
