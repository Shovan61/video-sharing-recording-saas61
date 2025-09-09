import { CreateWorkspace } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";
import { useZodForm } from "./useZodForm";
import { workspaceSchema } from "@/components/form/workspace-form/schema";

export const useCreateWorkspace = () => {
	const { isPending, mutate } = useMutationData(
		["create-workspace"],
		(data: { name: string }) => {
			return CreateWorkspace(data.name);
		},
		"user-workspaces"
	);

	const {errors, onFormSubmit, register} = useZodForm(mutate, workspaceSchema);

	return { isPending, onFormSubmit, register, errors };
};
