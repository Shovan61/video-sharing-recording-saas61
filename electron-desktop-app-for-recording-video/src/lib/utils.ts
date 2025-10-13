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
    const enumeratedDevices =
      await window.navigator.mediaDevices.enumerateDevices();
    const audioInputs = enumeratedDevices.filter(
      (device) => device.kind === "audioinput"
    );
    console.log("getting sources");
    return { displays, audioInputs };
  } catch (error) {
    console.log(error, "Error while fetching media Resources getMediaSources");
    throw new Error("Error while fetching media Resources getMediaSources");
  }
};

export const updateStudioSettings = async (
  screen: string,
  id: string,
  audio: string,
  preset: string
) => {
  try {
    const response = await axiosInstance.post(`/studio/${id}`, {
      screen,
      audio,
      preset,
    });
    console.log("updated studio settings");
    return response.data;
  } catch (error) {
    console.log(error, "Error while updateStudioSettings");
    throw new Error("Error while updateStudioSettings");
  }
};

export const hidePluginWindow = (state: boolean) => {
  window.ipcRenderer.send("hide-plugin", state);
};

export const videoRecordingTime = (ms: number) => {
  if (typeof ms !== "number" || isNaN(ms) || ms < 0) {
    return { formatted: "00:00:00", minutes: 0 };
  }

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: any) => String(num).padStart(2, "0");

  return {
    formatted: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    minutes,
  };
};
