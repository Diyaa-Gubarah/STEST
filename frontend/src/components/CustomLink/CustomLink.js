import "./CustomLink.css";

import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ to = "", children }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} className={!match?'not__active__style':"active__style"}>
      {children}
    </Link>
  );
};

export default CustomLink;
