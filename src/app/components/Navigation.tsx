// components/NavigationMenu.tsx
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

interface NavigationMenuProps {
  anchorElNav: null | HTMLElement;
  handleCloseNavMenu: () => void;
  pages: string[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  anchorElNav,
  handleCloseNavMenu,
  pages,
}) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      {pages.map((page) => (
        <MenuItem key={page} onClick={handleCloseNavMenu}>
          <Typography sx={{ fontSize: 14 }} textAlign="center">
            {page}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NavigationMenu;
