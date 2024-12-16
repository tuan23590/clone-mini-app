import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./header";
import { Suspense } from "preact/compat";
import Footer from "./footer";
import { Toaster } from "react-hot-toast";
import { ScrollRestoration } from "./scroll-restoration";

export default function Layout() {
  return (
    <Wrapper>
      <Header />
      <WrapperContent>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </WrapperContent>
      <Footer />
      <Toaster
        containerClassName="toast-container"
        containerStyle={toastContainerStyle}
      />
      <ScrollRestoration />
    </Wrapper>
  );
}

const toastContainerStyle = () => {
  return {
    top: "calc(50% - 24px)",
  };
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  color: var(--foreground);
`;

const WrapperContent = styled.div`
  flex: 1 1 0%;
  overflow-y: auto;
`;