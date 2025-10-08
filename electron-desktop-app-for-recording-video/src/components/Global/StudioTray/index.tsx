import * as React from "react";

export function StudioTray() {
  let initialTime = new Date();
  return (
    <div className="flex flex-col justify-end gap-y-5 h-screen draggable">
      <span className="text-4xl text-blue-800">Studio App</span>
      <video src=""></video>
    </div>
  );
}
