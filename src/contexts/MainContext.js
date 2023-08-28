import React, { useState, useContext, createContext, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	DialogActions,
	Typography,
	Grid,
	Slide,
} from "@mui/material";
import { SocketContext } from "./SocketContext";
import { groupThreads, sortThreads } from "../utils/threadUtils";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DoneIcon from "@mui/icons-material/Done";

const MainContext = createContext();

const MainProvider = ({ children }) => {
	const { messages, isConnected } = useContext(SocketContext);
	const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
	const [notificationPermission, setNotificationPermission] = useState(
		Notification.permission
	);
	const [showNotificationMessage, setShowNotificationMessage] = useState(false);

	const threads = sortThreads(groupThreads(messages));

	const [selectedThread, setSelectedThread] = useState(null);
	const [threadId, setThreadId] = useState("");

	const requestNotificationPermission = () => {
		setShowNotificationMessage(true);

		Notification.requestPermission().then((permission) => {
			setNotificationPermission(permission);
			setNotificationDialogOpen(false);
		});
	};

	const closeNotificationDialog = () => {
		setNotificationDialogOpen(false);
	};

	useEffect(() => {
		if ("Notification" in window && notificationPermission === "default") {
			setNotificationDialogOpen(true);
		}
	}, [notificationPermission]);

	return (
		<MainContext.Provider
			value={{
				threads,
				threadId,
				setThreadId,
				selectedThread,
				setSelectedThread,
				isConnected,
			}}
		>
			{children}
			<Dialog
				open={notificationDialogOpen}
				onClose={closeNotificationDialog}
				maxWidth={"md"}
				TransitionComponent={Slide}
				TransitionProps={{ direction: "up" }}
			>
				<DialogTitle>Turn on Notifications</DialogTitle>
				<DialogContent dividers>
					<Grid container spacing={2} alignItems="center">
						<Grid item>
							{showNotificationMessage ? (
								<DoneIcon color="primary" fontSize="large" />
							) : (
								<NotificationsActiveIcon color="primary" fontSize="large" />
							)}
						</Grid>
						<Grid item>
							{showNotificationMessage ? (
								<Typography>
									You've enabled notifications. You'll now receive updates.
								</Typography>
							) : (
								<Typography>
									Get notified of new messages on your computer.
								</Typography>
							)}
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					{showNotificationMessage ? (
						<Button onClick={closeNotificationDialog} color="primary">
							Got it!
						</Button>
					) : (
						<Button onClick={requestNotificationPermission} color="primary">
							Enable Notifications
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</MainContext.Provider>
	);
};

export { MainContext, MainProvider };
