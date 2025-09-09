/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
	type: "text" | "email" | "number" | "password";
	inputType: "select" | "input" | "textarea";
	options?: { value: string; label: string; id: string }[];
	label?: string;
	placeholder: string;
	register: UseFormRegister<any>;
	name: string;
	errors: FieldErrors<FieldValues>;
	lines?: number;
};

function FormGenerator({
	type,
	inputType,
	name,
	errors,
	placeholder,
	register,
	label,
	lines,
	options,
}: Props) {
	switch (inputType) {
		case "input":
			return (
				<Label
					className="flex flex-col gap-2 text-gray-300 items-start"
					htmlFor={`input-${label}`}
				>
					{label && label}
					<Input
						placeholder={placeholder}
						id={`input-${label}`}
						type={type}
						className="bg-transparent border-gray-400 text-gray-300"
						{...register(name)}
					/>
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<p className="text-rose-400 mt-2">
								{message}
							</p>
						)}
					/>
				</Label>
			);
		case "select":
			return (
				<Label
					className="flex flex-col gap-2 text-gray-600"
					htmlFor={`input-${label}`}
				>
					{label && label}
					<select
						id={`select-${label}`}
						className="bg-transparent w-full border-gray-400 text-gray-300"
						{...register(name)}
					>
						{options?.length &&
							options.map((option) => (
								<option
									value={option.value}
									key={option.id}
									className="dark:bg-[#f4f4f5]"
								>
									{option.label}
								</option>
							))}
					</select>
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<p className="text-rose-400 mt-2">
								{message}
							</p>
						)}
					/>
				</Label>
			);
		case "textarea":
			return (
				<Label
					className="flex flex-col gap-2 text-gray-300"
					htmlFor={`input-${label}`}
				>
					{label && label}
					<Textarea
						placeholder={placeholder}
						id={`input-${label}`}
						rows={lines}
						className="bg-transparent border-gray-400 text-gray-300"
						{...register(name)}
					/>
					<ErrorMessage
						errors={errors}
						name={name}
						render={({ message }) => (
							<p className="text-rose-400 mt-2">
								{message}
							</p>
						)}
					/>
				</Label>
			);

		default:
			break;
	}
}

export default FormGenerator;
