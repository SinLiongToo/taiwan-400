# 台灣四百年 · Taiwan: Four Centuries

An animated, bilingual (中文 / English) history of Taiwan from 1600 to 2026: who ruled, how far state control reached across the island, and how the population changed. A separate feature page follows the February 28 Incident of 1947 day by day.

**Live pages**

- 台灣四百年 · Taiwan: Four Centuries — https://sinliongtoo.github.io/taiwan-400/
- 二二八事件 1947 · The February 28 Incident — https://sinliongtoo.github.io/taiwan-400/228.html

## What's on the pages

**台灣四百年 (main page)**

- A dot map of Taiwan colored by ruling power: Dutch, Spanish, Zheng, Qing, Republic of Formosa, Japan and the ROC, plus Indigenous self-rule.
- A ruler card with portraits of every governor, emperor and president.
- A state-control curve, a population-by-group chart, and 51 key events.
- A built-in recorder that exports the animation as a 1920×1080 video.

**二二八事件 1947 (feature page)**

- A day-by-day map from February 27 to May 16, 1947, showing where unrest spread, where troops cracked down, and the purges that followed.
- Schematic troop movements, and a city-by-city table of when unrest and crackdown began.
- What came after, from martial law in 1949 to the voiding of convictions in 2018, along with the estimated death toll and further reading.

Both pages share a language switch with three modes: 中文, EN and 中英. Add `#zh`, `#en` or `#bi` to a URL to open it in that language.

## Files

| File | Purpose |
|---|---|
| `index.html` | GitHub Pages entry, generated from `taiwan-400.html` |
| `taiwan-400.html` | Main page source; also published as a claude.ai artifact |
| `228.html` | February 28 Incident feature page (standalone) |
| `portraits.js` | Ruler portraits from Wikimedia Commons, embedded as data |
| `build_pages.py` | Wraps `taiwan-400.html` into `index.html` |
| `fetch_portraits.py`, `recrop.py` | Re-download and crop the portraits |

After editing `taiwan-400.html`, run `python build_pages.py` and commit both files. `228.html` is a complete page and needs no build step.

## Changelog

### 2026-10-07: February 28 Incident feature

- Added `228.html`, a standalone page about the February 28 Incident:
  - A day-by-day map from 1947-02-27 to 05-16 with four phases: outbreak, spread and negotiation, military crackdown, and purges.
  - Unrest and crackdown dates for 13 cities, plus schematic troop movements, including the landing at Keelung and the march south.
  - 19 dated events, among them the shootings at the Chief Executive's office, the 32 Demands, the Battle of Wuniulan, and the executions of Tang De-zhang and Chen Cheng-po.
  - What came after, 1949–2018; the estimate of 18,000–28,000 deaths from the 1992 Executive Yuan report; and links for further reading.
  - The same 中文 / EN / 中英 switch as the main page, with the language choice shared between the two pages.
- Added a link card on the main page that leads to the feature.

### 2026-10-07: GitHub Pages

- Published the project on GitHub Pages.
- Added `build_pages.py`, which generates a standalone `index.html` with doctype, charset and viewport tags.
- Added `.nojekyll` and this README.
- Reset the body margin so the page sits edge to edge outside claude.ai.

### 2026-10-07: Bilingual 中文 / English

- Added a language switch with three modes: 中文, EN and 中英 (bilingual, the default).
- Translated every on-canvas text:
  - era descriptions and governing bodies;
  - 51 events;
  - place names that change over time, such as Tayouan → Tainan and Takao → Kaohsiung;
  - ruler roles and notes;
  - charts and legends.
- Reign years switch with the language, for example 昭和 6 年 / Shōwa 6.
- Videos are recorded in whichever language is selected. The choice is remembered and can be set with `#zh`, `#en` or `#bi`.

### 2026-10-06: Rulers and portraits

- Added a ruler card. It shows the top ruler of each period (Dutch governors, the Zheng kings, Qing emperors, the Republic of Formosa, Japanese governors-general and ROC presidents) together with a second figure, such as a Qing provincial governor, the Japanese emperor or a provincial chairman.
- Added 50 portraits from Wikimedia Commons, all public domain or freely licensed. Full-length paintings were cropped to the face. Sources and licenses are listed on the page, and rulers without a free portrait get a name card instead.

### 2026-10-06: First version

- Built a canvas animation for 1600–2026:
  - a dot map of ruling powers and Indigenous land;
  - a state-control model, such as the Qing frontier moving north and Japan's push into the mountains;
  - population by group;
  - geography: the Taijiang lagoon silting up, railways, high-speed rail and the Tropic of Cancer.
- Added an era timeline and playback controls, and a recorder that exports MP4/WebM video.

## Notes

The control areas are a schematic model, not exact borders. Population figures are estimates: censuses from 1905 on, scholarly estimates before that. On the 228 page, some city dates are approximate and the troop routes are schematic. Portraits come from Wikimedia Commons; each image's source and license is listed on the page.
