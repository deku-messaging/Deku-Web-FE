import React, {
	createContext,
	useReducer,
	useEffect,
	useState,
	useCallback,
	useContext,
} from "react";
import { Snackbar, Alert, Button, Typography, Box } from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";
import iphoneding from "../assets/iphoneding.mp3";
import { AuthContext } from "./AuthContext";
import storage from "../utils/storage";

const SocketContext = createContext();

const SOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const messageReducer = (state, action) => {
	switch (action.type) {
		case "initial":
			return [...action.payload];
		case "received":
			const newMessage = action.payload.find(
				(message) => !state.some((prevMessage) => prevMessage.id === message.id)
			);

			if (newMessage) {
				const audio = new Audio(iphoneding);
				audio.play();
				new Notification(newMessage.displayName || newMessage.address, {
					body: newMessage.body,
					tag: newMessage.id,
					timestamp: newMessage.date,
					icon: "/Icon.png",
				});
				return [...state, newMessage];
			}
			return state;
		default:
			return state;
	}
};

const SocketProvider = ({ children }) => {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const [messages, dispatch] = useReducer(messageReducer, []);
	const [isConnected, setIsConnected] = useState(false);
	const [reconnectCountdown, setReconnectCountdown] = useState(null);

	const [sessionId, setSessionId] = useState(null);

	const reconnectInterval = 10000;

	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
		SOCKET_URL,
		{
			onOpen: () => {
				setIsConnected(true);
				setReconnectCountdown(0);
			},
			onClose: () => {
				setIsConnected(false);
				setReconnectCountdown(reconnectInterval / 1000);
			},
			onError: (error) => {
				setIsConnected(false);
			},
			shouldReconnect: () => {
				setIsConnected(false);
				setReconnectCountdown(reconnectInterval / 1000);
				return true;
			},
			reconnectAttempts: 5,
			reconnectInterval: reconnectInterval,
		}
	);

	const SendMessage = useCallback((content) => {
		console.log(content);
		sendJsonMessage(content);
	}, []);

	const handleReconnectClick = () => {
		window.location.reload();
	};

	useEffect(() => {
		if (lastJsonMessage !== null) {
			if (!isAuthenticated) {
				if (lastJsonMessage.session_id) {
					setSessionId(lastJsonMessage.session_id);
				}

				if (lastJsonMessage.from_session_id) {
					storage.setStorage(
						"from_session_id",
						lastJsonMessage.from_session_id
					);
					storage.setStorage("data", lastJsonMessage.data);
					setSessionId(null);
					setIsAuthenticated(true);
				}
			} else {
				if (messages.length > 0) {
					if (lastJsonMessage.data) {
						storage.setStorage("data", lastJsonMessage.data);
					}
					const data = storage.getFromStorage("data");
					dispatch({ type: "received", payload: data.smsList });
				} else {
					if (lastJsonMessage.data) {
						storage.setStorage("data", lastJsonMessage.data);
					}
					const data = storage.getFromStorage("data");
					dispatch({ type: "initial", payload: data.smsList });
				}
			}
		}
	}, [lastJsonMessage]);

	useEffect(() => {
		if (!isConnected) {
			const countdownInterval = setInterval(() => {
				setReconnectCountdown((prevCount) => Math.max(prevCount - 1, 0));
			}, 1000);

			return () => {
				clearInterval(countdownInterval);
			};
		}
	}, [isConnected]);

	const snackbarSeverity = isConnected ? "success" : "error";

	const snackbarContent = isConnected ? (
		<Box>
			<Typography variant="h6" component="div">
				Successfully Connected
			</Typography>
		</Box>
	) : (
		<Box width={350}>
			<Typography variant="h6" component="div">
				Bad internet or lost connection
			</Typography>
			<Typography variant="subtitle1" component="span">
				Your internet session was interrupted.
			</Typography>{" "}
			{!isConnected && reconnectCountdown > 0 && (
				<Typography variant="subtitle2" component="span">
					We'll try to reconnect you in {reconnectCountdown} seconds...
				</Typography>
			)}
			<Button
				color="inherit"
				variant="outlined"
				size="small"
				onClick={handleReconnectClick}
				sx={{ display: "block", mt: 1 }}
				disabled={readyState === ReadyState.CONNECTING}
			>
				{readyState === ReadyState.CONNECTING
					? "Connecting ..."
					: "Reconnect Now"}
			</Button>
		</Box>
	);
	return (
		<SocketContext.Provider
			value={{
				messages,
				isConnected,
				SendMessage,
				sessionId,
			}}
		>
			{children}
			<Snackbar
				open={!isConnected || reconnectCountdown > 0}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert elevation={6} variant="filled" severity={snackbarSeverity}>
					{snackbarContent}
				</Alert>
			</Snackbar>
		</SocketContext.Provider>
	);
};

export { SocketContext, SocketProvider };
