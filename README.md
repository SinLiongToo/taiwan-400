# 台灣四百年 · Taiwan: Four Centuries

An animated, bilingual (中文 / English) history of Taiwan from 1600 to 2026: who ruled, how far state control reached across the island, and how the population changed.

**Live page:** https://sinliongtoo.github.io/taiwan-400/

- Dot map of Taiwan colored by ruling power (Dutch, Spanish, Zheng, Qing, Republic of Formosa, Japan, ROC) and Indigenous self-rule
- Ruler card with portraits for every governor, emperor and president
- State-control curve, population-by-group chart, 51 key events
- Built-in recorder exports the animation as a 1920×1080 video

## Files

| File | Purpose |
|---|---|
| `index.html` | GitHub Pages entry (generated) |
| `taiwan-400.html` | Page source (also published as a claude.ai artifact) |
| `portraits.js` | Embedded ruler portraits from Wikimedia Commons |
| `build_pages.py` | Wraps `taiwan-400.html` into `index.html` |
| `fetch_portraits.py`, `recrop.py` | Re-download and crop portraits |

After editing `taiwan-400.html`, run `python build_pages.py` and commit both files.

## Notes

Control areas are a schematic model, not exact borders. Population figures are estimates (censuses from 1905 on, scholarly estimates before). Portraits come from Wikimedia Commons; per-image sources and licenses are listed on the page.
