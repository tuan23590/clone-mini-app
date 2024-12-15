import { useStore } from "../store";
import { useRouteHandle } from "../utils/hook";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "preact/hooks";
import headerLogoImage from "../static/header-logo.svg";
import styled from "styled-components";
import { BackIcon } from "./vectors";

export default function Header() {
  const [categories, _] = useStore.categories();
  const [handle, match] = useRouteHandle();
  const navigate = useNavigate();
  const location = useLocation();

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        return handle.title({ categories, params: match.params });
      } else {
        return handle.title;
      }
    }
  }, [handle, categories]);

  const showBack = location.key !== "default" && handle?.back !== false;

  if (handle?.logo) {
    return (
      <WrapperLogo>
        <img src={headerLogoImage} />
      </WrapperLogo>
    );
  }

  return (
    <WrapperBack>
      {showBack && (
        <div className="icon" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
      )}
      <div className="title">{title}</div>
    </WrapperBack>
  );
}

const WrapperLogo = styled.div`
  height: 3.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  img {
    max-height: 100%;
    flex: none;
  }
`;

const WrapperBack = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 106px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.25rem * var(--tw-space-x-reverse));
    margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .icon {
    padding: 0.5rem;
    cursor: pointer;
  }
  .title {
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
