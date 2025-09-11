import "./App.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ControlLayout from "./layouts/ControlLayout";
import AuthButton from "./components/Global/AuthButton";
import Widget from "./components/Global/Widget";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ControlLayout >
				<AuthButton />
				<Widget />
			</ControlLayout>
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;
