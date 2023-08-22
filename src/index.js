import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import Auth from "./Authenticate";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthProvider, AuthContext, SocketProvider } from "./contexts";

export default function Index() {
	const ProtectedRoute = ({ children, authenticate }) => {
		const { isAuthenticated } = useContext(AuthContext);

		if (authenticate && !isAuthenticated) {
			return <Navigate to="/auth" />;
		}

		if (!authenticate && isAuthenticated) {
			return <Navigate to="/" />;
		}

		return children;
	};

	const router = createBrowserRouter([
		{
			path: "/auth",
			element: (
				<ProtectedRoute authenticate={false}>
					<Auth />
				</ProtectedRoute>
			),
		},
		{
			path: "/",
			element: (
				<ProtectedRoute authenticate={true}>
					<App />
				</ProtectedRoute>
			),
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
				<AuthProvider>
					<SocketProvider>
						<RouterProvider router={router} />
					</SocketProvider>
				</AuthProvider>
			</React.StrictMode>
		</ThemeProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);

reportWebVitals();
