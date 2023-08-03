import Messages from "./Messages";
import { SocketProvider } from "./SocketContext";

function App() {
	return (
		<SocketProvider>
			<Messages />
		</SocketProvider>
	);
}

export default App;
