import { SocketProvider, MainProvider } from "./contexts";
import Layout from "./Layout";
import { ThreadList, ThreadView } from "./components";

const App = () => {
	return (
		<SocketProvider>
			<MainProvider>
				<Layout>
					<ThreadList />
					<ThreadView />
				</Layout>
			</MainProvider>
		</SocketProvider>
	);
};

export default App;
