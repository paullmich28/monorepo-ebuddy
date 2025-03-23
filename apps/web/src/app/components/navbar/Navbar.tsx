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
import { NavbarItems, Props } from "@/model/types";

const navItems: Array<NavbarItems> = [
  {
    id: 1,
    destination: "Login",
    buttonType: true,
    color: true
  },
  {
    id: 2,
    destination: "Register",
    buttonType: false,
    color: false
  }
]

function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
                fontWeight: 600
              }}
            >
              LOGO
            </Typography>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                gap: 2
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={item.buttonType ? "outlined" : "contained"}
                  color={item.color ? "primary" : "success"}
                  sx={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    paddingX: 2
                  }}
                  onClick={() => router.push(`${item.destination.toLowerCase()}`)}
                >
                  {item.destination}
                </Button>
              ))}
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
            navItems={["Login", "Register"]}
          />
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;
