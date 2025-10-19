import { hidePluginWindow } from "./utils";
import { v4 as uuid } from "uuid";

let videoTransferFileName: string | undefined;
let mediaRecorder: MediaRecorder;
let userId: string;

export const StartRecording = (onSources: {
  screen: string;
  audio: string;
  id: string;
}) => {
  hidePluginWindow(true);
  //   this is for file name
  videoTransferFileName = `${uuid}-${onSources.id.slice(0, 8)}.webm`;
  mediaRecorder.start(1000);
};

export const onStopRecording = () => mediaRecorder.stop();

export const selectSources = async (
  onSources: {
    screen: string;
    audio: string;
    id: string;
    preset: "HD" | "SD";
  },
  videoElements: React.RefObject<HTMLVideoElement>
) => {
  if (onSources && onSources.screen && onSources.audio && onSources.id) {
    const constrains: any = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: onSources.screen,
          minWidth: onSources.preset === "HD" ? 1920 : 1280,
          maxWidth: onSources.preset === "HD" ? 1920 : 1280,
          minHeight: onSources.preset === "HD" ? 1080 : 720,
          maxHeight: onSources.preset === "HD" ? 1080 : 720,
          frameRate: 30,
        },
      },
    };

    userId = onSources.id;

    // Get the display stream via Electron
    const screenStream = await (navigator.mediaDevices as any).getUserMedia(
      constrains
    );
    const audioStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: onSources?.audio
        ? { deviceId: { exact: onSources.audio } }
        : false,
    });

    if (videoElements && videoElements.current) {
      videoElements.current.srcObject = screenStream;
      await videoElements.current.play();
    }

    // merge both streams
    const combinedStream = new MediaStream([
      ...screenStream.getTracks(),
      ...audioStream.getTracks(),
    ]);

    // Create MediaRecorder instance
    mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: "video/webm; codecs=vp9",
    });

    // Socket setup
    // Capture chunks
    // mediaRecorder.ondataavailable = 
  }
};
