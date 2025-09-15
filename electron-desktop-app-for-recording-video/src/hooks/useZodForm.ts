/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = (schema: any, defaultValue?: any) => {
	const {
		register,
		watch,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { ...defaultValue },
	});

	return { register, handleSubmit, errors, watch, reset };
};
