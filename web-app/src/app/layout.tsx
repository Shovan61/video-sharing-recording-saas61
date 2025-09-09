import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/theme";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import ReactQueryProvider from "@/react-query";
import ReduxProvider from "@/redux/provider";

const manrope = Manrope({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Video share",
	description: "Share AI powered video with your friends",
	icons: {
		icon: "/metadata.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${manrope.className} bg-[#171717]`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<ReduxProvider>
							<ReactQueryProvider>
								{children}
							</ReactQueryProvider>
						</ReduxProvider>
					</ThemeProvider>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
