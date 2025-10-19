import { onStopRecording, StartRecording } from "@/lib/recorder";
import { cn, videoRecordingTime } from "@/lib/utils";
import { Cast, Pause, Square } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export function StudioTray() {
  const [onTimer, setOnTimer] = useState("00:00:00");
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [onSources, setOnSources] = useState<
    | {
        screen: string;
        id: string;
        audio: string;
        preset: "HD" | "SD";
        plan: "PRO" | "FREE";
      }
    | undefined
  >(undefined);

  window.ipcRenderer.on("profile-received", (event, payload) => {
    console.log(event);
    setOnSources(payload);
  });

  const clearTimeout = () => {
    setOnTimer("00:00:00");
  };

  useEffect(() => {
    if (!recording) return;

    const startTime = Date.now(); // store when recording started

    const recordingTimeInterval = setInterval(() => {
      const elapsed = Date.now() - startTime; // elapsed milliseconds since recording started

      const recordingTime = videoRecordingTime(elapsed);
      setOnTimer(recordingTime.formatted);

      // stop if free plan and reached 5 minutes
      if (onSources?.plan === "FREE" && recordingTime.minutes >= 5) {
        setRecording(false);
        clearTimeout();
        onStopRecording();
        clearInterval(recordingTimeInterval);
      }
    }, 1000); // update every second

    return () => clearInterval(recordingTimeInterval);
  }, [recording]);

  if (!onSources) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-end gap-y-5 h-screen draggable">
      <video
        autoPlay
        className={cn("w-6/12 self-end h-10 border-2", preview ? "hidden" : "")}
        ref={videoElement}
      />
      <div className="rounded-full flex justify-around items-center h-20 w-full border-2 bg-[#171717] draggable border-white/40">
        <div
          {...(onSources && {
            onClick: () => {
              setRecording(true);
              StartRecording(onSources);
            },
          })}
          className={cn(
            "no-drag rounded-full cursor-pointer relative hover:opacity-80",
            recording ? "bg-red-500 w-6 h-6" : "bg-red-400 w-8 h-8"
          )}
        >
          {recording && (
            <span className="absolute -right-16 top-1/2 traform translate-1/2 text-white bg-black py-0.5 px-2 rounded-lg">
              {onTimer}
            </span>
          )}
        </div>

        {!recording ? (
          <Pause
            className="no-drag opacity-50"
            size={32}
            fill="white"
            stroke="none"
          />
        ) : (
          <Square
            className="no-drag cursor-pointer hover:scale-110 transform transition duration-150"
            fill="white"
            onClick={() => {
              setRecording(false);
              clearTimeout();
              onStopRecording();
            }}
          />
        )}
        <Cast
          onClick={() => setPreview((prev) => !prev)}
          size={32}
          fill="white"
          className="no-drag cursor-pointer hover:opacity-60"
          stroke="white"
        />
      </div>
      <div className="h-4" />
    </div>
  );
}
