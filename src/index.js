import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import Auth from "./Authenticate";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Index() {
	const router = createBrowserRouter([
		{
			path: "/auth",
			element: <Auth />,
		},
		{
			path: "/",
			element: <App />,
		},
	]);

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
		<ThemeProvider theme={theme}>
			<React.StrictMode>
				<CssBaseline />
				<RouterProvider router={router} />
			</React.StrictMode>
		</ThemeProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);

reportWebVitals();
