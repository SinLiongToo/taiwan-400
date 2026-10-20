// ================= chapter: Dai Chaochun, 1862–1865 =================
{
  const B=[120.25, 23.40, 121.00, 24.45];
  const TOWNS = {
    sizhangli: { zh:'四張犁（戴潮春據點）', en:'Sizhangli (Dai’s base)', p:[120.70,24.18], side:'r' },
    dajia:     { zh:'大甲', en:'Dajia', p:[120.62,24.35], side:'l' },
    wuqi:      { zh:'五汊港', en:'Wuchagang', p:[120.52,24.26], side:'l' },
    changhua:  { zh:'彰化', en:'Changhua', p:[120.54,24.08], side:'l', dy:-20 },
    lugang:    { zh:'鹿港（泉州人）', en:'Lugang (Quanzhou settlers)', p:[120.43,24.06], side:'l', dy:16 },
    azhaowu:   { zh:'阿罩霧（霧峰林家）', en:'Azhaowu (Wufeng Lin family)', p:[120.70,24.06], side:'r' },
    beishinan: { zh:'北勢湳（約略）', en:'Beishinan (approx.)', p:[120.70,23.97], side:'r' },
    xiaopuxin: { zh:'小埔心（約略）', en:'Xiaopuxin (approx.)', p:[120.56,23.95], side:'r' },
    beidou:    { zh:'北斗', en:'Beidou', p:[120.52,23.87], side:'l' },
    douliu:    { zh:'斗六門', en:'Douliumen', p:[120.54,23.71], side:'r' },
    chiayi:    { zh:'嘉義', en:'Chiayi', p:[120.45,23.48], side:'l' },
  };
  const S = {
    id:'fdai', key:'dai', T0:Date.UTC(1862,2,1), B, SP:0.012, seconds:46, hold:12, slow:30, minRate:5, burstLen:18, pulseLen:30,
    gridLon:[120.4,120.6,120.8], gridLat:[23.6,23.9,24.2],
    title:['戴 潮 春 事 件　1862 — 1865','THE DAI CHAOCHUN REBELLION   1862 — 1865'],
    big: t => { const [Y,m]=S.dateOf(t); return tx(`${Y} 年 ${m} 月`, `${MON[m]} ${Y}`); },
    sub: t => { const [Y]=S.dateOf(t); return tx(`清同治 ${Y-1861} 年前後`, `Around Tongzhi ${Y-1861}`); },
    yearLine: Y => tx(`清同治 ${Y-1861} 年前後`, `Around Tongzhi ${Y-1861}`),
    fmtOut: t => { const [Y,m]=S.dateOf(t); return `${Y}/${m}`; },
    prelude:['1861 年冬，彰化四張犁的戴潮春接管八卦會，改組為天地會，以辦團練為名，會眾很快超過一萬人。','Winter 1861: Dai Chaochun of Sizhangli in Changhua takes over the Bagua Society, reorganizes it as the Heaven and Earth Society under the cover of a local militia, and soon has more than ten thousand members.'],
    at: k => TOWNS[k].p,
    legendTop:true,
    legend:[['dot',EMBER,'戴軍控制','Held by Dai’s forces'],['dot',CRIMSON,'被圍城市','Under siege'],['dot',QING,'清軍控制','Held by the Qing'],['dot',MILITIA,'團練（林家、泉州人）','Militias (Lin family, Quanzhou)'],['line',QING,'丁曰健、林文察','Ding Yuejian, Lin Wencha']],
    init(S){
      const D=S.D; S.T_END=D('1865-03-31');
      S.dots = dotsIn(B, S.SP);
      S.STATE = {
        sizhangli:[[0,'q'],[D('1862-04-10'),'r'],[D('1864-01-29'),'q']],
        dajia:[[0,'q'],[D('1862-07-01'),'s'],[D('1862-08-15'),'q'],[D('1863-01-25'),'s'],[D('1863-02-20'),'q']],
        wuqi:[[0,'q']],
        changhua:[[0,'q'],[D('1862-04-15'),'r'],[D('1863-12-25'),'q']],
        lugang:[[0,'q'],[D('1862-04-15'),'m']],
        azhaowu:[[0,'m'],[D('1862-06-01'),'s'],[D('1862-06-25'),'m']],
        beishinan:[[0,'q'],[D('1862-06-01'),'r'],[D('1865-02-15'),'q']],
        xiaopuxin:[[0,'q'],[D('1862-06-01'),'r'],[D('1864-05-15'),'q']],
        beidou:[[0,'q'],[D('1862-05-01'),'r'],[D('1864-01-29'),'q']],
        douliu:[[0,'q'],[D('1862-10-01'),'s'],[D('1862-12-20'),'r'],[D('1864-01-15'),'q']],
        chiayi:[[0,'q'],[D('1862-04-20'),'s'],[D('1862-12-31'),'q']],
      };
      S.EVENTS = ev([
        ['1862-04-03','孔昭慈率兵入彰化','Kong Zhaoci marches on Changhua','台灣道孔昭慈率約 600 名兵勇到彰化取締天地會，淡水同知秋曰覲南下協助；大突寮的陳弄隨即起事。','Circuit Intendant Kong Zhaoci took some 600 troops to Changhua to suppress the society, with Subprefect Qiu Yuejin coming south to help; Chen Nong of Datuliao rose at once.','changhua',['1862 春','Spring 1862']],
        ['1862-04-15','彰化城失守','Changhua falls','會眾攻下彰化城，孔昭慈殉職，戴潮春被推為首領，起事迅速擴及中部。','The society’s men took Changhua; Kong Zhaoci died, Dai Chaochun was made leader, and the revolt spread across central Taiwan.','changhua',['1862 春','Spring 1862'],true],
        ['1862-04-20','嘉義被圍','Chiayi besieged','戴軍南下圍攻嘉義城，城內糧食一度斷絕。','Dai’s forces moved south and besieged Chiayi, where food at one point ran out.','chiayi',['1862 春夏','Spring–summer 1862'],true],
        ['1862-06-01','阿罩霧攻防戰','The fight for Azhaowu','戴軍主將林日成圍攻阿罩霧，霧峰林家以少數家丁死守，等到援軍擊退來犯者。','Dai’s general Lin Richeng attacked Azhaowu; the Wufeng Lin family held out with a handful of retainers until help drove the attackers off.','azhaowu',['1862 夏','Summer 1862'],true],
        ['1862-07-01','大甲城之圍','The sieges of Dajia','王和尚兩次圍攻大甲城。城民祈雨後天降大雨，守軍趁機反擊，傳為佳話。','Wang Heshang twice besieged Dajia. The townspeople prayed for rain, rain fell, and the defenders struck back, an episode long remembered.','dajia',['1862 夏','Summer 1862'],true],
        ['1862-10-01','林文明率臺勇回台','Lin Wenming brings braves home','在中國大陸作戰的霧峰林家林文明率約千名臺勇回台助戰。','Lin Wenming of the Wufeng Lin family, fighting on the mainland, brought about a thousand Taiwanese braves home to help.','azhaowu',['1862 秋','Autumn 1862']],
        ['1862-12-20','斗六門失守','Douliumen falls','清軍將領林向榮在斗六門兵敗自殺，戴軍控制中部大半。','Qing commander Lin Xiangrong was defeated at Douliumen and killed himself; Dai’s forces held most of central Taiwan.','douliu',['1862 冬','Winter 1862'],true],
        ['1863-01-25','林日成三圍大甲','Dajia besieged again','林日成再度圍攻大甲城，仍被擊退。','Lin Richeng besieged Dajia once more and was again driven off.','dajia',['1863 初','Early 1863'],true],
        ['1863-12-02','丁曰健進駐竹塹','Ding Yuejian reaches Zhuqian','新任台灣道丁曰健進駐竹塹，由五汊港、大肚溪一帶南下推進。','The new Circuit Intendant Ding Yuejian reached Zhuqian and pushed south by way of Wuchagang and the Dadu River.','wuqi',['1863 冬','Winter 1863']],
        ['1863-12-22','林文察安平登陸','Lin Wencha lands at Anping','福建陸路提督林文察（霧峰林家）率軍從安平登陸，由南往北進攻。','Lin Wencha of the Wufeng Lin family, now a Fujian provincial commander, landed at Anping and attacked from the south.','chiayi',['1863 冬','Winter 1863']],
        ['1864-01-29','戴潮春投降被殺','Dai Chaochun surrenders and is killed','戴潮春出面投降，丁曰健下令在北斗一帶將他斬殺。','Dai Chaochun gave himself up, and Ding Yuejian had him beheaded near Beidou.','beidou',['1864 初','Early 1864']],
        ['1864-02-06','林日成被殺','Lin Richeng killed','戴軍主將林日成被林文察斬殺。','Dai’s general Lin Richeng was killed by Lin Wencha.','sizhangli',['1864/2/6','Feb 6, 1864']],
        ['1864-05-15','小埔心之役','The fight at Xiaopuxin','陳弄在小埔心一役後開庄投降，隨即被殺。','After the fight at Xiaopuxin, Chen Nong opened his village and surrendered, and was then killed.','xiaopuxin',['1864/5','May 1864'],true],
        ['1865-02-15','北勢湳收復','Beishinan retaken','最後據守北勢湳的殘部被平定，延續約三年的事件結束。','The last holdouts at Beishinan were crushed, ending a revolt that had lasted about three years.','beishinan',['1865 春','Spring 1865'],true],
      ]).map(e=>{ e.d=D(e.ds); return e; });
      S.PHASES=[[0,D('1862-04-15'),'取締與起事','Crackdown and rising','#8f9fa6','官府取締天地會，反而促成會眾起事。','The crackdown on the society set off the very revolt it was meant to prevent.'],
                [D('1862-04-15'),D('1862-12-20'),'席捲中部','Central Taiwan overrun','#e8743d','彰化失守後，戴軍圍攻嘉義、大甲與阿罩霧，中部陷入戰火。','After Changhua fell, Dai’s forces besieged Chiayi, Dajia and Azhaowu, and central Taiwan was at war.'],
                [D('1862-12-20'),D('1863-12-02'),'僵持','Stalemate','#d0473f','清廷忙於應付太平天國，援兵遲遲未到，雙方在中部僵持近一年。','Busy with the Taiping war, the Qing were slow to send help, and the two sides were deadlocked in central Taiwan for nearly a year.'],
                [D('1863-12-02'),D('1864-05-31'),'清軍反攻','The Qing counteroffensive','#ecd04f','丁曰健從北、林文察從南夾擊，數月內戴潮春、林日成相繼被殺。','Ding Yuejian from the north and Lin Wencha from the south closed in, and within months Dai and Lin Richeng were dead.'],
                [D('1864-05-31'),S.T_END+1,'餘黨與善後','Mopping up','#9fb2ba','殘部到 1865 年才平定；大量「叛產」被充公，霧峰林家因功崛起。','The last holdouts fell only in 1865; rebel estates were confiscated, and the Wufeng Lin family rose on its service.']];
      S.SHARE=[0.10,0.30,0.20,0.25,0.15];
      S.ticks=[['1862-06-01','1862/6'],['1863-01-01','1863'],['1863-12-01','1863/12'],['1864-06-01','1864/6'],['1865-01-01','1865']].map(([s,l])=>[D(s),l]);
      S.PEOPLE=[
        { zh:'戴潮春', en:'Dai Chaochun', role:['天地會首領，彰化四張犁人','Society leader from Sizhangli'], col:'#e8743d', st:[[0,'會首','Society leader'],[D('1862-04-15'),'起事','Rising'],[D('1864-01-29'),'投降被殺','Surrendered, killed','#9fb2ba']] },
        { zh:'林日成', en:'Lin Richeng', role:['戴軍主將','Dai’s leading general'], col:'#e8743d', st:[[0,'—','—'],[D('1862-06-01'),'領兵攻城','Leading sieges'],[D('1864-02-06'),'被殺','Killed','#9fb2ba']] },
        { zh:'丁曰健', en:'Ding Yuejian', role:['台灣道','Circuit Intendant of Taiwan'], col:'#ecd04f', st:[[0,'未到任','Not yet'],[D('1863-12-02'),'進駐竹塹','At Zhuqian'],[D('1864-01-29'),'平亂','Victorious']] },
        { zh:'林文察', en:'Lin Wencha', role:['福建陸路提督，霧峰林家','Fujian commander, Wufeng Lin family'], col:'#7fd3d0', st:[[0,'在大陸作戰','On the mainland'],[D('1863-12-22'),'安平登陸','Landed'],[D('1864-02-06'),'平亂','Victorious']] },
      ];
      S.FIGS=[[D('1862-04-03'),'600','孔昭慈帶往彰化的兵勇','Troops Kong Zhaoci took to Changhua','#ecd04f'],
              [D('1862-04-15'),'10,000+','天地會會眾','Society members','#e8743d'],
              [D('1862-10-01'),'≈1,000','林文明率回的臺勇','Braves Lin Wenming brought home','#7fd3d0'],
              [D('1865-02-15'),'≈3 年','事件持續時間','Length of the revolt','#9fb2ba'],
              [D('1865-02-15'),'?','雙方死傷（無可靠統計）','Deaths (no reliable total)','#9fb2ba']];
    },
    stateAt(k, t){ let s='q'; for (const [d,v] of S.STATE[k]) if (t>=d) s=v; return s; },
    dotColor(d, t){
      if (d.m > 0.45) return [[60,104,84], 0.45];
      let col=QING, ww=0;
      for (const k in TOWNS) { const s=S.stateAt(k,t), dd=dist([d.lon,d.lat],TOWNS[k].p), rr=0.14; if (dd>rr) continue; const w=1-dd/rr; if (w>ww) { ww=w; col = s==='r'?EMBER : s==='s'?CRIMSON : s==='m'?MILITIA : QING; } }
      const c=[0,1,2].map(j=>BASE[j]+(col[j]-BASE[j])*(0.2+0.75*ww)); return [c, 0.4+0.48*ww];
    },
    extras(t){
      const D=S.D, T=TOWNS;
      for (const k in TOWNS) if (S.stateAt(k,t)==='s') { const [x,y]=P(...T[k].p); ctx.setLineDash([4,4]); ctx.strokeStyle=rgba(EMBER,0.9); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,16,0,6.2832); ctx.stroke(); ctx.setLineDash([]); }
      const seg=(a,b,s,e)=>{ if (t>=D(s)) arrow(a,b,smooth(D(s),D(e),t),QING); };
      seg([120.80,24.44], T.wuqi.p, '1863-12-02','1863-12-12');
      seg(T.wuqi.p, T.changhua.p, '1863-12-12','1863-12-25');
      seg([120.30,23.41], T.chiayi.p, '1863-12-22','1863-12-30');
      seg(T.chiayi.p, T.douliu.p, '1863-12-30','1864-01-15');
      seg(T.douliu.p, T.beidou.p, '1864-01-15','1864-01-29');
      seg(T.beidou.p, T.sizhangli.p, '1864-01-29','1864-02-06');
    },
    drawPlaces(t){
      for (const k in TOWNS) { const tw=TOWNS[k], [x,y]=P(...tw.p), s=S.stateAt(k,t);
        ctx.fillStyle = rgba(s==='r'?EMBER : s==='s'?CRIMSON : s==='m'?MILITIA : QING, 1); ctx.strokeStyle=C.ink; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,5,0,6.2832); ctx.fill(); ctx.stroke();
        label(tw.zh, tw.en, x, y+(tw.dy||0), tw.side==='l', 12); }
    },
  };
  Film(S);
}

