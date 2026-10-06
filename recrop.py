"""Re-crop full-length portraits to the face. Params: (center x, center y, crop width) as fractions of the image."""
import json, io, base64, time, urllib.parse, urllib.request, os
from PIL import Image
UA={"User-Agent":"tw-history-anim/1.0 (personal educational project)"}
CROPS={
 "Kangxi Emperor":(.5,.22,.36),"Yongzheng Emperor":(.5,.2,.36),"Qianlong Emperor":(.5,.27,.24),
 "Jiaqing Emperor":(.5,.2,.36),"Daoguang Emperor":(.5,.2,.36),"Xianfeng Emperor":(.5,.2,.36),
 "Tongzhi Emperor":(.5,.2,.36),"Guangxu Emperor":(.5,.34,.2),"Koxinga":(.5,.16,.42),
 "Zheng Jing":(.5,.16,.4),"Zheng Keshuang":(.5,.16,.4),"Emperor Meiji":(.72,.22,.42),
}
d=json.load(open("portraits_cache.json",encoding="utf-8"))
for k in ["François Caron","Hans Putmans"]: d.pop(k,None)
def get(u):
    for i in range(6):
        try: return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30).read()
        except Exception:
            if i==5: raise
            time.sleep(15*(i+1))
for k,(cx,cy,wf) in CROPS.items():
    q=urllib.parse.urlencode(dict(action="query",prop="imageinfo",titles="File:"+d[k]["file"],iiprop="url",iiurlwidth=900,format="json",formatversion=2))
    url=json.loads(get("https://commons.wikimedia.org/w/api.php?"+q))["query"]["pages"][0]["imageinfo"][0]["thumburl"]
    im=Image.open(io.BytesIO(get(url))).convert("RGB"); w,h=im.size
    cw=wf*w; ch=cw/0.8; x0=max(0,cx*w-cw/2); y0=max(0,cy*h-ch/2)
    im=im.crop((int(x0),int(y0),int(x0+cw),int(y0+ch))).resize((160,200),Image.LANCZOS)
    b=io.BytesIO(); im.save(b,"JPEG",quality=82,optimize=True)
    d[k]["src"]="data:image/jpeg;base64,"+base64.b64encode(b.getvalue()).decode(); print("recropped",k,flush=True); time.sleep(2)
json.dump(d,open("portraits_cache.json","w",encoding="utf-8"),ensure_ascii=False)
with open("portraits.js","w",encoding="utf-8") as f:
    f.write("// Generated from Wikimedia Commons by fetch_portraits.py + recrop.py. Credits are listed on the page.
")
    f.write("window.PORTRAITS = "+json.dumps(d,ensure_ascii=False)+";
")
sheet=Image.new("RGB",(len(CROPS)*80,100))
for i,k in enumerate(CROPS): sheet.paste(Image.open(io.BytesIO(base64.b64decode(d[k]["src"].split(",")[1]))).resize((80,100)),(i*80,0))
sheet.save(os.path.join(os.environ["TEMP"],"sheet2.png"))
