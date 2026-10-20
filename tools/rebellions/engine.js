// ================= shared helpers =================
const COS = Math.cos(23.5*Math.PI/180);
const clamp = (x,a,b) => Math.max(a, Math.min(b, x));
const smooth = (a,b,x) => { const t = clamp((x-a)/(b-a),0,1); return t*t*(3-2*t); };
const hex = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
const rgba = (c,a) => `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a.toFixed(3)})`;
const pw = (x, pts) => { if (x<=pts[0][0]) return pts[0][1]; for (let i=1;i<pts.length;i++) if (x<=pts[i][0]) { const [a,va]=pts[i-1],[b,vb]=pts[i]; return va+(vb-va)*(x-a)/(b-a); } return pts[pts.length-1][1]; };
const C = { bg:'#08151d', ink:'#ece6d6', muted:'#8fa6b0', faint:'#2a4756', grid:'#16303d' };
const EMBER=hex('#e8743d'), VOC=hex('#f29a3a'), QING=hex('#ecd04f'), IND=hex('#5aa36f'), MILITIA=hex('#7fd3d0'), CRIMSON=hex('#d0473f'), BASE=hex('#34505d'), INK=hex('#ece6d6');
const F = { d:'"Noto Serif TC","Songti TC","PMingLiU",serif', b:'"Noto Sans TC","Microsoft JhengHei","PingFang TC",sans-serif', m:'"IBM Plex Mono",Consolas,monospace' };
const font = (w,s,f) => `${w} ${s}px ${f}`;
const MON = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
const COAST = [[121.54,25.30],[121.62,25.24],[121.74,25.15],[121.85,25.11],[121.92,25.03],[121.83,24.90],[121.82,24.75],[121.86,24.59],[121.78,24.42],[121.70,24.28],[121.62,24.02],[121.58,23.85],[121.50,23.60],[121.45,23.38],[121.37,23.15],[121.25,22.92],[121.15,22.75],[121.02,22.58],[120.95,22.45],[120.90,22.30],[120.86,22.10],[120.85,21.92],[120.75,21.93],[120.70,21.95],[120.72,22.10],[120.62,22.30],[120.50,22.45],[120.38,22.52],[120.27,22.62],[120.20,22.78],[120.13,22.95],[120.10,23.10],[120.08,23.30],[120.13,23.50],[120.20,23.75],[120.30,23.95],[120.40,24.15],[120.52,24.35],[120.68,24.58],[120.85,24.80],[120.98,24.95],[121.10,25.05],[121.28,25.12],[121.40,25.18],[121.54,25.30]];
const SPINE = [[121.55,24.75],[121.35,24.45],[121.18,24.05],[121.02,23.55],[120.90,23.05],[120.83,22.55],[120.79,22.18]];
function pip(x,y,p){ let inside=false; for(let i=0,j=p.length-1;i<p.length;j=i++){ const [xi,yi]=p[i],[xj,yj]=p[j]; if(((yi>y)!==(yj>y)) && (x < (xj-xi)*(y-yi)/(yj-yi)+xi)) inside=!inside; } return inside; }
function segDist(px,py,a,b){ const ax=a[0]*COS,ay=a[1],bx=b[0]*COS,by=b[1],x=px*COS; const dx=bx-ax,dy=by-ay; const t=clamp(((x-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy),0,1); return Math.hypot(x-(ax+t*dx), py-(ay+t*dy)); }
const mountain = (lon,lat) => { let d=9; for (let i=0;i<SPINE.length-1;i++) d=Math.min(d, segDist(lon,lat,SPINE[i],SPINE[i+1])); const w=0.24+0.17*Math.exp(-(((lat-23.8)/0.6)**2)); return clamp(1-d/w,0,1); };
const dist = (a, b) => Math.hypot((a[0]-b[0])*COS, a[1]-b[1]);
function dotsIn(B, sp, extraOk){ const out=[]; for (let r=0, lat=B[3]; lat>B[1]; lat-=sp*0.866, r++) for (let lon=B[0]+(r%2?sp/COS/2:0); lon<B[2]; lon+=sp/COS) if (pip(lon,lat,COAST) && (!extraOk || extraOk(lon,lat))) out.push({ lon, lat, m:mountain(lon,lat), cr:BASE[0], cg:BASE[1], cb:BASE[2] }); return out; }

let ctx, L, P, M;
function wrap(text, maxW){
  const toks = text.match(/[\p{Script=Latin}0-9.,;:!?%’'"“”()\/\-–]+|\s|./gu) || [];
  const lines=[]; let line='';
  for (const t of toks) { if (line && !/^[，。、；：！？）」』,.;:!?)]$/.test(t) && ctx.measureText(line+t).width > maxW) { lines.push(line.trimEnd()); line = t.trim() ? t : ''; } else line += t; }
  if (line) lines.push(line); return lines;
}
function fitFont(text, weight, size, family, maxW, min=11){ let s=size; ctx.font=font(weight,s,family); while (s>min && ctx.measureText(text).width>maxW) { s-=1; ctx.font=font(weight,s,family); } }
function label(zh, en, x, y, left, size=12.5, col=C.ink){
  const u=L.u, lx=x+(left?-11:11);
  ctx.textAlign = left ? 'right' : 'left'; ctx.font=font(600,size*u,F.b);
  const nm = tx(zh,en);
  ctx.lineWidth=3.5; ctx.strokeStyle=C.bg; ctx.strokeText(nm, lx, y+4.5); ctx.fillStyle=col; ctx.fillText(nm, lx, y+4.5);
  if (lang==='bi') { ctx.font=font(400,(size-3)*u,F.b); ctx.strokeText(en, lx, y+4.5+12*u); ctx.fillStyle=C.muted; ctx.fillText(en, lx, y+4.5+12*u); }
  ctx.textAlign='left';
}
const rrect = (x,y,w,h,r) => { ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); };
function arrow(a, b, q, col, dashed=false, w=2.4){
  const [x0,y0]=P(...a), [x1,y1]=P(...b), xb=x0+(x1-x0)*q, yb=y0+(y1-y0)*q;
  ctx.setLineDash(dashed?[4,5]:[]); ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(xb,yb);
  if (!dashed) { ctx.strokeStyle=rgba(hex(C.bg),0.8); ctx.lineWidth=w+3; ctx.stroke(); }
  ctx.strokeStyle=rgba(col,0.95); ctx.lineWidth=w; ctx.stroke(); ctx.setLineDash([]);
  if (q<1) { const an=Math.atan2(y1-y0,x1-x0); ctx.fillStyle=rgba(col,1); ctx.beginPath(); ctx.moveTo(xb+Math.cos(an)*8, yb+Math.sin(an)*8); ctx.lineTo(xb+Math.cos(an+2.5)*8, yb+Math.sin(an+2.5)*8); ctx.lineTo(xb+Math.cos(an-2.5)*8, yb+Math.sin(an-2.5)*8); ctx.closePath(); ctx.fill(); }
}
function burst(p, q){ const [x,y]=P(...p); for (let i=0;i<3;i++) { ctx.strokeStyle=rgba(EMBER,(1-q)*0.9); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,(8+24*q)*(1+0.3*i),0,6.2832); ctx.stroke(); } }
function pulse(p){ const [x,y]=P(...p), ph=(performance.now()/1000)%1; ctx.strokeStyle=rgba(INK,(1-ph)*0.85); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,9+ph*28,0,6.2832); ctx.stroke(); }

// ================= chapter film =================
const LAYOUTS = {
  land: { W:1600, H:900, u:1, title:{x:56,y:58}, date:{x:52,y:180,size:104}, year:{x:58,y:218}, phase:{x:58,y:278,size:34}, pdesc:{x:58,y:318,w:370,lh:27,max:4},
    event:{x:58,y:478,w:370}, map:{x:450,y:24,w:600,h:800}, people:{x:1100,y:56,w:440,rh:92}, figs:{x:1100,y:476,w:440,rh:56}, strip:{x:56,y:846,w:1488,h:28} },
  port: { W:720, H:2040, u:1.3, title:{x:28,y:50}, date:{x:24,y:140,size:84}, year:{x:30,y:178}, phase:{x:28,y:234,size:30}, pdesc:{x:28,y:274,w:664,lh:30,max:2},
    map:{x:16,y:330,w:688,h:640}, event:{x:28,y:1020,w:664}, people:{x:28,y:1210,w:664,rh:96}, figs:{x:28,y:1620,w:664,rh:58}, strip:{x:28,y:1970,w:664,h:32} },
};
const films=[];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function Film(S){
  const cv=document.getElementById(S.id), c2=cv.getContext('2d'), stage=cv.parentElement;
  const play=document.getElementById('play'+S.key), scrub=document.getElementById('scrub'+S.key), out=document.getElementById('out'+S.key), speed=document.getElementById('speed'+S.key);
  const D = s => { const [y,m,d]=s.split('-').map(Number); return (Date.UTC(y,m-1,d)-S.T0)/864e5; };
  const dateOf = t => { const dt=new Date(S.T0 + Math.floor(t)*864e5); return [dt.getUTCFullYear(), dt.getUTCMonth()+1, dt.getUTCDate()]; };
  S.D=D; S.dateOf=dateOf; S.init && S.init(S);
  const T_END=S.T_END, f={ t:0, playing:false, visible:true, started:false, Lay:null, Mm:{} };
  const Pf = (lon,lat) => [f.Mm.ox+(lon-S.B[0])*COS*f.Mm.k, f.Mm.oy+(S.B[3]-lat)*f.Mm.k];
  const phaseAt = t => S.PHASES.find(p => t>=p[0] && t<p[1]) || S.PHASES[S.PHASES.length-1];
  const lastEvent = t => { let e=null; for (const x of S.EVENTS) if (x.d<=t) e=x; else break; return e; };
  f.layout = () => {
    const cw = stage.clientWidth || 1000;
    f.Lay = cw < 720 ? LAYOUTS.port : LAYOUTS.land;
    const scale = Math.min(2, window.devicePixelRatio||1) * cw / f.Lay.W;
    cv.width=Math.round(f.Lay.W*scale); cv.height=Math.round(f.Lay.H*scale); c2.setTransform(scale,0,0,scale,0,0);
    const r=f.Lay.map, gw=(S.B[2]-S.B[0])*COS, gh=S.B[3]-S.B[1];
    f.Mm.k=Math.min(r.w/gw, r.h/gh); f.Mm.ox=r.x+(r.w-gw*f.Mm.k)/2; f.Mm.oy=r.y+(r.h-gh*f.Mm.k)/2; f.Mm.dot=S.SP*f.Mm.k*0.42; f.Mm.gh=gh*f.Mm.k;
    for (const d of S.dots) [d.x,d.y]=Pf(d.lon,d.lat);
  };
  f.setPlaying = p => { f.playing=p; setK(play, p ? 'pause' : (f.t>=T_END ? 'replay' : 'play')); };
  f.seek = t => { f.t=clamp(t,0,T_END); scrub.value=f.t; out.textContent=S.fmtOut(f.t); };
  scrub.max=T_END;
  play.addEventListener('click', ()=>{ f.started=true; if (!f.playing && f.t>=T_END) f.seek(0); f.setPlaying(!f.playing); });
  scrub.addEventListener('input', ()=>{ f.started=true; f.seek(+scrub.value); if (f.playing) f.setPlaying(false); });
  cv.setAttribute('tabindex','0');
  cv.addEventListener('keydown', e=>{ if (e.key===' ') { e.preventDefault(); play.click(); } else if (e.key==='ArrowRight') f.seek(Math.floor(f.t)+1); else if (e.key==='ArrowLeft') f.seek(Math.floor(f.t)-1); });
  const BASE_RATE = S.PHASES.map((p,i)=>(Math.min(p[1],T_END)-p[0])/(S.SHARE[i]*S.seconds));
  const rate = x => { const base=BASE_RATE[S.PHASES.indexOf(phaseAt(x))]; let dmin=Infinity; for (const e of S.EVENTS) { const dd = x<e.d ? e.d-x : x-e.d-S.hold; dmin=Math.min(dmin, Math.max(0,dd)); } return Math.max(S.minRate, base*clamp(dmin/S.slow,0,1)); };
  const sx = t => { const r=L.strip; let acc=0; for (let i=0;i<S.PHASES.length;i++) { const [a,b]=S.PHASES[i], bb=Math.min(b,T_END); if (t<=bb || i===S.PHASES.length-1) return r.x + r.w*(acc + S.SHARE[i]*clamp((t-a)/(bb-a),0,1)); acc+=S.SHARE[i]; } };
  const evDate = e => e.lbl ? tx(e.lbl[0],e.lbl[1]) : (([Y,m,d]) => `${m}/${d}`)(dateOf(e.d));

  function drawMap(t, dt){
    const r=L.map, u=L.u, fk=1-Math.pow(0.004, dt);
    ctx.save(); ctx.beginPath(); ctx.rect(r.x,r.y,r.w,r.h); ctx.clip();
    ctx.strokeStyle=C.grid; ctx.lineWidth=1; ctx.font=font(400,11*u,F.m); ctx.fillStyle=C.faint;
    for (const lon of S.gridLon) { const [x]=P(lon,0); ctx.beginPath(); ctx.moveTo(x,r.y); ctx.lineTo(x,r.y+r.h); ctx.stroke(); ctx.fillText(`${lon}°E`, x+4, r.y+r.h-8); }
    for (const lat of S.gridLat) { const [,yy]=P(0,lat); ctx.beginPath(); ctx.moveTo(r.x,yy); ctx.lineTo(r.x+r.w,yy); ctx.stroke(); ctx.fillText(`${lat}°N`, r.x+r.w-50*u, yy-5); }
    for (const d of S.dots) { const [c,a]=S.dotColor(d,t); d.cr+=(c[0]-d.cr)*fk; d.cg+=(c[1]-d.cg)*fk; d.cb+=(c[2]-d.cb)*fk; ctx.fillStyle=`rgba(${d.cr|0},${d.cg|0},${d.cb|0},${a.toFixed(3)})`; ctx.beginPath(); ctx.arc(d.x,d.y,M.dot,0,6.2832); ctx.fill(); }
    S.extras(t);
    for (const e of S.EVENTS) if (e.battle && t>=e.d && t<e.d+S.burstLen) burst(S.at(e.at), (t-e.d)/S.burstLen);
    S.drawPlaces(t);
    const e=lastEvent(t); if (e && e.at && t-e.d < S.pulseLen) pulse(S.at(e.at));
    ctx.restore();
    // legend
    const items=S.legend, lh=(lang==='bi'?30:21)*u, w=(lang==='zh'?170:240)*u, h=items.length*lh+12, x=r.x+10, y=S.legendTop ? r.y+10 : r.y+r.h-h-30*u;
    ctx.fillStyle='rgba(8,21,29,0.88)'; ctx.fillRect(x,y,w,h); ctx.strokeStyle=C.faint; ctx.lineWidth=1; ctx.strokeRect(x,y,w,h);
    items.forEach(([kind,col,zh,en],i)=>{ const yy=y+12+i*lh+8*u, sx0=x+10;
      if (kind==='dot') { ctx.fillStyle=rgba(col,0.95); ctx.beginPath(); ctx.arc(sx0+6,yy-4,6,0,6.2832); ctx.fill(); }
      else { ctx.setLineDash(kind==='dash'?[3,4]:[]); ctx.strokeStyle=rgba(col,1); ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(sx0,yy-4); ctx.lineTo(sx0+16,yy-4); ctx.stroke(); ctx.setLineDash([]); }
      ctx.font=font(500,12*u,F.b); ctx.fillStyle=C.ink; ctx.fillText(tx(zh,en), sx0+24, yy);
      if (lang==='bi') { ctx.font=font(400,10.5*u,F.b); ctx.fillStyle=C.muted; ctx.fillText(en, sx0+24, yy+13*u); } });
  }
  function drawHeader(t){
    const u=L.u, ph=phaseAt(t), [Y,m,d]=dateOf(t), bi=lang==='bi';
    ctx.font=font(700,13*u,F.b); ctx.fillStyle=C.muted; ctx.fillText(tx(...S.title), L.title.x, L.title.y);
    const big = S.big ? S.big(t) : tx(`${m}月${d}日`, `${MON[m]} ${d}`); fitFont(big, 900, L.date.size, F.d, 390*u, 40); ctx.fillStyle=C.ink; ctx.fillText(big, L.date.x, L.date.y);
    ctx.font=font(500,17*u,F.d); ctx.fillStyle=C.muted; const yl=S.yearLine(Y); ctx.fillText(S.sub ? S.sub(t) : (bi ? `${yl}　${MON[m]} ${d}, ${Y}` : yl), L.year.x, L.year.y);
    const pn=tx(ph[2],ph[3]); fitFont(pn, 900, L.phase.size, F.d, L.pdesc.w, 18); ctx.fillStyle=ph[4]; ctx.fillText(pn, L.phase.x, L.phase.y);
    if (bi) { const w=ctx.measureText(pn).width; ctx.font=font(500,17*u,F.d); if (w+12+ctx.measureText(ph[3]).width <= L.pdesc.w) { ctx.globalAlpha=0.85; ctx.fillText(ph[3], L.phase.x+w+12, L.phase.y); ctx.globalAlpha=1; } }
    const pd=L.pdesc; ctx.font=font(400,(lang==='en'?15.5:16.5)*u,F.b); ctx.fillStyle=C.muted;
    wrap(tx(ph[5],ph[6]), pd.w).slice(0,pd.max).forEach((ln,i)=>ctx.fillText(ln, pd.x, pd.y+i*pd.lh));
  }
  function drawEvent(t){
    const r=L.event, u=L.u, bi=lang==='bi', port=L.W<1000;
    ctx.strokeStyle=C.faint; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(r.x,r.y-24*u); ctx.lineTo(r.x+r.w,r.y-24*u); ctx.stroke();
    ctx.font=font(700,11.5*u,F.b); ctx.fillStyle=C.muted; ctx.fillText(tx('紀 事','EVENTS')+(bi?'  EVENTS':''), r.x, r.y-4*u);
    const idx=S.EVENTS.indexOf(lastEvent(t));
    if (idx<0) { ctx.font=font(400,15*u,F.b); ctx.fillStyle=C.muted; wrap(tx(...S.prelude), r.w).forEach((ln,i)=>ctx.fillText(ln, r.x, r.y+24*u+i*24*u)); return; }
    const e=S.EVENTS[idx], dl=evDate(e);
    fitFont(dl, 600, 14*u, F.m, 82*u, 9); ctx.fillStyle=phaseAt(e.d)[4]; ctx.fillText(dl, r.x, r.y+24*u);
    const title=tx(e.tz,e.te); fitFont(title, 700, 23*u, F.d, r.w-92*u, 14); ctx.fillStyle=C.ink; ctx.fillText(title, r.x+92*u, r.y+25*u);
    let y=r.y+58*u;
    if (bi) { fitFont(e.te, 500, 14*u, F.b, r.w-92*u, 10); ctx.fillStyle=C.muted; ctx.fillText(e.te, r.x+92*u, r.y+45*u); y=r.y+74*u; }
    ctx.font=font(400,(lang==='en'?14.5:15.5)*u,F.b); ctx.fillStyle=C.muted;
    const lines=wrap(tx(e.bz,e.be), r.w).slice(0, port?3:5); lines.forEach((ln,i)=>ctx.fillText(ln, r.x, y+i*24*u)); y+=lines.length*24*u+22*u;
    for (let j=idx-1; j>=Math.max(0,idx-2) && !port; j--) { const p=S.EVENTS[j], s = bi ? `${p.tz} ${p.te}` : tx(p.tz,p.te); ctx.globalAlpha=0.6;
      fitFont(evDate(p), 600, 12.5*u, F.m, 84*u, 9); ctx.fillStyle=C.muted; ctx.fillText(evDate(p), r.x, y);
      fitFont(s, 500, 14*u, F.b, r.w-92*u, 10); ctx.fillStyle=C.ink; ctx.fillText(s, r.x+92*u, y); y+=24*u; ctx.globalAlpha=1; }
  }
  function drawPeople(t){
    const r=L.people, u=L.u, bi=lang==='bi';
    ctx.font=font(700,14*u,F.b); ctx.fillStyle=C.ink; const tt=tx('人物','People'); ctx.fillText(tt, r.x, r.y);
    if (bi) { const w=ctx.measureText(tt).width; ctx.font=font(400,12*u,F.b); ctx.fillStyle=C.muted; ctx.fillText('People', r.x+w+8, r.y); }
    S.PEOPLE.forEach((pp,i)=>{
      const y=r.y+14*u+i*r.rh, pw=56*u, ph=70*u, x0=r.x+pw+14*u;
      let st=pp.st[0]; for (const s of pp.st) if (t>=s[0]) st=s;
      const col=st[3]||pp.col;
      ctx.save(); rrect(r.x,y,pw,ph,4); ctx.clip();
      const im=pp.img && IMG[pp.img]; if (im && im.complete && im.naturalWidth) ctx.drawImage(im, r.x, y, pw, ph);
      else { ctx.fillStyle=rgba(hex(pp.col),0.2); ctx.fillRect(r.x,y,pw,ph); ctx.fillStyle=pp.col; ctx.font=font(900,ph*0.45,F.d); ctx.textAlign='center'; ctx.fillText(pp.zh[0], r.x+pw/2, y+ph*0.66); ctx.textAlign='left'; }
      ctx.restore(); ctx.strokeStyle=pp.col; ctx.lineWidth=1.5; rrect(r.x,y,pw,ph,4); ctx.stroke();
      const nm=tx(pp.zh,pp.en); fitFont(nm, 900, 20*u, F.d, r.w-pw-150*u, 12); ctx.fillStyle=C.ink; ctx.fillText(nm, x0, y+20*u);
      let yy=y+40*u; if (bi) { fitFont(pp.en, 500, 12*u, F.b, r.w-pw-140*u, 9); ctx.fillStyle=C.muted; ctx.fillText(pp.en, x0, yy); yy+=17*u; }
      fitFont(tx(...pp.role), 400, 12.5*u, F.b, r.w-pw-24*u, 9); ctx.fillStyle=C.muted; ctx.fillText(tx(...pp.role), x0, yy);
      const chip = bi ? `${st[1]} ${st[2]}` : tx(st[1],st[2]); ctx.font=font(700,12*u,F.b);
      const cw=ctx.measureText(chip).width+16*u, cx=r.x+r.w-cw, cy=y+3*u;
      ctx.fillStyle=rgba(hex(col),0.18); rrect(cx,cy,cw,22*u,11*u); ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=1.2; ctx.stroke(); ctx.fillStyle=col; ctx.fillText(chip, cx+8*u, cy+15.5*u);
      ctx.strokeStyle=C.grid; ctx.beginPath(); ctx.moveTo(r.x, y+ph+12*u); ctx.lineTo(r.x+r.w, y+ph+12*u); ctx.stroke();
    });
  }
  function drawFigs(t){
    const r=L.figs, u=L.u, bi=lang==='bi';
    ctx.font=font(700,14*u,F.b); ctx.fillStyle=C.ink; const tt=tx('數字','The figures'); ctx.fillText(tt, r.x, r.y);
    if (bi) { const w=ctx.measureText(tt).width; ctx.font=font(400,12*u,F.b); ctx.fillStyle=C.muted; ctx.fillText('The figures', r.x+w+8, r.y); }
    S.FIGS.forEach(([d,n,zh,en,col],i)=>{ const y=r.y+42*u+i*r.rh, on=t>=d;
      fitFont(on?n:'—', 900, 28*u, F.d, 140*u, 14); ctx.fillStyle = on ? col : C.faint; ctx.fillText(on?n:'—', r.x, y);
      fitFont(tx(zh,en), 500, 13*u, F.b, r.w-160*u, 9); ctx.fillStyle = on ? C.ink : C.faint; ctx.fillText(tx(zh,en), r.x+150*u, y-8*u);
      if (bi) { fitFont(en, 400, 11*u, F.b, r.w-160*u, 8); ctx.fillStyle=C.muted; ctx.fillText(en, r.x+150*u, y+8*u); }
      ctx.strokeStyle=C.grid; ctx.beginPath(); ctx.moveTo(r.x, y+16*u); ctx.lineTo(r.x+r.w, y+16*u); ctx.stroke(); });
  }
  function drawStrip(t){
    const r=L.strip, u=L.u;
    S.PHASES.forEach(p=>{ const x0=sx(p[0]), x1=sx(Math.min(p[1],T_END)), on=t>=p[0]&&t<p[1];
      ctx.fillStyle=p[4]; ctx.globalAlpha=on?0.95:0.35; ctx.fillRect(x0,r.y,x1-x0-1.5,r.h); ctx.globalAlpha=1;
      ctx.font=font(700,12.5*u,F.b); ctx.fillStyle=on?'#14090a':C.ink;
      let lb = lang==='bi' ? `${p[2]} ${p[3]}` : tx(p[2],p[3]); if (ctx.measureText(lb).width > x1-x0-10) lb=tx(p[2],p[3]);
      if (ctx.measureText(lb).width < x1-x0-10) ctx.fillText(lb, x0+6, r.y+r.h/2+4.5*u); });
    ctx.font=font(400,10.5*u,F.m); ctx.fillStyle=C.muted;
    for (const [v,lb] of S.ticks) { const x=sx(v); ctx.fillRect(x, r.y+r.h, 1, 5); ctx.fillText(lb, x+3, r.y+r.h+15*u); }
    ctx.fillStyle=C.ink; ctx.globalAlpha=0.55; for (const e of S.EVENTS) ctx.fillRect(sx(e.d)-0.5, r.y-6, 1, 4); ctx.globalAlpha=1;
    const x=sx(t); ctx.fillStyle=C.ink; ctx.beginPath(); ctx.moveTo(x-6,r.y-10); ctx.lineTo(x+6,r.y-10); ctx.lineTo(x,r.y-2); ctx.closePath(); ctx.fill(); ctx.fillRect(x-1,r.y-2,2,r.h+4);
  }
  f.tick = dt => {
    if (f.playing) { f.t+=dt*rate(f.t)*(+speed.value); if (f.t>=T_END) { f.t=T_END; f.setPlaying(false); } scrub.value=f.t; out.textContent=S.fmtOut(f.t); }
    if (!f.visible) return;
    ctx=c2; L=f.Lay; P=Pf; M=f.Mm;
    ctx.fillStyle=C.bg; ctx.fillRect(0,0,L.W,L.H);
    drawMap(f.t, dt); drawHeader(f.t); drawEvent(f.t); drawPeople(f.t); drawFigs(f.t); drawStrip(f.t);
  };
  new ResizeObserver(()=>f.layout()).observe(stage);
  new IntersectionObserver(es=>{ for (const e of es) { f.visible=e.isIntersecting; if (e.isIntersecting && !f.started && !reduce) { f.started=true; f.setPlaying(true); } } }, { threshold: 0.35 }).observe(cv);
  f.layout(); f.seek(0); f.setPlaying(false);
  films.push(f); return f;
}
const ev = list => list.map(e=>({ ds:e[0], tz:e[1], te:e[2], bz:e[3], be:e[4], at:e[5], lbl:e[6], battle:!!e[7] }));

