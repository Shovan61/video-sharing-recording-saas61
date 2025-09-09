/* eslint-disable @typescript-eslint/no-empty-object-type */
import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import React from "react";

type Props = {};

function WorkspaceForm({}: Props) {
	const { isPending, errors, onFormSubmit, register } = useCreateWorkspace();

	return (
		<form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
			<FormGenerator
				inputType="input"
				placeholder="Enter a wrokspace name..."
				type="text"
				name="name"
				errors={errors}
				register={register}
				label="Workspace Name"
			/>
			<Button
				disabled={isPending}
				className="bg-white cursor-pointer text-black w-full font-semibold  rounded text-sm mt-2 "
				type="submit"
			>
				<Loader state={isPending}>Create Workspace</Loader>
			</Button>
		</form>
	);
}

export default WorkspaceForm;
