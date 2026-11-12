# Auto-TT-Recorder GUI v1.4.2: multiple Top 10 screens in one video + new look

Unofficial build based on [Auto-TT-Recorder GUI](https://github.com/luckytyphlosion/auto-tt-recorder-gui) by luckytyphlosion
(Auto-TT-Recorder v1.3.11). It adds a native multiple Top 10 sequence and a redesigned interface.

![New interface](docs/screenshots/gui-light.png)

## Highlights

- **Multiple Top 10 screens in one video, without restarting Dolphin.** Country → Regional, Regional → Worldwide and Country → Regional → Worldwide play one after the other in the same game session, with the game's own transitions, like on a real Wii.
- **The globe follows the ranking.** The country Top 10 shows the chosen country up close, the regional Top 10 the continent map and the worldwide Top 10 the whole globe. These are the same views the game uses on its ranking screen.
- **A country picker for the country Top 10.** It replaces the "Globe location" option in multiple Top 10 mode.
- **Manual globe centre.** If the camera is off-centre for a country, you can type the exact latitude/longitude to centre on.
- **Each list is correct.** Title, players, flags and the highlighted player change for every Top 10. Only the player from the current list is highlighted.
- **One continuous recording.** The whole sequence is a single take, with no cuts or splicing.
- **Redesigned interface** in Wii / Mario Kart Channel style, with a light/night mode switch (details below).

## Multiple Top 10 screens

### How to use it

1. Choose **Top 10 from Gecko Code**.
2. Tick **Record multiple Top 10 screens in one video** and pick the order:
   - Country → Regional → Worldwide
   - Country → Regional
   - Regional → Worldwide
3. Select one Gecko code file for each Top 10. Make them on [tt-rec.com/customtop10](https://www.tt-rec.com/customtop10).
4. With a country Top 10, pick the country in **Country shown on the globe**.
5. Optional: fill in **Globe centre** (see below) if the camera is not centred on the country.
6. Press **Record!**

### What the video shows

1. The first Top 10 list, after the usual Mario Kart Channel intro.
2. The list slides out, the game downloads the Top 10 again (as when you open it from the menu), and the next list slides in with its own title, players and highlight.
3. The globe changes view when the ranking changes:

   | Top 10 | Globe view |
   |---|---|
   | Country | Close-up of the chosen country |
   | Regional | Continent map centred on that location |
   | Worldwide | Whole globe |

4. After the last list, the ghost screen and "Watch Replay" follow as before.

The whole sequence is recorded in one Dolphin session, so the video is a single continuous take.

### Globe location

- **Country Top 10:** shows the country picked in the GUI. If none is picked, it uses the location stored in its own Gecko code.
- **Regional and worldwide Top 10:** use the location in their own Gecko code.
- **The old "Globe location" option** is hidden in multiple Top 10 mode, because one shared location for all screens was wrong.

### Globe centre (manual position)

Each country's default point is the one used by the Custom Top 10 codes, usually the capital. For large countries, or capitals far from the middle, the camera can look off-centre.

- **What to enter:** `latitude, longitude` in degrees, for example `42.8, 12.6`. South and west are negative.
- **Finding the coordinates:** in Google Maps, right-click a place and click the coordinates to copy them.
- **What it moves:** the country close-up, and the continent map that follows. The country flag stays the same.
- **Leave it empty** to use the country's default point.
- **Config/template key:** `top-10-globe-position: "42.8,12.6"`. Command line: `--top-10-globe-position 42.8,12.6`.

### Old behaviour

The previous behaviour (one Dolphin session per Top 10, joined afterwards) is still available. Add this line to the configuration/template:

```yaml
top-10-multi-sequence-transition: separate
```

## New interface

| Before | Light | Night |
|---|---|---|
| ![](docs/screenshots/gui-before.png) | ![](docs/screenshots/gui-light.png) | ![](docs/screenshots/gui-night.png) |

A look inspired by the Wii Menu and the Mario Kart Channel:

- **Background:** light grey with thin horizontal lines, like the Wii Menu.
- **Panels:** white, with rounded borders.
- **Colour:** Wii-blue accents.
- **Buttons:** rounded and glossy.
- **Channel-style header with a section menu:** ★ links that jump to each section of the form (Ghosts, Top 10, Music, Output...). The links follow the layout and the options you pick.
- **Original texts:** the notes, troubleshooting and template explanation are the original ones. They are in a panel you can open and close under the title.
- **Record bar:** **Record!** and **Abort** stay visible at the bottom of the window while you scroll.
- **Light and night mode:** pick it in the program settings (**Theme: Light / Night**). The choice is remembered; until you pick one, the GUI follows the Windows setting.

Every field, option and template works as before.

## Installation

1. Download the release and extract it, or extract `file_modificati_multi_top10.zip` over an existing Auto-TT-Recorder GUI folder, overwriting the files.
2. Start the GUI as usual. Nothing needs to be compiled.

The updated recording script (`_MKW_Play_Ghost.lua`) is copied into the GUI's Dolphin working copy (`%APPDATA%\Auto-TT-Recorder GUI\auto-tt-recorder-gui-working\dolphin`) automatically at the first multiple Top 10 recording.

## Compatibility and known limitations

- **Globe views need a PAL disc:** the zoom out and continent map work with PAL (RMCP01). On NTSC-U, NTSC-J and NTSC-K the lists still change in the same session, but the globe keeps its first view.
- **Unchanged features:** the single Top 10, Chadsoft Top 10 and No Top 10 modes are untouched.
- **Error handling:** if a transition does not happen within about 45 seconds, Dolphin closes with a clear message instead of hanging.

## Troubleshooting

Every multiple Top 10 recording writes a step-by-step log to `...\auto-tt-recorder-gui-working\dolphin\top10_multi_log.txt`. It is also printed in the GUI status box at the end. Please attach it to bug reports, together with the video.

## Changed files

| File | What changed |
|---|---|
| `auto-tt-recorder_v1.3.11_for_gui/bin/record_ghost/record_ghost.exe` | Backend: builds the multiple Top 10 session (only the `record_ghost` module inside the PyInstaller archive was replaced) |
| `auto-tt-recorder_v1.3.11_for_gui/dolphin/Sys/Scripts/_MKW_Play_Ghost.lua` | Recording script: drives the Top 10 transitions in Dolphin |
| `package.json`, `package-lock.json` | GUI version 1.4.2 |
| `src/renderer/...` | GUI source (see `source_multi_top10/gui_changes.patch`) |

## Technical details

For people who want to check or extend the work.

### The backend

`record_ghost.py` makes one Gecko code list for the whole session from the selected Top 10 codes. It also writes a data file for each screen: entries, title, highlighted row, globe view.

The PyInstaller executable was rebuilt by replacing only the `record_ghost` code object; every other entry is byte-identical.

### Game hooks (PAL)

| Gecko | Location | Purpose |
|---|---|---|
| `C260BFAC` | Top 10 download page | Loads the screen's entries into the ranking data |
| `C25CDDCC` | `TextBox_setMessage+0xCC` (message 0x1776) | Top 10 title |
| `C263DC48` | `LayoutUIControl_draw+0xC4` | Highlighted row (and clears the previous one) |
| `C26230D0` | `Section_calcActivation+0x68` | Page after the list: download again (0xAE) or ghost screen (0xAC) |
| `C25E45A8` | `GlobePage_onInit+0x20C` | Close-up framing for a country first screen |

### The routine in memory

A load routine at `0x80004000` (unused TRK vector area, written by the Lua script) copies the next screen into the ranking data. It then sets the globe view through the game's own `GlobePage` functions, as `RankingPage_onActivate` (`0x80615C8C`) does:

| View | Function |
|---|---|
| Continent | `0x805E6238(page, lat, lon)` |
| Whole globe | `0x805E5FE8(page)` |

The latitude and longitude are read with the game's getters `0x8054A9E0` / `0x8054AA08`.

### The Lua script

The Lua script waits for each list, presses B, waits for the next download and stops the dump at the end. It is written for Dolphin-Lua-Core, which runs it several times per frame, so every action is safe to repeat within a frame.

### Sources

The assembly for every payload is in `source_multi_top10/multi_top_10_payloads.s`. `build_multi_top_10_payloads.py` re-assembles it with keystone.

## Credits and license

- **Auto-TT-Recorder and Auto-TT-Recorder GUI:** © luckytyphlosion and contributors, GNU GPL v2 (the GUI is GPL-2.0-or-later).
- **Custom Top 10 Gecko codes:** made with [tt-rec.com](https://www.tt-rec.com/customtop10).
- **Function names:** the game function names come from the Mario Kart Wii decompilation projects.
- **License:** this build and its sources are released under the same licenses (GNU GPL v2). The full modified sources are in `source_multi_top10/` and `src/`.
