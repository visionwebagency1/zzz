import json, os, re, requests
from PIL import Image
from io import BytesIO
S = requests.Session(); S.headers["User-Agent"] = "Mozilla/5.0"
base = "https://deheerenamsterdam.nl"
products = []
page = 1
while True:
    r = S.get(f"{base}/products.json?limit=250&page={page}", timeout=60); r.raise_for_status()
    p = r.json()["products"]
    if not p: break
    products += p; page += 1
os.makedirs("de-heeren/original", exist_ok=True); os.makedirs("de-heeren/web", exist_ok=True)
index = []
def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
for p in products:
    for im in p["images"]:
        url = im["src"]; ext = url.split("?")[0].rsplit(".", 1)[-1].lower()
        name = f'{slug(p["handle"])}-{im["position"]:02d}'
        raw = S.get(url, timeout=120).content
        with open(f"de-heeren/original/{name}.{ext}", "wb") as f: f.write(raw)
        try:
            img = Image.open(BytesIO(raw)); img.load()
            if img.mode in ("P", "LA"): img = img.convert("RGBA")
            w, h = img.size; scale = min(1.0, 1400 / max(w, h))
            if scale < 1: img = img.resize((round(w*scale), round(h*scale)), Image.LANCZOS)
            img.save(f"de-heeren/web/{name}.webp", "WEBP", quality=84, method=6)
            ok = True
        except Exception as e:
            ok = False; print("convert failed", name, e)
        index.append({"product": p["title"], "handle": p["handle"], "position": im["position"], "src": url, "width": im["width"], "height": im["height"], "file": f"{name}.webp" if ok else f"{name}.{ext}", "variant_ids": im["variant_ids"]})
# also the homepage hero and logo
for name, url in [("hero", f"{base}/cdn/shop/files/04124248-0DD7-45E2-86D6-9ED8782CA0F0_1_105_c.jpg"), ("logo", f"{base}/cdn/shop/files/Amsterdam_1.png"), ("favicon", f"{base}/cdn/shop/files/De_Heeren.png")]:
    try:
        raw = S.get(url, timeout=120).content; ext = url.rsplit(".",1)[-1]
        open(f"de-heeren/original/{name}.{ext}", "wb").write(raw)
        img = Image.open(BytesIO(raw)); img.load()
        w,h = img.size; scale=min(1.0, 2400/max(w,h))
        if scale<1: img=img.resize((round(w*scale),round(h*scale)), Image.LANCZOS)
        img.save(f"de-heeren/web/{name}.webp","WEBP",quality=84,method=6)
    except Exception as e: print("extra failed", name, e)
json.dump({"products": [{k: p[k] for k in ("id","title","handle","body_html","published_at","variants","images","options")} for p in products], "images": index}, open("de-heeren/catalog.json","w"), ensure_ascii=False, indent=1)
print("products", len(products), "images", len(index))
