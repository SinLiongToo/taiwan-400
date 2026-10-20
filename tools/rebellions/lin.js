// ================= chapter: Lin Shuangwen, 1786–1788 =================
{
  const B=[119.98, 21.85, 121.28, 25.02];
  const TOWNS = {
    dali:     { zh:'大里杙（林爽文據點）', en:'Dali (Lin’s base)', p:[120.68,24.10], side:'r' },
    changhua: { zh:'彰化', en:'Changhua', p:[120.54,24.08], side:'l', dy:-22 },
    lugang:   { zh:'鹿港', en:'Lugang', p:[120.43,24.06], side:'l', dy:16 },
    zhuqian:  { zh:'竹塹', en:'Zhuqian (Hsinchu)', p:[120.97,24.80], side:'l' },
    xinpu:    { zh:'新埔（客家義民）', en:'Xinpu (Hakka militia)', p:[121.07,24.83], side:'r' },
    zhuluo:   { zh:'諸羅', en:'Zhuluo', p:[120.45,23.48], side:'l' },
    fucheng:  { zh:'府城（台灣府）', en:'Taiwan-fu (Tainan)', p:[120.20,22.99], side:'l' },
    fengshan: { zh:'鳳山', en:'Fengshan', p:[120.30,22.68], side:'l' },
    liudui:   { zh:'六堆（客家義民）', en:'Liudui (Hakka militia)', p:[120.56,22.72], side:'r' },
    laoquqi:  { zh:'老衢崎', en:'Laoquqi', p:[120.86,24.66], side:'l' },
    langqiao: { zh:'琅嶠', en:'Langqiao', p:[120.75,22.02], side:'r' },
  };
  const S = {
    id:'flin', key:'lin', T0:Date.UTC(1787,0,1), B, SP:0.03, seconds:44, hold:1.5, slow:5, minRate:1.2, burstLen:3, pulseLen:6,
    gridLon:[120,121], gridLat:[22,23,24,25],
    title:['林 爽 文 事 件　1786 — 1788','THE LIN SHUANGWEN REBELLION   1786 — 1788'],
    yearLine: Y => tx(`${Y}・清乾隆 ${Y-1735} 年`, `${Y} · Qianlong ${Y-1735}`),
    fmtOut: t => { const [Y,m,d]=S.dateOf(t); return `${Y}/${m}/${d}`; },
    prelude:['1786 年，清廷在台取締秘密結社天地會。天地會在彰化大里杙一帶勢力龐大，首領林爽文的叔伯被捕入獄。','1786: the Qing authorities in Taiwan crack down on the secret Heaven and Earth Society, strong around Dali in Changhua; relatives of its leader Lin Shuangwen are jailed.'],
    at: k => TOWNS[k].p,
    legendTop:true,
    legend:[['dot',EMBER,'起事軍控制','Held by rebels'],['dot',CRIMSON,'被圍城市','Under siege'],['dot',QING,'清軍控制','Held by the Qing'],['dot',MILITIA,'義民（客家、泉州）','Loyal militias'],['line',QING,'福康安大軍','Fukang’an’s army']],
    init(S){
      const D=S.D; S.T_END=D('1788-04-15');
      S.dots = dotsIn(B, S.SP);
      // town states over time: q = Qing, r = rebel, s = siege, m = militia
      S.STATE = {
        dali:[[0,'q'],[D('1787-01-16'),'r'],[D('1787-12-30'),'q']],
        changhua:[[0,'q'],[D('1787-01-18'),'r'],[D('1787-12-12'),'q']],
        zhuqian:[[0,'q'],[D('1787-01-20'),'r'],[D('1787-02-20'),'m']],
        lugang:[[0,'q']],
        xinpu:[[0,'q'],[D('1787-01-25'),'m']],
        zhuluo:[[0,'q'],[D('1787-02-01'),'s'],[D('1787-12-14'),'q']],
        fucheng:[[0,'q'],[D('1787-02-01'),'s'],[D('1788-01-15'),'q']],
        fengshan:[[0,'q'],[D('1787-01-25'),'r'],[D('1788-02-20'),'q']],
        liudui:[[0,'q'],[D('1787-01-25'),'m']],
        laoquqi:[[0,'q']], langqiao:[[0,'q']],
      };
      S.EVENTS = ev([
        ['1787-01-16','大里杙起事','The rising at Dali','官府取締天地會、逮捕林爽文的叔伯，林爽文率眾劫獄起事，部眾迅速增加到約五萬人。','When officials suppressed the society and arrested Lin’s uncles, Lin led a jailbreak and rose in revolt; his followers soon numbered about 50,000.','dali',null,true],
        ['1787-01-18','攻陷彰化','Changhua falls','起事軍攻下彰化城，殺死台灣知府孫景燧等官員。','The rebels took Changhua and killed Prefect Sun Jingsui and other officials.','changhua',null,true],
        ['1787-01-20','攻下竹塹','Zhuqian falls','北路的王作、李同攻下竹塹，殺死淡水同知程峻。','In the north Wang Zuo and Li Tong took Zhuqian and killed Subprefect Cheng Jun.','zhuqian',null,true],
        ['1787-01-25','莊大田起兵','Zhuang Datian rises','南路的莊大田在鳳山響應起事，與林爽文南北呼應。','In the south Zhuang Datian rose at Fengshan in support, so the revolt ran from north to south.','fengshan',['1787/1','Jan 1787'],true],
        ['1787-02-01','諸羅、府城被圍；義民組成','Sieges and loyal militias','起事軍控制中南部大半，諸羅與府城被圍。泉州移民與桃竹苗、六堆的客家人組成義民，協助清軍。','The rebels held most of central and southern Taiwan and besieged Zhuluo and Taiwan-fu. Quanzhou settlers and Hakka from the north and from Liudui formed loyal militias to help the Qing.','zhuluo',['1787/2','Feb 1787']],
        ['1787-04-01','清軍援軍陸續渡台','Qing reinforcements','恆瑞等率清軍約 4,000 人渡台，此後又增派上萬人，但仍無法打破僵局。','Hengrui and others crossed with about 4,000 Qing troops, and more than 10,000 followed, but the stalemate held.','lugang',['1787 春','Spring 1787']],
        ['1787-06-15','諸羅苦守','Zhuluo holds out','總兵柴大紀率軍民死守諸羅城，被圍長達數月，糧食斷絕。','General Chai Daji and the townspeople held Zhuluo through a months-long siege as food ran out.','zhuluo',['1787 夏','Summer 1787']],
        ['1787-12-10','福康安鹿港登陸','Fukang’an lands at Lugang','乾隆派福康安、海蘭察率大軍從鹿港登台，綠營約 8,000 人，另有團練約 6,000 人（另說派兵 2 萬）。','Qianlong sent Fukang’an and Hailancha, who landed at Lugang with about 8,000 regulars and 6,000 militia (20,000 by another account).','lugang'],
        ['1787-12-14','諸羅解圍，賜名嘉義','Zhuluo relieved, renamed Chiayi','福康安大軍解諸羅之圍。乾隆為嘉許城中軍民死守的義行，下詔改諸羅為嘉義。','Fukang’an’s army lifted the siege of Zhuluo; to honour the defenders’ loyalty, Qianlong renamed the town Chiayi.','zhuluo',['1787/12','Dec 1787'],true],
        ['1787-12-30','攻破大里杙','Dali stormed','清軍攻破林爽文的據點大里杙，林爽文向北逃入山區。','Qing troops stormed Lin’s stronghold at Dali, and Lin fled north into the hills.','dali',['1787 年底','Late 1787'],true],
        ['1788-02-10','林爽文被捕','Lin Shuangwen captured','林爽文在老衢崎（今苗栗崎頂一帶）被生擒，押往北京凌遲處死。','Lin Shuangwen was taken alive at Laoquqi (near today’s Qiding, Miaoli) and sent to Beijing, where he was executed by slow slicing.','laoquqi'],
        ['1788-03-10','莊大田被捕','Zhuang Datian captured','南路的莊大田兵敗，在琅嶠一帶被水師擒獲，在台處死。','Zhuang Datian was defeated in the south, caught by the navy near Langqiao and executed in Taiwan.','langqiao',['1788 春','Spring 1788']],
      ]).map(e=>{ e.d=D(e.ds); return e; });
      S.PHASES=[[0,D('1787-01-16'),'天地會與取締','The society and the crackdown','#8f9fa6','天地會在漳州移民間擴張，官府取締並逮捕成員。','The Heaven and Earth Society spread among Zhangzhou settlers, and officials moved to arrest its members.'],
                [D('1787-01-16'),D('1787-02-01'),'起事','The rising','#e8743d','林爽文起事後半個月內，彰化、竹塹、鳳山相繼失守。','Within two weeks of Lin’s rising, Changhua, Zhuqian and Fengshan had fallen.'],
                [D('1787-02-01'),D('1787-12-10'),'圍城與義民','Sieges and militias','#d0473f','起事軍圍攻諸羅與府城；清軍援兵與義民苦撐近一年。','The rebels besieged Zhuluo and Taiwan-fu; Qing reinforcements and loyal militias held on for nearly a year.'],
                [D('1787-12-10'),D('1788-02-10'),'福康安平亂','Fukang’an’s campaign','#ecd04f','福康安大軍登陸後兩個月內解圍、攻破大里杙，追捕林爽文。','Within two months of landing, Fukang’an relieved the sieges, stormed Dali and ran Lin down.'],
                [D('1788-02-10'),S.T_END+1,'收場','The end','#9fb2ba','首領相繼被捕處死，乾隆將此役列為「十全武功」之一。','The leaders were caught and executed one by one, and Qianlong counted the campaign among his “Ten Great Campaigns.”']];
      S.SHARE=[0.08,0.14,0.40,0.24,0.14];
      S.ticks=[['1787-01-16','1/16'],['1787-04-01','4月'],['1787-07-01','7月'],['1787-10-01','10月'],['1787-12-10','12/10'],['1788-02-10','1788/2/10']].map(([s,l])=>[D(s), lang==='en' ? l.replace('月','') : l]);
      S.PEOPLE=[
        { zh:'林爽文', en:'Lin Shuangwen', role:['天地會首領，漳州移民','Society leader, Zhangzhou settler'], col:'#e8743d', st:[[0,'天地會首領','Society leader'],[D('1787-01-16'),'起事','Rising'],[D('1788-02-10'),'被捕','Captured','#9fb2ba']] },
        { zh:'莊大田', en:'Zhuang Datian', role:['南路首領，鳳山','Southern leader, Fengshan'], col:'#e8743d', st:[[0,'—','—'],[D('1787-01-25'),'起兵','Rising'],[D('1788-03-10'),'被捕處死','Captured, executed','#9fb2ba']] },
        { zh:'柴大紀', en:'Chai Daji', role:['台灣鎮總兵，守諸羅','Garrison general at Zhuluo'], col:'#ecd04f', st:[[0,'總兵','General'],[D('1787-02-01'),'守城','Holding Zhuluo'],[D('1787-12-14'),'解圍','Relieved']] },
        { zh:'福康安', en:'Fukang’an', role:['協辦大學士，平台主帥','Qing commander in Taiwan'], col:'#ecd04f', img:'fuk', st:[[0,'在北京','In Beijing'],[D('1787-12-10'),'登陸鹿港','Landed'],[D('1788-02-10'),'平定','Victorious']] },
      ];
      S.FIGS=[[D('1787-01-16'),'≈50,000','起事軍（一說多達 30 萬）','Rebels (up to 300,000 by one claim)','#e8743d'],
              [D('1787-04-01'),'4,000+','第一批清軍援兵','First Qing reinforcements','#ecd04f'],
              [D('1787-12-10'),'≈14,000','福康安所率兵力（另說 2 萬）','Fukang’an’s force (or 20,000)','#ecd04f'],
              [D('1788-02-10'),'< 40,000','清軍總投入兵力','Total Qing troops committed','#ecd04f'],
              [D('1788-02-10'),'?','雙方死亡人數（無可靠統計）','Deaths on both sides (no reliable total)','#9fb2ba']];
    },
    stateAt(k, t){ let s='q'; for (const [d,v] of S.STATE[k]) if (t>=d) s=v; return s; },
    dotColor(d, t){
      if (d.m > 0.42 || d.lon > 121.0 && d.lat < 24.4) return [[60,104,84], 0.45];          // mountains & east: Indigenous land
      let best=0.32, col=QING, ww=0;
      for (const k in TOWNS) { const s=S.stateAt(k,t), dd=dist([d.lon,d.lat],TOWNS[k].p), rr=0.32; if (dd>rr) continue; const w=1-dd/rr; if (w>ww) { ww=w; col = s==='r'?EMBER : s==='s'?CRIMSON : s==='m'?MILITIA : QING; } }
      const c=[0,1,2].map(j=>BASE[j]+(col[j]-BASE[j])*(0.25+0.7*ww)); return [c, 0.42+0.45*ww];
    },
    extras(t){
      const D=S.D, T=TOWNS;
      // siege rings
      for (const k of ['zhuluo','fucheng']) if (S.stateAt(k,t)==='s') { const [x,y]=P(...T[k].p); ctx.setLineDash([4,4]); ctx.strokeStyle=rgba(EMBER,0.9); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,16,0,6.2832); ctx.stroke(); ctx.setLineDash([]); }
      // Fukang'an's campaign
      const seg=(a,b,s,e)=>{ if (t>=D(s)) arrow(a,b,smooth(D(s),D(e),t),QING); };
      seg([120.05,24.15], T.lugang.p, '1787-12-06','1787-12-10');
      seg(T.lugang.p, T.changhua.p, '1787-12-10','1787-12-12');
      seg(T.changhua.p, T.zhuluo.p, '1787-12-12','1787-12-14');
      seg(T.changhua.p, T.dali.p, '1787-12-20','1787-12-30');
      seg(T.dali.p, T.laoquqi.p, '1788-01-15','1788-02-10');
      seg(T.fucheng.p, T.fengshan.p, '1788-01-25','1788-02-20');
      seg(T.fengshan.p, T.langqiao.p, '1788-02-20','1788-03-10');
    },
    drawPlaces(t){
      for (const k in TOWNS) { const tw=TOWNS[k], [x,y]=P(...tw.p), s=S.stateAt(k,t);
        if ((k==='laoquqi' && t<S.D('1788-01-15')) || (k==='langqiao' && t<S.D('1788-02-20'))) continue;
        let nm=tw.zh, ne=tw.en; if (k==='zhuluo' && t>=S.D('1787-12-14')) { nm='嘉義（原諸羅）'; ne='Chiayi (former Zhuluo)'; }
        ctx.fillStyle = rgba(s==='r'?EMBER : s==='s'?CRIMSON : s==='m'?MILITIA : QING, 1); ctx.strokeStyle=C.ink; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,5,0,6.2832); ctx.fill(); ctx.stroke();
        label(nm, ne, x, y+(tw.dy||0), tw.side==='l', 12); }
    },
  };
  Film(S);
}

