"use client";

import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "../components/AppBar";
import Listagem from "../components/Listagem";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9747FF",
    },
    secondary: {
      main: "#515151",
    },
  },
});

const Page: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("Clientes");

  return (
    <ThemeProvider theme={theme}>
      <AppBar activePage={activePage} setActivePage={setActivePage} />
      <Listagem />
    </ThemeProvider>
  );
};

export default Page;
