import {
	MutationFunction,
	MutationKey,
	useMutation,
	useMutationState,
	useQueryClient,
} from "@tanstack/react-query";
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
			if (data?.status === 200 || data?.status === 201) {
				toast("Success", {
					description: data?.message,
					style: { backgroundColor: "white", color: "black" },
				});
			} else {
				toast("❌Error❌", {
					description: data?.message,
					style: { backgroundColor: "white", color: "red" },
				});
			}
		},
		onError: (error) => {
			console.error("❌ Mutation failed:", error);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
	});

	return { mutate, isPending };
};

export const useMutationStateData = (mutationKey: MutationKey) => {
	const data = useMutationState({
		filters: { mutationKey },
		select: (mutation) => {
			return {
				variable: mutation.state.variables as { name: string; id: string },
				status: mutation.state.status,
			};
		},
	});

	const latestVariable = data[data.length - 1];

	return { latestVariable };
};
