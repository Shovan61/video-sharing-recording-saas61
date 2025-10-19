import React, { useEffect, useRef } from "react";

function Webcam() {
  const camElement = useRef<HTMLVideoElement | null>(null);

  const streamWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
   
    if (camElement.current) {
      camElement.current.srcObject = stream;
      await camElement.current.play();
    }
  };

  useEffect(() => {
    streamWebcam();
  }, []);

  return (
    <>
      <video
        ref={camElement}
        className="h-40 draggable object-cover !rounded-full aspect-video border-2 relative border-white"
      />
    </>
  );
}

export default Webcam;
