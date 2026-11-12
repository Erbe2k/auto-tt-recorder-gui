import React from "react";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";
import { TriCheckbox } from "../generic_components/TriCheckbox";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const ENCODE_CPU_USAGES = makeReadonlyArraySet(["all", "75", "50", "25"] as const);
export type EncodeCPUUsage = ValidValues<typeof ENCODE_CPU_USAGES>;

export function EncodeCPUUsageInput() {
  return (
    <>
      <div className="grid-contents">
        <label className="start-label" htmlFor="encode-cpu-usage">Encoding CPU usage: </label>
        <div className="start-label-contents">
          <DeselectableDropdown name="encode-cpu-usage" nameAsId={true} errorBelow={true}
            formInputNotesContents={<>Less CPU &#8594; the PC stays usable, but the encoding takes longer.</>}
          >
            <option value="all">All of the CPU (fastest)</option>
            <option value="75">75%</option>
            <option value="50">50%</option>
            <option value="25">25% (slowest)</option>
          </DeselectableDropdown>
        </div>
      </div>
      <div className="grid-contents">
        <label className="start-label" htmlFor="encode-low-priority">Low priority encoding: </label>
        <div className="start-label-contents">
          <TriCheckbox name="encode-low-priority" nameAsId={true}/>
          <span className="form-input-notes"> Other programs come first, so the PC does not lag while it encodes.</span>
        </div>
      </div>
    </>
  );
}
