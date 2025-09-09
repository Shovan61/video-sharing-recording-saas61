"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
	children: React.ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// With SSR, we usually want to set some default staleTime
						// above 0 to avoid refetching immediately on the client
						staleTime: 60 * 1000,
					},
				},
			})
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
