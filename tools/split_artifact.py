"""One-off: split the exported single-file artifact (index.html) into index.html, style.css, game.js and voice/ clips.

Usage: python tools/split_artifact.py  (run from the project root; reads index.html, rewrites it)
"""
import base64
import hashlib
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
src = (ROOT / "index.html").read_text(encoding="utf-8")
lines = src.split("\n")

# Line 1 carries the artifact host's base styles; keep them at the top of style.css.
base_css = re.search(r"<style>(.*?)</style>", lines[0], re.S).group(1)
css_start = lines.index("<style>")
css_end = lines.index("</style>")
app_start = lines.index('<div id="app">')
vp_line = next(i for i, l in enumerate(lines) if l.startswith('<script id="voice-pack">'))
js_start = vp_line + 1
assert lines[js_start] == "<script>"
js_end = max(i for i, l in enumerate(lines) if l == "</script>")

css = "/* Base styles from the original artifact host */\n" + base_css + "\n\n" + "\n".join(lines[css_start + 1:css_end]) + "\n"
markup = "\n".join(lines[app_start:vp_line]).rstrip() + "\n"
js = "\n".join(lines[js_start + 1:js_end]) + "\n"

pack = json.loads(re.search(r"window\.VOICE_PACK=(\{.*\});</script>", lines[vp_line]).group(1))


def slug(text):
    s = unicodedata.normalize("NFD", text.replace("đ", "d").replace("Đ", "D"))
    s = "".join(c for c in s if unicodedata.category(c) != "Mn").lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:48]
    return f"{s}-{hashlib.sha1(text.encode('utf-8')).hexdigest()[:6]}"


vdir = ROOT / "voice"
vdir.mkdir(exist_ok=True)
lines_map = {}
for text, uri in pack.items():
    m = re.match(r"data:audio/mpeg;base64,(.*)", uri)
    name = slug(text) + ".mp3"
    (vdir / name).write_bytes(base64.b64decode(m.group(1)))
    lines_map[text] = name
(vdir / "lines.json").write_text(json.dumps(lines_map, ensure_ascii=False, indent=1), encoding="utf-8")

(ROOT / "style.css").write_text(css, encoding="utf-8")
(ROOT / "game.js").write_text(js, encoding="utf-8")
head = """<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Đảo Chữ Mochi</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Nunito:wght@600;800&display=swap">
<link rel="stylesheet" href="style.css">
</head>
<body>
"""
tail = """
<script src="voice/index.js"></script>
<script src="game.js"></script>
</body>
</html>
"""
(ROOT / "index.html").write_text(head + markup + tail, encoding="utf-8")
print("css", len(css), "markup", len(markup), "js", len(js), "clips", len(lines_map))
