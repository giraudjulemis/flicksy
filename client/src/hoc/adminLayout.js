import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const AdminLayout = (props) => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <div className="row adminLayout">
        <nav className="col-md-2 d-none d-md-block sidebar">
          <div>
            <List>
              <ListItemButton
                LinkComponent={RouterLink}
                to="/dashboard/profile"
              >
                <ListItemText primary="Profile" />
              </ListItemButton>
              {users.data.role === "admin" ? (
                <>
                  <ListItemButton
                    LinkComponent={RouterLink}
                    to="/dashboard/articles"
                  >
                    <ListItemText primary="Articles" />
                  </ListItemButton>
                </>
              ) : null}
            </List>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          {props.children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
