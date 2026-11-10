import React from "react";
import { TextInput } from "../generic_components/TextInput";

function validateGlobePosition(value: string) {
  if (typeof value !== "string" || value.trim() === "") {
    return true;
  }
  const match = value.trim().match(/^(-?\d+(?:\.\d+)?)\s*[,;]\s*(-?\d+(?:\.\d+)?)$/);
  if (match === null) {
    return "Write latitude, longitude in degrees, e.g. 42.8, 12.6";
  }
  const latitude = Number(match[1]);
  const longitude = Number(match[2]);
  if (latitude < -90 || latitude > 90) {
    return "Latitude must be between -90 and 90.";
  }
  if (longitude < -180 || longitude > 180) {
    return "Longitude must be between -180 and 180.";
  }
  return true;
}

export function GlobePositionInput() {
  return (
    <>
      <TextInput name="top-10-globe-position" startLabel="Globe centre (optional):" notRequired={true}
        placeholder="latitude, longitude, e.g. 42.8, 12.6" validate={validateGlobePosition}/>
      <div className="grid-contents">
        <div className="start-label"></div>
        <div className="start-label-contents">
          <p className="form-input-notes">
            Use it when the camera is off-centre: the globe is centred on these coordinates instead of the default point of the country or region.<br/>
            Degrees, south and west negative. In Google Maps, right-click a place to copy its coordinates. Leave empty for the default.
          </p>
        </div>
      </div>
    </>
  );
}
