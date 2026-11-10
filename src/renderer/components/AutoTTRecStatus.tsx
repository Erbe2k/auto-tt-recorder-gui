import React, { useState } from "react";
import "../styles/components/AutoTTRecStatus.css";

import useRenderCounter from "../RenderCounter";

export function AutoTTRecStatus(props: {programStatusHeader: string | JSX.Element, programStatusDetails: string}) {
  const renderCounter = useRenderCounter(false, "AutoTTRecStatus");

  return (
    <section className="status-panel">
      <h2 className="status-panel__header">Status: {props.programStatusHeader}</h2>
      <textarea
        className="status-textarea" id="program-status-details" value={props.programStatusDetails}
        rows={10} cols={50} readOnly={true}
      ></textarea>
      {renderCounter}
    </section>
  );
}