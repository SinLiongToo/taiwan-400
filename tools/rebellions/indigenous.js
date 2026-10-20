// ================= chapter: Indigenous resistance to Japanese rule, 1896–1933 =================
{
  const B=[119.95, 21.85, 121.95, 25.35];
  const JPN=hex('#f0625a'), INDG=hex('#5aa36f'), LINE=hex('#ecd04f');
  const GROUPS = { truku:['太魯閣族','Truku'], atayal:['泰雅族','Atayal'], saisiyat:['賽夏族','Saisiyat'], amis:['阿美族','Amis'], bunun:['布農族','Bunun'], seediq:['賽德克族','Seediq'] };
  const PL = {
    dabao:     { zh:'大豹社（三峽）', en:'Dabao (Sanxia)', p:[121.38,24.87], side:'l', g:'atayal' },
    nanzhuang: { zh:'南庄', en:'Nanzhuang', p:[120.99,24.60], side:'l', g:'saisiyat' },
    taroko:    { zh:'太魯閣（立霧溪）', en:'Taroko (Liwu River)', p:[121.50,24.18], side:'l', g:'truku' },
    xincheng:  { zh:'新城', en:'Xincheng', p:[121.61,24.13], side:'r', dy:-10, g:'truku' },
    weili:     { zh:'威里社', en:'Weili', p:[121.58,24.04], side:'r', dy:4, g:'truku' },
    cikasuan:  { zh:'七腳川社（吉安）', en:'Cikasuan (Ji’an)', p:[121.56,23.96], side:'r', dy:16, g:'amis' },
    wushe:     { zh:'霧社', en:'Musha', p:[121.13,24.03], side:'l', g:'seediq' },
    dafen:     { zh:'大分（卓溪）', en:'Dafen (Zhuoxi)', p:[121.12,23.33], side:'r', g:'bunun' },
    tamahe:    { zh:'塔馬荷（玉穗社，約略）', en:'Tamahe (approx.)', p:[120.93,23.22], side:'l', g:'bunun' },
  };
  const S = {
    id:'find', key:'ind', T0:Date.UTC(1896,5,1), B, SP:0.034, seconds:46, hold:120, slow:500, minRate:40, burstLen:160, pulseLen:300,
    gridLon:[120,121], gridLat:[22,23,24,25],
    title:['原 住 民 族 抗 日　1896 — 1933','INDIGENOUS RESISTANCE TO JAPANESE RULE   1896 — 1933'],
    big: t => String(S.dateOf(t)[0]),
    sub: t => { const Y=S.dateOf(t)[0]; return Y<1912 ? tx(`明治 ${Y-1867} 年`,`Meiji ${Y-1867}`) : Y<1926 ? tx(`大正 ${Y-1911} 年`,`Taishō ${Y-1911}`) : tx(`昭和 ${Y-1925} 年`,`Shōwa ${Y-1925}`); },
    yearLine: Y => String(Y),
    fmtOut: t => { const [Y,m]=S.dateOf(t); return `${Y}/${m}`; },
    prelude:['1895 年日本接收台灣，平地的抵抗在數年內被壓制，但中央山脈與東部仍是原住民族的領域。總督府覬覦山林的樟腦、木材與礦產，衝突隨之而來。','Japan took Taiwan in 1895 and crushed resistance on the plains within a few years, but the Central Mountains and the east were still Indigenous land. The colonial government wanted the camphor, timber and minerals of the mountains, and conflict followed.'],
    at: k => PL[k].p,
    legendTop:false,
    legend:[['dot',JPN,'日本統治區（示意）','Under Japanese control (schematic)'],['dot',INDG,'原住民族領域','Indigenous land'],['dot',LINE,'隘勇線推進（示意）','Guard-line frontier (schematic)']],
    init(S){
      const D=S.D; S.T_END=D('1934-06-30');
      S.dots = dotsIn(B, S.SP);
      S.EVENTS = ev([
        ['1896-12-15','新城事件','The Xincheng incident','駐守新城監視哨的日軍侵犯太魯閣族婦女、擅入溪中採砂金，族人襲擊監視哨，13 名日軍被殺。次年日軍討伐失利，5 月撤退。','Soldiers at the Xincheng watch post violated Truku women and panned for gold in their river; the Truku attacked the post and killed 13 soldiers. A punitive expedition the next year failed, and the troops pulled out in May.','xincheng',['1896/12','Dec 1896'],true],
        ['1900-08-01','大豹社事件','The Dabao incident','樟腦業者進入大豹溪流域，傳出工人侵犯婦女，引發衝突。總頭目瓦旦・燮促率泰雅族人抵抗，日軍損失慘重。','Camphor workers moved into the Dabao River valley and reportedly assaulted local women, sparking clashes. Paramount chief Watan Sekuh led the Atayal in resistance, and Japanese losses were heavy.','dabao',['1900','1900'],true],
        ['1902-07-06','南庄事件','The Nanzhuang incident','因樟腦與土地糾紛，賽夏族頭目日阿拐率賽夏族與泰雅族人攻擊南庄支廳。','Over camphor and land disputes, Saisiyat chief Rih A-kuai led Saisiyat and Atayal fighters against the Nanzhuang branch office.','nanzhuang',null,true],
        ['1902-12-17','南庄歸順式','The Nanzhuang surrender ceremony','總督府招撫抵抗者舉行「歸順式」，卻在現場槍殺 39 人，包括泰雅族頭目；日阿拐逃脫。','The government invited the fighters to a surrender ceremony and shot 39 of them there, including an Atayal chief; Rih A-kuai escaped.','nanzhuang'],
        ['1906-08-01','威里事件','The Weili incident','賀田組在太魯閣地區製腦，雇用族人警備卻分配津貼不公，族人轉而怨恨日本人，發生馘首事件。','The Kada company, making camphor in Truku country, hired local men as guards but paid them unfairly; resentment turned on the Japanese and led to a headhunting attack.','weili',['1906/8','Aug 1906'],true],
        ['1906-12-01','大豹社戰敗','Dabao defeated','長年作戰後，大豹社聯合勢力無力再戰而戰敗，此後被迫遷離故土。','After years of fighting, the Dabao coalition could no longer hold out and was defeated; its people were later forced from their land.','dabao',['1906','1906']],
        ['1908-12-13','七腳川事件','The Cikasuan incident','19 名七腳川社隘勇因工資被扣集體脫逃，日方藉機出兵。七腳川社被攻破，近千人被迫遷移。','Nineteen Cikasuan guards fled after their wages were withheld, and the Japanese used it as a pretext for war. Cikasuan was destroyed and nearly a thousand people were forced to move.','cikasuan',null,true],
        ['1909-12-01','吉野村','Yoshino village','七腳川社的土地成為台灣第一個官營日本移民村「吉野村」（今吉安鄉）。','Cikasuan land became Yoshino, Taiwan’s first government-run Japanese settler village (today’s Ji’an).','cikasuan',['1909','1909']],
        ['1910-06-01','五年理蕃計畫','The Five-Year Plan','總督佐久間左馬太推動五年理蕃計畫，以軍警推進隘勇線，強行進入中央山脈。','Governor-General Sakuma Samata launched the Five-Year Plan to subdue the mountain peoples, pushing guard lines deep into the Central Mountains.','taroko',['1910','1910']],
        ['1914-06-01','太魯閣戰役','The Taroko war','佐久間親自擔任討伐隊總司令，從 6 月 1 日到 8 月 31 日攻打太魯閣族；外太魯閣總頭目哈鹿閣那威率族人抵抗。','Sakuma personally commanded the campaign against the Truku from June 1 to August 31; Haruq Nawi, paramount chief of the outer Truku, led the resistance.','taroko',['1914/6/1–8/31','Jun 1–Aug 31, 1914'],true],
        ['1915-05-17','大分事件','The Dafen incident','布農族頭目拉荷・阿雷與弟弟阿里曼・西肯率 56 人襲擊大分駐在所，殺死 12 名日警，隨後退入深山。','Bunun chief Lahu Ali and his brother Alimang Sikan led 56 men against the Dafen police post, killed 12 policemen, then withdrew deep into the mountains.','dafen',null,true],
        ['1915-08-01','建立塔馬荷社','Tamahe founded','拉荷・阿雷一族退到荖濃溪上游建立塔馬荷社，此後十多年日方都無法征服。','Lahu Ali’s people withdrew to the upper Laonong River and founded Tamahe, which the Japanese could not conquer for more than a decade.','tamahe',['1915 後','After 1915']],
        ['1921-06-18','第二次大分事件','The second Dafen incident','日方以和解為名邀請抵抗者，卻將托西幼社 23 名壯丁處決。','Inviting the resisters to make peace, the authorities executed 23 young men of Tosiyu.','dafen',null,true],
        ['1930-10-27','霧社事件','The Musha Incident','賽德克族在莫那・魯道領導下起事，遭飛機與毒氣鎮壓（另有專題）。','The Seediq rose under Mona Rudao and were crushed with aircraft and gas (see its own feature).','wushe',null,true],
        ['1933-05-01','拉荷・阿雷歸順','Lahu Ali makes peace','堅持近二十年的拉荷・阿雷與約 80 名族人歸順，原住民族的武裝抗日至此結束。','After almost twenty years, Lahu Ali and about 80 of his people made peace, ending Indigenous armed resistance.','tamahe',['1933/5','May 1933']],
      ]).map(e=>{ e.d=D(e.ds); return e; });
      S.PHASES=[[0,D('1902-07-06'),'接收與初次衝突','First clashes','#8f9fa6','日本接收東部與山區邊緣，駐軍與樟腦業者進入原住民族領域，衝突隨即發生。','Japan took over the east and the mountain margins; soldiers and camphor men entered Indigenous land, and clashes followed.'],
                [D('1902-07-06'),D('1910-06-01'),'樟腦與隘勇線','Camphor and guard lines','#e8a33d','為了樟腦利益，總督府以隘勇線包圍山地，南庄、大豹、威里、七腳川相繼爆發衝突。','To secure camphor, the government ringed the mountains with guarded lines, and conflict broke out at Nanzhuang, Dabao, Weili and Cikasuan.'],
                [D('1910-06-01'),D('1915-09-01'),'五年理蕃計畫','The Five-Year Plan','#f0625a','佐久間總督以軍警全面進攻山地，太魯閣戰役是規模最大的一場。','Governor-General Sakuma sent troops and police into the mountains in force; the Taroko war was the largest campaign.'],
                [D('1915-09-01'),D('1930-10-27'),'山地統治與零星抵抗','Rule and holdouts','#a8607a','山地大多被納入警察統治，但布農族拉荷・阿雷等人仍在深山堅持。','Most of the mountains came under police rule, but Lahu Ali and other Bunun held out deep in the ranges.'],
                [D('1930-10-27'),S.T_END+1,'最後的抵抗','The last resistance','#5aa36f','霧社事件震驚日本；1933 年拉荷・阿雷歸順，武裝抗日結束。','The Musha Incident shocked Japan; in 1933 Lahu Ali made peace, and armed resistance ended.']];
      S.SHARE=[0.17,0.24,0.20,0.24,0.15];
      S.ticks=[1900,1905,1910,1915,1920,1925,1930].map(y=>[D(`${y}-01-01`), String(y)]);
      S.PEOPLE=[
        { zh:'瓦旦・燮促', en:'Watan Sekuh', role:['泰雅族大豹社總頭目','Atayal paramount chief of Dabao'], col:'#5aa36f', st:[[0,'大豹社頭目','Chief'],[D('1900-08-01'),'抵抗','Resisting'],[D('1906-12-01'),'戰敗','Defeated','#9fb2ba']] },
        { zh:'日阿拐', en:'Rih A-kuai', role:['賽夏族頭目','Saisiyat chief'], col:'#5aa36f', st:[[0,'頭目','Chief'],[D('1902-07-06'),'起事','Rising'],[D('1902-12-17'),'逃脫','Escaped','#9fb2ba']] },
        { zh:'拉荷・阿雷', en:'Lahu Ali', role:['布農族大分社頭目','Bunun chief of Dafen'], col:'#5aa36f', img:'lahu', st:[[0,'頭目','Chief'],[D('1915-05-17'),'抵抗','Resisting'],[D('1933-05-01'),'歸順','Made peace','#9fb2ba']] },
        { zh:'佐久間左馬太', en:'Sakuma Samata', role:['台灣總督，推動五年理蕃計畫','Governor-General, Five-Year Plan'], col:'#f0625a', img:'sakuma', st:[[0,'—','—'],[D('1906-04-01'),'就任總督','Takes office'],[D('1914-06-01'),'親征太魯閣','Leads the Taroko war'],[D('1915-06-01'),'去職','Leaves office','#9fb2ba']] },
      ];
      S.FIGS=[[D('1896-12-15'),'13','新城事件日軍死亡','Soldiers killed at Xincheng','#5aa36f'],
              [D('1902-12-17'),'39','南庄歸順式遭槍殺','Shot at the Nanzhuang ceremony','#f0625a'],
              [D('1908-12-13'),'≈1,000','七腳川社被迫遷移','Cikasuan people removed','#f0625a'],
              [D('1915-05-17'),'12','大分事件日警死亡','Policemen killed at Dafen','#5aa36f'],
              [D('1921-06-18'),'23','第二次大分事件遭處決','Executed in the second Dafen incident','#f0625a'],
              [D('1933-05-01'),'≈80','最後歸順的布農族人','Bunun who finally made peace','#9fb2ba']];
    },
    dotColor(d, t){
      const y = 1896.42 + t/365.25;
      let mth = pw(y, [[1896,0.40],[1903,0.48],[1906,0.56],[1910,0.66],[1912,0.82],[1915,1.02]]);
      // Lahu Ali's mountains held out until 1933; Musha briefly in 1930
      const holdout = y < 1933.35 && dist([d.lon,d.lat],[120.98,23.24]) < 0.13;
      const musha = y > 1930.82 && y < 1931.2 && dist([d.lon,d.lat],[121.13,24.03]) < 0.1;
      // the Truku heartland stayed Indigenous until the Taroko war ended (Aug 31, 1914)
      const taroko = y < 1914.67 && d.lat > 23.95 && d.lat < 24.35 && d.lon > 121.25 && d.m > 0.12;
      if (holdout || musha || taroko) return [INDG, 0.75];
      if (Math.abs(d.m - mth) < 0.035 && mth < 1) return [LINE, 0.85];
      return d.m < mth ? [[0,1,2].map(j=>BASE[j]+(JPN[j]-BASE[j])*0.55), 0.6] : [INDG, 0.4+0.35*d.m];
    },
    extras(t){},
    drawPlaces(t){
      for (const k in PL) { const pl=PL[k], [x,y]=P(...pl.p); const first = S.EVENTS.find(e=>e.at===k); if (first && t < first.d-200) continue;
        ctx.fillStyle=C.bg; ctx.strokeStyle=rgba(INDG,1); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,5,0,6.2832); ctx.fill(); ctx.stroke();
        const g=GROUPS[pl.g]; label(`${pl.zh}・${g[0]}`, `${pl.en} · ${g[1]}`, x, y+(pl.dy||0), pl.side==='l', 11.5); }
    },
  };
  Film(S);
}

