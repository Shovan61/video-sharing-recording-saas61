import React from "react";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Props = {
	title: string;
	descripttion: string;
	children?: React.ReactNode;
	footer?: React.ReactNode;
};

function GlobalCard({ title, descripttion, children, footer }: Props) {
	return (
		<Card className="w-full max-w-sm bg-transparent mt-4">
			<CardHeader className="p-4">
				<CardTitle className="mb-2">{title}</CardTitle>
				<CardDescription className="text-xs">{descripttion}</CardDescription>
				<CardAction></CardAction>
			</CardHeader>
			{children && <CardContent>{children}</CardContent>}
			{footer && <CardFooter className="flex-col gap-2">{footer}</CardFooter>}
		</Card>
	);
}

export default GlobalCard;
