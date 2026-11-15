import React from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";
import { TextInput } from "../generic_components/TextInput";
import { TriCheckbox } from "../generic_components/TriCheckbox";
import { OpenFileTextInputWithButton } from "../generic_components/OpenFileTextInputWithButton";
import { isFolderReadable } from "../../util-renderer";

export const INPUT_DISPLAY_STYLES = makeReadonlyArraySet(["layout", "drawn"] as const);
export type InputDisplayStyle = ValidValues<typeof INPUT_DISPLAY_STYLES>;

function validatePercent(value: string) {
  if (typeof value !== "string" || value.trim() === "") {
    return true;
  }
  const number = Number(value.trim().replace(/%$/, ""));
  if (Number.isNaN(number) || number < 1 || number > 100) {
    return "Write a number between 1 and 100.";
  }
  return true;
}

function validatePosition(value: string) {
  if (typeof value !== "string" || value.trim() === "") {
    return true;
  }
  const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*[,; ]\s*(\d+(?:\.\d+)?)$/);
  if (match === null || Number(match[1]) > 100 || Number(match[2]) > 100) {
    return "Write left, top in % of the video, e.g. 2.5, 68";
  }
  return true;
}

function validateWidth(value: string) {
  const number = Number(String(value).trim());
  if (String(value).trim() === "" || Number.isNaN(number) || number < 0 || number > 40) {
    return "Write a number between 0 and 40.";
  }
  return true;
}

async function validateLayoutFolder(value: string) {
  if (typeof value !== "string" || value === "") {
    return true;
  }
  return isFolderReadable(value);
}

function ColourInput(props: {name: "input-display-button-colour" | "input-display-outline-colour", label: string}) {
  const {register} = useFormContextAutoTT();
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor={props.name}>{props.label}</label>
      <div className="start-label-contents">
        <input type="color" id={props.name} className="input-display-colour" {...register(props.name)}/>
      </div>
    </div>
  );
}

function Note(props: {children: React.ReactNode}) {
  return (
    <div className="grid-contents">
      <div className="start-label"></div>
      <div className="start-label-contents">
        <p className="form-input-notes">{props.children}</p>
      </div>
    </div>
  );
}

export function InputDisplayOptionsInput() {
  const style = useWatchAutoTT({name: "input-display-style"});
  const isDrawn = style === "drawn";

  return (
    <>
      <div className="grid-contents">
        <label className="start-label">Input display style: </label>
        <div className="start-label-contents">
          <DeselectableRadioButtonGroup name="input-display-style">
            <DeselectableRadioButton labelValue="Layout images (PNG)" id="input-display-style-layout" value="layout"/>
            <DeselectableRadioButton labelValue="Drawn (like Ghost Input Display)" id="input-display-style-drawn" value="drawn"/>
          </DeselectableRadioButtonGroup>
        </div>
      </div>
      {isDrawn ? <>
        <TextInput name="input-display-line-width" startLabel="Line width:" validate={validateWidth} placeholder="5"/>
        <TextInput name="input-display-outline-width" startLabel="Outline width:" validate={validateWidth} placeholder="4"/>
        <ColourInput name="input-display-button-colour" label="Button colour:"/>
        <ColourInput name="input-display-outline-colour" label="Outline colour:"/>
        <Note>
          Drawn by the recorder at the exact size it has in the video, so it stays sharp. Widths are in the
          pixels of a 285x233 input display (Ghost Input Display's Line Width and Outline Width) and grow with the size.
        </Note>
      </> : <>
        <OpenFileTextInputWithButton name="input-display-layout-classic" startLabel="Custom GCN/Classic layout folder (optional):"
          dialogId="input-display-layout" dialogType="open-folder" fileFilters={[]} validate={validateLayoutFolder} notRequired={true}/>
        <OpenFileTextInputWithButton name="input-display-layout-nunchuck" startLabel="Custom Nunchuck layout folder (optional):"
          dialogId="input-display-layout" dialogType="open-folder" fileFilters={[]} validate={validateLayoutFolder} notRequired={true}/>
        <Note>
          A folder with config.json and its PNGs, like layouts/nunchuck. It is used where it is, so updates can't overwrite it. Leave empty for the built-in layout.
        </Note>
      </>}
      <TextInput name="input-display-size" startLabel="Input display size (optional):" notRequired={true}
        placeholder={isDrawn ? "% of the video height, default 29" : "% of the video height"} validate={validatePercent}/>
      <TextInput name="input-display-position" startLabel="Input display position (optional):" notRequired={true}
        placeholder={isDrawn ? "left, top in %, default 2.5, 68.3" : "left, top in % of the video"} validate={validatePosition}/>
      <div className="grid-contents">
        <label className="start-label" htmlFor="input-display-hide-box">Hide input box: </label>
        <div className="start-label-contents">
          <TriCheckbox name="input-display-hide-box" nameAsId={true}/>
        </div>
      </div>
      <Note>
        Size is the height of the input display in % of the video height; the width follows its shape. Position is its
        top-left corner. Leave them empty for the usual place{isDrawn ? " (bottom-left, like rPB)" : ""}.
      </Note>
    </>
  );
}
