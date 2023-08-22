import React, { useContext, Fragment, useEffect } from "react";
import "./App.css";
import {
	Box,
	Typography,
	Grid,
	List,
	ListItem,
	AppBar,
	Toolbar,
	CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import icon from "./assets/Icon.png";
import { Link } from "react-router-dom";
import { AuthContext, SocketContext } from "./contexts";

function Auth() {
	const navigate = useNavigate();
	const { isAuthenticated } = useContext(AuthContext);
	const { sessionId } = useContext(SocketContext);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated]);

	return (
		<Fragment>
			<AppBar position="sticky">
				<Toolbar>
					<img
						src={icon}
						width="30px"
						alt="Deku Icon"
						style={{
							marginRight: 10,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					/>
					<Typography variant="h6">Deku Messaging</Typography>
				</Toolbar>
			</AppBar>

			<Box sx={{ p: 15 }}>
				<Grid
					container
					spacing={2}
					display={"flex"}
					justifyContent="center"
					alignItems={"center"}
				>
					<Grid item xs={12} md={5}>
						<Typography variant="h4" sx={{ p: 2 }}>
							Welcome to Deku Messaging
						</Typography>
						<Typography variant="body2" sx={{ p: 2, color: "text.secondary" }}>
							Connect with friends and family securely.
						</Typography>
						<List sx={{ p: 2 }}>
							<ListItem>1. Open the Deku Messaging app on your phone</ListItem>
							<ListItem>
								2. Tap the menu icon and select Device Pairing
							</ListItem>
							<ListItem>3. Scan the QR code on this device</ListItem>
						</List>
						<Typography variant="body2" sx={{ p: 2, color: "text.secondary" }}>
							Don't have Deku Messaging on your phone?{" "}
							<Link
								to="https://smswithoutborders.com"
								style={{
									color: "#0288D1",
									textDecoration: "underline",
									marginRight: 10,
								}}
							>
								Install Deku Messaging
							</Link>
						</Typography>
					</Grid>

					<Grid item xs={12} md={4}>
						<Box
							p={2}
							display={"flex"}
							borderRadius={8}
							bgcolor={"white"}
							justifyContent={"center"}
							alignItems={"center"}
							width={320}
							height={320}
							mx={"auto"}
						>
							{sessionId ? (
								<QRCode title="DekuMessaging" value={sessionId} size={320} />
							) : (
								<CircularProgress />
							)}
						</Box>
						<Box sx={{ p: 2 }}>
							<Typography textAlign={"center"}>{sessionId}</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>

			<AppBar
				position="fixed"
				color="primary"
				sx={{ px: 20, top: "auto", bottom: 0 }}
			>
				<Toolbar>
					<Link
						style={{ marginRight: 70, color: "white" }}
						to="https://smswithoutborders.com"
					>
						Privacy
					</Link>{" "}
					<Link
						style={{ marginRight: 70, color: "white" }}
						to="https://smswithoutborders.com"
					>
						Terms
					</Link>{" "}
					<Link style={{ color: "white" }} to="https://smswithoutborders.com">
						Feedback
					</Link>
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}

export default Auth;
