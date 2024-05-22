import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  Avatar,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Preloader from "./Preloader";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redRoute, setRedRoute] = useState(false);
  const router = useRouter();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setShowEmailError(false);
    setShowPasswordError(false);
    setError("");

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard-cliente",
      redirect: redRoute,
    })
      .then((result) => {
        if (result?.error) {
          if (result?.status === 401 || result?.error === "CredentialsSignin") {
            setShowEmailError(true);
            setShowPasswordError(true);
            setError("Credenciais inválidas. Por favor, tente novamente.");
          }
        } else {
          setRedRoute(!redRoute);
          router.push("/dashboard-cliente");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      })
      .finally(() => {
        setLoading(false);
        setRedRoute(!redRoute);
      });
  }
  return (
    <form onSubmit={login}>
      <Box sx={{ position: "relative" }}>
        {loading && <Preloader />}
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
                gap={2}
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
                  Bem-vindo(a){" "}
                </Typography>
                <Typography variant="h6" mb={3}>
                  Acesse sua conta para iniciar a sessão
                </Typography>
                <TextField
                  label="Email"
                  type="email"
                  margin="normal"
                  fullWidth
                  name="email"
                  error={showEmailError}
                  helperText={
                    showEmailError
                      ? "Email não encontrado. Confira e tente novamente."
                      : ""
                  }
                />
                <TextField
                  label="Senha"
                  type="password"
                  margin="normal"
                  name="password"
                  fullWidth
                  error={showPasswordError}
                  helperText={
                    showPasswordError
                      ? "Senha incorreta. Por favor, verifique e tente novamente."
                      : ""
                  }
                />
                <Link href="/password" variant="subtitle1">
                  Esqueceu a senha?
                </Link>
                {error && <Typography color="error">{error}</Typography>}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ textTransform: "none", marginTop: "30px" }}
                  size="large"
                  type="submit"
                >
                  Acessar Plataforma
                </Button>
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
      </Box>
    </form>
  );
}
