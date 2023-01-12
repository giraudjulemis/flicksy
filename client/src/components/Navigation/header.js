import { Link } from "react-router-dom";
import SideDrawer from "./sideNavigation";

const Header = () => {
  return (
    <nav className="navbar fixed-top">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center fredoka_ff"
      >
        Flicksy
      </Link>
      <SideDrawer />
    </nav>
  );
};

export default Header;
