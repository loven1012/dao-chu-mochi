"""Build tools/voice-todo.json: every sentence the game can speak, built from the LETTERS table in game.js.

Keep the templates here in step with the strings game.js passes to say().
Usage: python tools/make_voice_todo.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
js = (ROOT / "game.js").read_text(encoding="utf-8")
letters = re.findall(r"\{ ch: '([^']+)', mam: '([^']+)',\s*abc: '([^']+)',\s*word: '([^']+)'", js)
names = list(dict.fromkeys([m for _, m, _, _ in letters] + [b for _, _, b, _ in letters]))
words = list(dict.fromkeys(w for *_, w in letters))
cap1 = lambda w: w[:1].upper() + w[1:]

todo = []
# Game prompts: "<verb> chữ <name>!" for every verb a world uses (see WORLDS[].verb in game.js).
verbs = sorted(set(re.findall(r"verb: '([^']+)'", js)))
todo += [f"{v} chữ {n}!" for v in verbs for n in names]
todo += sorted(set(re.findall(r"intro: '([^']+)'", js)))
# Word reinforcement after a correct tap: "<name>, <word>!"
todo += [f"{m}, {w}!" for _, m, _, w in letters] + [f"{b}, {w}!" for _, _, b, w in letters]
# Meet-the-letter card and picture prompts.
todo += [f"Đây là chữ {n}!" for n in names]
todo += [f"{cap1(w)} bắt đầu bằng chữ gì nhỉ?" for w in words]
# Fixed lines (keep in step with PRAISE and other say('…') literals in game.js).
todo += re.findall(r"say\('([^'$`]+)'\)", js)
m = re.search(r"const PRAISE = \[([^\]]*)\]", js)
if m:
    todo += re.findall(r"'([^']+)'", m.group(1))
m = re.search(r"const EXTRA_LINES = \[([^\]]*)\]", js)
if m:
    todo += re.findall(r"'([^']+)'", m.group(1))
todo = list(dict.fromkeys(todo))
(ROOT / "tools" / "voice-todo.json").write_text(json.dumps(todo, ensure_ascii=False, indent=1), encoding="utf-8")
have = json.loads((ROOT / "voice" / "lines.json").read_text(encoding="utf-8"))
print(f"verbs={verbs} names={len(names)} words={len(words)} total={len(todo)} missing={sum(t not in have for t in todo)}")
