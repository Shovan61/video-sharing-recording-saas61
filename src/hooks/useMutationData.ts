import { MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
	mutationKey: MutationKey,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	mutationFn: MutationFunction<any, any>,
	queryKey?: string,
	onSuccess?: () => void
) => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey,
		mutationFn: mutationFn,
		onSuccess: (data) => {
			if (onSuccess) onSuccess();
			return toast.message(data?.status === 200 ? "Succes" : "Error", {
				description: data?.message,
			});
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
	});

	return { mutate, isPending };
};
