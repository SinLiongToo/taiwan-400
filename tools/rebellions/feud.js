// ================= chapter: Qing-era feuds between settler groups, 1721–1862 =================
{
  const B=[119.95, 21.85, 121.95, 25.35];
  // west coast longitude by latitude (from the island outline), used for the coastal Quanzhou band
  const WEST = [[21.9,120.72],[22.3,120.62],[22.62,120.27],[22.95,120.13],[23.3,120.08],[23.5,120.13],[23.95,120.30],[24.35,120.52],[24.8,120.85],[25.05,121.10],[25.3,121.54]];
  const westLon = lat => pw(lat, WEST);
  const ORIGIN = { quan:hex('#5b95f5'), zhang:hex('#e8a33d'), hakka:hex('#5fbf9a'), ind:hex('#3c6854') };
  const PL = {
    liudui:   { zh:'六堆（客家）', en:'Liudui (Hakka)', p:[120.56,22.72], side:'r' },
    changhua: { zh:'彰化', en:'Changhua', p:[120.54,24.08], side:'r' },
    lugang:   { zh:'鹿港', en:'Lugang', p:[120.43,24.06], side:'l' },
    houlong:  { zh:'後壟', en:'Houlong', p:[120.78,24.61], side:'l' },
    hsinchu:  { zh:'竹塹（新竹）', en:'Zhuqian (Hsinchu)', p:[120.97,24.80], side:'l' },
    taipei:   { zh:'台北盆地', en:'Taipei Basin', p:[121.50,25.04], side:'r' },
    zhuluo:   { zh:'諸羅（嘉義）', en:'Zhuluo (Chiayi)', p:[120.45,23.48], side:'l' },
  };
  // Taipei basin inset places
  const TP = {
    mengjia:   { zh:'艋舺', en:'Mengjia', p:[121.500,25.036], side:'l' },
    dadaocheng:{ zh:'大稻埕', en:'Dadaocheng', p:[121.512,25.060], side:'r' },
    xinzhuang: { zh:'新莊', en:'Xinzhuang', p:[121.450,25.036], side:'l' },
    banqiao:   { zh:'枋橋（板橋）', en:'Banqiao', p:[121.460,25.012], side:'l' },
    shilin:    { zh:'士林', en:'Shilin', p:[121.525,25.090], side:'r' },
  };
  const INB = [121.40, 24.99, 121.57, 25.11];
  const S = {
    id:'ffeud', key:'feud', T0:Date.UTC(1715,0,1), B, SP:0.034, seconds:44, hold:220, slow:1500, minRate:180, burstLen:260, pulseLen:700,
    gridLon:[120,121], gridLat:[22,23,24,25],
    title:['清 代 分 類 械 鬥　1721 — 1862','FEUDS BETWEEN SETTLER GROUPS   1721 — 1862'],
    big: t => String(S.dateOf(t)[0]),
    sub: t => { const Y=S.dateOf(t)[0]; const R=[[1862,'同治',1861,'Tongzhi'],[1851,'咸豐',1850,'Xianfeng'],[1821,'道光',1820,'Daoguang'],[1796,'嘉慶',1795,'Jiaqing'],[1736,'乾隆',1735,'Qianlong'],[1723,'雍正',1722,'Yongzheng'],[1662,'康熙',1661,'Kangxi']]; for (const [a,z,o,e] of R) if (Y>=a) return tx(`清${z} ${Y-o} 年前後`, `Around ${e} ${Y-o}`); return ''; },
    yearLine: Y => String(Y),
    fmtOut: t => String(S.dateOf(t)[0]),
    prelude:['清代來台的移民多依祖籍聚居：泉州人多在沿海與港口，漳州人在內陸平原，客家人在丘陵與南部的六堆。爭水、爭地、爭港口的衝突，常演變成整個祖籍群之間的「分類械鬥」。','Settlers in Qing Taiwan lived by ancestral origin: Quanzhou people on the coast and in the ports, Zhangzhou people on the inland plains, Hakka in the foothills and the southern Liudui. Quarrels over water, land and harbours often turned into feuds between whole origin groups.'],
    at: k => (PL[k] || TP[k]).p,
    legendTop:false,
    legend:[['dot',ORIGIN.quan,'泉州人（示意）','Quanzhou (schematic)'],['dot',ORIGIN.zhang,'漳州人（示意）','Zhangzhou (schematic)'],['dot',ORIGIN.hakka,'客家人（示意）','Hakka (schematic)'],['dot',ORIGIN.ind,'原住民族地區','Indigenous land']],
    init(S){
      const D=S.D; S.T_END=D('1870-12-31');
      S.dots = dotsIn(B, S.SP).map(d=>{
        const east = d.lat<24.45 && d.lon > pw(d.lat, SPINE.map(p=>[p[1],p[0]]).reverse())+0.03;
        let o;
        if (d.m > 0.42 || east) o='ind';
        else if ((d.lat>24.45 && d.lat<24.98 && d.m>0.10) || (d.lat>24.15 && d.lat<24.35 && d.m>0.18) || (d.lat>22.40 && d.lat<22.95 && d.lon>120.45)) o='hakka';
        else if (d.lon < westLon(d.lat)+0.13) o='quan';
        else o='zhang';
        return { ...d, o };
      });
      S.EVENTS = ev([
        ['1721-06-01','朱一貴事件與六堆','Zhu Yigui and the Liudui','朱一貴事件中閩粵分裂，南部客家人組成「六堆」民兵協助清軍，閩客對立從此成為南台灣的長期問題。','During the Zhu Yigui revolt Hoklo and Hakka split; the southern Hakka formed the Liudui militia to help the Qing, and Hoklo–Hakka hostility became a lasting fact of the south.','liudui',['1721','1721'],true],
        ['1782-09-01','彰化漳泉大械鬥','The great Changhua feud','彰化一帶漳泉械鬥延續三個多月，福建水師提督黃仕簡來台才平定，官方報告處斬 290 多人、流放 320 多人。','A Zhangzhou–Quanzhou feud around Changhua lasted more than three months and ended only when Fujian naval commander Huang Shijian came over; official reports list over 290 executed and over 320 exiled.','changhua',['1782','1782'],true],
        ['1787-01-16','林爽文事件中的分類','Origin lines in the Lin Shuangwen revolt','以漳州人為主的林爽文起事，泉州人與客家人多組成義民協助清軍，民變與分類對立交織。','Lin Shuangwen’s revolt was led largely by Zhangzhou settlers, while most Quanzhou and Hakka settlers formed loyal militias for the Qing; rebellion and origin feud became tangled.','changhua',['1787','1787']],
        ['1806-06-01','竹塹、鹿港、後壟械鬥','Feuds at Zhuqian, Lugang and Houlong','嘉慶年間的漳泉械鬥波及竹塹、鹿港與後壟，泉州方面據稱損失 400 多人。','Zhangzhou–Quanzhou fighting in the Jiaqing years spread to Zhuqian, Lugang and Houlong, where the Quanzhou side reportedly lost over 400 people.','houlong',['1806–09','1806–09'],true],
        ['1853-09-01','頂下郊拚','The Upper and Lower Guilds feud','艋舺的泉州三邑人（頂郊）與同安人（下郊）爭奪碼頭。三邑人借道焚燒安溪人的祖師廟，攻破同安人的八甲庄。','In Mengjia, Quanzhou’s Sanyi people (the Upper Guild) fought the Tong’an people (the Lower Guild) for the wharves. The Sanyi side burned the Anxi people’s Zushi temple on the way and overran the Tong’an village of Bajia.','mengjia',['1853','1853'],true],
        ['1853-12-01','同安人遷往大稻埕','Tong’an people move to Dadaocheng','戰敗的同安人在林佑藻帶領下遷往大稻埕。新竹進士鄭用錫寫下〈勸和論〉勸告各籍和睦。','The defeated Tong’an people moved to Dadaocheng under Lin Youzao. Hsinchu scholar Zheng Yongxi wrote his “Essay Urging Harmony.”','dadaocheng',['1853','1853']],
        ['1859-06-01','北台漳泉大械鬥','The great northern feud','漳泉械鬥延燒整個台北盆地，士林舊街被毀；板橋林家據枋橋城反攻新莊。','Zhangzhou–Quanzhou fighting engulfed the Taipei Basin; Shilin’s old street was destroyed, and the Lin family of Banqiao struck back from their walled town toward Xinzhuang.','xinzhuang',['1859–60','1859–60'],true],
        ['1859-12-01','霞海城隍廟落成','Xiahai City God Temple built','同安人在大稻埕建成霞海城隍廟，大稻埕逐漸取代艋舺，成為台北的商業中心。','The Tong’an people completed the Xiahai City God Temple in Dadaocheng, which gradually overtook Mengjia as Taipei’s commercial centre.','dadaocheng',['1859','1859']],
        ['1862-04-15','戴潮春事件中的分類','Origin lines in the Dai Chaochun revolt','戴潮春起事後曾攻擊泉州人的村莊，鹿港的泉州人組織抵抗，分類對立再次與民變交纏。','After Dai Chaochun rose, his men attacked Quanzhou villages and the Quanzhou people of Lugang organized resistance; origin feud and revolt were tangled once more.','lugang',['1862','1862']],
      ]).map(e=>{ e.d=D(e.ds); return e; });
      S.PHASES=[[0,D('1760-01-01'),'閩粵分立','Hoklo and Hakka part ways','#5fbf9a','朱一貴事件後，南部閩客對立；客家人在下淡水溪以東組成六堆自保。','After the Zhu Yigui revolt, Hoklo and Hakka in the south became rivals, and the Hakka formed the Liudui east of the Lower Tamsui River.'],
                [D('1760-01-01'),D('1820-01-01'),'中部漳泉相爭','Feuds of the centre','#e8a33d','中部平原開墾飽和，漳泉為爭水爭地屢起大型械鬥，並與林爽文事件交纏。','As the central plains filled up, Zhangzhou and Quanzhou settlers fought large feuds over water and land, tangled with the Lin Shuangwen revolt.'],
                [D('1820-01-01'),D('1851-01-01'),'械鬥北移','Moving north','#c9a0e8','開墾重心北移，竹塹、台北一帶的械鬥逐漸增加。','As settlement shifted north, feuds grew around Zhuqian and Taipei.'],
                [D('1851-01-01'),D('1861-01-01'),'台北盆地之爭','The Taipei Basin','#5b95f5','頂下郊拚與北台大械鬥重塑了台北：同安人轉往大稻埕，板橋林家築城自衛。','The Upper and Lower Guilds feud and the great northern feud reshaped Taipei: the Tong’an people moved to Dadaocheng, and the Lin family walled Banqiao.'],
                [D('1861-01-01'),S.T_END+1,'開港之後','After the ports opened','#9fb2ba','1860 年開港後，茶葉貿易帶來新的財富與共同利益，大型分類械鬥逐漸減少。','After the ports opened in 1860, the tea trade brought new wealth and shared interests, and large feuds slowly faded.']];
      S.SHARE=[0.18,0.30,0.12,0.28,0.12];
      S.ticks=[1720,1760,1800,1820,1851,1861].map(y=>[D(`${y}-01-01`), String(y)]);
      S.PEOPLE=[
        { zh:'黃仕簡', en:'Huang Shijian', role:['福建水師提督，平定 1782 年械鬥','Fujian naval commander in 1782'], col:'#ecd04f', st:[[0,'—','—'],[D('1782-09-01'),'渡台平亂','Crosses to restore order'],[D('1783-06-01'),'—','—']] },
        { zh:'林佑藻', en:'Lin Youzao', role:['同安人領袖','Leader of the Tong’an people'], col:'#5b95f5', st:[[0,'—','—'],[D('1853-09-01'),'戰敗','Defeated'],[D('1853-12-01'),'遷大稻埕','Moves to Dadaocheng']] },
        { zh:'鄭用錫', en:'Zheng Yongxi', role:['竹塹進士，〈勸和論〉作者','Hsinchu scholar, “Urging Harmony”'], col:'#9fb2ba', st:[[0,'—','—'],[D('1853-12-01'),'作〈勸和論〉','Writes his essay']] },
        { zh:'林國芳', en:'Lin Guofang', role:['板橋林家（林本源）','Lin Benyuan family of Banqiao'], col:'#e8a33d', st:[[0,'—','—'],[D('1859-06-01'),'據枋橋城反攻','Strikes back from Banqiao']] },
      ];
      S.FIGS=[[D('1782-09-01'),'290+','1782 年處斬人數','Executed after the 1782 feud','#e8a33d'],
              [D('1782-09-01'),'320+','1782 年流放人數','Exiled after the 1782 feud','#e8a33d'],
              [D('1806-06-01'),'400+','1806–09 年泉州方面損失','Quanzhou losses, 1806–09','#5b95f5'],
              [D('1853-12-01'),'艋舺 → 大稻埕','同安人遷徙','Tong’an people move','#5b95f5'],
              [D('1859-06-01'),'?','多數械鬥沒有可靠的死傷統計','No reliable totals for most feuds','#9fb2ba']];
    },
    dotColor(d, t){ const c=ORIGIN[d.o]; return [c, d.o==='ind' ? 0.4 : 0.55]; },
    extras(t){
      const D=S.D, r=L.map, u=L.u;
      // Taipei basin inset (shown from 1820 on)
      const a = smooth(D('1820-01-01'), D('1825-01-01'), t); if (a<=0) return;
      const I={ x:r.x+10, y:r.y+10, w:205*u, h:168*u };
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(8,21,29,0.94)'; ctx.fillRect(I.x,I.y,I.w,I.h); ctx.strokeStyle=C.faint; ctx.lineWidth=1; ctx.strokeRect(I.x,I.y,I.w,I.h);
      const k=Math.min(I.w/((INB[2]-INB[0])*COS), (I.h-24*u)/(INB[3]-INB[1])), ox=I.x+(I.w-(INB[2]-INB[0])*COS*k)/2, oy=I.y+20*u;
      const Q=(lon,lat)=>[ox+(lon-INB[0])*COS*k, oy+(INB[3]-lat)*k];
      // Tamsui river, schematic
      ctx.strokeStyle=rgba(hex('#5f9bb8'),0.8); ctx.lineWidth=3; ctx.beginPath(); [[121.43,25.11],[121.47,25.08],[121.505,25.055],[121.495,25.03],[121.47,25.01],[121.44,24.99]].forEach((p,i)=>{ const [x,y]=Q(...p); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }); ctx.stroke();
      ctx.font=font(700,12*u,F.b); ctx.fillStyle=C.muted; ctx.fillText(lang==='bi'?'台北盆地 Taipei Basin':tx('台北盆地','Taipei Basin'), I.x+8, I.y+15*u);
      // the 1853 move and the 1859 counterattack
      const ar=(a2,b2,s,e,col)=>{ if (t<D(s)) return; const q=smooth(D(s),D(e),t), [x0,y0]=Q(...a2), [x1,y1]=Q(...b2), xb=x0+(x1-x0)*q, yb=y0+(y1-y0)*q; ctx.strokeStyle=rgba(col,0.95); ctx.lineWidth=2.4; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(xb,yb); ctx.stroke(); ctx.setLineDash([]); };
      ar(TP.mengjia.p, TP.dadaocheng.p, '1853-10-01', '1853-12-01', ORIGIN.quan);
      ar(TP.banqiao.p, TP.xinzhuang.p, '1859-07-01', '1859-11-01', ORIGIN.zhang);
      for (const k2 in TP) { const pl=TP[k2], [x,y]=Q(...pl.p); const col = k2==='banqiao'||k2==='shilin' ? ORIGIN.zhang : ORIGIN.quan;
        ctx.fillStyle=rgba(col,1); ctx.strokeStyle=C.ink; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,4.5,0,6.2832); ctx.fill(); ctx.stroke();
        const sv=L; L={...L, u:L.u*0.9}; label(pl.zh, pl.en, x, y, pl.side==='l', 11.5); L=sv; }
      for (const e of S.EVENTS) if (TP[e.at] && e.battle && t>=e.d && t<e.d+S.burstLen) { const [x,y]=Q(...TP[e.at].p), q=(t-e.d)/S.burstLen; for (let i=0;i<3;i++) { ctx.strokeStyle=rgba(EMBER,(1-q)*0.9); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,(6+18*q)*(1+0.3*i),0,6.2832); ctx.stroke(); } }
      // leader line to Taipei on the main map
      const [tx0,ty0]=P(...PL.taipei.p); ctx.strokeStyle=rgba(INK,0.35); ctx.setLineDash([3,4]); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(I.x+I.w, I.y+I.h*0.5); ctx.lineTo(tx0-8, ty0); ctx.stroke(); ctx.setLineDash([]);
      ctx.globalAlpha=1;
    },
    drawPlaces(t){
      for (const k in PL) { const pl=PL[k], [x,y]=P(...pl.p); const seen = S.EVENTS.some(e=>e.at===k && t>=e.d-300) || k==='taipei';
        if (!seen) continue;
        ctx.fillStyle=C.bg; ctx.strokeStyle=C.ink; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,4.5,0,6.2832); ctx.fill(); ctx.stroke();
        label(pl.zh, pl.en, x, y, pl.side==='l', 12); }
    },
  };
  Film(S);
}

