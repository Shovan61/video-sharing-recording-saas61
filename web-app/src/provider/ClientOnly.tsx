import React, { useEffect } from "react";

export default function ClientOnly({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = React.useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	return <>{children}</>;
}
