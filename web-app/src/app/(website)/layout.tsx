import React from "react";
import LandingPageNavbar from "./_components/navbar";
import AuthCallbackPage from "../auth/callback/page";

type Props = {
	children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div className="flex flex-col py-2 xl:px-0 container">
			<LandingPageNavbar />
			<AuthCallbackPage> {children}</AuthCallbackPage>
		</div>
	);
};

export default Layout;
