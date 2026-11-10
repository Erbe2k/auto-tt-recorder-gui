import React, { useEffect, useState } from "react";
import { FileFilter } from "electron";

import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { AutoTTRecConfigFormPathnameArgName } from "../../auto-tt-rec-form-field-types";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";
import { Top10LocationCountryInput } from "./Top10LocationCountryInput";
import { GlobePositionInput } from "./GlobePositionInput";
import { GlobeZoomOutInput } from "./GlobeZoomOutInput";


type Top10MultiSequence = "single" | "country-regional" | "country-regional-worldwide" | "regional-worldwide";
type MultiTop10CodeFilename =
  | "top-10-country-gecko-code-filename"
  | "top-10-regional-gecko-code-filename"
  | "top-10-worldwide-gecko-code-filename";

const top10CodeFileFilters: FileFilter[] = [
  {name: "Text files", extensions: ["txt"]}
];

export function Top10MultipleGeckoCodeInput(props: {isAutoTTRecRunning: boolean}) {
  const {register, getValues, setValue, setError, clearErrors} = useFormContextAutoTT();
  const sequence = useWatchAutoTT({name: "top-10-multi-sequence"});
  const isMultiple = sequence !== "single" && sequence !== "<FILLME>";
  const [lastMultiSequence, setLastMultiSequence] = useState<Top10MultiSequence>(
    sequence === "regional-worldwide" || sequence === "country-regional" ? sequence : "country-regional-worldwide"
  );

  useEffect(() => {
    if (sequence === "country-regional" || sequence === "country-regional-worldwide" || sequence === "regional-worldwide") {
      setLastMultiSequence(sequence);
    }
  }, [sequence]);

  function toggleMultiple(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setValue("top-10-multi-sequence", lastMultiSequence, {shouldTouch: true, shouldValidate: true});
    } else {
      if (isMultiple) {
        setLastMultiSequence(sequence as Top10MultiSequence);
      }
      setValue("top-10-multi-sequence", "single", {shouldTouch: true, shouldValidate: true});
    }
  }

  async function chooseCodeFile(fieldName: MultiTop10CodeFilename, label: string) {
    const result = await window.api.openFileDialogAndRead(
      top10CodeFileFilters,
      getValues(fieldName),
      "top-10-gecko-code",
      `${label} Top 10 Gecko code`
    );

    if (result.errorMessage !== "") {
      setError(fieldName, {type: "custom", message: result.errorMessage});
    } else if (result.filename !== "") {
      clearErrors(fieldName);
      setValue(fieldName, result.filename, {shouldTouch: true});
    }
  }

  function renderCodeFile(fieldName: MultiTop10CodeFilename, label: string) {
    return (
      <div className="grid-contents" key={fieldName}>
        <label className="start-label" htmlFor={fieldName}>{label} Gecko code:</label>
        <div className="start-label-contents">
          <input id={fieldName} type="text" readOnly {...register(fieldName as AutoTTRecConfigFormPathnameArgName, {
            validate: (value) => {
              const activeSequence = getValues("top-10-multi-sequence");
              const required = fieldName === "top-10-country-gecko-code-filename"
                ? activeSequence === "country-regional" || activeSequence === "country-regional-worldwide"
                : fieldName === "top-10-regional-gecko-code-filename"
                  ? activeSequence !== "single"
                  : activeSequence === "country-regional-worldwide" || activeSequence === "regional-worldwide";
              return !required || (typeof value === "string" && value.trim() !== "") || `Select the ${label.toLowerCase()} Top 10 Gecko code file.`;
            }
          })}/>
          <button type="button" disabled={props.isAutoTTRecRunning} onClick={() => chooseCodeFile(fieldName, label)}>Browse…</button>
          <button type="button" disabled={props.isAutoTTRecRunning} onClick={() => {
            clearErrors(fieldName);
            setValue(fieldName, "", {shouldTouch: true});
          }}>Clear</button>
          <SimpleErrorMessage name={fieldName}/>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid-contents top-10-multiple-toggle">
        <label className="start-label" htmlFor="top-10-multiple-enabled">Video sequence:</label>
        <div className="start-label-contents">
          <label htmlFor="top-10-multiple-enabled">
            <input
              id="top-10-multiple-enabled"
              type="checkbox"
              checked={isMultiple}
              disabled={props.isAutoTTRecRunning}
              onChange={toggleMultiple}
            />
            Record multiple Top 10 screens in one video
          </label>
          {isMultiple ? (
            <div className="top-10-multiple-sequence-choice">
              <label htmlFor="top-10-multi-sequence">Order:</label>
              <select id="top-10-multi-sequence" disabled={props.isAutoTTRecRunning} {...register("top-10-multi-sequence")}>
                <option value="country-regional-worldwide">Country → Regional → Worldwide</option>
                <option value="country-regional">Country → Regional</option>
                <option value="regional-worldwide">Regional → Worldwide</option>
              </select>
            </div>
          ) : <input type="hidden" {...register("top-10-multi-sequence")}/>}
        </div>
      </div>
      {sequence === "country-regional-worldwide" ? <>
        {renderCodeFile("top-10-country-gecko-code-filename", "Country")}
        <Top10LocationCountryInput top10LocationRegion="country" geckoCodeLocation={true} label="Country shown on the globe: "/>
        <GlobePositionInput/>
        <GlobeZoomOutInput/>
        {renderCodeFile("top-10-regional-gecko-code-filename", "Regional")}
        {renderCodeFile("top-10-worldwide-gecko-code-filename", "Worldwide")}
      </> : sequence === "country-regional" ? <>
        {renderCodeFile("top-10-country-gecko-code-filename", "Country")}
        <Top10LocationCountryInput top10LocationRegion="country" geckoCodeLocation={true} label="Country shown on the globe: "/>
        <GlobePositionInput/>
        <GlobeZoomOutInput/>
        {renderCodeFile("top-10-regional-gecko-code-filename", "Regional")}
      </> : sequence === "regional-worldwide" ? <>
        {renderCodeFile("top-10-regional-gecko-code-filename", "Regional")}
        {renderCodeFile("top-10-worldwide-gecko-code-filename", "Worldwide")}
        <GlobePositionInput/>
      </> : null}
    </>
  );
}
