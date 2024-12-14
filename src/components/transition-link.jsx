import { NavLink } from "react-router-dom";

/**
 * Wrapper component for view transition enabled Links, to stabilize the API.
 * @param {object} props - The props to be passed to the NavLink component
 * @returns {JSX.Element} - The wrapped NavLink component with view transition enabled
 */
export default function TransitionLink(props) {
  return <NavLink {...props} unstable_viewTransition />;
}
