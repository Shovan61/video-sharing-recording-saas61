import { useStudioSettings } from "@/hooks/useStudioSettings";
import { Profile, SourceDevices } from "@/type";

type Props = {
	state: SourceDevices;
	profile: Profile;
};

function MideaConfiguration({ state, profile: { user } }: Props) {
	const activeScreen = state.displays?.find((screen) => screen.id === user?.studio?.screen);
	const activeAudio = state?.audioInputs.find(
		(audio) => audio.deviceId === user?.studio?.mic
	);
	
	const { isPending, onPreset, register } = useStudioSettings({
		id: user?.id as string,
		screen: user?.studio?.screen || state.displays?.[0]?.id,
		audio: user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
		plan: user?.subscription?.plan,
		preset: user?.studio?.preset,
	});
	return <form action="" className="flex h-full relative w-full flex-col gap-y-5"></form>;
}

export default MideaConfiguration;
