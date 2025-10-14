import { useStudioSettings } from "@/hooks/useStudioSettings";
import { Profile, SourceDevices } from "@/type";
import { Headphones, Loader, Monitor, Settings2 } from "lucide-react";

type Props = {
  state: SourceDevices;
  profile: Profile;
};

function MideaConfiguration({ state, profile: { user } }: Props) {
  const activeScreen = state.displays?.find(
    (screen) => screen.id === user?.studio?.screen
  );
  const activeAudio =
    state?.audioInputs &&
    state?.audioInputs.find((audio) => audio.deviceId === user?.studio?.mic);

  const { isPending, onPreset, register } = useStudioSettings({
    id: user?.id as string,
    screen: user?.studio?.screen || state.displays?.[0]?.id,
    audio: user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
    plan: user?.subscription?.plan,
    preset: user?.studio?.preset,
  });

  console.log(user, "================user in media configuration component");

  return (
    <form action="" className="flex h-full relative w-full flex-col gap-y-5">
      {isPending && (
        <div className="fixed z-50 w-full left-0 ring-0 bottom-0 rounded-2xl h-full bg-black/80 flex justify-center items-center">
          <Loader className="h-5 w-5 animate-spin" />
        </div>
      )}
      <div className="flex gap-x-5 justify-center items-center">
        <Monitor fill="#575655" color="#575655" size={36} />
        <select
          {...register("screen")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#57655] bg-transparent w-full"
        >
          {state.displays?.map((display, key) => (
            <option
              value={display.id}
              selected={activeScreen && activeScreen.id === display.id}
              className="bg-[#171717] cursor-pointer"
              key={key}
            >
              {display.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-x-5 justify-center items-center">
        <Headphones color="#575655" size={36} />
        <select
          {...register("audio")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#57655] bg-transparent w-full"
        >
          {state.audioInputs?.map((device, key) => (
            <option
              value={device.deviceId}
              selected={activeAudio && activeAudio.deviceId === device.deviceId}
              className="bg-[#171717] cursor-pointer"
              key={key}
            >
              {device.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-x-5 justify-center items-center">
        <Settings2 color="#575655" size={36} />
        <select
          {...register("preset")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#57655] bg-transparent w-full"
        >
          <option
            value={"HD"}
            selected={onPreset === "HD" || user?.studio?.preset === "HD"}
            className="bg-[#171717] cursor-pointer"
            disabled={user?.subscription?.plan === "FREE"}
          >
            1080p
            {user?.subscription?.plan === "FREE" && "Upgrade to PRO plan"}
          </option>
          <option
            value={"SD"}
            selected={onPreset === "SD" || user?.studio?.preset === "SD"}
            className="bg-[#171717] cursor-pointer"
            disabled={user?.subscription?.plan === "PRO"}
          >
            720p
          </option>
        </select>
      </div>
    </form>
  );
}

export default MideaConfiguration;
