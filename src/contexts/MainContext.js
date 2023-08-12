import React, { useState, useContext, createContext } from "react";
import { SocketContext } from "./SocketContext";
import { groupThreads, sortThreads } from "../utils/threadUtils";

const MainContext = createContext();

const MainProvider = ({ children }) => {
	const { messages, isConnected } = useContext(SocketContext);

	const threads = sortThreads(groupThreads(messages));

	const [selectedThread, setSelectedThread] = useState(null);
	const [threadId, setThreadId] = useState("");

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
		</MainContext.Provider>
	);
};

export { MainContext, MainProvider };
