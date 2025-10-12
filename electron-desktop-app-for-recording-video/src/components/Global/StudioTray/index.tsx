import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

export function StudioTray() {
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const [preview, setPreview] = useState<boolean>(false);
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

  return (
    <div className="flex flex-col justify-end gap-y-5 h-screen draggable">
      <video
        autoPlay
        className={cn("w-6/12 self-end h-10 border-2", preview ? "hidden" : "")}
        ref={videoElement}
      />
      <div className="rounded-full flex justify-around items-center h-20 w-full border-2 bg-[#171717] draggable border-white/40">
        <div></div>
      </div>
      <div className="h-20" />
    </div>
  );
}
