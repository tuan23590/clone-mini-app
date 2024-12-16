import { useEffect, useRef, useState } from "preact/hooks";
import SearchBar from "../../components/search-bar";
import styled from "styled-components";
import Section from "../../components/section";
import ProductItem from "../../components/product-item";
import { Suspense } from "preact/compat";
import { ProductItemSkeleton } from "../../components/skeleton";
import { useSearchResult } from "../../utils/hook";
import { SearchIconLarge } from "../../components/vectors";
import { useProductsStore } from "../../store/productsStore";

export default function SearchPage() {
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useProductsStore.keyword();
  const [localKeyword, setLocalKeyword] = useState('');
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      setKeyword("");
    };
  }, []);

  return (
    <>
      <div className="py-2">
        <SearchBar
          ref={inputRef}
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.currentTarget.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setKeyword(localKeyword);
            }
          }}
          onBlur={() => setKeyword(localKeyword)}
        />
      </div>
      {keyword ? (
        <Suspense fallback={<SearchResultSkeleton />}>
          <SearchResult />
        </Suspense>
      ) : (
        <RecommendedProducts />
      )}
    </>
  );
}

export function SearchResult() {
  const searchResult = useSearchResult();
  return (
    <div className="w-full space-y-2 bg-section">
      <Section title={`Kết quả (${searchResult.length})`}>
        {searchResult.length ? (
          <div className="py-2 px-4 grid grid-cols-2 gap-4">
            {searchResult.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptySearchResult />
        )}
      </Section>
      {searchResult.length === 0 && <RecommendedProducts />}
    </div>
  );
}

export function RecommendedProducts() {
  const [recommendedProducts,_] = useProductsStore.recommendedProducts();
  return (
    <Section title="Gợi ý sản phẩm">
      <div className="py-2 px-4 flex space-x-2 overflow-x-auto">
        {recommendedProducts.map((product) => (
          <div
            className="flex-none"
            style={{ flexBasis: "calc((100vw - 48px) / 2)" }}
          >
            <ProductItem key={product.id} product={product} />
          </div>
        ))}
      </div>
    </Section>
  );
}
export function SearchResultSkeleton() {
  return (
    <Section title={`Kết quả`}>
      <div className="py-2 px-4 grid grid-cols-2 gap-4">
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
      </div>
    </Section>
  );
}


export function EmptySearchResult() {
  return (
    <div className="p-6 space-y-4 flex flex-col items-center">
      <SearchIconLarge />
      <div className="text-inactive text-center text-2xs">
        Không có sản phẩm bạn tìm kiếm
      </div>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
