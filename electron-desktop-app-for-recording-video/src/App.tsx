import "./App.css";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return <QueryClientProvider client={queryClient}>
		<span className="text-green-700 text-4xl font-bold">Desktop</span>
	</QueryClientProvider>;
}

export default App;
