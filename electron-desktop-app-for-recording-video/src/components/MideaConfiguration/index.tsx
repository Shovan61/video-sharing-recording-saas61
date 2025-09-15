import { useStudioSettings } from "@/hooks/useStudioSettings";
import { Profile, SourceDevices } from "@/type";
import React from "react";

type Props = {
	state: SourceDevices;
	user: Profile;
};

function MideaConfiguration({ state, user }: Props) {
	const {} = useStudioSettings();
	return <form action="" className="flex h-full relative w-full flex-col gap-y-5"></form>;
}

export default MideaConfiguration;
