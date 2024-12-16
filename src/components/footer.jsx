import styled from "styled-components";
import { CartIcon, CategoryIcon, HomeIcon, ProfileIcon } from "./vectors";
import HorizontalDivider from "./horizontal-divider";
import TransitionLink from "./transition-link";
import { useCartStore } from "../store/cartStore";

const NAV_ITEMS = [
  {
    name: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Danh mục",
    path: "/categories",
    icon: CategoryIcon,
  },
  {
    name: "Giỏ hàng",
    path: "/cart",
    icon: (props) => {
      const [cart, _] = useCartStore.cart();
      return (
        <BadgeWrapper>
          {cart.length > 0 && (
            <div className="absolute top-0 left-[18px] h-4 px-1.5 pt-[1.5px] pb-[0.5px] rounded-full bg-[#FF3333] text-white text-[10px] leading-[14px] font-medium shadow-[0_0_0_2px_white]">
            {cart.length > 9 ? "9+" : cart.length}
          </div>
          )}
          <CartIcon {...props} />
        </BadgeWrapper>
      );
    },
  },
  {
    name: "Thành viên",
    path: "/profile",
    icon: ProfileIcon,
  },
];
export default function Footer() {
  return (
    <>
      <HorizontalDivider />
      <NavWrapper
        style={{
          // chờ ngày quay lại phục thù
          gridTemplateColumns: `repeat(${NAV_ITEMS.length}, 1fr)`,
          paddingBottom: `max(16px, env(safe-area-inset-bottom)`,
        }}
      >
        {NAV_ITEMS.map((item) => {
          return (
            <TransitionLinkStyled
              to={item.path}
              key={item.path}
            >
              {({ isActive }) => (
                <>
                  <div className="icon">
                    <item.icon active={isActive} />
                  </div>
                  <div className={`text ${isActive ? "text-primary" : ""}`}
                  >
                    {item.name}
                  </div>
                </>
              )}
            </TransitionLinkStyled>
          );
        })}
      </NavWrapper>
    </>
  );
}

const BadgeWrapper = styled.div`
  position: relative;
`;

const NavWrapper = styled.div`
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  display: grid;
`;

const TransitionLinkStyled = styled(TransitionLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem;
  padding-bottom: 0.125rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  :active {
    transform: scale(1.05);
  }
    .icon {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    font-size: 12px;
    line-height: 16px;
  }
`;
