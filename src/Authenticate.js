import React from "react";
import "./App.css";
import { Box, Typography, Grid, List, ListItem, AppBar } from "@mui/material";
import QRCode from "react-qr-code";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import icon from "./Icon.png";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Auth() {
  // Theme
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  //Theme End
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          sx={{
            p: 2,
            pb: 1,
            pl: 15,
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <img
              src={icon}
              width="30px"
              alt="Deku Icon"
              style={{ marginRight: 10 }}
            />
            <span>Deku Messaging</span>
          </Box>
        </AppBar>

        <Grid
          container
          spacing={2}
          padding={15}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={4}>
            <Typography
              variant="h4"
              sx={{
                p: 2,
              }}
            >
              Deku Messaging
            </Typography>
            <List>
              <ListItem>1. On your phone, open Deku messaging app </ListItem>
              <ListItem>
                2. Tap Menu from your conversation list and select Device
                pairing
              </ListItem>
              <ListItem>
                3. Tap QR code scanner and scan the code on this device{" "}
              </ListItem>
            </List>
            <Typography
              variant="body2"
              sx={{
                p: 2,
                color: "text.secondary",
              }}
            >
              Don't have Messages on your phone?{" "}
              <a href="#" style={{ color: "#9BBFF2" }}>
                Install Deku
              </a>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "white",
                width: "80%",
                borderRadius: "8%",
              }}
            >
              <QRCode
                title="DekuMessaging"
                value="smswithoutborders.com"
                size="100%"
              />
            </Box>
            <Box
              sx={{
                p: 2,
              }}
            >
              <Typography>
                Remember this computer <Switch {...label} />
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            p: 2,
            flexDirection: "column",
            wordSpacing: 50,
            color: "gray",
            pl: 15,
          }}
        >
          <Typography sx={{ typography: "body2" }}>
            <a className="footer" href="#">
              Privacy
            </a>{" "}
            <a className="footer" href="#">
              Terms
            </a>{" "}
            <a className="footer" href="#">
              Feedback
            </a>
          </Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Auth;
