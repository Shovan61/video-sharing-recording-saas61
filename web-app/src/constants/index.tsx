import { HomeIcon, File, Bell, CreditCard, Settings } from "lucide-react";
import React from "react";

export const MENU_ITEMS = (
	workspaceId: string
): {
	title: string;
	href: string;
	icon: React.ReactNode;
}[] => [
	{ title: "Home", href: `/dashboard/${workspaceId}/home`, icon: <HomeIcon /> },
	{ title: "My Library", href: `/dashboard/${workspaceId}`, icon: <File /> },
	{ title: "Notifications", href: `/dashboard/${workspaceId}/notifications`, icon: <Bell /> },
	{ title: "Billing", href: `/dashboard/${workspaceId}/billing`, icon: <CreditCard /> },
	{ title: "Settings", href: `/dashboard/${workspaceId}/settings`, icon: <Settings /> },
];
