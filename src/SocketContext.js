import { createContext, useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

export const SocketContext = createContext();

const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export function SocketProvider(props) {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.onmessage = (event) => {
			const msg = event.data;
			const body = {
				id: uuidv4(),
				sender: "Sophia",
				recipient: "Me",
				message: msg,
				avatar: "",
				timestamp: new Date().toISOString(),
				status: "read",
			};
			setMessages((prevMsgs) => [...prevMsgs, body]);
		};
	}, []);

	function sendMessage(message) {
		socket.send(message);
	}

	return (
		<SocketContext.Provider value={{ messages, sendMessage }}>
			{props.children}
		</SocketContext.Provider>
	);
}
