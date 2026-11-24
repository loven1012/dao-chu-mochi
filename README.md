# Đảo Chữ Mochi

Web game học chữ cái tiếng Việt cho bé 3–5 tuổi. Chạy hoàn toàn bằng HTML/CSS/JS tĩnh, cài được lên iPhone/iPad như app (PWA) và chơi được khi không có mạng.

## Chạy thử trên máy

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Mở http://localhost:8765. Service worker lưu bản offline, nên sau khi sửa file cần chạy lại `tools/build_sw.py` (xem dưới) rồi tải lại trang hai lần.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Khung trang, đăng ký service worker |
| `style.css` | Giao diện |
| `game.js` | Toàn bộ logic: 29 chữ, 19 trò, đề bài, phần thưởng, khu phụ huynh |
| `voice/` | Câu đọc thu sẵn (mp3) và `lines.json` (câu → file); `index.js` được sinh tự động |
| `assets/` | Ảnh nền và ảnh bạn thú |
| `icons/`, `manifest.webmanifest`, `sw.js` | Phần PWA (biểu tượng, cài lên màn hình chính, chơi offline) |
| `tools/` | Công cụ cho người làm game, không cần đưa lên web |
| `original/` | Bản gốc xuất từ artifact Claude (để đối chiếu) |

## Thêm hoặc sửa câu đọc

1. Sửa câu trong `game.js` (các mẫu câu nằm ở `PRAISE`, `EXTRA_LINES`, `meetLine`, `picLine`, `WORLDS[].verb/intro`).
2. `python tools/make_voice_todo.py` để liệt kê mọi câu game cần.
3. Tạo giọng còn thiếu bằng VieNeu-TTS (nhân bản giọng mẫu):
   ```powershell
   E:\AI_Models\envs\vieneu_env\Scripts\python.exe tools\gen_voice.py
   ```
   Thêm `--redo "Câu cần đọc lại!"` nếu một câu nghe chưa ổn.
4. `python tools/build_sw.py` để cập nhật bản offline.

`tools/stroke-preview.html` (mở qua máy chủ local) vẽ toàn bộ nét tô của trò Tô chữ để kiểm tra.
