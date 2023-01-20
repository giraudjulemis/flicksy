import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MailIcon from "@mui/icons-material/Mail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Home from "@mui/icons-material/Home";

const SideDrawer = ({ users, signOutUser }) => {
  const [state, setState] = useState(false);
  return (
    <>
      <DehazeIcon className="drawer_btn" onClick={() => setState(true)} />
      <Drawer anchor="right" open={state} onClose={() => setState(false)}>
        <Box sx={{ width: 200 }}>
          <List>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={() => setState(false)}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              component={RouterLink}
              to="/contact"
              onClick={() => setState(false)}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
            {!users.auth ? (
              <ListItemButton
                component={RouterLink}
                to="/auth"
                onClick={() => setState(false)}
              >
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  signOutUser();
                  setState(false);
                }}
              >
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            )}

            <>
              <Divider />
              {users.auth ? (
                <ListItemButton
                  component={RouterLink}
                  to="/dashboard"
                  onClick={() => {
                    setState(false);
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              ) : null}
            </>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideDrawer;
