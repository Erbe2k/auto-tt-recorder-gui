import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";
import { Top10LocationCountryInput } from "./Top10LocationCountryInput";

export const TOP_10_GECKO_CODE_LOCATION_REGIONS = makeReadonlyArraySet(["worldwide", "europe", "country"] as const);
export type Top10GeckoCodeLocationRegion = ValidValues<typeof TOP_10_GECKO_CODE_LOCATION_REGIONS>;

export function Top10GeckoCodeLocationInput() {
  const {getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);
  const [top10GeckoCodeLocationRegion, setTop10GeckoCodeLocationRegion] = useState(getValues("top-10-gecko-code-location-region"));

  function updateTop10GeckoCodeLocationRegion() {
    setTop10GeckoCodeLocationRegion(getValues("top-10-gecko-code-location-region"));
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-gecko-code-location-region">Globe location: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="top-10-gecko-code-location-region" errorBelow={true} onChange={updateTop10GeckoCodeLocationRegion}>
          <DeselectableRadioButton labelValue="Worldwide:" id="top-10-gecko-code-location-region-ww" value="worldwide"/>
          <DeselectableRadioButton labelValue="Europe:" id="top-10-gecko-code-location-region-europe" value="europe"/>
          <DeselectableRadioButton labelValue="Country:" id="top-10-gecko-code-location-region-country" value="country"/>
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
      {top10GeckoCodeLocationRegion === "country"
        ? <Top10LocationCountryInput top10LocationRegion="country" geckoCodeLocation={true}/>
        : ""}
    </div>
  );
}
