import React from "react";
import * as versions from "../../shared/versions";
import { SectionNav } from "./SectionNav";

export function GUIHeader() {
  return (
    <header className="channel-header">
      <div className="channel-header__title">
        <h1 className="title-header">Auto-TT-Recorder GUI ({versions.AUTO_TT_RECORDER_GUI_VERSION})</h1>
      </div>
      <SectionNav/>
      <details className="channel-notes">
        <summary>Notes, troubleshooting and template explanation</summary>
        <div className="auto-tt-rec-notes">
          <ul className="auto-tt-rec-notes-first-half">
            <li>All regions are supported, including NTSC-K.</li>
            <li>Supports almost all features from the non-GUI program</li>
          </ul>
          <h3 className="troubleshooting-header">Troubleshooting below:</h3>
          <ul className="auto-tt-rec-troubleshooting">
            <li>Download VLC to fix audio problems with the video: <a href="https://www.videolan.org/">https://www.videolan.org</a></li>
            <li>Join the <a href=" https://discord.gg/6FqfpnqP57">Discord</a> for any questions:</li>
            <li>Source Code (for GUI): <a href="https://github.com/luckytyphlosion/auto-tt-recorder-gui">https://github.com/luckytyphlosion/auto-tt-recorder-gui</a></li>
          </ul>
          <h3 className="troubleshooting-header">Template explanation:</h3>
          <ul className="auto-tt-rec-troubleshooting">
            <li>To save time when recording ghosts with similar settings, create a template.</li>
            <li>Leave all fields blank which you want to fill in every time you record.</li>
            <li>Radio (circle) buttons, checkboxes, file select inputs, and dropdowns can be made blank by right-clicking them.</li>
            <li>Export the template using the "Export Template..." button.</li>
            <li>You can now import that template using the "Import Template..." button.</li>
            <li>Alternatively, set the options to be pre-filled with the last opened template via the "Last opened template" radio button below.</li>
          </ul>
        </div>
      </details>
    </header>
  );
}
