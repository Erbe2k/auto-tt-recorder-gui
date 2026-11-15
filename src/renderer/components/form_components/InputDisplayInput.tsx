import React from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { InputDisplayOptionsInput } from "./InputDisplayOptionsInput";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

export const INPUT_DISPLAYS = makeReadonlyArraySet(["auto", "gcn", "nunchuck", "none"] as const);
export type InputDisplay = ValidValues<typeof INPUT_DISPLAYS>;

export function InputDisplayInput() {
  const inputDisplay = useWatchAutoTT({name: "input-display"});
  const hasInputDisplay = inputDisplay === "auto" || inputDisplay === "gcn" || inputDisplay === "nunchuck";

  return (
    <>
    <div className="grid-contents">
      <label className="start-label">Input Display: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="input-display" blockDisplay={true} errorBelow={true}>
          <DeselectableRadioButton labelValue="Auto detect (recommended)" id="input-display-gcn-classic" value="auto"/>
          <DeselectableRadioButton labelValue="GCN/Classic" id="input-display-gcn-classic" value="gcn"/>
          <DeselectableRadioButton labelValue="Nunchuck" id="input-display-nunchuck" value="nunchuck"/>
          <DeselectableRadioButton labelValue="None" id="input-display-none" value="none"/>
        </DeselectableRadioButtonGroup>
      </div>
    </div>
    {hasInputDisplay ? <InputDisplayOptionsInput/> : ""}
    </>
  );
}
