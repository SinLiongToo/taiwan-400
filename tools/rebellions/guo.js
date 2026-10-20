// ================= chapter: Guo Huaiyi, 1652 =================
{
  const B=[120.05, 22.62, 120.56, 23.22];
  const lagoon = (lon,lat) => ((lon-120.19)/0.045)**2 + ((lat-23.04)/0.1)**2 < 1;
  const PL = {
    zeelandia:{ zh:'熱蘭遮城（大員）', en:'Fort Zeelandia', p:[120.160,23.001], side:'l', kind:'voc' },
    saccam:   { zh:'赤崁', en:'Saccam', p:[120.203,22.997], side:'r', dy:10, kind:'town' },
    yuxing:   { zh:'油行尾（郭懷一據點，約略）', en:'Yuxingwei (Guo’s base, approx.)', p:[120.250,23.025], side:'r', kind:'rebel' },
    sinkan:   { zh:'新港社', en:'Sinkan', p:[120.300,23.070], side:'r', kind:'ally' },
    houhong:  { zh:'後紅（今岡山）', en:'Houhong (Gangshan)', p:[120.300,22.800], side:'r', kind:'battle' },
    makatao:  { zh:'鳳山八社（馬卡道族）', en:'Makatao villages', p:[120.480,22.680], side:'l', kind:'ally' },
  };
  const S = {
    id:'fguo', key:'guo', T0:Date.UTC(1652,8,1), B, SP:0.0065, seconds:36, hold:0.3, slow:1.2, minRate:0.35, burstLen:0.6, pulseLen:1.2,
    gridLon:[120.1,120.3,120.5], gridLat:[22.7,22.9,23.1],
    title:['郭 懷 一 事 件　1652','THE GUO HUAIYI REBELLION   1652'],
    yearLine: Y => tx(`${Y}・清順治 ${Y-1643} 年・南明永曆 ${Y-1646} 年`, `${Y} · Shunzhi ${Y-1643} · Yongli ${Y-1646}`),
    fmtOut: t => { const [Y,m,d]=S.dateOf(t); return `${Y}/${m}/${d}`; },
    prelude:['1652 年 9 月初，赤崁一帶的漢人農民不滿荷蘭的人頭稅與苛政，郭懷一暗中聯絡，準備起事。','Early September 1652: Chinese farmers around Saccam resent Dutch head taxes and harsh rule, and Guo Huaiyi quietly gathers supporters.'],
    at: k => PL[k].p,
    legend:[['dot',EMBER,'起事者','Rebels'],['line',VOC,'荷蘭軍','Dutch troops'],['line',IND,'原住民盟軍','Indigenous allies']],
    init(S){
      const D=S.D; S.T_END=D('1652-09-30');
      S.dots = dotsIn(B, S.SP, (lon,lat)=>!lagoon(lon,lat));
      for (let lon=120.150; lon<=120.172; lon+=0.006) S.dots.push({ lon, lat:23.001, m:0, cr:BASE[0], cg:BASE[1], cb:BASE[2] });
      S.EVENTS = ev([
        ['1652-09-07','起事消息外洩','The plot leaks','原定在宴會後動手，但當天下午七名漢人頭家向大員當局告密，郭懷一的弟弟郭保宇也到熱蘭遮城報信。','The plan was to strike after a feast, but that afternoon seven Chinese headmen informed the Tayouan authorities, and Guo’s brother Guo Baoyu also went to Fort Zeelandia to warn them.','zeelandia'],
        ['1652-09-07.8','攻入赤崁','The attack on Saccam','郭懷一得知消息外洩，當晚率眾攻入赤崁，燒毀荷蘭人的住處，部分荷蘭人逃入公司的馬廄。','Learning he had been betrayed, Guo led his followers into Saccam that night, burning Dutch houses; some Dutch fled into the Company stables.','saccam',null,true],
        ['1652-09-08','荷軍救援赤崁','The Dutch relieve Saccam','長官費爾堡派上尉夏佛萊率約 120 名火槍兵渡海救援（另一說 160 人），擊退赤崁的起事者。','Governor Verburg sent Captain Schiffely across with about 120 musketeers (160 in another account), who drove the rebels from Saccam.','saccam',null,true],
        ['1652-09-11','原住民盟軍集結','Indigenous allies gather','荷蘭召集新港社 340 人、其他西拉雅各社 140 人與鳳山八社馬卡道族約 1,000 人，與荷軍會合追擊。','The Dutch called up 340 men from Sinkan, 140 from other Siraya villages and about 1,000 from the Makatao villages to join the pursuit.','sinkan'],
        ['1652-09-12','後紅決戰','The battle at Houhong','荷軍與原住民盟軍在後紅擊潰起事者。郭懷一在潰逃中被新港社族人射殺，首級懸掛在熱蘭遮城前。','Dutch troops and their allies routed the rebels at Houhong. Guo Huaiyi was shot by a Sinkan warrior as he fled, and his head was displayed in front of Fort Zeelandia.','houhong',['9/11–12','Sep 11–12'],true],
        ['1652-09-19','首領全數被捕','The last leaders caught','殘餘的起事首領全部被捕，事件在不到兩週內結束。','The remaining leaders were all captured, and the rising was over in less than two weeks.','zeelandia'],
      ]).map(e=>{ const [y,m,dd]=e.ds.split('-'); e.d=D(`${y}-${m}-${Math.floor(+dd)}`)+((+dd)%1); return e; });
      S.PHASES=[[0,D('1652-09-07'),'密謀','The plot','#8f9fa6','人頭稅與官員的勒索讓漢人移民不滿，郭懷一聯絡農民準備起事。','Head taxes and extortion by officials angered the settlers, and Guo Huaiyi organized farmers for a rising.'],
                [D('1652-09-07'),D('1652-09-08'),'起事','The rising','#e8743d','消息外洩後郭懷一提前動手，攻入赤崁。','Betrayed, Guo struck early and stormed Saccam.'],
                [D('1652-09-08'),D('1652-09-13'),'鎮壓','The crackdown','#f29a3a','荷軍火槍兵與原住民盟軍南北夾擊，在後紅擊潰起事者。','Dutch musketeers and Indigenous allies closed in and broke the rebels at Houhong.'],
                [D('1652-09-13'),S.T_END+1,'清算','The reckoning','#a8607a','荷蘭追捕殘部，死者約佔當時台灣漢人的一成。','The Dutch hunted down the survivors; the dead amounted to about a tenth of Taiwan’s Chinese.']];
      S.SHARE=[0.22,0.16,0.32,0.30];
      S.ticks=[['1652-09-01','9/1'],['1652-09-07','9/7'],['1652-09-12','9/12'],['1652-09-19','9/19'],['1652-09-30','9/30']].map(([s,l])=>[D(s),l]);
      S.PEOPLE=[
        { zh:'郭懷一', en:'Guo Huaiyi', role:['起事首領，赤崁一帶農民','Rebel leader, a farmer near Saccam'], col:'#e8743d', st:[[0,'密謀','Plotting'],[D('1652-09-07.8'.slice(0,10))+0.8,'起事','Rising'],[D('1652-09-12'),'戰死','Killed','#d0473f']] },
        { zh:'郭保宇', en:'Guo Baoyu', role:['郭懷一之弟，反對起事','Guo’s brother, opposed the rising'], col:'#9fb2ba', st:[[0,'反對','Opposed'],[D('1652-09-07'),'報信','Warned the Dutch']] },
        { zh:'費爾堡', en:'Nicolaes Verburg', role:['荷蘭台灣長官','Dutch governor of Formosa'], col:'#f29a3a', st:[[0,'在任','In office'],[D('1652-09-08'),'下令鎮壓','Orders the crackdown']] },
      ];
      S.FIGS=[[D('1652-09-07')+0.8,'4,000–5,000','參與起事（另說更多）','Rebels (some say more)','#e8743d'],
              [D('1652-09-08'),'120','荷軍火槍兵（另說 160）','Dutch musketeers (or 160)','#f29a3a'],
              [D('1652-09-11'),'≈1,480','原住民盟軍','Indigenous allies','#5aa36f'],
              [D('1652-09-13'),'3,000–4,000','漢人死亡','Chinese dead','#d0473f'],
              [D('1652-09-13'),'8–14','荷軍陣亡（盟軍 23 人）','Dutch killed (23 allies)','#f29a3a']];
    },
    dotColor(d, t){
      const D=S.D; let c=[0,1,2].map(j=>BASE[j]+(IND[j]-BASE[j])*0.35), a=0.42;
      // rebel influence: Yuxingwei → Saccam on the 7th, then the flight south to Houhong
      if (t >= D('1652-09-07')+0.7 && t < D('1652-09-14')) {
        const q = smooth(D('1652-09-08'), D('1652-09-11'), t), cx = 120.25 + (120.30-120.25)*q, cy = 23.02 + (22.80-23.02)*q;
        const rr = 0.07 + 0.05*smooth(D('1652-09-07')+0.7, D('1652-09-08'), t), dd=dist([d.lon,d.lat],[cx,cy]);
        const fade = 1 - smooth(D('1652-09-12'), D('1652-09-14'), t);
        if (dd < rr) { const h=(1-dd/rr)*fade; c=c.map((v,j)=>v+(EMBER[j]-v)*h); a+=0.45*h; }
      }
      if (t >= D('1652-09-12')) { const dd=dist([d.lon,d.lat],PL.houhong.p); if (dd<0.06) { const h=(1-dd/0.06)*0.6; c=c.map((v,j)=>v+(CRIMSON[j]-v)*h); a+=0.3*h; } }
      return [c, a];
    },
    extras(t){
      const D=S.D;
      if (t >= D('1652-09-08')-0.2) arrow(PL.zeelandia.p, PL.saccam.p, smooth(D('1652-09-08')-0.2, D('1652-09-08')+0.2, t), VOC);
      if (t >= D('1652-09-10')) { const q=smooth(D('1652-09-10'), D('1652-09-12'), t); arrow([120.18,22.99], PL.houhong.p, q, VOC); arrow(PL.sinkan.p, PL.houhong.p, q, IND); arrow(PL.makatao.p, PL.houhong.p, q, IND); }
    },
    drawPlaces(t){
      for (const k in PL) { const pl=PL[k], [x,y]=P(...pl.p);
        if (pl.kind==='voc') { const s=7; ctx.fillStyle=rgba(VOC,1); ctx.strokeStyle=C.bg; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y-s*1.3); ctx.lineTo(x+s*1.3,y); ctx.lineTo(x,y+s*1.3); ctx.lineTo(x-s*1.3,y); ctx.closePath(); ctx.fill(); ctx.stroke(); }
        else { ctx.fillStyle = pl.kind==='rebel' ? rgba(EMBER,1) : pl.kind==='ally' ? rgba(IND,1) : C.bg; ctx.strokeStyle=C.ink; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(x,y,4.8,0,6.2832); ctx.fill(); ctx.stroke(); }
        label(pl.zh, pl.en, x, y+(pl.dy||0), pl.side==='l', 12.5); }
      const [lx,ly]=P(120.192,23.08); ctx.font=font(500,12*L.u,F.d); ctx.fillStyle=rgba(hex('#6f97b0'),0.9); ctx.textAlign='center'; ctx.fillText(tx('台江內海','Taijiang Lagoon'), lx, ly); ctx.textAlign='left';
    },
  };
  Film(S);
}

