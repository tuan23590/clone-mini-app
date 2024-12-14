import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HorizontalDivider from "../../components/horizontal-divider";
import Banners from "./banners";
import SearchBar from "../../components/search-bar";
import CategoryTabs from "../../components/category-tabs";
import Category from "./category";
import FlashSales from "./flash-sales";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
    <Wrapper>
      <div className="search-bar-and-banners">
        <SearchBar onClick={() => navigate("/search")} />
        <Banners />
      </div>
      <div className="category-and-tabs">
        <CategoryTabs />
        <Category />
      </div>
      <HorizontalDivider />
      <FlashSales />
    </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  background-color: var(--section);
  .search-bar-and-banners {
    background-color: var(--background);
    padding-top: 0.5rem;
  }
  .category-and-tabs {
    background-color: var(--background);
    margin-top: 0.5rem;
    :not([hidden]) ~ :not([hidden]) {
      --tw-space-y-reverse: 0;
      margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
      margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
    }
  }
`;
