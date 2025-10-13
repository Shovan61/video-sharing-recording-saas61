import { hidePluginWindow } from "./utils";
import { v4 as uuid } from "uuid";

let videoTransferFileName: string | undefined;
let mediaRecorder: MediaRecorder;

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
