import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axiosInstance from "./axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const onCloseApp = () => window.ipcRenderer.send("closeApp");

export const fetchUserProfile = async (clerkId: string) => {
	try {
		const response = await axiosInstance.get(`/auth/${clerkId}`);
		return response.data;
	} catch (error) {
		console.log(error, "Error while fetching profile fetchUserProfile");
	}
};

export const getMediaSources = async () => {
	try {
		const displays = await window.ipcRenderer.invoke("getSources");
		const enumeratedDevices = await window.navigator.mediaDevices.enumerateDevices();
		const audioInputs = enumeratedDevices.filter(
			(device) => device.kind === "audioinput"
		);
		console.log("getting sources");
		return { displays, audioInputs };
		return;
	} catch (error) {
		console.log(error, "Error while fetching media Resources getMediaSources");
		throw new Error("Error while fetching media Resources getMediaSources");
	}
};
