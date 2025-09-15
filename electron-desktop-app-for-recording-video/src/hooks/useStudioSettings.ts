import { updateStudioSchema } from "@/schemas/updateStudioSchema";
import { useZodForm } from "./useZodForm";
import { useMutation } from "@tanstack/react-query";

type StudioSettingsProps = {
	id: string;
	screen?: string | null;
	audio?: string | null;
	preset?: "HD" | "SD";
	plan?: "PRO" | "FREE";
};

export const useStudioSettings = ({ id, audio, plan, preset, screen }: StudioSettingsProps) => {
	const { register, watch } = useZodForm(updateStudioSchema, {
		screen: screen!,
		audio: audio!,
		preset: preset!,
	});

	const {} = useMutation({
		mutationKey: ["update-studio"],
		mutationFn: (data: {
			screen: string;
			id: string;
			audio: string;
			preset: "HD" | "SD";
		}) => updateStudioSettings(data.screen, data.id, data.audio, data.preset),
	});
};
