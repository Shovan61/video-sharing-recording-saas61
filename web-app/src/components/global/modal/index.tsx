import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
	trigger: React.ReactNode;
	children: React.ReactNode;
	title: string;
	description: string;
	className?: string;
};

function Modal({ trigger, children, className, title, description }: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-neutral-900">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}

export default Modal;
