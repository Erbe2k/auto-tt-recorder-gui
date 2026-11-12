import React from "react";
import { TextInput } from "../generic_components/TextInput";

function validateGlobeZoomOut(value: string) {
  if (typeof value !== "string" || value.trim() === "") {
    return true;
  }
  if (!/^\d+(?:\.\d+)?$/.test(value.trim())) {
    return "Write a number from 0 to 100.";
  }
  const zoomOut = Number(value.trim());
  if (zoomOut < 0 || zoomOut > 100) {
    return "Write a number from 0 to 100.";
  }
  return true;
}

export function GlobeZoomOutInput() {
  return (
    <>
      <TextInput name="top-10-globe-zoom-out" startLabel="Country view zoom-out (optional):" notRequired={true}
        placeholder="0 to 100, e.g. 30" validate={validateGlobeZoomOut}/>
      <div className="grid-contents">
        <div className="start-label"></div>
        <div className="start-label-contents">
          <p className="form-input-notes">
            Moves the camera further from the country: 0 or empty = game default, 100 = as far as the continent view. Try 20 to 40 for a small zoom-out. PAL and NTSC-U discs only.
          </p>
        </div>
      </div>
    </>
  );
}
