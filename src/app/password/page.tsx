"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9747FF",
    },
  },
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    if (isEmailValid()) {
      setMessage("E-mail de recuperação enviado");
      setError("");
    } else {
      setError("Por favor, insira um e-mail válido");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              p={3}
              maxWidth={600}
              width="100%"
            >
              <Typography variant="h4">
                <img
                  alt="Logo"
                  src="/img/logo-lean-saude.png"
                  width={150}
                  className="position_image"
                />
                Esqueceu a Senha?
              </Typography>
              <Typography variant="body1" mb={3}>
                Insira o seu e-mail abaixo e enviaremos instruções para a
                recuperação da sua senha.
              </Typography>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
              />
              {error && <Typography color="error">{error}</Typography>}
              {message && <Typography color="primary">{message}</Typography>}
              <Button
                variant="contained"
                color="primary"
                onClick={handleForgotPassword}
                fullWidth
                sx={{ textTransform: "none", marginTop: "30px" }}
                size="large"
              >
                Enviar E-mail de Recuperação
              </Button>
              <Link href="/" variant="subtitle1" sx={{ marginTop: "20px" }}>
                Voltar para o Login
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            md={6}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(100deg, #a865ff, #8f61ca, #61ca8f)",
                animation: "gradient 5s ease infinite",
                backgroundSize: "300% 300%",
              }}
            >
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
