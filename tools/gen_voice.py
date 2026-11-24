"""Generate missing voice clips with VieNeu-TTS, cloning the reference voice, and register them in voice/lines.json.

Run with the Python that has VieNeu installed, from anywhere:
  E:\\AI_Models\\envs\\vieneu_env\\Scripts\\python.exe tools\\gen_voice.py [--ref FILE] [--todo FILE] [--redo TEXT ...]

- --todo: JSON list of sentences the game needs (default tools/voice-todo.json). Sentences already in
  voice/lines.json are skipped, so re-running only makes what is missing.
- --ref: 3–8 s reference recording to clone (default: the sample used for the original voice pack).
- --redo: regenerate these exact sentences even if they exist (e.g. a clip that sounds wrong).
Clips are encoded like the original pack: MP3, 24 kHz mono, 48 kbps, loudness-normalised to about -15 LUFS.
Needs ffmpeg on PATH. Works offline once the model is in the Hugging Face cache.
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VDIR = ROOT / "voice"
DEFAULT_REF = r"E:\Download\Voice clone\giong_mau_tre_em.wav"


def slug(text):
    s = unicodedata.normalize("NFD", text.replace("đ", "d").replace("Đ", "D"))
    s = "".join(c for c in s if unicodedata.category(c) != "Mn").lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:48]
    return f"{s}-{hashlib.sha1(text.encode('utf-8')).hexdigest()[:6]}"


def trim_silence(wav, sr, thresh=0.01, pad=0.06):
    import numpy as np
    idx = np.where(np.abs(wav) > thresh)[0]
    if not len(idx):
        return wav
    a = max(0, idx[0] - int(pad * sr))
    b = min(len(wav), idx[-1] + int(pad * sr * 2))
    return wav[a:b]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", default=DEFAULT_REF)
    ap.add_argument("--todo", default=str(ROOT / "tools" / "voice-todo.json"))
    ap.add_argument("--redo", nargs="*", default=[])
    a = ap.parse_args()
    for s in (sys.stdout, sys.stderr):
        try:
            s.reconfigure(encoding="utf-8")
        except Exception:  # noqa: BLE001
            pass

    os.environ.setdefault("HF_HUB_OFFLINE", "1")
    lines_path = VDIR / "lines.json"
    lines = json.loads(lines_path.read_text(encoding="utf-8"))
    todo = json.loads(Path(a.todo).read_text(encoding="utf-8"))
    want = [t for t in dict.fromkeys(todo) if t not in lines or t in a.redo]
    print(f"{len(todo)} sentences listed, {len(want)} to generate", flush=True)
    if not want:
        return

    import numpy as np
    import soundfile as sf
    from vieneu import Vieneu
    t0 = time.time()
    tts = Vieneu(device="cpu")
    tts.add_voice("mochi", a.ref)
    print(f"model + voice ready in {time.time() - t0:.0f}s", flush=True)
    sr = int(tts.sample_rate)
    tmp = Path(tempfile.mkdtemp(prefix="mochi-voice-"))
    for i, text in enumerate(want, 1):
        t = time.time()
        wav = None
        for attempt in range(3):
            w = np.asarray(tts.infer(text, voice="mochi"), dtype=np.float32)
            w = trim_silence(w, sr)
            dur = len(w) / sr
            # A short sentence that comes out far too long or too short is usually a glitch: try again.
            syll = len(text.split())
            if 0.25 * syll <= dur <= 0.75 * syll + 1.2:
                wav = w
                break
            print(f"  retry {attempt + 1}: {dur:.1f}s for {syll} words", flush=True)
            wav = w
        raw = tmp / "raw.wav"
        sf.write(str(raw), wav, sr)
        name = slug(text) + ".mp3"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(raw),
                        "-af", "loudnorm=I=-15:TP=-1:LRA=11", "-ar", "24000", "-ac", "1",
                        "-b:a", "48k", str(VDIR / name)], check=True)
        lines[text] = name
        lines_path.write_text(json.dumps(lines, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"[{i}/{len(want)}] {text} -> {name} ({len(wav) / sr:.1f}s, {time.time() - t:.1f}s)", flush=True)
    subprocess.run([sys.executable, "-I", str(ROOT / "tools" / "build_voice_index.py")], check=True)


if __name__ == "__main__":
    main()
