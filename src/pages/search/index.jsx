import { useEffect, useRef, useState } from "preact/hooks";
import SearchBar from "../../components/search-bar";
import styled from "styled-components";

export default function SearchPage() {
  const inputRef = useRef(null);
  const [localKeyword, setLocalKeyword] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      // setKeyword("");
    };
  }, []);

  return (
    <>
      <Wrapper>
        <SearchBar
          ref={inputRef}
          value={localKeyword}
          onChange={(e) => {
            // setLocalKeyword(e.currentTarget.value)
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              // setKeyword(localKeyword);
            }
          }}
          onBlur={() => {
            // setKeyword(localKeyword)
          }}
        />
      </Wrapper>
      {keyword ? (
        <Suspense fallback={<SearchResultSkeleton />}>
          <SearchResult />
        </Suspense>
      ) : (
        //   <RecommendedProducts />
        <div>recommended products</div>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;
