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
            <li>All regions are supported for normal recordings, including NTSC-K.</li>
            <li>Multiple Top 10 screens in one video, the moving globe views and the country view zoom-out need a PAL or NTSC-U disc. On NTSC-J and NTSC-K they are not tested yet and the globe stays still.</li>
            <li>Supports almost all features from the non-GUI program</li>
          </ul>
          <h3 className="troubleshooting-header">New in {versions.AUTO_TT_RECORDER_GUI_VERSION}:</h3>
          <ul className="auto-tt-rec-troubleshooting">
            <li>Multiple Top 10 screens in one video (Country → Regional, Regional → Worldwide, Country → Regional → Worldwide), all in the same Dolphin session.</li>
            <li>Globe location for a Top 10 Gecko code: Worldwide, Regional (pick the region) or Country.</li>
            <li>Globe centre (latitude, longitude) and country view zoom-out to fix or adjust the camera.</li>
            <li>Encoding CPU usage and Low priority encoding, under Quality settings.</li>
            <li>Light and night theme, in Other program settings.</li>
          </ul>
          <h3 className="troubleshooting-header">Troubleshooting below:</h3>
          <ul className="auto-tt-rec-troubleshooting">
            <li>Download VLC to fix audio problems with the video: <a href="https://www.videolan.org/">https://www.videolan.org</a></li>
            <li>PC slow while the video encodes: lower "Encoding CPU usage" (the encode takes longer).</li>
            <li>Globe camera off-centre: fill in "Globe centre" with coordinates from Google Maps (right-click a place to copy them).</li>
            <li>Join the <a href=" https://discord.gg/6FqfpnqP57">Discord</a> for any questions:</li>
            <li>Source Code (for GUI): <a href="https://github.com/luckytyphlosion/auto-tt-recorder-gui">https://github.com/luckytyphlosion/auto-tt-recorder-gui</a>. The changes in this version are in the source_multi_top10 folder.</li>
          </ul>
          <h3 className="troubleshooting-header">Template explanation:</h3>
          <ul className="auto-tt-rec-troubleshooting">
            <li>To save time when recording ghosts with similar settings, create a template.</li>
            <li>Leave all fields blank which you want to fill in every time you record.</li>
            <li>Radio (circle) buttons, checkboxes, file select inputs, and dropdowns can be made blank by right-clicking them.</li>
            <li>Export the template using the "Export template..." button.</li>
            <li>You can now import that template using the "Import template..." button.</li>
            <li>Alternatively, set the options to be pre-filled with the last opened template via the "Last opened template" radio button below.</li>
          </ul>
        </div>
      </details>
    </header>
  );
}
