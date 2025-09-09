/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = (mutation: UseMutateFunction, schema: ZodSchema, defaultValue?: any) => {
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

	const onFormSubmit = handleSubmit(async (values) => {
		mutation({ ...values });
	});

	return { register, onFormSubmit, errors, watch, reset };
};
