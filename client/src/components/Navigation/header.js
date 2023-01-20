import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../../store/reducers/notifications";
import { showToast } from "../../utils/helper";
import { signOut } from "../../store/actions/users";
import SideDrawer from "./sideNavigation";

const Header = () => {
  const users = useSelector((state) => state.users);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    let { global } = notifications;
    if (notifications && global.error) {
      const msg = global.msg ? global.msg : "Error";
      showToast("ERROR", msg);
      dispatch(clearNotifications());
    }
    if (notifications && global.success) {
      const msg = global.msg ? global.msg : "Success";
      showToast("SUCCESS", msg);
      dispatch(clearNotifications());
    }
  }, [notifications]);

  const signOutUser = () => {
    dispatch(signOut());
  };

  return (
    <nav className="navbar fixed-top">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center fredoka_ff"
      >
        Flicksy
      </Link>
      <SideDrawer users={users} signOutUser={signOutUser} />
    </nav>
  );
};

export default Header;
