import { z } from "zod";

export const updateStudioSchema = z.object({
	screen: z.string(),
	audio: z.string(),
	preset: z.enum(["HD", "SD"]),
});
