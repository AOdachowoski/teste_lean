"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginForm from "./components/LoginForm";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9747FF",
    },
    secondary: {
      main: "#6a6a6a",
    },
  },
});

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <LoginForm />
      </main>
    </ThemeProvider>
  );
};

export default Login;
