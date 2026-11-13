import React, { memo, useState, ReactElement, useEffect } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";

import { NoTop10CategoryLayout, NoTop10Category } from "./choice_layouts/NoTop10CategoryLayout";
import { Top10ChadsoftLayout } from "./main_layouts/Top10ChadsoftLayout";
import { Top10GeckoCodeLayout } from "./main_layouts/Top10GeckoCodeLayout";

import useRenderCounter from "../../RenderCounter";
import { FormComplexity } from "./FormComplexityLayout";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

export const TIMELINE_CATEGORIES = makeReadonlyArraySet(["notop10", "top10chadsoft", "top10gecko"] as const);
export type TimelineCategory = ValidValues<typeof TIMELINE_CATEGORIES>;

function doesNoTop10CategoryNeedsToAdjustToGhostonly(formComplexity: FormComplexity, timelineCategory: TimelineCategory, noTop10Category: NoTop10Category) {
  if (formComplexity < FormComplexity.ALL && timelineCategory === "notop10" && noTop10Category === "noencode") {
    return true;
  } else {
    return false;
  }
}

export function TimelineCategoryLayout(props: {
  isAutoTTRecRunning: boolean,
  formComplexity: FormComplexity,
  unrenderFormToggle: boolean,
  validateAndDisplayFormErrorsViaSubmitSync: () => void,
}) {
  const {setValue} = useFormContextAutoTT();
  const timelineCategory = useWatchAutoTT({name: "timeline-category"});
  const renderCounter = useRenderCounter(false, "TimelineCategoryInput");
  let noTop10Category = useWatchAutoTT({name: "no-top-10-category"});
  const isFlapRun = useWatchAutoTT({name: "run-type"}) === "flap";

  // a flap run needs a Top 10 with lap times: only a Gecko code can give that
  useEffect(() => {
    if (isFlapRun && timelineCategory === "top10chadsoft") {
      setValue("timeline-category", "top10gecko", {shouldTouch: true});
    }
  }, [isFlapRun, timelineCategory]);

  let shouldAdjustToGhostonly = doesNoTop10CategoryNeedsToAdjustToGhostonly(props.formComplexity, timelineCategory, noTop10Category);
  if (shouldAdjustToGhostonly) {
    setValue("no-top-10-category", "ghostonly", {shouldTouch: true});
    noTop10Category = "ghostonly";
  }

  return (
    <div>
      <DeselectableRadioButtonGroup name="timeline-category" notDeselectable={true} onChange={props.validateAndDisplayFormErrorsViaSubmitSync}>
        <DeselectableRadioButton labelValue="No Top 10:" id="timeline-category-no-top-10" value="notop10"/>
        {!isFlapRun ? <DeselectableRadioButton labelValue="Top 10 from Chadsoft: " id="timeline-category-top-10" value="top10chadsoft"/> : ""}
        <DeselectableRadioButton labelValue="Top 10 from Gecko Code: " id="timeline-category-top-10-manual" value="top10gecko"/>
      </DeselectableRadioButtonGroup>
      {isFlapRun ? <p className="form-input-notes flap-top10-note">Flap run: a Top 10 can only come from a Gecko code, made with lap times (e.g. on tt-rec.com). A Chadsoft Top 10 lists race times.</p> : ""}
      {renderCounter}
      <hr className="section-divider"/>
      {
        !props.unrenderFormToggle ? (
          timelineCategory === "notop10" ? <NoTop10CategoryLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity} noTop10Category={noTop10Category} validateAndDisplayFormErrorsViaSubmitSync={props.validateAndDisplayFormErrorsViaSubmitSync}/>
          : timelineCategory === "top10chadsoft" && !isFlapRun ? <Top10ChadsoftLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
          : timelineCategory === "top10gecko" ? <Top10GeckoCodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
          : ""
        ) : ""
      }
    </div>
  );
}
