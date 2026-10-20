"""Build the three rebellion feature pages from shared parts.

    python tools/build_rebellions.py

Parts live in tools/rebellions/:
  head.html   page head and CSS (title and description are replaced per page)
  engine.js   shared helpers and the Film engine
  guo.js, lin.js, dai.js   one chapter spec each
Each output page is standalone (no external script besides fonts).
"""
import json, os, re
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PARTS = os.path.join(ROOT, 'tools', 'rebellions')
read = lambda name: open(os.path.join(PARTS, name), encoding='utf-8').read()
HEAD, ENGINE = read('head.html'), read('engine.js')
TEMP = os.environ.get('TEMP', '')

COMMON_UI = {
    'back': ['台灣四百年', 'Taiwan: Four Centuries'],
    'langLbl': ['語言', 'Language'],
    'play': ['播放', 'Play'], 'pause': ['暫停', 'Pause'], 'replay': ['重播', 'Replay'], 'speed': ['速度', 'Speed'],
    'afterH': ['之後', 'Afterward'],
    'noteH': ['關於這張地圖', 'About this map'],
    'refH': ['參考資料', 'References'],
    'moreH': ['延伸閱讀', 'Further reading'],
    'credH': ['肖像來源', 'Portrait sources'],
    'bgH': ['背景', 'Background'],
    'lRel1': ['', ''], 'lRel2': ['', ''],
}

PAGES = [
  dict(
    file='guo.html', chapter='guo.js', key='guo', title='郭懷一事件 1652', range='1652.9.7 – 9.19',
    desc='郭懷一事件 1652：荷蘭時期最大的漢人起事，從赤崁到後紅的逐日地圖。The Guo Huaiyi rebellion of 1652, mapped day by day from Saccam to Houhong.',
    ui={
      'h1': ['郭懷一事件 1652', 'The Guo Huaiyi Rebellion, 1652'],
      'intro': ['1652 年 9 月，赤崁一帶的漢人農民在郭懷一領導下反抗荷蘭東印度公司。起事不到兩週就被荷軍與原住民盟軍鎮壓，死者約佔當時台灣漢人的一成。逐日看起事如何爆發與被撲滅。',
                'In September 1652 Chinese farmers around Saccam, led by Guo Huaiyi, rose against the Dutch East India Company. Within two weeks Dutch troops and their Indigenous allies had crushed them, and the dead came to roughly a tenth of Taiwan’s Chinese. Follow the rising day by day.'],
      'bg1': ['荷蘭統治下，漢人移民在赤崁一帶開墾稻田與蔗園，卻要繳交人頭稅，還常受到徵稅官員勒索。郭懷一是當地的農民領袖，暗中聯絡移民準備起事。',
              'Under Dutch rule, Chinese settlers farmed rice and sugar around Saccam but paid a head tax and suffered extortion by tax collectors. Guo Huaiyi, a local farming leader, secretly organized a rising.'],
      'bg2': ['起事者多半只有竹槍，而荷蘭人擁有火槍，並能動員新港、西拉雅與馬卡道族的戰士。這場起事顯示了荷蘭統治倚賴原住民盟友的程度，也讓荷蘭人此後更加戒備漢人移民。',
              'The rebels had little more than bamboo spears; the Dutch had muskets and could call on warriors from Sinkan, the Siraya villages and the Makatao. The rising showed how much Dutch rule depended on Indigenous allies, and made the Dutch far warier of Chinese settlers.'],
      'note': ['地點為依史料整理的示意，油行尾、後紅等位置是約略的。荷軍救援人數、起事人數與荷方死亡人數，中英文來源記載不同，頁面並列。',
               'Places are schematic, and positions such as Yuxingwei and Houhong are approximate. Chinese and English sources differ on the size of the Dutch relief force, the number of rebels and Dutch deaths; both figures are shown.'],
      'lRel1': ['專題：荷西時期', 'Feature: Dutch and Spanish Formosa'], 'lRel2': ['專題：林爽文事件', 'Feature: The Lin Shuangwen rebellion'],
    },
    rel=['dutch.html', 'linshuangwen.html'],
    wiki=[('https://zh.wikipedia.org/wiki/郭懷一事件', '維基百科：郭懷一事件'), ('https://en.wikipedia.org/wiki/Guo_Huaiyi_rebellion', 'Wikipedia: Guo Huaiyi rebellion')],
    refs=['Johannes Huber（胡月涵），〈中國移民對抗東印度公司：1652 年的郭懷一事件〉，《臺灣文獻》53 卷 3 期。',
          '范勝雄，〈郭懷一抗荷事件三地點試探〉，《臺灣文獻》49 卷 1 期。',
          'Tonio Andrade, <i>How Taiwan Became Chinese</i>. New York: Columbia University Press, 2008.',
          '維基百科「郭懷一事件」條目；Wikipedia, “Guo Huaiyi rebellion.”（2026 年 10 月查閱；兩語版本數字不同處，頁面並列）'],
    after=[['1653', '荷蘭在赤崁興建普羅民遮城（今赤崁樓），並嚴禁漢人持有武器、改由贌商包徵人頭稅。', 'The Dutch build Fort Provintia at Saccam, ban Chinese settlers from carrying weapons, and farm out the head tax.'],
           ['1661', '鄭成功攻台，次年荷蘭退出台灣。', 'Koxinga invades, and the Dutch leave Taiwan the next year.']],
    embed={}, credits_note=['郭懷一、郭保宇、費爾堡：無可用的自由授權肖像，以字卡代替。', 'Guo Huaiyi, Guo Baoyu, Verburg: no freely licensed portrait; name cards are shown.'],
    aria=['郭懷一事件逐日地圖動畫', 'Day-by-day map animation of the Guo Huaiyi rebellion'], deck_max=40, deck_step=0.02,
  ),
  dict(
    file='linshuangwen.html', chapter='lin.js', key='lin', title='林爽文事件 1786–1788', range='1787.1.16 – 1788.2.10',
    desc='林爽文事件 1786–1788：清代規模最大的民變，城鎮控制、義民與福康安平亂的逐日地圖。The Lin Shuangwen rebellion, the largest of the Qing era, mapped day by day.',
    ui={
      'h1': ['林爽文事件 1786–1788', 'The Lin Shuangwen Rebellion, 1786–1788'],
      'intro': ['1787 年初，天地會首領林爽文在大里杙起事，半個月內攻下彰化、竹塹，與南部的莊大田一度控制中南部大半。清廷動員數萬大軍，並倚賴客家與泉州移民組成的義民，一年多後才平定。',
                'Early in 1787 Lin Shuangwen, leader of the Heaven and Earth Society, rose at Dali and within two weeks took Changhua and Zhuqian; with Zhuang Datian in the south he held much of central and southern Taiwan. The Qing needed tens of thousands of troops, and loyal Hakka and Quanzhou militias, to end it more than a year later.'],
      'bg1': ['十八世紀的台灣移民社會以祖籍分群，漳州、泉州與客家移民之間常有械鬥。天地會在漳州移民間擴張，官府取締時逮捕林爽文的叔伯，成為起事的導火線。',
              'Eighteenth-century settler society in Taiwan was divided by ancestral origin, and Zhangzhou, Quanzhou and Hakka settlers often fought one another. The Heaven and Earth Society spread among the Zhangzhou settlers; when officials cracked down and arrested Lin’s uncles, the revolt began.'],
      'bg2': ['戰事中，泉州人與客家人多半站在清廷一邊組成「義民」，諸羅城軍民死守近一年。乾隆將平台列為「十全武功」之一，並改諸羅為嘉義、賜客家義民「褒忠」之名，這些地名與信仰延續至今。',
              'Most Quanzhou and Hakka settlers sided with the Qing as “loyal militias,” and Zhuluo held out for nearly a year. Qianlong counted the campaign among his Ten Great Campaigns, renamed Zhuluo as Chiayi, and honoured the Hakka militias as “loyal”; those names and shrines remain today.'],
      'note': ['城鎮控制狀態為依史料整理的示意。標示月份、「年底」「春」者沒有確切日期。起事人數與清軍兵力中英文來源不同，頁面並列；雙方傷亡沒有可靠的總數。',
               'Town states are schematic. Entries labelled by month, “late 1787” or “spring” have no exact date. Chinese and English sources differ on rebel numbers and Qing troop strength; both are shown. There is no reliable total for deaths.'],
      'credH': ['肖像來源', 'Portrait source'],
      'lRel1': ['專題：郭懷一事件', 'Feature: The Guo Huaiyi rebellion'], 'lRel2': ['專題：戴潮春事件', 'Feature: The Dai Chaochun rebellion'],
    },
    rel=['guo.html', 'daichaochun.html'],
    wiki=[('https://zh.wikipedia.org/wiki/林爽文事件', '維基百科：林爽文事件'), ('https://en.wikipedia.org/wiki/Lin_Shuangwen_rebellion', 'Wikipedia: Lin Shuangwen rebellion')],
    refs=['《欽定平定臺灣紀略》（清代官修）。',
          '劉寧顏編，《重修臺灣省通志》，1994。',
          'John R. Shepherd, <i>Statecraft and Political Economy on the Taiwan Frontier, 1600–1800</i>. Stanford: Stanford University Press, 1993.',
          '謝國興，《清代台灣三大民變》。',
          '維基百科「林爽文事件」條目；Wikipedia, “Lin Shuangwen rebellion.”（2026 年 10 月查閱；兩語版本數字不同處，頁面並列）'],
    after=[['1788', '諸羅改名嘉義；乾隆賜客家義民「褒忠」之名，此後北台灣各地興建義民廟祭祀戰死者。', 'Zhuluo becomes Chiayi; Qianlong honours the Hakka militias as “loyal,” and shrines to the militia dead are later built across northern Taiwan.'],
           ['1862', '戴潮春事件，清代另一次大規模民變，同樣與天地會有關。', 'The Dai Chaochun rebellion, another major Qing-era revolt, again tied to the Heaven and Earth Society.']],
    embed={'fuk': 'fuk.json'}, credits_note=['林爽文、莊大田、柴大紀：無可用的自由授權肖像，以字卡代替。', 'Lin Shuangwen, Zhuang Datian, Chai Daji: no freely licensed portrait; name cards are shown.'],
    credits_extra={'fuk': ['福康安', 'Fukang’an', '出自《平定臺灣二十功臣像贊》', 'from the portraits of twenty meritorious officials of the Taiwan campaign']},
    aria=['林爽文事件逐日地圖動畫', 'Day-by-day map animation of the Lin Shuangwen rebellion'], deck_max=480, deck_step=0.1,
  ),
  dict(
    file='daichaochun.html', chapter='dai.js', key='dai', title='戴潮春事件 1862–1865', range='1862 – 1865',
    desc='戴潮春事件 1862–1865：清代三大民變之一，彰化、大甲、嘉義的圍城與霧峰林家崛起的逐月地圖。The Dai Chaochun rebellion, 1862–1865, mapped month by month.',
    ui={
      'h1': ['戴潮春事件 1862–1865', 'The Dai Chaochun Rebellion, 1862–1865'],
      'intro': ['1862 年春，官府取締彰化一帶的天地會，會眾攻下彰化城，推戴潮春為首領，戰火延燒台灣中部近三年。與朱一貴、林爽文事件並稱清代台灣三大民變，也讓霧峰林家從此崛起。',
                'In spring 1862 a crackdown on the Heaven and Earth Society around Changhua backfired: its members took Changhua, made Dai Chaochun their leader, and central Taiwan burned for nearly three years. With the Zhu Yigui and Lin Shuangwen revolts it is counted among the three great uprisings of Qing Taiwan, and it set the Wufeng Lin family on its rise.'],
      'bg1': ['戴潮春是彰化四張犁人，曾在綠營擔任文書。他接管兄長的八卦會，以辦團練為名改組為天地會。當時清廷正全力對付太平天國，台灣兵力空虛，援兵遲遲未到，讓起事拖延多年。',
              'Dai Chaochun, from Sizhangli in Changhua, had been a clerk in the Green Standard Army. He took over his brother’s Bagua Society and reorganized it as the Heaven and Earth Society under the cover of a local militia. The Qing were fighting the Taiping, Taiwan’s garrisons were thin and help was slow, so the revolt dragged on for years.'],
      'bg2': ['戰事中漳泉、閩客之間的對立再度浮現：起事者曾攻擊泉州人的村莊，鹿港的泉州人組織抵抗。平定後，大量「叛產」被充公，部分交給立功的霧峰林家，林家由此成為中部最有勢力的家族。',
              'The rifts between Zhangzhou and Quanzhou, Hoklo and Hakka resurfaced: rebels attacked Quanzhou villages and the Quanzhou people of Lugang organized resistance. Afterward, confiscated rebel estates were partly given to the Wufeng Lin family for their service, making them the most powerful family in central Taiwan.'],
      'note': ['可查到的史料大多只有農曆日期或年份，頁面以月份呈現，並標示季節或農曆，日期為約略換算；只有林日成被殺有確切公曆日期（1864 年 2 月 6 日）。城鎮控制狀態、北勢湳與小埔心的位置都是示意。傷亡沒有可靠的總數。',
               'Most sources give only lunar dates or years, so the page moves month by month and labels events by season or lunar date; Gregorian dates are approximate. Only Lin Richeng’s death has an exact Gregorian date (February 6, 1864). Town states and the positions of Beishinan and Xiaopuxin are schematic. There is no reliable total for deaths.'],
      'lRel1': ['專題：林爽文事件', 'Feature: The Lin Shuangwen rebellion'], 'lRel2': ['專題：乙未戰爭', 'Feature: The 1895 war'],
    },
    rel=['linshuangwen.html', 'yiwei.html'],
    wiki=[('https://zh.wikipedia.org/wiki/戴潮春事件', '維基百科：戴潮春事件'), ('https://en.wikipedia.org/wiki/Tai_Chao-chuen_incident', 'Wikipedia: Tai Chao-chuen incident')],
    refs=['林豪，《東瀛紀事》。', '吳德功，《戴案紀略》。', '丁曰健，《治臺必告錄》。', '連橫，《臺灣通史》。',
          'Johanna Meskill, <i>A Chinese Pioneer Family: The Lins of Wu-feng, Taiwan, 1729–1895</i>. Princeton University Press, 1979.',
          '許雪姬，《清代臺灣的綠營》。', '謝國興，《清代台灣三大民變》。',
          '維基百科「戴潮春事件」條目；Wikipedia, “Tai Chao-chuen incident.”（2026 年 10 月查閱）'],
    after=[['1865', '戴氏殘部平定；「叛產」充公，部分撥給霧峰林家。', 'The last rebels are crushed; confiscated estates are partly given to the Wufeng Lin family.'],
           ['1884', '清法戰爭中，霧峰林家的林朝棟率勇協防基隆。', 'In the Sino-French War, Lin Chaodong of the Wufeng Lin family leads militia in the defence of Keelung.'],
           ['1895', '乙未戰爭，台灣割讓日本。', 'The 1895 war; Taiwan is ceded to Japan.']],
    embed={}, credits_note=['戴潮春、林日成、丁曰健、林文察：無可用的自由授權肖像，以字卡代替。', 'Dai Chaochun, Lin Richeng, Ding Yuejian, Lin Wencha: no freely licensed portrait; name cards are shown.'],
    aria=['戴潮春事件逐月地圖動畫', 'Month-by-month map animation of the Dai Chaochun rebellion'], deck_max=1200, deck_step=0.5,
  ),
]

def build(pg):
    ui = dict(COMMON_UI); ui.update(pg['ui'])
    head = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{escape(pg["desc"])}">', HEAD)
    head = re.sub(r'<title>[^<]*</title>', f'<title>{escape(pg["title"])}</title>', head)
    k = pg['key']
    refs = '\n'.join(f'          <li>{r}</li>' for r in pg['refs'])
    links = (f'          <li><a href="{pg["rel"][0]}" data-k="lRel1"></a></li>\n          <li><a href="{pg["rel"][1]}" data-k="lRel2"></a></li>\n'
             + '\n'.join(f'          <li><a href="{u}" target="_blank" rel="noopener">{escape(t)}</a></li>' for u, t in pg['wiki']))
    body = f'''<main class="wrap">
  <div class="top">
    <a class="back" href="./" data-k="back"></a>
    <div class="grp">
      <span class="lbl" data-k="langLbl"></span>
      <div class="seg" role="group" aria-label="Language">
        <button id="langZh" type="button" aria-pressed="false" lang="zh-Hant">中文</button>
        <button id="langEn" type="button" aria-pressed="false" lang="en">EN</button>
        <button id="langBi" type="button" aria-pressed="true">中英</button>
      </div>
    </div>
  </div>
  <div class="head">
    <h1 data-k="h1"></h1>
    <p data-k="intro"></p>
  </div>

  <div class="stage"><canvas id="f{k}" class="film" width="1600" height="900"></canvas></div>
  <div class="deck">
    <button id="play{k}" class="primary" type="button"></button>
    <div class="scrub"><input id="scrub{k}" type="range" min="0" max="{pg['deck_max']}" step="{pg['deck_step']}" value="0" aria-label="Date"><output id="out{k}" for="scrub{k}"></output></div>
    <div class="grp"><label class="lbl" for="speed{k}" data-k="speed"></label><select id="speed{k}"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></div>
  </div>

  <section class="read">
    <div>
      <h2 data-k="bgH"></h2>
      <p data-k="bg1"></p>
      <p data-k="bg2"></p>
      <h2 data-k="afterH"></h2>
      <ol class="after" id="after"></ol>
    </div>
    <div class="side">
      <div>
        <h2 data-k="noteH"></h2>
        <p data-k="note"></p>
      </div>
      <div>
        <h2 data-k="refH"></h2>
        <ol class="refs">
{refs}
        </ol>
      </div>
      <div>
        <h2 data-k="moreH"></h2>
        <ul>
{links}
        </ul>
      </div>
      <div>
        <h2 data-k="credH"></h2>
        <ul id="credits"></ul>
      </div>
    </div>
  </section>
</main>
'''
    embed = {}
    for key, fn in pg['embed'].items():
        embed[key] = json.load(open(os.path.join(PARTS, fn), encoding='utf-8'))
    prefix = f'''(() => {{
const EMBED = {json.dumps(embed, ensure_ascii=False)};
const IMG = {{}}; for (const k in EMBED) {{ const im=new Image(); im.src=EMBED[k].src; IMG[k]=im; }}

// ================= language (shared with 台灣四百年) =================
let lang = 'bi';
try {{ const s = localStorage.getItem('tw400-lang'); if (s==='zh'||s==='en'||s==='bi') lang = s; }} catch (e) {{}}
if (['#zh','#en','#bi'].includes(location.hash)) lang = location.hash.slice(1);
const tx = (zh, en) => lang==='en' ? en : zh;
const UI = {json.dumps(ui, ensure_ascii=False)};
const esc = s => String(s).replace(/[&<>"]/g, c => ({{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}}[c]));
const uiHTML = (zh, en) => lang==='en' ? esc(en) : lang==='bi' ? `${{esc(zh)}}<span class="en" lang="en">${{esc(en)}}</span>` : esc(zh);
const setK = (el, k) => {{ el.innerHTML = uiHTML(UI[k][0], UI[k][1]); }};

'''
    extra = pg.get('credits_extra', {})
    post = f'''// ================= after list, language, loop =================
const AFTER = {json.dumps(pg['after'], ensure_ascii=False)};
const CRED_EXTRA = {json.dumps(extra, ensure_ascii=False)};
const CRED_NOTE = {json.dumps(pg['credits_note'], ensure_ascii=False)};
const ARIA = {json.dumps(pg['aria'], ensure_ascii=False)};
const TITLE = {json.dumps(pg['ui']['h1'], ensure_ascii=False)};
const afterOl=document.getElementById('after'), credUl=document.getElementById('credits');
function applyLang(){{
  document.documentElement.lang = lang==='en' ? 'en' : 'zh-Hant';
  document.title = tx(...TITLE);
  document.querySelectorAll('[data-k]').forEach(el=>setK(el, el.dataset.k));
  const back=document.querySelector('.back'); back.innerHTML = '← ' + back.innerHTML;
  for (const f of films) f.setPlaying(f.playing);
  afterOl.innerHTML = AFTER.map(([y,zh,en])=>`<li><b>${{y}}</b><span>${{uiHTML(zh,en)}}</span></li>`).join('');
  credUl.innerHTML = Object.keys(EMBED).map(k=>{{ const c=EMBED[k], x=CRED_EXTRA[k]||['','','','']; return `<li>${{esc(tx(x[0],x[1]))}}: <a href="${{esc(c.url)}}" target="_blank" rel="noopener">${{esc(c.file)}}</a> (${{esc(c.license)}}${{x[2]?'；'+esc(tx(x[2],x[3])):''}})</li>`; }}).join('')
    + `<li>${{esc(tx(...CRED_NOTE))}}</li>`;
  for (const [id,l] of [['langZh','zh'],['langEn','en'],['langBi','bi']]) document.getElementById(id).setAttribute('aria-pressed', lang===l);
  document.getElementById('f{k}').setAttribute('aria-label', tx(...ARIA));
}}
function setLang(l){{ lang=l; try {{ localStorage.setItem('tw400-lang', l); }} catch (e) {{}} applyLang(); }}
document.getElementById('langZh').addEventListener('click', ()=>setLang('zh'));
document.getElementById('langEn').addEventListener('click', ()=>setLang('en'));
document.getElementById('langBi').addEventListener('click', ()=>setLang('bi'));
applyLang();
let last=performance.now();
function frame(now){{ const dt=Math.min(0.1,(now-last)/1000); last=now; for (const f of films) f.tick(dt); requestAnimationFrame(frame); }}
requestAnimationFrame(n=>{{ last=n; frame(n); }});
}})();
'''
    page = head + body + '\n<script>\n' + prefix + ENGINE + read(pg['chapter']) + post + '</script>\n</body>\n</html>\n'
    open(os.path.join(ROOT, pg['file']), 'w', encoding='utf-8').write(page)
    print('wrote', pg['file'])

if __name__ == '__main__':
    for pg in PAGES:
        build(pg)
