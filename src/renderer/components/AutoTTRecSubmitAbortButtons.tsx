import React from "react";

import useRenderCounter from "../RenderCounter";

function AutoTTRecSubmitAbortButtons(props: {
  isAutoTTRecRunning: boolean,
  onAbortCallback: (event: React.MouseEvent<HTMLButtonElement>) => void,
  setRunAutoTTRecOnSubmitCallback: () => void
}) {
  const renderCounter = useRenderCounter(false, "AutoTTRecSubmitAbortButtons");

  // disabled={this.state.isAutoTTRecRunning}
  return (
    <div className="action-bar__buttons">
      <button type="submit" className="btn btn--record" onClick={() => {
        console.log("onClick in submit button");
        props.setRunAutoTTRecOnSubmitCallback();
      }} disabled={props.isAutoTTRecRunning}>Record!</button>
      <button type="button" className="btn btn--abort" disabled={!props.isAutoTTRecRunning} onClick={props.onAbortCallback}>Abort</button>
      {renderCounter}
    </div>
  );
}

export default AutoTTRecSubmitAbortButtons;
