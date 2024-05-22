// components/CustomAppBar.tsx
import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Typography } from "@mui/material";
import Link from "next/link";
import UserMenu from "./UserMenu";
import NavigationMenu from "./Navigation";

interface CustomAppBarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const pages = ["Clientes", "Endereços", "Entregas"];

export default function CustomAppBar({
  activePage,
  setActivePage,
}: CustomAppBarProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: "#fff" }}>
      <Container style={{ maxWidth: "100%" }}>
        <Toolbar disableGutters style={{ minHeight: "0px" }}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img alt="Logo" src="/img/logo-lean-saude.png" width={60} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color="primary" />
            </IconButton>
            <NavigationMenu
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              pages={pages}
            />
          </Box>
          <Box
            component="a"
            href="/dashboard-cliente"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img alt="Logo" src="/img/logo-lean-saude.png" width={40} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                href="/dashboard-cliente"
                key={page}
                style={{
                  color: activePage === page ? "#9747FF" : "#6a6a6a",
                  padding: "20px 30px",
                }}
                className={activePage === page ? "active-link" : ""}
                onClick={() => setActivePage(page)}
              >
                {page}
              </Link>
            ))}
          </Box>

          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
