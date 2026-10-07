# 台灣四百年 · Taiwan: Four Centuries

An animated, bilingual (中文 / English) history of Taiwan from 1600 to 2026: who ruled, how far state control reached across the island, and how the population changed. A separate feature page, 二二八與白色恐怖 (228 and the White Terror), follows the February 28 Incident of 1947 day by day and the White Terror of 1949–1992 year by year.

**Live pages**

- 台灣四百年 · Taiwan: Four Centuries — https://sinliongtoo.github.io/taiwan-400/
- 余清芳與西來庵事件 · Yu Qingfang and the Tapani Incident — https://sinliongtoo.github.io/taiwan-400/tapani.html
- 二二八與白色恐怖 · 228 and the White Terror — https://sinliongtoo.github.io/taiwan-400/228.html

## What's on the pages

**台灣四百年 (main page)**

- A dot map of Taiwan colored by ruling power: Dutch, Spanish, Zheng, Qing, Republic of Formosa, Japan and the ROC, plus Indigenous self-rule.
- A ruler card with portraits of every governor, emperor and president.
- A state-control curve, a population-by-group chart, and 51 key events.
- A built-in recorder that exports the animation as a 1920×1080 video.

**余清芳與西來庵事件 1915 (feature page)**

- A day-by-day map of the Tainan hills from May 1915 to September 1916. It shows terrain, the Zengwen and Nanzixian rivers, and a locator map of Taiwan.
- The map covers the main places: Xilai Temple, Tapani (Yujing), Hutoushan, the Nanzhuang, Jiaxianpu and Aliguan police posts, Wanglai and Zhutouqi.
- Movements are drawn by type: rebel raids, flight, Japanese reinforcements, and prisoners taken to Tainan. An expanding zone marks the massacres around Tapani.
- People cards for Yu Qingfang, Luo Jun and Jiang Ding show each man's status as it changes. Special-court figures (1,957 indicted, 866 sentenced to death, 95 executed) appear as the trial unfolds.

**二二八與白色恐怖 (feature page, two chapters)**

- **Chapter 1: the 228 Incident, 1947.** A day-by-day map from February 27 to May 16, showing where unrest spread, where troops cracked down, and the purges that followed. It includes schematic troop movements and a city-by-city table of when unrest and crackdown began.
- **Chapter 2: the White Terror, 1949–1992.** A year-by-year map of prisons, execution grounds and political cases, with a zoomed inset of Taipei and a table of places and years. The chapter runs through four phases: the purges, silencing dissent, opposition and repression, and ending the laws. Each year shows the ROC year and the year of martial law.
- **The road to redress:** milestones from 1987 to 2018, the estimated 228 death toll, the 38 years of martial law, and further reading.

Both pages share a language switch with three modes: 中文, EN and 中英. Add `#zh`, `#en` or `#bi` to a URL to open it in that language.

## Files

| File | Purpose |
|---|---|
| `index.html` | GitHub Pages entry, generated from `taiwan-400.html` |
| `taiwan-400.html` | Main page source; also published as a claude.ai artifact |
| `tapani.html` | 余清芳與西來庵事件 feature page (standalone, portraits embedded) |
| `228.html` | 二二八與白色恐怖 feature page, two chapters (standalone) |
| `portraits.js` | Ruler portraits from Wikimedia Commons, embedded as data |
| `build_pages.py` | Wraps `taiwan-400.html` into `index.html` |
| `fetch_portraits.py`, `recrop.py` | Re-download and crop the portraits |

After editing `taiwan-400.html`, run `python build_pages.py` and commit both files. `228.html` is a complete page and needs no build step.

## Changelog

### 2026-10-07: References and fact check

- Added a **References / 參考資料** section to all three pages. Every book or report listed was checked against publisher or library records.
  - Main page: Andrade (2008), Shepherd (1993), Barclay (2018), the 1905 household census, Ministry of the Interior and Council of Indigenous Peoples statistics, 陳第《東番記》, the 228 research report, and Katz on the Tapani Incident.
  - 228 and the White Terror: the 1992/1994 Executive Yuan research report, the 2006 responsibility report, the 2022 Commission on Transitional Justice summary report, and the National Human Rights Museum.
  - Tapani: Katz (2005) and its Chinese edition (2006), 林衡道《余清芳抗日革命案全檔》, 涂順從《南瀛抗日誌》, and Wikipedia.
- Corrected the Tapani timeline against these sources:
  - Added the intercepted letters (May 21, 1915), the mass arrests (June 1), Yu Qingfang's "Grand Marshal" proclamation (July 6), and the arrest of Jiang Ding with all 272 of his men (May 18, 1916).
  - The rising now starts on July 6.
  - Court figures now show disagreement between sources: 866 sentenced to death (903 in some sources), and 95–132 executed.
  - Luo Jun's execution date is marked unknown.

### 2026-10-07: Yu Qingfang and the Tapani Incident

- Added `tapani.html`, **余清芳與西來庵事件 1915 · Yu Qingfang and the Tapani Incident**. The rising is called the 西來庵事件, 噍吧哖事件 and 玉井事件.
  - **Geography:** a zoomed terrain map of the Tainan hills with rivers, a Taiwan locator map, and 10 places. Police posts are crossed out once they are attacked.
  - **Time:** 14 dated events from the exposed plot in late May 1915 to Jiang Ding's execution in 1916, grouped into five phases: plot and manhunt, the rising, crackdown and massacres, the special court, and aftermath. The phase strip is non-linear, so the dense weeks of July–August 1915 get more room.
  - **Movement:** animated routes for Yu Qingfang's flight, the raids on Jiaxianpu, Aliguan and Nanzhuang, Japanese reinforcements to Tapani, and prisoners escorted to the Tainan court. An expanding zone marks the massacres.
  - **People:** status cards for Yu Qingfang, Luo Jun and Jiang Ding. The two public-domain prisoner photos come from Wikimedia Commons and are embedded in the page; Luo Jun gets a name card. Executed leaders turn grey.
  - **The court:** counters for 1,957 indicted, 866 sentenced to death and 95 executed, plus a note on the enthronement amnesty.
  - Background notes, an "afterward" list (1916–1930), sources, and the shared 中文 / EN / 中英 switch.
- Added a main-page card that links to the new feature.

### 2026-10-07: White Terror chapter

- Renamed the feature page from 二二八事件 1947 to **二二八與白色恐怖 · 228 and the White Terror**. It now has two chapters, each with its own animation and controls. Language selection moved to the top of the page.
- Added chapter 2, **白色恐怖 1949–1992**:
  - A year-by-year map of 15 places: prisons and detention centers (3 Qingdao East Road, Jingmei, Taiyuan, the Green Island New Life camp and Oasis Villa), the Machangding execution ground, and case sites.
  - A zoomed Taipei inset, so the many Taipei sites can be read.
  - 25 dated events, including the April 6 Incident, the Statute for Punishing Rebellion, the Luku Incident, the execution of Uyongu Yatauyungana, the Lei Chen case, the Formosan Self-Salvation Declaration, the Kaohsiung Incident, the Lin family murders, the Chen Wen-chen case, Nylon Deng's self-immolation, and the 1991–92 repeal of the sedition laws.
  - Four phases, and a subtitle with the ROC year and the year of martial law.
- Merged the follow-up lists into one "road to redress" (1987–2018). Added the 1998 compensation law for White Terror victims and the National Human Rights Museum. Added a 38-years-of-martial-law panel and new reading links.
- The main page's feature card now reads 專題：二二八與白色恐怖.
- Text wrapping no longer starts a line with a punctuation mark such as ， or 。. This fix applies to both pages.
- Narrow screens: page sections can no longer be pushed wider than the screen by the canvas. Both pages were run through every frame at desktop and phone widths with no script errors.

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

## Sources

Each page ends with a References section. Pages are educational visualizations compiled from those works; where sources disagree, both figures are shown.

## Notes

The control areas are a schematic model, not exact borders. Population figures are estimates: censuses from 1905 on, scholarly estimates before that. On the Tapani page, place positions and some dates (autumn 1915, 1916) are approximate, sources disagree on the court figures, and massacre deaths are not given because estimates vary widely. On the 228 page, some 228 city dates are approximate, the troop routes are schematic, and the years of use for White Terror prisons and execution grounds are approximate; the map shows representative sites, not all of them. Portraits come from Wikimedia Commons; each image's source and license is listed on the page.
