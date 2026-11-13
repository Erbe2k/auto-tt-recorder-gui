import React from "react";
import { useWatchAutoTT } from "../../use-form-context-auto-tt";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";
import { TriCheckbox } from "../generic_components/TriCheckbox";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const RUN_TYPES = makeReadonlyArraySet(["normal", "flap"] as const);
export type RunType = ValidValues<typeof RUN_TYPES>;

export function RunTypeInput() {
  const runType = useWatchAutoTT({name: "run-type"});

  return (
    <div className="run-type">
      <div className="grid-contents">
        <label className="start-label run-type__label">Run type: </label>
        <div className="start-label-contents">
          <DeselectableRadioButtonGroup name="run-type">
            <DeselectableRadioButton labelValue="Normal run" id="run-type-normal" value="normal"/>
            <DeselectableRadioButton labelValue="Flap run (fastest lap)" id="run-type-flap" value="flap"/>
          </DeselectableRadioButtonGroup>
        </div>
      </div>
      {runType === "flap" ? <>
        <p className="run-type__note">
          Records the ghost's fastest lap, read from the ghost file. If it is lap 1, the race starts as
          usual; for a later lap, the race video starts 3 seconds before it. 4 seconds after the lap the
          video dissolves to the ghost crossing the finish line and ends like a normal run (if the
          fastest lap is the last one, the race just finishes). The ghost screen shows the lap time.
        </p>
        <div className="run-type__option">
          <TriCheckbox name="flap-fade-in" nameAsId={true}/>
          <label htmlFor="flap-fade-in"> Fade in where the lap video starts (laps 2 and 3)</label>
        </div>
      </> : ""}
    </div>
  );
}
