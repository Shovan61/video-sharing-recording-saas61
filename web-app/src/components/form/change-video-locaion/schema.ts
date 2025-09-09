import * as z from "zod";

export const moveFolderSchema = z.object({
	folder_id: z.string().optional(),
	workspace_id: z.string(),
});
