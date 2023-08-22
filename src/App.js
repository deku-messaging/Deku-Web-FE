import { MainProvider } from "./contexts";
import Layout from "./Layout";
import { ThreadList, ThreadView } from "./components";

const App = () => {
	return (
		<MainProvider>
			<Layout>
				<ThreadList />
				<ThreadView />
			</Layout>
		</MainProvider>
	);
};

export default App;
