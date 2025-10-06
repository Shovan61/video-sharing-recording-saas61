import { updateStudioSchema } from "@/schemas/updateStudioSchema";
import { useZodForm } from "./useZodForm";
import { useMutation } from "@tanstack/react-query";
import { updateStudioSettings } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type StudioSettingsProps = {
	id: string;
	screen?: string | null;
	audio?: string | null;
	preset?: "HD" | "SD";
	plan?: "PRO" | "FREE";
};

export const useStudioSettings = ({ id, audio, plan, preset, screen }: StudioSettingsProps) => {
	const [onPreset, setpreset] = useState<"HD" | "SD" | undefined>(undefined);
	const { register, watch } = useZodForm(updateStudioSchema, {
		screen: screen!,
		audio: audio!,
		preset: preset!,
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ["update-studio"],
		mutationFn: (data: {
			screen: string;
			id: string;
			audio: string;
			preset: "HD" | "SD";
		}) => updateStudioSettings(data.screen, data.id, data.audio, data.preset),
		onSuccess: () =>
			toast("Success!", {
				description: "Updated studio Successfully",
				style: { backgroundColor: "white", color: "black" },
			}),
		onError: () => {
			toast("Failed!", {
				description: "Update Failed",
				style: { backgroundColor: "white", color: "black" },
			});
		},
	});

	useEffect(() => {
		if (screen && audio && preset) {
			window.ipcRenderer.send("media-sources", {
				screen,
				id: id,
				audio,
				preset,
				plan,
			});
		}
	}, []);

	useEffect(() => {
		const subscribe = watch((values) => {
			setpreset(values.preset);
			mutate({
				screen: values.screen!,
				id: id,
				audio: values.audio!,
				preset: values.preset!,
			});

			window.ipcRenderer.send("media-sources", {
				screen: values.screen,
				id: id,
				audio: values.audio,
				preset: values.preset,
				plan,
			});
		});

		return () => subscribe.unsubscribe();
	}, [watch]);

	return { register, isPending, onPreset };
};
