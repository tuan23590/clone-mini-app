import { useMatches } from "react-router-dom";

export function useRouteHandle() {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];

  return [lastMatch.handle, lastMatch, matches];
}
