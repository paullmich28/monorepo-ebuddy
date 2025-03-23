"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavbarDrawer from "./NavbarDrawer";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { Props } from "@/model/types";
import { auth } from "@/apis/firebaseConfig";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { persistor } from "@/store/store";

export default function NavbarDashboard(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      persistor.purge();
      router.push("/login");
    } catch (error) {}
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ backgroundColor: "common.black" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontWeight: 600,
              }}
            >
              LOGO
            </Typography>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                gap: 2,
              }}
            >
              <Button
                variant={"contained"}
                color={"error"}
                sx={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  paddingX: 2,
                }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "none" },
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          <NavbarDrawer
            handleDrawerToggle={handleDrawerToggle}
            navItems={["Logout"]}
          />
        </Drawer>
      </nav>
    </Box>
  );
}
