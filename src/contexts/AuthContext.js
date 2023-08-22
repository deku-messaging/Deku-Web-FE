import { createContext, useState, useEffect } from "react";
import storage from "../utils/storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const sessionId = storage.getFromStorage("from_session_id");

		if (sessionId) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);
	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
