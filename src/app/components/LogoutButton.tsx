import React from "react";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      endIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{ textTransform: "none" }}
    >
      Sair
    </Button>
  );
};

export default LogoutButton;
