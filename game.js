(() => {
'use strict';

const $ = (s, r = document) => r.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };
const cap1 = w => w.charAt(0).toUpperCase() + w.slice(1);

const LETTERS = [
  { ch: 'O', mam: 'o',  abc: 'o',       word: 'ong',   obj: '🐝' },
  { ch: 'B', mam: 'bờ', abc: 'bê',      word: 'bò',    obj: '🐮' },
  { ch: 'M', mam: 'mờ', abc: 'em mờ',   word: 'mèo',   obj: '🐱' },
  { ch: 'H', mam: 'hờ', abc: 'hát',     word: 'hoa',   obj: '🌸' },
  { ch: 'L', mam: 'lờ', abc: 'e lờ',    word: 'lá',    obj: '🍃' },
  { ch: 'X', mam: 'xờ', abc: 'ích xì',  word: 'xe',    obj: '🚗' },
  { ch: 'C', mam: 'cờ', abc: 'xê',      word: 'cừu',   obj: '🐑' },
  { ch: 'T', mam: 'tờ', abc: 'tê',      word: 'táo',   obj: '🍎' },
  { ch: 'S', mam: 'sờ', abc: 'ét xì',   word: 'sóc',   obj: '🐿️' },
  { ch: 'V', mam: 'vờ', abc: 'vê',      word: 'vịt',   obj: '🦆' },
  { ch: 'N', mam: 'nờ', abc: 'en nờ',   word: 'nho',   obj: '🍇' },
  { ch: 'G', mam: 'gờ', abc: 'giê',     word: 'gà',    obj: '🐔' },
  { ch: 'A', mam: 'a',  abc: 'a',       word: 'áo',    obj: '👕' },
  { ch: 'Ă', mam: 'á',  abc: 'á',       word: 'ăn',    obj: '🍚' },
  { ch: 'Â', mam: 'ớ',  abc: 'ớ',       word: 'ấm',    obj: '🫖' },
  { ch: 'D', mam: 'dờ', abc: 'dê',      word: 'dê',    obj: '🐐' },
  { ch: 'Đ', mam: 'đờ', abc: 'đê',      word: 'đèn',   obj: '💡' },
  { ch: 'E', mam: 'e',  abc: 'e',       word: 'em bé', obj: '👶' },
  { ch: 'Ê', mam: 'ê',  abc: 'ê',       word: 'ếch',   obj: '🐸' },
  { ch: 'I', mam: 'i',  abc: 'i',       word: 'ỉn',    obj: '🐷' },
  { ch: 'K', mam: 'ca', abc: 'ca',      word: 'kẹo',   obj: '🍬' },
  { ch: 'P', mam: 'pờ', abc: 'pê',      word: 'pin',   obj: '🔋' },
  { ch: 'Q', mam: 'quờ', abc: 'cu',     word: 'quả',   obj: '🍊' },
  { ch: 'R', mam: 'rờ', abc: 'e rờ',    word: 'rùa',   obj: '🐢' },
  { ch: 'U', mam: 'u',  abc: 'u',       word: 'ủng',   obj: '🥾' },
  { ch: 'Ư', mam: 'ư',  abc: 'ư',       word: 'ưng',   obj: '🦅' },
  { ch: 'Ô', mam: 'ô',  abc: 'ô',       word: 'ô tô',  obj: '🚙' },
  { ch: 'Ơ', mam: 'ơ',  abc: 'ơ',       word: 'ớt',    obj: '🌶️' },
  { ch: 'Y', mam: 'y',  abc: 'i dài',   word: 'yến',   obj: '🐦' }
];
const DEFAULT_LETTERS = ['O', 'B', 'M', 'H', 'L', 'X'];
const FR = [[[7,7,201,195],[209,7,194,195],[404,8,197,194],[601,8,197,194],[799,8,198,194],[998,10,194,192],[1193,7,197,195],[1391,8,195,194],[9,207,202,186],[212,208,196,185],[408,207,198,187],[606,207,196,186],[803,207,199,186],[1002,207,196,186],[1198,207,197,186],[1395,207,191,186],[8,395,196,245],[209,395,194,245],[408,395,192,245],[604,395,194,245],[802,395,194,245],[1001,395,193,245],[1196,395,193,245],[1395,395,188,244],[10,646,201,157],[212,646,195,157],[409,646,197,157],[607,645,196,158],[805,645,196,158],[1004,646,195,157],[1200,645,196,158],[1398,646,186,157],[15,810,192,166],[215,810,190,166],[415,810,190,166],[613,810,189,166],[810,811,189,165],[1009,810,188,166],[1205,810,188,166],[1401,811,184,165]],[[20,12,176,173],[218,12,175,173],[414,11,176,174],[610,11,177,174],[807,11,176,174],[1004,11,176,174],[1201,11,177,174],[1398,11,176,174],[14,191,186,192],[211,191,185,192],[411,190,184,193],[605,191,186,192],[803,191,185,192],[1002,190,184,193],[1198,190,185,193],[1396,190,184,193],[14,386,183,218],[213,386,181,218],[410,386,183,218],[606,386,183,219],[802,386,184,218],[1000,386,184,218],[1198,385,183,219],[1395,385,183,219],[7,606,192,170],[206,606,191,170],[403,606,191,170],[601,606,190,170],[797,606,191,170],[995,606,191,170],[1193,606,190,170],[1390,606,190,170],[21,777,182,201],[219,777,182,201],[416,777,181,201],[612,776,182,203],[810,776,181,203],[1009,777,181,202],[1206,776,182,203],[1403,776,180,203]],[[13,20,188,175],[209,21,186,174],[405,18,190,177],[603,19,187,176],[803,19,185,175],[1000,19,186,176],[1196,18,186,176],[1392,19,186,175],[10,203,191,174],[210,205,189,172],[409,205,192,172],[604,203,192,174],[805,204,189,173],[1001,204,189,173],[1198,204,190,173],[1397,204,186,173],[12,390,193,174],[209,390,194,177],[409,390,194,177],[605,390,194,176],[803,390,193,176],[1001,390,192,177],[1198,390,192,176],[1396,394,190,172],[12,570,190,183],[209,571,192,182],[410,570,192,182],[607,570,192,182],[805,571,191,181],[1005,571,188,181],[1204,571,190,181],[1400,571,186,181],[11,758,189,202],[209,757,189,203],[406,757,191,203],[604,757,188,203],[802,757,191,203],[1003,758,186,202],[1198,758,189,202],[1395,758,186,202]],[[18,4,176,219],[218,4,179,219],[416,2,176,221],[609,2,177,221],[802,3,176,220],[1000,3,173,219],[1192,3,173,220],[1387,3,172,219],[16,227,193,179],[217,228,191,178],[416,228,189,178],[612,227,188,179],[809,229,189,178],[1004,229,188,178],[1197,228,188,179],[1390,228,187,179],[10,407,206,178],[214,407,195,177],[410,407,195,177],[604,407,196,178],[801,407,196,178],[998,407,194,178],[1192,408,195,177],[1386,407,197,177],[16,586,195,199],[214,585,194,200],[411,584,195,200],[607,585,195,200],[804,585,194,201],[999,586,194,199],[1194,585,194,200],[1388,584,196,201],[14,792,193,183],[214,792,191,183],[409,792,192,183],[605,792,190,183],[800,791,193,184],[998,793,193,182],[1195,793,189,182],[1387,791,192,184]]];
const AW = 1586, AH = 992;
const PET = { B: [11, 1], C: [18, 2], D: [13, 3], G: [5, 4], M: [0, 0], R: [19, 5], S: [10, 6], V: [6, 7], I: [17, 2] };
(() => {
  const rest = [1, 2, 3, 4, 7, 8, 9, 12, 14, 15, 16]; let k = 0;
  LETTERS.forEach(L => { if (!PET[L.ch]) { PET[L.ch] = [rest[k % 11], (k * 3 + 2 + (k >= 11 ? 4 : 0)) % 8]; k++; } });
})();
const animalOf = X => ({ p: PET[X.ch][0], c: PET[X.ch][1] });
const WORLD_PET = [{ p: 1, c: 0 }, { p: 11, c: 1 }, { p: 17, c: 2 }, { p: 10, c: 3 }, { p: 3, c: 4 }, { p: 19, c: 5 }, { p: 4, c: 6 }, { p: 5, c: 7 }, { p: 2, c: 3 }, { p: 6, c: 0 }, { p: 7, c: 2 }, { p: 8, c: 4 }, { p: 9, c: 5 }, { p: 12, c: 6 }, { p: 13, c: 1 }, { p: 14, c: 7 }, { p: 15, c: 3 }, { p: 18, c: 2 }, { p: 16, c: 4 }];
function animalSVG(a, ch, tc) {
  const at = Math.floor(a.p / 5), fr = FR[at][(a.p % 5) * 8 + a.c], x = fr[0], y = fr[1], w = fr[2], h = fr[3];
  const img = `<i class="img" style="background-image:url(assets/animal-atlas-sleepy-${at}.webp);background-size:${AW / w * 100}% ${AH / h * 100}%;background-position:${x / Math.max(1, AW - w) * 100}% ${y / Math.max(1, AH - h) * 100}%;aspect-ratio:${w}/${h}"></i>`;
  return `<span class="spr" aria-hidden="true">${img}${ch ? `<b class="sgn" style="--tc:${tc || '#7a5cff'}">${ch}</b>` : ''}</span>`;
}
const PAL = [
  { c: '#ff6b5e', c2: '#ffa096', t: '#ffffff' },
  { c: '#ffc83d', c2: '#ffe08a', t: '#1d2750' },
  { c: '#1fa56a', c2: '#74d9a8', t: '#ffffff' },
  { c: '#2f86f0', c2: '#8cc0ff', t: '#ffffff' },
  { c: '#7a5cff', c2: '#b4a2ff', t: '#ffffff' },
  { c: '#ff8fbf', c2: '#ffc2dc', t: '#1d2750' }
];
const colOf = X => PAL[LETTERS.indexOf(X) % PAL.length];
const SPARK = ['#ff6b5e', '#ffc83d', '#4fd08f', '#4ba3ff', '#a98bff', '#ff8fbf'];

const WORLDS = [
  { key: 'mole',    name: 'Đập chuột',   verb: 'Đập', color: '#e0802f', c2: '#f5a65c', intro: 'Nghe chữ nào thì đập chữ đó!',  hint: 'Bạn thú ló lên rồi chui xuống. Gặp bạn đội vương miện là được thêm giờ.' },
  { key: 'balloon', name: 'Bắt bóng',    verb: 'Bắt', color: '#2f86f0', c2: '#6fb0ff', intro: 'Nghe chữ nào thì bắt chữ đó!',  hint: 'Bóng bay lên theo gió, chạm đúng quả.' },
  { key: 'range',   name: 'Bia bắn tơ',  verb: 'Bắn', color: '#e8559a', c2: '#ff8cc0', intro: 'Nghe chữ nào thì bắn chữ đó!',  hint: 'Bia chữ chạy trên đường ray. Chạm đúng bia để bắn tơ, tơ nhện sẽ dính vào bia.' },
  { key: 'fruit',   name: 'Hứng quả',    verb: 'Hứng', color: '#3fa860', c2: '#74d68f', intro: 'Nghe chữ nào thì hứng chữ đó!', hint: 'Kéo giỏ sang trái, phải để hứng đúng quả.' },
  { key: 'web',     name: 'Bắn tơ',      verb: 'Bắn', color: '#7a5cff', c2: '#a28cff', intro: 'Nghe chữ nào thì bắn chữ đó!',  hint: 'Chữ bay ở xa gần khác nhau, chạm để bắn tơ.' },
  { key: 'fish',    name: 'Bắt cá',      verb: 'Bắt', color: '#1a9bd7', c2: '#58c6f2', intro: 'Nghe chữ nào thì bắt chữ đó!',  hint: 'Cá bơi nhanh chậm, có con lao vút và quay đầu. Chạm để câu.' },
  { key: 'swing',   name: 'Đu tơ',       verb: 'Đu tới', color: '#e0802f', c2: '#f5a65c', intro: 'Nghe chữ nào thì đu tới chữ đó!', hint: 'Nhện đu qua đu lại. Chạm đúng lúc để thả tơ rơi xuống chữ cần tìm.' },
  { key: 'toss',    name: 'Quét tơ',     verb: 'Quét', color: '#2aa7a0', c2: '#6fd6cf', intro: 'Nghe chữ nào thì quét chữ đó!',  hint: 'Chữ bị tung lên cao. Vuốt ngón tay qua đúng chữ để quét tơ.' },
  { key: 'sling',   name: 'Ná tơ',       verb: 'Bắn', color: '#7a5cff', c2: '#a28cff', intro: 'Nghe chữ nào thì bắn chữ đó!',  hint: 'Chữ đu đưa trên sợi tơ. Kéo ngón tay để ngắm rồi thả ra để bắn.' },
  { key: 'cups',    name: 'Úp ly',       verb: 'Bắt', color: '#e0602f', c2: '#ff9d6b', intro: 'Nghe chữ nào thì bắt chữ đó!',  hint: 'Nhìn chữ nằm dưới ly nào, theo dõi ly xáo trộn rồi chọn đúng ly.' },
  { key: 'fog',     name: 'Lau sương',   verb: 'Quét', color: '#4aa3df', c2: '#8dcdf5', intro: 'Nghe chữ nào thì quét chữ đó!',  hint: 'Lau lớp sương mù bằng ngón tay để tìm chữ, rồi chạm vào chữ đúng.' },
  { key: 'wheel',   name: 'Vòng quay',   verb: 'Bắn', color: '#d94f8a', c2: '#ff8fbf', intro: 'Nghe chữ nào thì bắn chữ đó!',  hint: 'Chữ quay quanh vòng. Chạm đúng lúc chữ đi qua mũi tên để bắn.' },
  { key: 'slide',   name: 'Nhện trượt tơ', verb: 'Bắt', color: '#1fa56a', c2: '#74d9a8', intro: 'Nghe chữ nào thì bắt chữ đó!', hint: 'Kéo ngón tay lên xuống cho nhện trượt tới đúng chữ đang bay tới.' },
  { key: 'bowl',    name: 'Bowling chữ', verb: 'Đập', color: '#e0802f', c2: '#f5a65c', intro: 'Nghe chữ nào thì đập chữ đó!',  hint: 'Trượt quả bóng tơ sang trái phải, thả tay để lăn trúng đúng chữ đang chạy.' },
  { key: 'dig',     name: 'Đào kho báu', verb: 'Đập', color: '#a8703c', c2: '#d9a066', intro: 'Nghe chữ nào thì đập chữ đó!',  hint: 'Chạm vào đống đất vài lần để đào chữ lên.' },
  { key: 'wander',  name: 'Bắt bướm',    verb: 'Bắt', color: '#b05bd9', c2: '#d79af5', intro: 'Nghe chữ nào thì bắt chữ đó!',  hint: 'Những chú bướm mang chữ bay lượn. Chạm đúng bướm để bắt.' },
  { key: 'lane',    name: 'Đua làn',     verb: 'Hứng', color: '#2f86f0', c2: '#6fb0ff', intro: 'Nghe chữ nào thì hứng chữ đó!', hint: 'Chạm vào làn đường để nhện chạy sang, hứng đúng chữ rơi xuống.' },
  { key: 'drag',    name: 'Kéo vào rổ',  verb: 'Bắt', color: '#3fa860', c2: '#74d68f', intro: 'Nghe chữ nào thì bắt chữ đó!',  hint: 'Giữ và kéo đúng chữ thả vào rổ ở dưới.' },
  { key: 'trace',   name: 'Tô chữ',      verb: 'Tô',  color: '#ff6b5e', c2: '#ff9d8f', intro: 'Con tô theo các chấm nhé!',     hint: 'Chạm lần lượt vào các chấm sáng, hoặc vuốt ngón tay theo nét chữ.' }
];
// Touch-only worlds with no aiming or timing, offered to small children ("Trò dễ" in the parent area).
const EASY = new Set(['mole', 'balloon', 'range', 'web', 'fish', 'fog', 'dig', 'wander', 'trace']);
const BGS = [[0, 1], [0, 2], [2, 2], [3, 3], [2, 4], [3, 4], [0, 3], [3, 0], [2, 0], [3, 1], [0, 4], [2, 3], [3, 2], [0, 0], [2, 1], [3, 4], [0, 2], [2, 4], [2, 0]];
const PER = 6, TOTAL = WORLDS.length * PER;

function levelCfg(g) {
  const w = Math.floor(g / PER), lv = g % PER, k = WORLDS[w].key;
  const hits = 5 + Math.min(2, w >> 1) + (lv >= 3 ? 1 : 0);
  const perHit = Math.max(4.8, 9 - g * .12);
  const c = { g, w, lv, k, hits, time: Math.round(hits * perHit + 8) };
  if (k === 'mole') { c.up = 2 + (lv >> 1); c.hide = [3.8 - lv * .3, 4.8 - lv * .35]; c.gold = lv >= 1; c.hop = lv >= 3 ? .12 + (lv - 3) * .07 : 0; }
  if (k === 'balloon') { c.speed = 38 + lv * 9; c.show = 4 + (lv >> 1); c.size = 104 - lv * 3; c.drift = lv * 7; c.amp = 10 + lv * 7; c.gust = lv >= 3; }
  if (k === 'range') { c.rows = [1, 1, 2, 2, 3, 3][lv]; c.per = [3, 4, 3, 3, 3, 3][lv]; c.size = [84, 76, 70, 64, 60, 56][lv]; c.speed = 34 + lv * 14; c.assist = [64, 48, 34, 22, 12, 6][lv]; c.flip = lv >= 3; }
  if (k === 'fruit') { c.speed = 56 + lv * 9; c.show = Math.min(4, 3 + (lv >> 2)); c.size = 84 - lv * 3; c.sway = lv >= 2 ? 10 + lv * 8 : 0; }
  if (k === 'web') { c.show = 4 + (lv >> 1) + (lv >= 4 ? 1 : 0); }
  if (k === 'fish') { c.speed = 58 + lv * 8; c.lanes = lv >= 3 ? 4 : 3; c.dart = lv >= 2; c.turn = lv >= 4; }
  if (k === 'swing') { c.n = [3, 3, 4, 4, 4, 5][lv]; c.swA = [.42, .5, .56, .62, .68, .74][lv]; c.speed = 1 + lv * .1; c.slide = lv >= 2 ? (lv - 1) * 12 : 0; }
  if (k === 'sling') { c.n = [3, 3, 4, 4, 5, 5][lv]; c.size = [78, 72, 68, 62, 58, 54][lv]; c.amp = [.14, .22, .3, .36, .42, .48][lv]; c.speed = .9 + lv * .25; c.ball = 620 + lv * 30; c.assist = [34, 26, 20, 14, 8, 4][lv]; c.guide = lv < 4; }
  if (k === 'cups') { c.n = [3, 3, 3, 4, 4, 5][lv]; c.swaps = [2, 3, 4, 5, 6, 7][lv]; c.swapMs = [700, 600, 500, 420, 350, 290][lv]; c.reveal = [1900, 1600, 1400, 1200, 1000, 900][lv]; c.speed = 1; }
  if (k === 'fog') { c.n = [3, 4, 4, 5, 5, 6][lv]; c.size = [84, 78, 72, 66, 62, 58][lv]; c.fog = [.8, .88, .92, .95, .97, .98][lv]; c.brush = [48, 42, 38, 34, 30, 27][lv]; c.regrow = [0, 0, .012, .018, .025, .03][lv]; c.drift = lv >= 3 ? (lv - 2) * 14 : 0; c.tapReveal = lv < 3; }
  if (k === 'wheel') { c.n = [5, 5, 6, 6, 7, 8][lv]; c.size = [66, 62, 58, 54, 50, 46][lv]; c.speed = .5 + lv * .14; c.assist = [40, 30, 22, 14, 8, 4][lv]; c.direct = lv < 2; c.rev = lv >= 3; }
  if (k === 'slide') { c.slots = [3, 3, 3, 4, 4, 5][lv]; c.size = [84, 78, 72, 66, 62, 58][lv]; c.speed = 80 + lv * 16; c.follow = [14, 11, 9, 7.5, 6, 5][lv]; c.gap = [.8, .74, .68, .62, .56, .5][lv]; }
  if (k === 'bowl') { c.rows = 1; c.cols = [3, 4, 4, 5, 5, 6][lv]; c.size = [76, 68, 64, 60, 56, 52][lv]; c.speed = [0, 0, 24, 34, 46, 60][lv]; c.assist = [40, 30, 22, 14, 8, 4][lv]; c.guide = lv < 4; }
  if (k === 'dig') { c.n = [3, 4, 4, 5, 6, 6][lv]; c.hp = [1, 2, 2, 3, 3, 3][lv]; }
  if (k === 'wander') { c.n = [3, 3, 4, 4, 5, 5][lv]; c.size = [84, 78, 72, 66, 62, 56][lv]; c.speed = 48 + lv * 16; }
  if (k === 'lane') { c.lanes = [3, 3, 3, 4, 4, 5][lv]; c.size = [74, 70, 66, 62, 58, 54][lv]; c.speed = 90 + lv * 18; c.every = [1.6, 1.4, 1.25, 1.1, 1.0, .9][lv]; }
  if (k === 'drag') { c.n = [3, 3, 4, 4, 5, 5][lv]; c.size = [80, 74, 70, 64, 60, 56][lv]; c.speed = 18 + lv * 8; c.bw = [160, 146, 132, 118, 104, 92][lv]; c.slide = lv >= 3 ? (lv - 2) * 14 : 0; }
  if (k === 'trace') { c.hits = 3 + (lv >= 3 ? 1 : 0); c.time = c.hits * 22 + 10; c.gap = [26, 24, 22, 20, 18, 16][lv]; c.guide = lv < 4; }
  if (k === 'toss') { c.wave = [2, 3, 3, 4, 4, 5][lv]; c.size = [84, 78, 72, 66, 60, 56][lv]; c.speed = 1 + lv * .1; c.assist = [26, 20, 14, 8, 4, 0][lv]; }
  return c;
}
function selectedLetters() {
  const s = LETTERS.filter(L => S.letters.includes(L.ch));
  return s.length >= 3 ? s : LETTERS.filter(L => DEFAULT_LETTERS.includes(L.ch));
}
// Letters children often mix up: same base with different marks, mirror shapes (b/d/p/q), similar sounds.
const CONFUSE = {
  O: 'ÔƠCQ', Ô: 'OƠ', Ơ: 'OÔ', A: 'ĂÂ', Ă: 'AÂ', Â: 'AĂ', E: 'ÊC', Ê: 'E', U: 'ƯNV', Ư: 'U',
  D: 'ĐBPQ', Đ: 'DB', B: 'DPĐ', P: 'QBD', Q: 'PGO', M: 'N', N: 'MHU', H: 'NK', I: 'LTY', L: 'IT',
  T: 'LI', C: 'OEG', G: 'QC', S: 'X', X: 'SK', V: 'YU', Y: 'VI', K: 'HX', R: 'DN'
};
const confusable = (a, b) => (CONFUSE[a.ch] || '').includes(b.ch) || (CONFUSE[b.ch] || '').includes(a.ch);
function poolFor(cfg) {
  const all = selectedLetters();
  const n = all.length <= 6 ? all.length : Math.min(all.length, 3 + cfg.lv + Math.min(2, cfg.w >> 2));
  if (cfg.lv > 1 || n >= all.length) return all.slice(0, n);
  // Easy levels: avoid putting look-alike letters together when there is a choice.
  const out = [];
  for (const L of all) if (out.length < n && !out.some(o => confusable(o, L))) out.push(L);
  for (const L of all) if (out.length < n && !out.includes(L)) out.push(L);
  return out;
}
// Harder levels: add look-alikes of the letters being learned as distractors only (never asked for).
function foilsFor(cfg, pool) {
  if (cfg.lv < 3) return [];
  const f = [];
  for (const X of shuffle(pool)) {
    const c = LETTERS.filter(L => !pool.includes(L) && !f.includes(L) && (CONFUSE[X.ch] || '').includes(L.ch));
    if (c.length) f.push(pick(c));
    if (f.length >= (cfg.lv >= 5 ? 2 : 1)) break;
  }
  return f;
}

const KEY = 'dao-chu-mochi-v3';
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const defaults = () => ({ v: 3, letters: DEFAULT_LETTERS.slice(), best: {}, prog: {}, sound: true, voice: true, style: 'mam', limit: 10, day: today(), sec: 0, unlockAll: false, kid: true, coll: {}, diff: 1, games: 'easy', case: 'lower', met: {} });
let S = defaults();
try {
  const raw = localStorage.getItem(KEY);
  if (raw) { const o = JSON.parse(raw); if (o && o.v === 3) S = Object.assign(defaults(), o); }
} catch (e) {}
if (!S.mig2) { for (let g = 12; g < 18; g++) delete S.best[g]; S.mig2 = 1; }
if (S.day !== today()) { S.day = today(); S.sec = 0; }
if (!S.met) S.met = {};
Object.keys(S.prog || {}).forEach(ch => { if ((S.prog[ch].rn || 0) >= 3) S.met[ch] = 1; });
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const P = ch => (S.prog[ch] = S.prog[ch] || { rn: 0, rs: 0, wr: 0 });
const best = g => S.best[g] || 0;
const unlocked = g => true;
const totalStars = () => Object.values(S.best).reduce((a, b) => a + b, 0);
const nextG = () => { for (let g = 0; g < TOTAL; g++) if (offered(Math.floor(g / PER)) && !best(g)) return g; return mixNext(); };
const offered = w => S.games === 'all' || EASY.has(WORLDS[w].key);
const offeredWorlds = () => WORLDS.map((_, w) => w).filter(offered);

// How far a letter has come: 0 not met yet, 1 just met, 2 knows it by sound, 3 solid.
// Moves on with correct answers; many wrong answers pull it back a step.
function stage(X) {
  if (!S.met[X.ch]) return 0;
  const p = P(X.ch);
  let s = p.rn < 4 ? 1 : p.rn < 10 ? 2 : 3;
  if (p.wr > 4 && p.wr > p.rn * .5) s = Math.max(1, s - 1);
  return s;
}
// Letter case shown on the tiles for the current level ('upper' or 'lower').
let CASE = 'upper';
const glyph = X => (CASE === 'lower' ? X.ch.toLowerCase() : X.ch);
const otherCase = X => (CASE === 'lower' ? X.ch : X.ch.toLowerCase());

let AC = null, master = null;
function ac() {
  if (!AC) {
    try {
      AC = new (window.AudioContext || window.webkitAudioContext)();
      master = AC.createGain(); master.gain.value = .55;
      const comp = AC.createDynamicsCompressor();
      master.connect(comp); comp.connect(AC.destination);
    } catch (e) { AC = null; }
  }
  if (AC && AC.state === 'suspended') AC.resume();
  return AC;
}
const sfxOn = () => S.sound && ac();
function tone(f, t, d, type, v, f2) {
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type || 'sine';
  o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
  g.gain.setValueAtTime(.0001, t);
  g.gain.exponentialRampToValueAtTime(v || .2, t + .012);
  g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + d + .05);
}
const SFX = {
  pop() { if (!sfxOn()) return; const t = AC.currentTime; tone(480, t, .13, 'sine', .26, 1100); tone(900, t + .03, .1, 'triangle', .12, 1600); },
  tap() { if (!sfxOn()) return; tone(760, AC.currentTime, .07, 'sine', .12); },
  soft() { if (!sfxOn()) return; tone(250, AC.currentTime, .22, 'sine', .08, 190); },
  lose() { if (!sfxOn()) return; const t = AC.currentTime; [392, 330, 262].forEach((f, i) => tone(f, t + i * .18, .4, 'triangle', .16)); },
  win() { if (!sfxOn()) return; const t = AC.currentTime; [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, t + i * .09, .45, 'triangle', .18)); },
  star(n) { if (!sfxOn()) return; const t = AC.currentTime, b = [659, 784, 1047][n % 3]; tone(b, t, .4, 'triangle', .22); tone(b * 2, t, .28, 'sine', .09); }
};

const VOICE = window.VOICE_PACK || {};
// Every spoken sentence needs a clip in voice/ (tools/make_voice_todo.py collects these lists).
const PRAISE = ['Giỏi quá!', 'Tuyệt vời!', 'Con giỏi lắm!', 'Hoan hô!', 'Siêu quá!', 'Đúng rồi!', 'Con làm được rồi!', 'Mochi vui quá!'];
const EXTRA_LINES = ['Chạm vào đây nè!'];
const meetLine = X => `Đây là chữ ${nm(X)}!`;
const picLine = X => `${cap1(X.word)} bắt đầu bằng chữ gì nhỉ?`;
// Voice clips play through Web Audio: on iPhone a new <audio> started from a timer is often blocked,
// while an AudioContext unlocked by the first tap can play at any time.
try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
let clip = null, vsrc = null, vbus = null, vtok = 0;
const vbuf = new Map();
function viVoice() {
  try { return speechSynthesis.getVoices().find(v => /^vi/i.test(v.lang)) || null; } catch (e) { return null; }
}
function loadClip(text) {
  const src = VOICE[text];
  if (!src || !ac()) return null;
  if (!vbuf.has(text)) {
    vbuf.set(text, fetch(src).then(r => r.arrayBuffer())
      .then(b => new Promise((res, rej) => AC.decodeAudioData(b, res, rej)))
      .catch(() => { vbuf.delete(text); return null; }));
  }
  return vbuf.get(text);
}
const preload = texts => texts.forEach(t => { if (t) loadClip(t); });
function stopClip() {
  vtok++;
  try { if (vsrc) vsrc.stop(); } catch (e) {}
  vsrc = null;
  try { if (clip) clip.pause(); } catch (e) {}
}
// Plays a recorded clip; resolves when it has finished (or right away if it cannot play).
function playClip(text) {
  const src = VOICE[text];
  if (!src) return null;
  stopClip();
  const tok = vtok, p = loadClip(text);
  if (!p) {
    try {
      clip = new Audio(src);
      const pr = clip.play(); if (pr && pr.catch) pr.catch(() => {});
      return new Promise(r => { clip.onended = r; clip.onerror = r; });
    } catch (e) { return null; }
  }
  return p.then(buf => new Promise(res => {
    if (!buf || tok !== vtok) { res(); return; }
    if (!vbus) { vbus = AC.createGain(); vbus.gain.value = 1; vbus.connect(AC.destination); }
    const s = AC.createBufferSource();
    s.buffer = buf; s.connect(vbus); s.onended = () => res();
    vsrc = s; s.start();
  }));
}
// say() returns a promise that resolves when the line has been spoken. It cancels any sayAll() in progress.
function say(text) { sayAllTok++; return speak(text); }
function speak(text) {
  if (!S.voice || !text) return Promise.resolve();
  try { speechSynthesis.cancel(); } catch (e) {}
  const p = playClip(text);
  if (p) return p;
  stopClip();
  if (!('speechSynthesis' in window)) return Promise.resolve();
  return new Promise(res => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN'; u.rate = .82; u.pitch = 1.25;
      const v = viVoice(); if (v) u.voice = v;
      u.onend = res; u.onerror = res;
      window.__said && window.__said(text);
      speechSynthesis.speak(u);
      setTimeout(res, 600 + text.length * 120);
    } catch (e) { res(); }
  });
}
// Speaks several lines in order; stops early if something else starts talking.
async function sayAll(texts, gap = 250) {
  const tok = ++sayAllTok;
  for (const t of texts) {
    if (tok !== sayAllTok) return;
    await speak(t);
    if (gap) await sleep(gap);
  }
}
let sayAllTok = 0;
const stopSpeech = () => {
  sayAllTok++;
  try { speechSynthesis.cancel(); } catch (e) {}
  stopClip();
};
const voiceReady = () => S.voice && (Object.keys(VOICE).length > 0 || !!viVoice());
const nm = L => (S.style === 'mam' ? L.mam : L.abc);

function mochiSVG() {
  return `<svg viewBox="0 0 140 130" role="img" aria-label="Mochi">
  <ellipse cx="70" cy="123" rx="42" ry="6" fill="rgba(29,39,80,.16)"/>
  <ellipse cx="40" cy="117" rx="14" ry="8" fill="#ff9fc0"/><ellipse cx="100" cy="117" rx="14" ry="8" fill="#ff9fc0"/>
  <ellipse cx="38" cy="26" rx="12" ry="15" fill="#ffc2d7" transform="rotate(-22 38 26)"/><ellipse cx="102" cy="26" rx="12" ry="15" fill="#ffc2d7" transform="rotate(22 102 26)"/>
  <ellipse cx="38" cy="27" rx="6" ry="9" fill="#ff9fc0" transform="rotate(-22 38 27)"/><ellipse cx="102" cy="27" rx="6" ry="9" fill="#ff9fc0" transform="rotate(22 102 27)"/>
  <path d="M70 16c35 0 58 26 58 57 0 30-22 46-58 46S12 103 12 73c0-31 23-57 58-57z" fill="#ffc2d7"/>
  <path d="M30 56c6-18 22-28 40-28" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".55"/>
  <ellipse cx="34" cy="86" rx="9" ry="5.5" fill="#ff7fa6" opacity=".6"/><ellipse cx="106" cy="86" rx="9" ry="5.5" fill="#ff7fa6" opacity=".6"/>
  <g class="eo"><circle cx="50" cy="68" r="8" fill="#1d2750"/><circle cx="90" cy="68" r="8" fill="#1d2750"/><circle cx="53" cy="65" r="2.8" fill="#fff"/><circle cx="93" cy="65" r="2.8" fill="#fff"/></g>
  <g class="eh" fill="none" stroke="#1d2750" stroke-width="4.5" stroke-linecap="round"><path d="M41 72q9-12 18 0"/><path d="M81 72q9-12 18 0"/></g>
  <g class="es" fill="none" stroke="#1d2750" stroke-width="4.5" stroke-linecap="round"><path d="M41 68q9 9 18 0"/><path d="M81 68q9 9 18 0"/></g>
  <path class="mo1" d="M62 86q8 8 16 0" fill="none" stroke="#1d2750" stroke-width="4" stroke-linecap="round"/>
  <path class="mo2" d="M58 82q12 18 24 0z" fill="#c93d5f" stroke="#1d2750" stroke-width="3.5" stroke-linejoin="round"/>
  <path class="mo3" d="M62 92q8-8 16 0" fill="none" stroke="#1d2750" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}
function setMochi(cls) {
  const m = $('#mochi');
  m.classList.remove('hop', 'dance', 'happy', 'sad');
  void m.offsetWidth;
  (cls || '').split(' ').filter(Boolean).forEach(c => m.classList.add(c));
}

function burst(node, n, colors) {
  const fx = $('#fx'), fr = fx.getBoundingClientRect(), r = node.getBoundingClientRect();
  const cx = r.left + r.width / 2 - fr.left, cy = r.top + r.height / 2 - fr.top, cl = colors || SPARK;
  for (let i = 0; i < n; i++) {
    const s = el('i', 'sp' + (i % 2 ? ' st' : ''));
    const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 70;
    s.style.cssText = `left:${cx}px;top:${cy}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--c:${cl[i % cl.length]}`;
    fx.append(s);
    setTimeout(() => s.remove(), 850);
  }
}
function confetti() {
  const fx = $('#fx'), w = fx.clientWidth, h = fx.clientHeight;
  for (let i = 0; i < 46; i++) {
    const s = el('i', 'sp' + (i % 3 ? ' st' : ''));
    s.style.cssText = `left:${rnd(0, w)}px;top:${rnd(0, h * .3)}px;--dx:${rnd(-60, 60)}px;--dy:${rnd(120, h * .8)}px;--c:${SPARK[i % SPARK.length]};animation-duration:${rnd(.9, 1.6)}s`;
    fx.append(s);
    setTimeout(() => s.remove(), 1700);
  }
}
const starSVG = () => `<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.7-6-3.4-6 3.4 1.3-6.7-5-4.7 6.8-.8z"/></svg>`;
const HEART = `<svg class="h" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z"/></svg>`;

function hold(btn, ms, cb) {
  let raf = 0, t0 = 0, on = false;
  const stop = () => { on = false; cancelAnimationFrame(raf); btn.style.setProperty('--p', 0); };
  const tick = t => {
    if (!on) return;
    const p = Math.min(1, (t - t0) / ms);
    btn.style.setProperty('--p', p);
    if (p >= 1) { stop(); cb(); return; }
    raf = requestAnimationFrame(tick);
  };
  const start = () => { if (on) return; on = true; t0 = performance.now(); raf = requestAnimationFrame(tick); };
  btn.addEventListener('pointerdown', e => { e.preventDefault(); start(); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, stop));
  btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start(); } });
  btn.addEventListener('keyup', stop);
  btn.addEventListener('contextmenu', e => e.preventDefault());
}

let runId = 0, ctx = null;
const alive = id => id === runId;
function show(name) { ['home', 'play', 'sleep', 'zoo'].forEach(n => { $('#' + n).hidden = n !== name; }); }
function goHome() {
  runId++; stopSpeech(); hideHand();
  $('#result').hidden = true;
  show('home'); renderHome();
}
const limitReached = () => S.limit > 0 && S.sec >= S.limit * 60;
function showSleep() { runId++; stopSpeech(); $('#result').hidden = true; show('sleep'); }

const LOCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;
function renderHome() {
  $('#homeMochi').innerHTML = mochiSVG();
  $('#totStars b').textContent = totalStars();
  renderChips();
  $('#zooCount').textContent = collCount() + '/160';
  const wl = $('#worlds'); wl.innerHTML = '';
  WORLDS.forEach((Wd, w) => {
    if (!offered(w)) return;
    let sum = 0;
    for (let k = 0; k < PER; k++) sum += best(w * PER + k);
    const sec = el('section', 'world'); sec.style.setProperty('--wc', Wd.color); sec.style.setProperty('--wc2', Wd.c2);
    sec.innerHTML = `<header><h2><span class="wan">${animalSVG(WORLD_PET[w])}</span>${Wd.name}</h2><span class="wstar">★ ${sum}/${PER * 3}</span></header><p class="sub">${Wd.hint}</p><div class="nodes"></div>`;
    sec.classList.add('fold'); sec.querySelector('header').addEventListener('click', () => sec.classList.toggle('open'));
    const nodes = sec.querySelector('.nodes');
    for (let k = 0; k < PER; k++) {
      const g = w * PER + k, b = el('button', 'node'); b.type = 'button';
      if (unlocked(g)) {
        const s = best(g);
        b.innerHTML = `<b>${k + 1}</b><span class="st">${[0, 1, 2].map(q => `<i class="${q < s ? 'on' : ''}">★</i>`).join('')}</span>`;
        b.setAttribute('aria-label', `${Wd.name}, màn ${k + 1}, ${s} sao`);
        b.addEventListener('click', () => { ac(); SFX.tap(); startLevel(g); });
      } else {
        b.disabled = true; b.innerHTML = LOCK;
        b.setAttribute('aria-label', `${Wd.name}, màn ${k + 1}, chưa mở`);
      }
      nodes.append(b);
    }
    wl.append(sec);
  });
}

function setPrompt(html, speech) {
  $('#bubbleMain').innerHTML = html;
  ctx.prompt = speech;
  say(speech);
}
function renderHearts(n, hurt) {
  $('#hearts').innerHTML = [0, 1, 2].map(k => HEART.replace('class="h"', `class="h${k >= n ? ' lost' : ''}${hurt && k === n ? ' hurt' : ''}"`)).join('');
}
function renderTime(t, total) {
  const tb = $('#timebar');
  tb.firstElementChild.style.width = Math.max(0, t / total * 100) + '%';
  tb.classList.toggle('low', t / total < .25);
  $('#timeNum').textContent = Math.max(0, Math.ceil(t));
}

function makeEngine(id, cfg, Wd) {
  const E = { id, cfg, Wd, hearts: 3, hits: 0, wrong: 0, time: cfg.time, started: false, over: false, result: null,
    combo: 0, hitLetters: [], kid: S.kid, cur: null, last: null, t0: 0, listenT: 0, hintT: 0, tickT: 0, pool: poolFor(cfg) };
  // Focus letters come up more often: new ones, plus the one with the most mistakes.
  const weak = E.pool.filter(X => P(X.ch).wr > 0).sort((a, b) => P(b.ch).wr / (P(b.ch).rn + 1) - P(a.ch).wr / (P(a.ch).rn + 1));
  E.focus = [...new Set([...E.pool.filter(X => stage(X) <= 1), ...weak.slice(0, 1)])].slice(0, 3);
  if (!E.focus.length) E.focus = E.pool.slice(-2);
  E.foils = foilsFor(cfg, E.pool);
  E.finished = new Promise(r => { E.finish = r; });
  const cap = $('#caption');
  cap.innerHTML = Array.from({ length: cfg.hits }, () => starSVG()).join('');
  E.dots = [...cap.querySelectorAll('.star')];
  renderHearts(3); renderTime(cfg.time, cfg.time);

  E.choose = shown => {
    const c = shown.filter(X => E.pool.includes(X));
    if (!c.length) return null;
    let p = c.filter(X => X !== E.last); if (!p.length) p = c;
    const f = p.filter(X => E.focus.includes(X));
    return (f.length && Math.random() < .5) ? pick(f) : pick(p);
  };
  E.pickLetter = shown => {
    const fo = E.foils.filter(X => !shown.includes(X));
    if (fo.length && shown.length >= 2 && Math.random() < .3) return pick(fo);
    const rest = shuffle(E.pool.filter(X => !shown.includes(X)));
    if (!rest.length) return pick(E.pool);
    const f = rest.filter(X => E.focus.includes(X));
    return (f.length && Math.random() < .4) ? f[0] : rest[0];
  };
  const tick = () => {
    if (!alive(id) || E.over) { clearInterval(E.tickT); return; }
    if (document.hidden) return;
    E.time -= .1;
    renderTime(E.time, cfg.time);
    if (E.time <= 0) { E.time = 0; renderTime(0, cfg.time); E.end('time'); }
  };
  // What kind of question to ask about letter X, by how well the child knows it:
  // see = hear it and see it, hear = sound only, pic = picture of the word, gap = word with the first letter missing,
  // case = the prompt shows the other case (B on the prompt, b on the tiles).
  E.modeFor = X => {
    const st = stage(X), r = Math.random(), both = S.case === 'both';
    if (cfg.k === 'trace' || st <= 1) return 'see';
    const gapOk = X.word.charAt(0) === X.ch.toLowerCase();
    if (st === 2) return r < .3 ? 'pic' : both && r < .45 ? 'case' : 'hear';
    return r < .22 ? 'pic' : r < .4 ? (gapOk ? 'gap' : 'pic') : both && r < .55 ? 'case' : 'hear';
  };
  E.call = (X, hintFn) => {
    if (E.over) return;
    E.cur = X; E.last = X; E.t0 = performance.now();
    const mode = E.mode = E.modeFor(X), picture = mode === 'pic' || mode === 'gap';
    const sp = picture ? picLine(X) : `${Wd.verb} chữ ${nm(X)}!`;
    ctx.prompt = sp; say(sp);
    clearTimeout(E.listenT); clearTimeout(E.hintT); hideHand();
    const bm = $('#bubbleMain');
    const word = mode === 'gap' ? `<b class="pgap">_</b>${X.word.slice(1)}` : X.word;
    const picHtml = `<span class="pobj">${X.obj}</span><b class="pword">${word}</b>`;
    const chipHtml = `${Wd.verb} chữ <b class="chip">${mode === 'case' ? otherCase(X) : glyph(X)}</b>`;
    const chip = () => { if (alive(id) && E.cur === X) bm.innerHTML = picture ? `${picHtml}<b class="chip">${glyph(X)}</b>` : chipHtml; };
    if (picture) bm.innerHTML = picHtml;
    else if (mode === 'see' || mode === 'case' || !voiceReady()) chip();
    else { bm.innerHTML = `<span class="snd">Nghe nhé…</span>`; E.listenT = setTimeout(chip, 6500); }
    // When the child waits: say it again, then light up the answer, then a hand shows where to tap.
    let step = 0;
    const arm = () => {
      if (!alive(id) || E.over || E.cur !== X) return;
      step++;
      if (step === 1) say(sp);
      else {
        if (hintFn) hintFn(X);
        chip();
        if (step >= 3 && showHand()) say('Chạm vào đây nè!'); else say(sp);
      }
      E.hintT = setTimeout(arm, step === 1 ? 8000 : 10000);
    };
    E.hintT = setTimeout(arm, 8000);
    if (!E.started) { E.started = true; if (!E.kid) E.tickT = setInterval(tick, 100); }
  };
  E.hit = (X, bonus) => {
    const rt = Math.min(8, (performance.now() - E.t0) / 1000), p = P(X.ch);
    p.rs += rt; p.rn++;
    E.hits++; E.cur = null; hideHand();
    clearTimeout(E.listenT); clearTimeout(E.hintT);
    if (E.dots[E.hits - 1]) E.dots[E.hits - 1].classList.add('on');
    const pop = el('div', 'wordpop');
    pop.innerHTML = `<span class="wpa">${animalSVG(animalOf(X))}</span><b>${glyph(X)}</b> – ${cap1(X.word)} <span>${X.obj}</span>`;
    E.combo++; E.hitLetters.push(X);
    let add = E.kid ? 0 : (bonus || 0);
    if (E.combo >= 3 && !E.kid) add += Math.min(3, E.combo - 2);
    if (add) { E.time = Math.min(cfg.time, E.time + add); renderTime(E.time, cfg.time); }
    if (E.combo >= 3 || bonus) toast($('#arena'), (E.combo >= 3 ? 'Liên tiếp ×' + E.combo + '! ' : '') + (add ? '+' + add + ' giây' : ''));
    $('#arena').append(pop); setTimeout(() => pop.remove(), 1750);
    say(`${nm(X)}, ${X.word}!`);
    if (E.hits >= cfg.hits) { E.end('win'); return true; }
    return false;
  };
  E.mistake = (hintFn, tapped) => {
    if (E.over) return true;
    E.wrong++; E.combo = 0;
    if (E.cur) P(E.cur.ch).wr++;
    if (E.kid) {
      SFX.soft();
      if (tapped) {
        say(`${nm(tapped)}, ${tapped.word}!`);
        setTimeout(() => { if (alive(id) && !E.over && E.cur) say(ctx.prompt); }, 1600);
      }
      if (hintFn && E.cur && E.wrong % 2 === 0) hintFn(E.cur);
      return false;
    }
    E.hearts--; renderHearts(E.hearts, true); SFX.soft();
    if (E.hearts <= 0) { E.end('hearts'); return true; }
    if (hintFn && E.cur && E.wrong % 2 === 0) { hintFn(E.cur); say(ctx.prompt); }
    return false;
  };
  E.end = res => {
    if (E.over) return;
    hideHand();
    E.over = true; E.result = res;
    clearInterval(E.tickT); clearTimeout(E.listenT); clearTimeout(E.hintT);
    E.finish(res);
  };
  return E;
}

const tween = (id, ms, fn) => new Promise(r => {
  const t0 = performance.now();
  (function f(t) {
    if (!alive(id)) { r(); return; }
    const p = Math.min(1, (t - t0) / ms);
    fn(1 - Math.pow(1 - p, 3));
    if (p < 1) requestAnimationFrame(f); else r();
  })(t0);
});
const NEXT_CALL_MS = 1100;

const HAND = `<svg viewBox="0 0 100 120" aria-hidden="true">
  <g stroke-linecap="round" fill="none">
    <path d="M34 66 27 40M45 62 43 28M56 62 58 26M67 66 73 38M30 88 13 70" stroke="#e57aa3" stroke-width="15"/>
    <path d="M34 66 27 40M45 62 43 28M56 62 58 26M67 66 73 38M30 88 13 70" stroke="#ffc2d7" stroke-width="11.5"/>
  </g>
  <rect x="24" y="56" width="54" height="56" rx="24" fill="#e57aa3"/>
  <rect x="26" y="58" width="50" height="52" rx="22" fill="#ffc2d7"/>
  <ellipse cx="51" cy="88" rx="15" ry="11" fill="#ff9fc0"/>
  <rect x="26" y="104" width="50" height="16" rx="5" fill="#fff"/><rect x="26" y="104" width="50" height="5" fill="#b9c6f0"/>
</svg>`;
// A pointing hand that follows the highlighted answer for a few seconds (last step of the idle hints).
const POINTER = `<svg viewBox="0 0 80 100" aria-hidden="true"><path d="M30 6c5 0 9 4 9 9v28l4-2c5-2 10 0 12 4l1 3 3-1c5-1 9 2 10 6v2l2-1c5 0 8 4 8 9v14c0 14-11 25-25 25H41c-8 0-15-4-20-10L6 70c-3-4-2-9 2-12 4-3 9-2 12 1l5 6V15c0-5 4-9 9-9z" fill="#fff" stroke="#1d2750" stroke-width="4" stroke-linejoin="round"/></svg>`;
let handEl = null, handRaf = 0;
function hideHand() { cancelAnimationFrame(handRaf); if (handEl) { handEl.remove(); handEl = null; } }
function showHand() {
  hideHand();
  const t = $('#arena') && $('#arena').querySelector('.hint');
  if (!t) return false;
  const host = $('#play'); handEl = el('div', 'hand'); handEl.innerHTML = POINTER; host.append(handEl);
  const t0 = performance.now();
  const follow = () => {
    if (!handEl) return;
    if (!t.isConnected || !t.classList.contains('hint') || performance.now() - t0 > 4500) { hideHand(); return; }
    const r = t.getBoundingClientRect(), pr = host.getBoundingClientRect();
    handEl.style.transform = `translate(${r.left - pr.left + r.width / 2 - 21}px,${r.top - pr.top + r.height / 2 - 3}px)`;
    handRaf = requestAnimationFrame(follow);
  };
  follow();
  return true;
}
const FISH = `<svg viewBox="0 0 120 72" aria-hidden="true"><path d="M2 8 30 36 2 64Q12 36 2 8z" fill="var(--c2)"/><ellipse cx="66" cy="36" rx="48" ry="29" fill="var(--c)"/><path d="M52 10Q66 0 82 10Q70 16 52 10z" fill="var(--c2)"/><ellipse cx="66" cy="50" rx="28" ry="12" fill="rgba(255,255,255,.22)"/><circle cx="104" cy="28" r="6" fill="#fff"/><circle cx="106" cy="28" r="3" fill="#1d2750"/></svg>`;
const BASKET = `<svg viewBox="0 0 120 70" aria-hidden="true"><path d="M8 18h104l-12 46q-2 6-8 6H28q-6 0-8-6z" fill="#d9a066"/><path d="M8 18h104l-3 12H11z" fill="#eec08a"/><path d="M26 32l6 36M46 32l2 38M66 32v38M86 32l-2 38M104 32l-6 36" stroke="#a8703c" stroke-width="3" fill="none"/><path d="M6 18q54-20 108 0" stroke="#a8703c" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
const HAMMER = `<svg viewBox="0 0 80 90" aria-hidden="true"><rect x="34" y="30" width="12" height="58" rx="5" fill="#c58a5a"/><rect x="34" y="30" width="5" height="58" rx="2.5" fill="#e0b080"/><rect x="6" y="6" width="68" height="32" rx="12" fill="#ff6b5e"/><rect x="6" y="6" width="68" height="12" rx="6" fill="#ff9d92"/><rect x="6" y="28" width="68" height="10" rx="5" fill="#d9483c"/></svg>`;

function toast(arena, html) {
  const t = el('div', 'toast'); t.innerHTML = html; arena.append(t);
  setTimeout(() => t.remove(), 1500);
}
const relOf = (node, arena) => {
  const a = arena.getBoundingClientRect(), r = node.getBoundingClientRect();
  return { cx: r.left - a.left + r.width / 2, cy: r.top - a.top + r.height / 2, l: r.left - a.left, t: r.top - a.top, w: r.width, h: r.height };
};

/* ---------- 1. Whack-a-pet ---------- */
async function playMole(id, E) {
  const cfg = E.cfg, arena = $('#arena');
  const g = el('div', 'moleg'); arena.append(g);
  const holes = Array.from({ length: 9 }, () => {
    const b = el('button', 'hole'); b.type = 'button'; b.setAttribute('aria-label', 'Hang thú');
    b.innerHTML = `<span class="mole"></span><span class="mound"></span><span class="crown" aria-hidden="true">👑</span>`;
    g.append(b); return { b, X: null, timer: 0, gold: false };
  });
  { const r = holes[0].b.getBoundingClientRect(); arena.style.setProperty('--sw', Math.max(48, Math.min(r.width * .92, r.height - 30)) + 'px'); }
  const shownLetters = () => holes.filter(h => h.X).map(h => h.X);
  const hide = h => { clearTimeout(h.timer); h.b.classList.remove('up', 'hint', 'oops', 'gold'); h.X = null; h.gold = false; };
  const showMole = (h, X, gold) => {
    h.X = X; h.gold = !!gold;
    h.b.classList.remove('bonk', 'oops', 'hint'); h.b.classList.toggle('gold', !!gold);
    h.b.querySelector('.mole').innerHTML = animalSVG(animalOf(X), glyph(X), colOf(X).c);
    h.b.setAttribute('aria-label', 'Bạn thú chữ ' + X.ch);
    h.b.classList.add('up');
    h.timer = setTimeout(() => hide(h), rnd(cfg.hide[0], cfg.hide[1]) * (gold ? 800 : 1000));
  };
  const hintFn = X => { const h = holes.find(q => q.X === X); if (h) h.b.classList.add('hint'); };
  const swing = h => {
    const r = relOf(h.b, arena), m = el('div', 'hammer'); m.innerHTML = HAMMER;
    m.style.left = (r.cx - 36) + 'px'; m.style.top = (r.t - 40) + 'px';
    arena.append(m); setTimeout(() => m.remove(), 420);
  };
  let locked = false;
  holes.forEach(h => h.b.addEventListener('click', () => {
    if (E.over || !alive(id)) return;
    ac(); swing(h);
    if (!h.X || locked || !E.cur) return;
    if (h.X === E.cur) {
      locked = true; const X = h.X, gold = h.gold;
      clearTimeout(h.timer); h.b.classList.remove('hint'); h.b.classList.add('bonk');
      SFX.pop(); burst(h.b, gold ? 22 : 14, gold ? ['#ffc83d', '#fff1a8', '#ffffff'] : null); setMochi('happy hop');
      setTimeout(() => { hide(h); h.b.classList.remove('bonk'); }, 380);
      if (E.hit(X, gold ? 3 : 0)) return;
      setTimeout(() => { locked = false; if (alive(id) && !E.over) E.call(E.choose(shownLetters()) || pick(E.pool), hintFn); }, NEXT_CALL_MS);
    } else {
      clearTimeout(h.timer); h.b.classList.add('oops'); setTimeout(() => hide(h), 420);
      E.mistake(hintFn, h.X);
    }
  }));
  function loop() {
    if (!alive(id) || E.over) return;
    const shown = shownLetters(), free = holes.filter(h => !h.X);
    if (cfg.hop && Math.random() < cfg.hop) {
      const up = holes.filter(h => h.X);
      if (up.length && free.length) { const a = pick(up), f = pick(free), X = a.X, gd = a.gold; hide(a); showMole(f, X, gd); }
    } else if (shown.length < cfg.up && free.length) {
      const X = (E.cur && !shown.includes(E.cur) && Math.random() < .75) ? E.cur : E.pickLetter(shown);
      if (X && !shown.includes(X)) showMole(pick(free), X, cfg.gold && X === E.cur && !holes.some(h => h.gold) && Math.random() < .16);
    }
    setTimeout(loop, 600);
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  showMole(pick(holes), pick(E.pool));
  loop();
  await sleep(1100); if (!alive(id) || E.over) return;
  E.call(E.choose(shownLetters()) || E.pool[0], hintFn);
  await E.finished;
}

/* ---------- 2. Balloons in the wind ---------- */
async function playBalloon(id, E) {
  const cfg = E.cfg, arena = $('#arena'), field = el('div', 'floatg');
  arena.append(field);
  const balls = [], SZ = cfg.size;
  const onScreen = () => balls.filter(o => !o.gone).map(o => o.X);
  const hintFn = X => { const o = balls.find(q => !q.gone && q.X === X); if (o) o.b.classList.add('hint'); };
  let locked = false, gust = 0, gustT = 4;
  function spawn(X, y0) {
    const W = field.clientWidth, H = field.clientHeight, col = colOf(X), b = el('button', 'fb');
    const size = SZ * rnd(.86, 1.16);
    b.style.setProperty('--sz', size + 'px');
    b.type = 'button'; b.setAttribute('aria-label', 'Bóng bay chữ ' + X.ch);
    b.innerHTML = `<span class="fbi" style="--c:${col.c};--c2:${col.c2};--t:${col.t}">${glyph(X)}</span>`;
    field.append(b);
    const o = { b, X, size, x: rnd(4, Math.max(10, W - size - 8)), y: y0 == null ? H + 20 : y0,
      vy: cfg.speed * rnd(.85, 1.2) * Math.sqrt(SZ / size), vx: rnd(-1, 1) * cfg.drift, amp: cfg.amp * rnd(.6, 1.3), f: rnd(.7, 1.3), ph: rnd(0, 6), gone: false };
    balls.push(o);
    b.addEventListener('click', () => {
      if (o.gone || locked || E.over || !E.cur || !alive(id)) return;
      ac();
      if (o.X === E.cur) {
        o.gone = true; locked = true;
        b.classList.remove('hint'); b.classList.add('pop'); setTimeout(() => b.remove(), 500);
        SFX.pop(); burst(b, 14); setMochi('happy hop');
        if (E.hit(o.X)) return;
        setTimeout(() => { locked = false; if (alive(id) && !E.over) E.call(E.choose(onScreen()) || pick(E.pool), hintFn); }, NEXT_CALL_MS);
      } else {
        b.classList.remove('nudge'); void b.offsetWidth; b.classList.add('nudge');
        setTimeout(() => b.classList.remove('nudge'), 450);
        E.mistake(hintFn, o.X);
      }
    });
    return o;
  }
  const H0 = Math.max(arena.clientHeight, 260);
  const first = [];
  for (let k = 0; k < Math.min(cfg.show, 4); k++) { const X = E.pickLetter(first); first.push(X); spawn(X, H0 * (.2 + k * .2)); }
  let last = performance.now(), since = 0;
  function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t; since += dt;
    const W = field.clientWidth;
    if (cfg.gust) { gustT -= dt; if (gustT <= 0) { gustT = rnd(5, 8); gust = rnd(-1, 1) * 90; } gust *= Math.exp(-dt * .9); }
    for (let k = balls.length - 1; k >= 0; k--) {
      const o = balls[k];
      if (o.gone) { if (!o.b.isConnected) balls.splice(k, 1); continue; }
      o.y -= o.vy * dt;
      o.x += (o.vx + gust) * dt;
      if (o.x < 0) { o.x = 0; o.vx = Math.abs(o.vx); }
      if (o.x > W - o.size) { o.x = W - o.size; o.vx = -Math.abs(o.vx); }
      o.b.style.transform = `translate(${o.x + Math.sin(t / 1000 * o.f * 2 + o.ph) * o.amp}px,${o.y}px)`;
      if (o.y < -o.size - 40) { o.b.remove(); balls.splice(k, 1); }
    }
    const live = balls.filter(o => !o.gone).length;
    if (since > .95 && live < cfg.show) {
      since = 0;
      const shown = onScreen();
      const X = (E.cur && !shown.includes(E.cur)) ? E.cur : E.pickLetter(shown);
      spawn(X);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  await sleep(ctx.intro); if (!alive(id)) return;
  E.call(E.choose(onScreen()) || E.pool[0], hintFn);
  await E.finished;
}

/* ---------- shared: real silk strands, web splats, spider ---------- */
const SVGNS = 'http://www.w3.org/2000/svg';
const svgel = (n, a) => { const e = document.createElementNS(SVGNS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };
const SPIDER = `<svg viewBox="0 0 100 90" aria-hidden="true"><g stroke="#3b2b73" stroke-width="6" stroke-linecap="round" fill="none"><path d="M30 44 8 28 4 12M28 54 4 54 2 40M30 62 8 78 6 88M38 66 26 86M70 44 92 28 96 12M72 54 96 54 98 40M70 62 92 78 94 88M62 66 74 86"/></g><ellipse cx="50" cy="56" rx="26" ry="24" fill="#6a4fd6"/><ellipse cx="50" cy="60" rx="18" ry="14" fill="#8c76f0"/><circle cx="50" cy="36" r="20" fill="#7a5cff"/><circle cx="41" cy="33" r="7" fill="#fff"/><circle cx="59" cy="33" r="7" fill="#fff"/><circle cx="42" cy="34" r="3.4" fill="#1d2750"/><circle cx="58" cy="34" r="3.4" fill="#1d2750"/><path d="M43 44q7 6 14 0" stroke="#1d2750" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
function makeSilk(arena) {
  const svg = svgel('svg', { class: 'webs' }); arena.append(svg);
  return {
    svg,
    strand(x1, y1, x2, y2, sag) {
      const g = svgel('g'), a = svgel('path', { class: 'silk-glow' }), b = svgel('path', { class: 'silk' });
      g.append(a, b); svg.append(g);
      const o = {
        g,
        set(x1, y1, x2, y2, sag) { const d = `M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + (sag || 0)} ${x2} ${y2}`; a.setAttribute('d', d); b.setAttribute('d', d); },
        remove() { g.remove(); },
        fade(ms) { g.style.transition = `opacity ${ms}ms`; requestAnimationFrame(() => { g.style.opacity = 0; }); setTimeout(() => g.remove(), ms + 60); }
      };
      o.set(x1, y1, x2, y2, sag); return o;
    },
    splat(x, y, r) {
      const g = svgel('g', { class: 'splat' }); g.style.transformOrigin = `${x}px ${y}px`;
      let d = '';
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; d += `M${x} ${y}L${x + Math.cos(a) * r} ${y + Math.sin(a) * r}`; }
      g.append(svgel('path', { d }));
      [.4, .7, 1].forEach(k => {
        const rr = r * k; let q = '';
        for (let i = 0; i < 8; i++) {
          const a0 = i * Math.PI / 4, a1 = a0 + Math.PI / 4, am = a0 + Math.PI / 8;
          if (!i) q += `M${x + Math.cos(a0) * rr} ${y + Math.sin(a0) * rr}`;
          q += `Q${x + Math.cos(am) * rr * .82} ${y + Math.sin(am) * rr * .82} ${x + Math.cos(a1) * rr} ${y + Math.sin(a1) * rr}`;
        }
        g.append(svgel('path', { d: q }));
      });
      svg.append(g); setTimeout(() => g.remove(), 1800); return g;
    }
  };
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------- 3. Shooting range: rows of letter targets on rails ---------- */
async function playRange(id, E) {
  const cfg = E.cfg, arena = $('#arena'); arena.classList.add('catch');
  const W = arena.clientWidth, H = arena.clientHeight, silk = makeSilk(arena);
  const spider = el('div', 'spider'); spider.innerHTML = SPIDER; arena.append(spider);
  const ox = W / 2, oy = H - 36, top = 8, rowH = (H - 98 - top) / cfg.rows;
  const size = Math.min(cfg.size, rowH - 10), span = W + size * 1.4;
  const items = [], rmul = [1, 1.35, .75];
  let locked = false;
  const live = () => items.filter(o => !o.gone);
  const shown = () => live().map(o => o.X);
  for (let r = 0; r < cfg.rows; r++) {
    const cy = top + rowH * (r + .5), rail = el('div', 'rail'); rail.style.top = (cy + size / 2 - 2) + 'px'; arena.append(rail);
    const dir = r % 2 ? -1 : 1, per = cfg.per;
    for (let k = 0; k < per; k++) {
      const b = el('div', 'rgt'); b.style.cssText = `width:${size}px;height:${size}px;font-size:${Math.round(size * .42)}px`;
      const o = { b, X: null, row: r, dir, x: (k + .5) / per * span - size * .7, cy, size, ph: rnd(0, 6), flip: cfg.flip && Math.random() < .5, v: cfg.speed * rmul[r % 3], hold: 0, gone: false };
      setL(o, E.pickLetter(shown())); arena.append(b); items.push(o);
    }
  }
  function setL(o, X) {
    o.X = X; const c = colOf(X); o.b.textContent = glyph(X); o.b.style.setProperty('--c', c.c); o.b.style.setProperty('--t', c.t);
    o.b.setAttribute('aria-label', 'Chữ ' + X.ch);
  }
  const hintFn = X => { const o = live().find(q => q.X === X); if (o) o.b.classList.add('hint'); };
  const nextCall = () => { if (!alive(id) || E.over) return; items.forEach(o => o.b.classList.remove('hint')); E.call(E.choose(shown()) || E.pool[0], hintFn); };
  const place = (o, t) => {
    const sx = o.flip ? Math.max(.2, Math.abs(Math.cos(t / 1000 * 1.5 + o.ph))) : 1;
    o.b.style.transform = `translate(${o.x - o.size / 2}px,${o.cy - o.size / 2}px) scaleX(${sx})`;
  };
  let last = performance.now();
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    for (const o of items) {
      if (o.gone) continue;
      if (!o.grab && o.hold <= 0) {
        o.x += o.dir * o.v * dt;
        if (o.dir > 0 && o.x > W + size * .7) { o.x -= span; if (o.X !== E.cur) setL(o, E.pickLetter(shown())); }
        if (o.dir < 0 && o.x < -size * .7) { o.x += span; if (o.X !== E.cur) setL(o, E.pickLetter(shown())); }
      } else o.hold -= dt;
      if (!o.grab) place(o, t);
    }
    requestAnimationFrame(frame);
  })(last);
  async function shoot(px, py) {
    if (locked || !E.cur || E.over || !alive(id)) return;
    let o = null, bd = 1e9;
    for (const q of live()) { const d = Math.hypot(q.x - px, q.cy - py); if (d <= q.size / 2 + cfg.assist && d < bd) { bd = d; o = q; } }
    locked = true; ac(); SFX.tap();
    const tx = px, ty = py, st = silk.strand(ox, oy, ox, oy, 0);
    spider.classList.remove('shot'); void spider.offsetWidth; spider.classList.add('shot');
    await tween(id, 190, p => { const ex = o ? o.x : tx, ey = o ? o.cy : ty; st.set(ox, oy, ox + (ex - ox) * p, oy + (ey - oy) * p, 18 * (1 - p)); });
    if (!alive(id)) return;
    if (!o) { silk.splat(tx, ty, 22); st.fade(450); await sleep(120); locked = false; return; }
    silk.splat(o.x, o.cy, o.size * .8);
    if (o.X === E.cur) {
      o.grab = true; o.b.classList.remove('hint'); o.b.classList.add('webbed'); SFX.pop();
      const sx = o.x, sy = o.cy;
      await sleep(200);
      await tween(id, 380, p => {
        const cx = sx + (ox - sx) * p, cy = sy + (oy - 26 - sy) * p;
        o.b.style.transform = `translate(${cx - o.size / 2}px,${cy - o.size / 2}px) scale(${1 - .8 * p})`; st.set(ox, oy, cx, cy, 0);
      });
      if (!alive(id)) return;
      st.fade(300); o.gone = true; o.b.remove(); burst(spider, 14); setMochi('happy hop');
      const X = o.X, row = o.row, n = items.indexOf(o);
      if (E.hit(X)) return;
      const nb = el('div', 'rgt'); nb.style.cssText = o.b.style.cssText.replace(/transform[^;]*;?/, '');
      const no = Object.assign({}, o, { b: nb, gone: false, grab: false, x: o.dir > 0 ? -size * .7 : W + size * .7 });
      setL(no, E.pickLetter(shown().concat([X]))); arena.append(nb); items[n] = no;
      await sleep(NEXT_CALL_MS); locked = false; nextCall();
    } else {
      o.hold = .5; o.b.classList.remove('nudge'); void o.b.offsetWidth; o.b.classList.add('nudge');
      await sleep(180); st.fade(260);
      E.mistake(hintFn, o.X); locked = false;
    }
  }
  arena.addEventListener('pointerdown', e => { const r = arena.getBoundingClientRect(); shoot(e.clientX - r.left, e.clientY - r.top); });
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall();
  await E.finished;
}

/* ---------- 7. Silk swing: time the release, land on the right letter ---------- */
async function playSwing(id, E) {
  const cfg = E.cfg, arena = $('#arena'); arena.classList.add('catch');
  const W = arena.clientWidth, H = arena.clientHeight, silk = makeSilk(arena);
  const px = W / 2, py = -6, TH = 54, platTop = H - TH - 6, G = 1050, R = 28;
  const L = Math.min(platTop - R - 8 - py - 70, W * .46);
  const A = cfg.swA, om = 1.75 * cfg.speed;
  const n = cfg.n, slot = W / n, pw = slot - 12;
  const spider = el('div', 'spider swg'); spider.innerHTML = SPIDER; arena.append(spider);
  const st = silk.strand(px, py, px, py + L, 0);
  const aim = el('div', 'aim'); aim.hidden = cfg.lv >= 3; arena.append(aim);
  const plats = [];
  const shown = () => plats.map(o => o.X);
  const setL = (o, X) => { o.X = X; const c = colOf(X); o.b.textContent = glyph(X); o.b.style.setProperty('--c', c.c); o.b.style.setProperty('--t', c.t); o.b.setAttribute('aria-label', 'Chữ ' + X.ch); };
  for (let i = 0; i < n; i++) {
    const b = el('div', 'wl wlm isl'); b.style.cssText = `width:${pw}px;height:${TH}px;font-size:${Math.round(TH * .66)}px`;
    const o = { b, X: null, x: (i + .5) * slot }; setL(o, E.pickLetter(shown())); arena.append(b); plats.push(o);
  }
  let state = 'swing', t0 = performance.now(), sx = px, sy = py + L, vx = 0, vy = 0, locked = false;
  const hintFn = X => { const o = plats.find(q => q.X === X); if (o) o.b.classList.add('hint'); };
  const nextCall = () => { if (!alive(id) || E.over) return; plats.forEach(o => o.b.classList.remove('hint')); E.call(E.choose(shown()) || E.pool[0], hintFn); };
  const drawSpider = () => { spider.style.transform = `translate(${sx - 32}px,${sy - 28}px)`; st.set(px, py, sx, sy - 22, 0); };
  const landX = (x0, y0, vx0, vy0) => { const c = y0 + R - platTop, d = vy0 * vy0 - 2 * G * c; if (d < 0) return null; const t = (-vy0 + Math.sqrt(d)) / G; return x0 + vx0 * t; };
  let last = performance.now();
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    plats.forEach(o => {
      if (cfg.slide) {
        o.x += cfg.slide * dt;
        if (o.x > W + slot / 2) { o.x -= W + slot; if (o.X !== E.cur) setL(o, E.pickLetter(shown())); }
      }
      o.b.style.transform = `translate(${o.x - pw / 2}px,${platTop}px)`;
    });
    if (state === 'swing') {
      const tt = (t - t0) / 1000, th = A * Math.sin(om * tt), w = A * om * Math.cos(om * tt);
      sx = px + L * Math.sin(th); sy = py + L * Math.cos(th);
      vx = L * Math.cos(th) * w; vy = -L * Math.sin(th) * w;
      drawSpider();
      if (!aim.hidden) { const lx = landX(sx, sy, vx, vy); if (lx !== null) { aim.style.transform = `translate(${clamp(lx, 8, W - 8) - 10}px,${platTop - 16}px)`; aim.style.opacity = 1; } else aim.style.opacity = 0; }
    } else if (state === 'fall') {
      vy += G * dt; sx += vx * dt; sy += vy * dt; drawSpider();
      if (sy + R >= platTop && vy > 0) {
        state = 'land';
        const o = plats.find(q => Math.abs(sx - q.x) <= pw / 2 + 8);
        resolve(o);
      } else if (sy > H + 60) { state = 'land'; resolve(null); }
    }
    requestAnimationFrame(frame);
  })(last);
  async function resolve(o) {
    aim.style.opacity = 0;
    if (!o) { silk.splat(clamp(sx, 20, W - 20), H - 20, 18); st.fade(200); await sleep(120); await retract(true); return; }
    sy = platTop - R; drawSpider(); silk.splat(o.x, platTop + 10, pw * .6);
    if (o.X === E.cur) {
      o.b.classList.remove('hint'); o.b.classList.add('webbed'); SFX.pop(); burst(spider, 14); setMochi('happy hop');
      const X = o.X;
      if (E.hit(X)) return;
      await sleep(500); o.b.classList.remove('webbed'); setL(o, E.pickLetter(shown().concat([X])));
      await retract(false); await sleep(NEXT_CALL_MS - 600); nextCall();
    } else {
      o.b.classList.remove('nudge'); void o.b.offsetWidth; o.b.classList.add('nudge');
      await sleep(300);
      if (E.mistake(hintFn, o.X)) return;
      await retract(false);
    }
  }
  async function retract(missed) {
    const fx = sx, fy = Math.min(sy, H - 20);
    await tween(id, 520, p => { sx = fx + (px - fx) * p; sy = fy + (py + L - fy) * p; drawSpider(); });
    if (!alive(id)) return;
    t0 = performance.now(); state = 'swing'; locked = false;
  }
  arena.addEventListener('pointerdown', () => {
    if (state !== 'swing' || !E.cur || E.over) return;
    ac(); SFX.tap(); state = 'fall'; spider.classList.remove('shot'); void spider.offsetWidth; spider.classList.add('shot');
  });
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall();
  await E.finished;
}

/* ---------- 8. Toss & swipe: letters are thrown up, swipe the right one ---------- */
async function playToss(id, E) {
  const cfg = E.cfg, arena = $('#arena'); arena.classList.add('catch'); arena.style.touchAction = 'none';
  const W = arena.clientWidth, H = arena.clientHeight, silk = makeSilk(arena), size = cfg.size, G = 720;
  const items = [];
  const trail = silk.strand(0, 0, 0, 0, 0); trail.g.style.display = 'none';
  let pts = [], mCool = 0, waveOn = false;
  const live = () => items.filter(o => !o.gone);
  const hintFn = X => { const o = live().find(q => q.X === X); if (o) o.b.classList.add('hint'); };
  function launch(X, delay, slot, n) {
    const b = el('button', 'wl wlm tl'), c = colOf(X);
    b.type = 'button'; b.tabIndex = -1; b.textContent = glyph(X); b.setAttribute('aria-label', 'Chữ ' + X.ch);
    b.style.cssText = `width:${size}px;height:${size}px;font-size:${Math.round(size * .56)}px;--c:${c.c};--t:${c.t};visibility:hidden`;
    arena.append(b);
    const y0 = H + size / 2, ya = rnd(.14, .5) * H, vy = Math.sqrt(2 * G * (y0 - ya)), T = 2 * vy / G;
    const x0 = clamp((slot + .5) / n * W + rnd(-18, 18), size / 2, W - size / 2), ex = rnd(.12, .88) * W;
    const o = { b, X, x0, y0, vy, vx: (ex - x0) / T, born: performance.now() + delay / cfg.speed, rot: rnd(-160, 160), gone: false };
    items.push(o); b.addEventListener('click', () => hit(o)); return o;
  }
  let last = performance.now();
  (function frame(t) {
    if (!alive(id) || E.over) return;
    for (const o of items) {
      if (o.gone) continue;
      if (t < o.born) continue;
      const tau = (t - o.born) / 1000 * cfg.speed;
      o.x = o.x0 + o.vx * tau; o.y = o.y0 - o.vy * tau + .5 * G * tau * tau; o.vyNow = -o.vy + G * tau;
      o.b.style.visibility = 'visible';
      if (!o.frozen) o.b.style.transform = `translate(${o.x - size / 2}px,${o.y - size / 2}px) rotate(${o.rot * tau * .35}deg)`;
      if (tau > .3 && o.y > H + size) { o.gone = true; o.b.remove(); }
    }
    pts = pts.filter(p => t - p.t < 260);
    if (pts.length > 1) { trail.g.style.display = ''; trail.set(pts[0].x, pts[0].y, pts[pts.length - 1].x, pts[pts.length - 1].y, 0); const d = 'M' + pts.map(p => p.x + ' ' + p.y).join('L'); trail.g.querySelectorAll('path').forEach(q => q.setAttribute('d', d)); }
    else trail.g.style.display = 'none';
    requestAnimationFrame(frame);
  })(last);
  function hit(o) {
    if (o.gone || o.frozen || !E.cur || E.over || !o.born || performance.now() < o.born) return;
    if (o.X === E.cur) {
      o.frozen = true; E.cur = E.cur; o.b.classList.remove('hint'); o.b.classList.add('webbed', 'popd');
      silk.splat(o.x, o.y, size * .9); SFX.pop(); burst(o.b, 12); setMochi('happy hop');
      const X = o.X;
      setTimeout(() => { o.gone = true; o.b.remove(); }, 420);
      E.hit(X);
    } else if (performance.now() > mCool) {
      mCool = performance.now() + 800;
      o.b.classList.remove('nudge'); void o.b.offsetWidth; o.b.classList.add('nudge');
      E.mistake(hintFn, o.X);
    }
  }
  const radius = o => size * .5 + cfg.assist;
  function segTest(a, b) {
    for (const o of live()) {
      if (o.frozen || performance.now() < o.born) continue;
      const dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
      let u = l2 ? ((o.x - a.x) * dx + (o.y - a.y) * dy) / l2 : 0; u = clamp(u, 0, 1);
      if (Math.hypot(a.x + dx * u - o.x, a.y + dy * u - o.y) <= radius(o)) { hit(o); }
    }
  }
  let down = false, lp = null;
  const rel = e => { const r = arena.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }; };
  arena.addEventListener('pointerdown', e => { down = true; lp = rel(e); pts = [lp]; ac(); segTest(lp, lp); });
  arena.addEventListener('pointermove', e => { if (!down) return; const p = rel(e); pts.push(p); segTest(lp, p); lp = p; });
  const up = () => { down = false; };
  arena.addEventListener('pointerup', up); arena.addEventListener('pointercancel', up); arena.addEventListener('pointerleave', up);
  async function wave() {
    const n = Math.min(cfg.wave, Math.max(3, E.pool.length) + 1);
    const ls = []; let cur = E.cur;
    if (!cur) cur = E.choose(E.pool) || E.pool[0];
    ls.push(cur);
    while (ls.length < n) ls.push(E.pickLetter(ls));
    const order = shuffle(ls.map((X, i) => i));
    ls.forEach((X, i) => launch(X, order[i] * 380, i, n));
    if (!E.cur) E.call(cur, hintFn);
    waveOn = true;
    await sleep(500 + n * 380 / cfg.speed);
    while (alive(id) && !E.over && live().length) await sleep(120);
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  (async () => {
    while (alive(id) && !E.over) { await wave(); if (!alive(id) || E.over) return; await sleep(E.cur ? 350 : NEXT_CALL_MS); }
  })();
  await E.finished;
}

/* ---------- 4. Catch the falling fruit with a basket ---------- */
async function playFruit(id, E) {
  const cfg = E.cfg, arena = $('#arena'); arena.classList.add('catch');
  const W = arena.clientWidth, H = arena.clientHeight, FZ = cfg.size;
  arena.style.setProperty('--fz', FZ + 'px'); arena.style.touchAction = 'none';
  arena.append(el('div', 'canopy'));
  const bw = Math.max(116, Math.min(170, W * .4)), bkH = bw * 70 / 120;
  const bk = el('div', 'bk'); bk.style.width = bw + 'px'; bk.innerHTML = BASKET; arena.append(bk);
  const tip = el('div', 'tip'); tip.innerHTML = '← Kéo giỏ để hứng →'; arena.append(tip); setTimeout(() => tip.remove(), 6000);
  const mouth = H - 6 - bkH + 12, ground = H - FZ - 14;
  let bx = W / 2, tx = W / 2;
  const move = e => { const r = arena.getBoundingClientRect(); tx = Math.max(bw / 2, Math.min(W - bw / 2, e.clientX - r.left)); };
  arena.addEventListener('pointerdown', move);
  arena.addEventListener('pointermove', move);
  const key = e => { if (!alive(id)) { document.removeEventListener('keydown', key); return; } if (e.key === 'ArrowLeft') tx = Math.max(bw / 2, tx - 50); if (e.key === 'ArrowRight') tx = Math.min(W - bw / 2, tx + 50); };
  document.addEventListener('keydown', key);
  const items = [];
  const onScreen = () => items.filter(o => !o.gone).map(o => o.X);
  const hintFn = X => { const o = items.find(q => !q.gone && q.X === X); if (o) o.b.classList.add('hint'); };
  function spawn(X, y0) {
    const col = colOf(X), b = el('div', 'fr');
    b.innerHTML = `<span class="fri" style="--c:${col.c};--c2:${col.c2};--t:${col.t}">${glyph(X)}</span>`;
    arena.append(b);
    const o = { b, X, x: rnd(6, Math.max(12, W - FZ - 6)), y: y0 == null ? -FZ - 10 : y0, vy: cfg.speed * rnd(.85, 1.15), sway: cfg.sway * rnd(.5, 1.2), f: rnd(1.2, 2.4), ph: rnd(0, 6), gone: false };
    items.push(o);
    return o;
  }
  let locked = false, missCool = 0;
  function caught(o) {
    o.gone = true;
    if (o.X === E.cur) {
      locked = true; const X = o.X;
      o.b.classList.remove('hint');
      const sx = o.x, sy = o.y, tx2 = bx - FZ / 2, ty2 = H - bkH - 4;
      SFX.pop(); setMochi('happy hop'); bk.classList.remove('bump'); void bk.offsetWidth; bk.classList.add('bump');
      burst(bk, 14);
      tween(id, 260, p => { o.b.style.transform = `translate(${sx + (tx2 - sx) * p}px,${sy + (ty2 - sy) * p}px) scale(${1 - .5 * p})`; }).then(() => o.b.remove());
      if (E.hit(X)) return;
      setTimeout(() => { locked = false; if (alive(id) && !E.over) E.call(E.choose(onScreen()) || pick(E.pool), hintFn); }, 800);
    } else {
      o.b.classList.add('bad'); setTimeout(() => o.b.remove(), 450);
      bk.classList.remove('shake'); void bk.offsetWidth; bk.classList.add('shake');
      E.mistake(hintFn, o.X);
    }
  }
  const first = [];
  for (let k = 0; k < Math.min(cfg.show, 3); k++) { const X = E.pickLetter(first); first.push(X); spawn(X, ground * (.02 + k * .22)); }
  let last = performance.now(), since = 0, chk = 0;
  function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t; since += dt; chk += dt; missCool -= dt;
    bx += (tx - bx) * Math.min(1, dt * 12);
    bk.style.transform = `translateX(${bx - bw / 2}px)`;
    for (let k = items.length - 1; k >= 0; k--) {
      const o = items[k];
      if (o.gone) { if (!o.b.isConnected) items.splice(k, 1); continue; }
      o.y += o.vy * dt;
      o.x = Math.max(0, Math.min(W - FZ, o.x + Math.sin(t / 1000 * o.f + o.ph) * o.sway * dt));
      o.b.style.transform = `translate(${o.x}px,${o.y}px)`;
      const bottom = o.y + FZ + 8;
      if (!locked && E.cur && !o.past && bottom >= mouth) {
        const dx = Math.abs(o.x + FZ / 2 - bx);
        const hitT = o.X === E.cur ? dx < bw / 2 - 4 : (dx < bw * .36 && Math.abs(tx - bx) < 30);
        if (bottom <= mouth + FZ * .7 && hitT) { caught(o); continue; }
        if (bottom > mouth + FZ * .7) o.past = true;
      }
      if (o.y > ground) {
        o.gone = true; o.b.classList.add('splat'); setTimeout(() => o.b.remove(), 450);
        if (o.X === E.cur && missCool <= 0 && !E.over) { missCool = 2; toast(arena, 'Rơi mất rồi!'); say(ctx.prompt); }
      }
    }
    const live = items.filter(o => !o.gone);
    if (chk > .35) {
      chk = 0;
      if (E.cur && !live.some(o => o.X === E.cur)) spawn(E.cur);
    }
    if (since > .85 && live.length < cfg.show) {
      since = 0;
      const shown = live.map(o => o.X);
      const X = (E.cur && !shown.includes(E.cur) && Math.random() < .5) ? E.cur : E.pickLetter(shown);
      spawn(X);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  await sleep(ctx.intro); if (!alive(id)) return;
  E.call(E.choose(onScreen()) || E.pool[0], hintFn);
  await E.finished;
}

/* ---------- 5. Web shooter: letters drift at three depths ---------- */
async function playWeb(id, E) {
  const cfg = E.cfg, arena = $('#arena'); arena.classList.add('catch');
  const W = arena.clientWidth, H = arena.clientHeight, NS = 'http://www.w3.org/2000/svg';
  const silk = makeSilk(arena); let strand = null;
  const hand = el('div', 'webhand'); hand.innerHTML = SPIDER; arena.append(hand);
  const ox = W / 2, oy = H - 36;
  const LAYERS = [{ fy: .12, size: 50, sp: 24 }, { fy: .33, size: 70, sp: 40 }, { fy: .54, size: 94, sp: 60 }];
  const mul = .55 + cfg.lv * .22, bobAmp = 5 + cfg.lv * 4;
  const items = [];
  let locked = false;
  const live = () => items.filter(o => !o.gone);
  const onScreen = () => live().map(o => o.X);
  function make(layer, X, x0, dir) {
    const L = LAYERS[layer], col = colOf(X), b = el('button', 'wl wlm');
    b.type = 'button'; b.setAttribute('aria-label', 'Chữ ' + X.ch); b.textContent = glyph(X);
    b.style.cssText = `width:${L.size}px;height:${L.size}px;font-size:${Math.round(L.size * .56)}px;--c:${col.c};--t:${col.t};z-index:${layer + 1}`;
    arena.append(b);
    const o = { b, X, layer, size: L.size, x: x0, dir, ph: rnd(0, 6), bf: rnd(1.2, 2.2), wave: cfg.lv >= 3 && Math.random() < .5, cy: 0, gone: false, hold: 0 };
    items.push(o);
    b.addEventListener('click', () => shoot(o));
    return o;
  }
  function respawn(layer, avoid) {
    const dir = layer % 2 ? -1 : 1, L = LAYERS[layer];
    const sh = onScreen().concat(avoid || []);
    const X = (E.cur && !sh.includes(E.cur) && Math.random() < .5) ? E.cur : E.pickLetter(sh);
    return make(layer, X, dir > 0 ? -L.size : W + L.size, dir);
  }
  const lay = [0, 1, 2, 0, 1, 2, 0, 1].slice(0, cfg.show);
  lay.forEach((layer, i) => {
    const cnt = lay.slice(0, i).filter(q => q === layer).length, tot = lay.filter(q => q === layer).length;
    const X = E.pickLetter(onScreen());
    make(layer, X, (cnt + .5) / tot * (W - 60) + 10 + rnd(-12, 12), layer % 2 ? -1 : 1);
  });
  const hintFn = X => { const o = items.find(q => !q.gone && q.X === X); if (o) o.b.classList.add('hint'); };
  const nextCall = () => {
    if (!alive(id) || E.over) return;
    items.forEach(o => o.b.classList.remove('hint'));
    E.call(E.choose(onScreen()) || E.pool[0], hintFn);
  };
  let last = performance.now();
  function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    for (let k = items.length - 1; k >= 0; k--) {
      const o = items[k];
      if (o.gone) { if (!o.b.isConnected) items.splice(k, 1); continue; }
      if (o.hold > 0) o.hold -= dt;
      else if (!o.grab) {
        const L = LAYERS[o.layer];
        o.x += o.dir * L.sp * mul * dt;
        if (o.dir > 0 && o.x > W + L.size) { o.x = -L.size; if (o.X !== E.cur) o.setX = true; }
        if (o.dir < 0 && o.x < -L.size) { o.x = W + L.size; if (o.X !== E.cur) o.setX = true; }
        if (o.setX) {
          o.setX = false;
          const X = E.pickLetter(onScreen());
          o.X = X; o.b.textContent = glyph(X);
          const col = colOf(X); o.b.style.setProperty('--c', col.c); o.b.style.setProperty('--t', col.t);
          o.b.setAttribute('aria-label', 'Chữ ' + X.ch);
        }
      }
      if (!o.grab) {
        const L = LAYERS[o.layer];
        const cy = L.fy * H + L.size / 2 + Math.sin(t / 1000 * o.bf + o.ph) * (o.wave ? bobAmp * 2.6 : bobAmp);
        o.cy = cy;
        o.b.style.transform = `translate(${o.x - o.size / 2}px,${cy - o.size / 2}px)`;
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  const setLine = (x2, y2) => { if (strand) strand.set(ox, oy, x2, y2, 0); };
  async function shoot(o) {
    if (locked || o.gone || o.grab || !E.cur || E.over || !alive(id)) return;
    locked = true; ac();
    const aim = () => { hand.style.transform = `rotate(${Math.atan2(o.x - ox, oy - o.cy) * 180 / Math.PI * .5}deg)`; };
    aim();
    strand = silk.strand(ox, oy, ox, oy, 0); SFX.tap();
    await tween(id, 180, p => { aim(); setLine(ox + (o.x - ox) * p, oy + (o.cy - oy) * p); });
    if (!alive(id)) return;
    silk.splat(o.x, o.cy, o.size * .8);
    if (o.X === E.cur) {
      o.grab = true; o.b.classList.remove('hint'); o.b.classList.add('webbed');
      const sx = o.x, sy = o.cy;
      await sleep(180);
      await tween(id, 360, p => {
        const cx = sx + (ox - sx) * p, cy = sy + (oy - 30 - sy) * p;
        o.b.style.transform = `translate(${cx - o.size / 2}px,${cy - o.size / 2}px) scale(${1 - .75 * p})`;
        setLine(cx, cy);
      });
      if (!alive(id)) return;
      o.gone = true; o.b.remove(); if (strand) strand.fade(300);
      SFX.pop(); burst(hand, 14); setMochi('happy hop'); hand.style.transform = '';
      const layer = o.layer, X = o.X;
      if (E.hit(X)) return;
      respawn(layer, [X]);
      await sleep(NEXT_CALL_MS); locked = false; nextCall();
    } else {
      o.hold = .6; o.b.classList.remove('nudge'); void o.b.offsetWidth; o.b.classList.add('nudge');
      await sleep(200);
      const ex = o.x, ey = o.cy;
      await tween(id, 220, p => { setLine(ex + (ox - ex) * p, ey + (oy - ey) * p); });
      if (strand) strand.fade(240); hand.style.transform = '';
      E.mistake(hintFn, o.X);
      locked = false;
    }
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall();
  await E.finished;
}

/* ---------- 6. Fishing: depth, darting fish, turning fish ---------- */
async function playFish(id, E) {
  const cfg = E.cfg, arena = $('#arena');
  const sea = el('div', 'sea'); arena.append(sea);
  for (let k = 0; k < 7; k++) { const bu = el('i', 'bub'); bu.style.cssText = `left:${rnd(6, 94)}%;--s:${rnd(6, 16)}px;animation-delay:-${rnd(0, 8)}s;animation-duration:${rnd(5, 9)}s`; sea.append(bu); }
  const W = arena.clientWidth, H = arena.clientHeight, BW = 132, BH = 80;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'webs');
  const line = document.createElementNS(NS, 'line'); line.setAttribute('class', 'rod'); line.style.display = 'none';
  svg.append(line); arena.append(svg);
  const n = cfg.lanes;
  const lanes = Array.from({ length: n }, (_, i) => {
    const sc = n === 1 ? 1 : .74 + i * (.4 / (n - 1));
    return { sc, w: BW * sc, h: BH * sc, v: cfg.speed * (.72 + i * .2), dir: i % 2 === 0 ? 1 : -1, y: 0 };
  });
  const usable = H - 30, totH = lanes.reduce((a, l) => a + l.h, 0), gap = Math.max(4, (usable - totH) / (n + 0));
  let yy = 10 + gap / 2; lanes.forEach(l => { l.y = yy; yy += l.h + gap; });
  const all = [];
  let locked = false;
  const live = () => all.filter(f => !f.gone);
  const onScreen = () => live().map(f => f.X);
  const spawn = (lane, X, x0) => {
    const col = colOf(X), b = el('button', 'fish ' + (lane.dir > 0 ? 'dirR' : 'dirL'));
    b.type = 'button'; b.setAttribute('aria-label', 'Cá chữ ' + X.ch);
    b.style.cssText = `--c:${col.c};--c2:${col.c2};--t:${col.t};width:${lane.w}px;height:${lane.h}px;z-index:${all.length % 50 + 1}`;
    b.innerHTML = `<span class="fi">${FISH}<span class="fl" style="font-size:${lane.h * .42}px">${glyph(X)}</span></span>`;
    sea.append(b);
    const f = { b, X, lane, dir: lane.dir, x: x0 == null ? (lane.dir > 0 ? -lane.w : W) : x0, y: lane.y, mult: 1, dart: rnd(2, 5), turned: !cfg.turn, gone: false };
    all.push(f);
    b.addEventListener('click', () => cast(f));
    return f;
  };
  const laneOpen = lane => all.every(f => f.gone || f.lane !== lane || (lane.dir > 0 ? f.x > lane.w + 70 : f.x < W - lane.w - 70));
  const hintFn = X => { const f = all.find(q => !q.gone && q.X === X); if (f) f.b.classList.add('hint'); };
  const setLine = (x1, y1, x2, y2) => { line.setAttribute('x1', x1); line.setAttribute('y1', y1); line.setAttribute('x2', x2); line.setAttribute('y2', y2); };
  const cxy = f => [f.x + f.lane.w / 2, f.y + f.lane.h / 2];
  async function cast(f) {
    if (f.gone || f.grab || locked || E.over || !E.cur || !alive(id)) return;
    locked = true; ac(); SFX.tap();
    line.style.display = '';
    await tween(id, 200, p => { const [cx, cy] = cxy(f); setLine(cx, -4, cx, -4 + (cy + 4) * p); });
    if (!alive(id)) return;
    if (f.X === E.cur) {
      f.grab = true; f.b.classList.remove('hint'); f.b.classList.add('hooked');
      const y0 = f.y;
      SFX.pop(); setMochi('happy hop');
      await tween(id, 520, p => {
        f.y = y0 - (y0 + f.lane.h + 10) * p; f.b.style.transform = `translate(${f.x}px,${f.y}px)`;
        const [cx, cy] = cxy(f); setLine(cx, -4, cx, cy);
      });
      if (!alive(id)) return;
      burst(f.b, 14); f.gone = true; f.b.remove(); line.style.display = 'none';
      const X = f.X;
      if (E.hit(X)) return;
      await sleep(NEXT_CALL_MS); locked = false;
      if (alive(id) && !E.over) E.call(E.choose(onScreen()) || pick(E.pool), hintFn);
    } else {
      f.b.classList.remove('nudge'); void f.b.offsetWidth; f.b.classList.add('nudge');
      await sleep(180);
      await tween(id, 220, p => { const [cx, cy] = cxy(f); setLine(cx, -4 + (cy + 4) * (1 - p), cx, cy); });
      line.style.display = 'none';
      E.mistake(hintFn, f.X); locked = false;
    }
  }
  lanes.forEach(lane => {
    const x0 = rnd(0, W * .25);
    [x0, x0 + W * .55].forEach(x => { if (x < W - 20) spawn(lane, E.pickLetter(onScreen()), lane.dir > 0 ? x : W - x - lane.w); });
  });
  let last = performance.now(), cool = 0;
  function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t; cool -= dt;
    all.forEach(f => {
      if (f.gone || f.grab) return;
      if (cfg.dart) { f.dart -= dt; if (f.dart <= 0) { f.dart = rnd(3, 6); f.mult = 2.3; } if (f.mult > 1) f.mult = Math.max(1, f.mult - dt * 1.6); }
      if (!f.turned && f.x > W * .3 && f.x < W * .6 - f.lane.w * .5 && Math.random() < dt * .35) {
        f.turned = true; f.dir = -f.dir; f.b.classList.toggle('dirR', f.dir > 0); f.b.classList.toggle('dirL', f.dir < 0);
      }
      f.x += f.dir * f.lane.v * f.mult * dt;
      f.b.style.transform = `translate(${f.x}px,${f.y}px)`;
      if (f.dir > 0 ? f.x > W + 10 : f.x < -f.lane.w - 10) { f.gone = true; f.b.remove(); }
    });
    for (let k = all.length - 1; k >= 0; k--) if (all[k].gone && !all[k].b.isConnected) all.splice(k, 1);
    if (cool <= 0) {
      cool = .8;
      const open = shuffle(lanes.filter(laneOpen));
      if (open.length) {
        const shown = onScreen();
        const X = (E.cur && !shown.includes(E.cur) && Math.random() < .8) ? E.cur : E.pickLetter(shown);
        if (X) spawn(open[0], X);
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  await sleep(ctx.intro); if (!alive(id)) return;
  E.call(E.choose(onScreen()) || E.pool[0], hintFn);
  await E.finished;
}

/* ---------- round 2 helpers ---------- */
function tileEl(X, size, cls) {
  const c = colOf(X), b = el('button', 'wl wlm' + (cls ? ' ' + cls : ''));
  b.type = 'button'; b.tabIndex = -1; b.textContent = glyph(X); b.setAttribute('aria-label', 'Chữ ' + X.ch);
  b.style.cssText = `width:${size}px;height:${size}px;font-size:${Math.round(size * .56)}px;--c:${c.c};--t:${c.t}`;
  return b;
}
function retile(b, X) { const c = colOf(X), tn = [...b.childNodes].find(n => n.nodeType === 3); if (tn) tn.nodeValue = glyph(X); else b.append(glyph(X)); b.style.setProperty('--c', c.c); b.style.setProperty('--t', c.t); b.setAttribute('aria-label', 'Chữ ' + X.ch); }
const ptIn = (e, node) => { const r = node.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
const bonk = b => { b.classList.remove('nudge'); void b.offsetWidth; b.classList.add('nudge'); };
const place = (b, x, y, size, extra) => { b.style.transform = `translate(${x - size / 2}px,${y - size / 2}px)${extra || ''}`; };
function reel(id, silk, st, b, ox, oy, sx, sy, size) {
  return tween(id, 380, p => { const cx = sx + (ox - sx) * p, cy = sy + (oy - 26 - sy) * p; b.style.transform = `translate(${cx - size / 2}px,${cy - size / 2}px) scale(${1 - .8 * p})`; st.set(ox, oy, cx, cy, 0); });
}
const arenaInit = a => { a.classList.add('catch'); a.style.touchAction = 'none'; return [a.clientWidth, a.clientHeight]; };

/* ---------- 9. Sling: drag to aim, release to shoot a web ball at hanging letters ---------- */
async function playSling(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena), size = cfg.size;
  const ox = W / 2, oy = H - 38, spider = el('div', 'spider'); spider.innerHTML = SPIDER; arena.append(spider);
  const guide = svgel('path', { class: 'guide' }); silk.svg.append(guide);
  const items = [], shown = () => items.map(o => o.X);
  for (let i = 0; i < cfg.n; i++) {
    const X = E.pickLetter(shown()), b = tileEl(X, size), th = silk.strand(0, 0, 0, 0, 0); th.g.classList.add('thread');
    arena.append(b);
    items.push({ b, th, X, ax: (i + .5) / cfg.n * W, len: rnd(.2, .5) * (H - 120), ph: rnd(0, 6), fr: rnd(.8, 1.2), x: 0, y: 0, gone: false, back: 0 });
  }
  const hintFn = X => { const o = items.find(q => q.X === X && !q.gone); if (o) o.b.classList.add('hint'); };
  const nextCall = () => { if (!alive(id) || E.over) return; items.forEach(o => o.b.classList.remove('hint')); E.call(E.choose(shown().filter((_, i) => !items[i].gone)) || E.pool[0], hintFn); };
  let ball = null, locked = false, last = performance.now();
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    for (const o of items) {
      if (o.gone) continue;
      const th = cfg.amp * Math.sin(t / 1000 * cfg.speed * o.fr + o.ph);
      o.x = clamp(o.ax + o.len * Math.sin(th), size / 2, W - size / 2); o.y = o.len * Math.cos(th) + size * .55;
      place(o.b, o.x, o.y, size, ` rotate(${th * 40}deg)`); o.th.set(o.ax, -4, o.x, o.y - size / 2 + 8, 0);
    }
    if (ball) {
      ball.x += ball.dx * cfg.ball * dt; ball.y += ball.dy * cfg.ball * dt;
      ball.b.style.transform = `translate(${ball.x - 10}px,${ball.y - 10}px)`; ball.st.set(ox, oy - 18, ball.x, ball.y, 0);
      const o = items.find(q => !q.gone && Math.hypot(q.x - ball.x, q.y - ball.y) <= size / 2 + cfg.assist);
      if (o) hitTile(o); else if (ball.y < -24 || ball.x < -24 || ball.x > W + 24) miss();
    }
    requestAnimationFrame(frame);
  })(last);
  function miss() { const b = ball; ball = null; b.b.remove(); b.st.fade(300); locked = false; }
  async function hitTile(o) {
    const b = ball; ball = null; b.b.remove(); silk.splat(o.x, o.y, size * .8);
    if (o.X === E.cur) {
      o.gone = true; o.b.classList.remove('hint'); o.b.classList.add('webbed'); SFX.pop(); o.th.g.style.display = 'none';
      const sx = o.x, sy = o.y;
      await tween(id, 420, p => place(o.b, sx, sy + p * (H - sy), size, ` scale(${1 - .6 * p})`));
      if (!alive(id)) return;
      b.st.fade(200); o.b.style.visibility = 'hidden'; burst(spider, 12); setMochi('happy hop');
      const X = o.X; if (E.hit(X)) return;
      await sleep(NEXT_CALL_MS);
      o.X = E.pickLetter(shown().concat([X])); retile(o.b, o.X); o.b.classList.remove('webbed'); o.b.style.visibility = ''; o.th.g.style.display = ''; o.gone = false;
      locked = false; nextCall();
    } else {
      bonk(o.b); b.st.fade(240); await sleep(200);
      E.mistake(hintFn, o.X); locked = false;
    }
  }
  let aiming = false, ap = null;
  const drawGuide = () => {
    if (!cfg.guide || !ap) { guide.setAttribute('d', ''); return; }
    const dx = ap.x - ox, dy = ap.y - (oy - 18), l = Math.hypot(dx, dy) || 1;
    guide.setAttribute('d', `M${ox} ${oy - 18}L${ox + dx / l * H * 1.1} ${oy - 18 + dy / l * H * 1.1}`);
  };
  arena.addEventListener('pointerdown', e => { if (locked || !E.cur || E.over) return; aiming = true; ap = ptIn(e, arena); drawGuide(); });
  arena.addEventListener('pointermove', e => { if (aiming) { ap = ptIn(e, arena); drawGuide(); } });
  arena.addEventListener('pointerup', () => {
    if (!aiming) return; aiming = false; guide.setAttribute('d', '');
    const dx = ap.x - ox, dy = ap.y - (oy - 18); if (dy > -14) return;
    const l = Math.hypot(dx, dy); locked = true; ac(); SFX.tap();
    spider.classList.remove('shot'); void spider.offsetWidth; spider.classList.add('shot');
    const bb = el('div', 'sball'); arena.append(bb);
    ball = { x: ox, y: oy - 18, dx: dx / l, dy: dy / l, b: bb, st: silk.strand(ox, oy - 18, ox, oy - 18, 0) };
  });
  arena.addEventListener('pointercancel', () => { aiming = false; guide.setAttribute('d', ''); });
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 10. Cups: watch where the letter is, follow the shuffle ---------- */
async function playCups(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena);
  const n = cfg.n, slot = W / n, sz = Math.min(96, slot - 14), y0 = H * .46 - sz / 2, groups = [];
  const sx = i => (i + .5) * slot - sz / 2;
  const put = (o, x, y) => { o.x = x; o.y = y; o.g.style.transform = `translate(${x}px,${y}px)`; };
  for (let i = 0; i < n; i++) {
    const g = el('div', 'cg'); g.style.cssText = `width:${sz}px;height:${sz}px`;
    const X = E.pickLetter(groups.map(o => o.X)), tile = tileEl(X, sz, 'cgt'), cup = el('div', 'cup');
    g.append(tile, cup); arena.append(g);
    const o = { g, tile, cup, X, slot: i }; put(o, sx(i), y0); groups.push(o);
    g.addEventListener('click', () => tap(o));
  }
  let canTap = false;
  const hintFn = X => { if (!canTap) return; const o = groups.find(q => q.X === X); if (!o) return; o.cup.classList.add('up'); setTimeout(() => { if (alive(id) && !o.done) o.cup.classList.remove('up'); }, 1300); };
  async function swap(a, b) {
    const fa = sx(a.slot), fb = sx(b.slot), ms = cfg.swapMs / cfg.speed;
    await tween(id, ms, p => { put(a, fa + (fb - fa) * p, y0 - Math.sin(p * Math.PI) * 30); put(b, fb + (fa - fb) * p, y0 + Math.sin(p * Math.PI) * 30); });
    const t = a.slot; a.slot = b.slot; b.slot = t;
  }
  async function round() {
    if (!alive(id) || E.over) return;
    const cur = E.cur || E.choose(E.pool) || E.pool[0], ls = [cur]; while (ls.length < n) ls.push(E.pickLetter(ls));
    const order = shuffle(ls);
    groups.forEach((o, i) => { o.X = order[i]; o.done = false; retile(o.tile, o.X); o.cup.classList.add('up'); o.g.classList.remove('webbed'); });
    if (!E.cur) E.call(cur, hintFn);
    await sleep(cfg.reveal / cfg.speed); if (!alive(id)) return;
    groups.forEach(o => o.cup.classList.remove('up')); await sleep(520);
    for (let k = 0; k < cfg.swaps && alive(id) && !E.over; k++) {
      const a = pick(groups); let b = pick(groups); while (b === a) b = pick(groups); await swap(a, b);
    }
    canTap = true;
  }
  async function tap(o) {
    if (!canTap || o.done || E.over || !E.cur) return;
    canTap = false; ac(); SFX.tap(); o.cup.classList.add('up'); o.done = true;
    await sleep(380); if (!alive(id)) return;
    if (o.X === E.cur) {
      silk.splat(o.x + sz / 2, o.y + sz / 2, sz * .9); o.g.classList.add('webbed'); SFX.pop(); burst(o.g, 12); setMochi('happy hop');
      if (E.hit(o.X)) return;
      await sleep(NEXT_CALL_MS); groups.forEach(q => q.cup.classList.add('up')); await sleep(600); await round();
    } else {
      bonk(o.tile); await sleep(700); if (!alive(id)) return;
      if (E.mistake(hintFn, o.X)) return;
      o.cup.classList.remove('up'); o.done = false; canTap = true;
    }
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  round(); await E.finished;
}

/* ---------- 11. Fog wiping: rub the fog away to find the letter ---------- */
async function playFog(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena), size = cfg.size;
  const cv = el('canvas', 'fog'); cv.width = W; cv.height = H; arena.append(cv); const cx = cv.getContext('2d', { willReadFrequently: true });
  const fill = () => { cx.globalCompositeOperation = 'source-over'; cx.fillStyle = `rgba(232,244,255,${cfg.fog})`; cx.fillRect(0, 0, W, H); };
  fill();
  const items = [], shown = () => items.map(o => o.X);
  function spot() {
    for (let k = 0; k < 60; k++) {
      const x = rnd(size / 2 + 8, W - size / 2 - 8), y = rnd(size / 2 + 8, H - size / 2 - 8);
      if (items.every(o => Math.hypot(o.x - x, o.y - y) > size * 1.08)) return [x, y];
    }
    return [rnd(size / 2, W - size / 2), rnd(size / 2, H - size / 2)];
  }
  for (let i = 0; i < cfg.n; i++) {
    const X = E.pickLetter(shown()), b = tileEl(X, size), [x, y] = spot(); arena.insertBefore(b, cv);
    const a = rnd(0, 6.28), v = cfg.drift ? cfg.drift * rnd(.7, 1.2) : 0;
    items.push({ b, X, x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v });
  }
  const ring = el('div', 'fogring'); ring.hidden = true; arena.append(ring);
  const wipeLine = (a, b, r) => { cx.globalCompositeOperation = 'destination-out'; cx.strokeStyle = '#000'; cx.lineWidth = r * 2; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); };
  const clear = o => { let c = 0; for (const [dx, dy] of [[0, 0], [-.28, -.28], [.28, -.28], [-.28, .28], [.28, .28]]) { const x = Math.round(clamp(o.x + dx * size, 0, W - 1)), y = Math.round(clamp(o.y + dy * size, 0, H - 1)); if (cx.getImageData(x, y, 1, 1).data[3] < 100) c++; } return c >= 3; };
  const hintFn = X => { const o = items.find(q => q.X === X); if (!o) return; ring.hidden = false; ring.style.transform = `translate(${o.x - size * .75}px,${o.y - size * .75}px)`; ring.style.width = ring.style.height = size * 1.5 + 'px'; setTimeout(() => { ring.hidden = true; }, 2600); };
  const nextCall = () => { if (!alive(id) || E.over) return; E.call(E.choose(shown()) || E.pool[0], hintFn); };
  const tm = setInterval(() => { if (!alive(id) || E.over) { clearInterval(tm); return; } if (cfg.regrow) { cx.globalCompositeOperation = 'source-over'; cx.fillStyle = `rgba(232,244,255,${cfg.regrow})`; cx.fillRect(0, 0, W, H); } }, 250);
  let last = performance.now();
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    for (const o of items) {
      if (o.vx || o.vy) { o.x += o.vx * dt; o.y += o.vy * dt; if (o.x < size / 2 || o.x > W - size / 2) o.vx *= -1; if (o.y < size / 2 || o.y > H - size / 2) o.vy *= -1; }
      place(o.b, o.x, o.y, size);
    }
    requestAnimationFrame(frame);
  })(last);
  let down = false, lp = null, dp = null, moved = 0, busy = false;
  cv.addEventListener('pointerdown', e => { down = true; lp = dp = ptIn(e, cv); moved = 0; wipeLine(lp, lp, cfg.brush); });
  cv.addEventListener('pointermove', e => { if (!down) return; const p = ptIn(e, cv); moved += Math.hypot(p.x - lp.x, p.y - lp.y); wipeLine(lp, p, cfg.brush); lp = p; });
  const up = () => { if (!down) return; down = false; if (moved < 14) tap(dp); };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', () => { down = false; });
  async function tap(p) {
    if (busy || E.over || !E.cur) return;
    const o = items.find(q => Math.hypot(q.x - p.x, q.y - p.y) <= size / 2 + 8); if (!o) return;
    if (!clear(o)) { if (cfg.tapReveal) wipeLine({ x: o.x, y: o.y }, { x: o.x, y: o.y }, size * .8); return; }
    ac(); SFX.tap();
    if (o.X === E.cur) {
      busy = true; ring.hidden = true; silk.splat(o.x, o.y, size * .9); o.b.classList.add('webbed'); SFX.pop(); burst(o.b, 12); setMochi('happy hop');
      if (E.hit(o.X)) return;
      await sleep(NEXT_CALL_MS); if (!alive(id)) return;
      cv.classList.add('refog'); await sleep(260); fill(); cv.classList.remove('refog');
      for (const q of items) { q.X = E.pickLetter(items.map(z => z.X)); retile(q.b, q.X); q.b.classList.remove('webbed'); }
      const sp = items.map(() => spot()); items.forEach((q, i) => { [q.x, q.y] = sp[i]; });
      busy = false; nextCall();
    } else { bonk(o.b); E.mistake(hintFn, o.X); }
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 12. Wheel: time the shot as letters spin past the arrow ---------- */
async function playWheel(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena), size = cfg.size;
  const cx0 = W / 2, R = Math.min(W * .34, H * .27), cy0 = size * .8 + R * 1 + 20, ox = W / 2, oy = H - 36;
  const dsz = (R + size * .62) * 2, disc = el('div', 'wheel'); disc.style.cssText = `width:${dsz}px;height:${dsz}px;left:${cx0 - dsz / 2}px;top:${cy0 - dsz / 2}px`; arena.append(disc);
  const mark = el('div', 'wmark'); mark.style.cssText = `left:${cx0 - 14}px;top:${cy0 - R - size * .62 - 26}px`; arena.append(mark);
  const spider = el('div', 'spider'); spider.innerHTML = SPIDER; arena.append(spider);
  const items = [], shown = () => items.map(o => o.X);
  for (let i = 0; i < cfg.n; i++) { const X = E.pickLetter(shown()), b = tileEl(X, size); arena.append(b); items.push({ b, X, i, x: 0, y: 0, hide: false }); }
  let ang = rnd(0, 6), w = 0, dir = 1, flipT = rnd(3, 5), locked = false, last = performance.now();
  const hintFn = X => { const o = items.find(q => q.X === X); if (o) o.b.classList.add('hint'); };
  const nextCall = () => { if (!alive(id) || E.over) return; items.forEach(o => o.b.classList.remove('hint')); E.call(E.choose(shown()) || E.pool[0], hintFn); };
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    if (cfg.rev) { flipT -= dt; if (flipT <= 0) { dir *= -1; flipT = rnd(2.6, 4.6); } }
    w += (dir * cfg.speed - w) * Math.min(1, dt * 1.6); ang += w * dt;
    disc.style.transform = `rotate(${ang}rad)`;
    for (const o of items) { const a = ang + o.i * 2 * Math.PI / cfg.n - Math.PI / 2; o.x = cx0 + R * Math.cos(a); o.y = cy0 + R * Math.sin(a); if (!o.grab) place(o.b, o.x, o.y, size); }
    requestAnimationFrame(frame);
  })(last);
  async function shoot(o) {
    locked = true; ac(); SFX.tap(); spider.classList.remove('shot'); void spider.offsetWidth; spider.classList.add('shot');
    const st = silk.strand(ox, oy, ox, oy, 0), tx = cx0, ty = cy0 - R;
    await tween(id, 220, p => { const ex = o ? o.x : tx, ey = o ? o.y : ty; st.set(ox, oy, ox + (ex - ox) * p, oy + (ey - oy) * p, 14 * (1 - p)); });
    if (!alive(id)) return;
    if (!o) { let bd = 1e9; for (const q of items) if (!q.hide && q.y < cy0 && Math.abs(q.x - cx0) <= size / 2 + cfg.assist && Math.abs(q.x - cx0) < bd) { bd = Math.abs(q.x - cx0); o = q; } }
    if (!o) { silk.splat(tx, ty, 22); st.fade(400); await sleep(150); locked = false; return; }
    silk.splat(o.x, o.y, size * .8);
    if (o.X === E.cur) {
      o.grab = true; o.b.classList.remove('hint'); o.b.classList.add('webbed'); SFX.pop(); await sleep(180);
      await reel(id, silk, st, o.b, ox, oy, o.x, o.y, size); if (!alive(id)) return;
      st.fade(250); o.b.style.visibility = 'hidden'; burst(spider, 12); setMochi('happy hop');
      const X = o.X; if (E.hit(X)) return;
      await sleep(NEXT_CALL_MS - 400);
      o.X = E.pickLetter(shown().concat([X])); retile(o.b, o.X); o.b.classList.remove('webbed'); o.b.style.visibility = ''; o.grab = false;
      await sleep(400); locked = false; nextCall();
    } else { bonk(o.b); st.fade(260); await sleep(180); E.mistake(hintFn, o.X); locked = false; }
  }
  arena.addEventListener('pointerdown', e => {
    if (locked || !E.cur || E.over || !alive(id)) return;
    const p = ptIn(e, arena); let o = null;
    if (cfg.direct) for (const q of items) if (Math.hypot(q.x - p.x, q.y - p.y) <= size / 2 + 12) o = q;
    shoot(o);
  });
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 13. Silk slide: a spider on a thread slides up and down to pick letters coming at it ---------- */
async function playSlide(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena);
  const k = cfg.slots, sh = (H - 16) / k, size = Math.min(cfg.size, sh - 8), sxp = W * .17;
  const spider = el('div', 'spider swg'); spider.innerHTML = SPIDER; arena.append(spider);
  const th = silk.strand(sxp, -4, sxp, 40, 0); th.g.classList.add('thread');
  let y = H / 2, ty = y, cols = [], gapAcc = 0, mCool = 0, last = performance.now();
  const hintFn = X => { for (const c of cols) c.tiles.forEach(o => { if (o && o.X === X) o.b.classList.add('hint'); }); };
  const nextCall = () => { if (!alive(id) || E.over) return; const pl = E.pool; E.call(E.choose(pl) || pl[0], hintFn); };
  function spawn() {
    const ls = []; const curSlot = E.cur ? Math.floor(Math.random() * k) : -1;
    const col = { x: W + size, tiles: [], done: false };
    for (let s = 0; s < k; s++) {
      const X = s === curSlot ? E.cur : E.pickLetter(ls); ls.push(X);
      const b = tileEl(X, size); arena.append(b); col.tiles.push({ b, X, gone: false });
    }
    cols.push(col);
  }
  const ptr = e => { const r = arena.getBoundingClientRect(); ty = clamp(e.clientY - r.top, 20, H - 20); };
  arena.addEventListener('pointerdown', ptr); arena.addEventListener('pointermove', e => { if (e.buttons || e.pointerType === 'touch') ptr(e); });
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    y += (ty - y) * Math.min(1, dt * cfg.follow); spider.style.transform = `translate(${sxp - 32}px,${y - 28}px)`; th.set(sxp, -4, sxp, y - 24, 0);
    if (E.started) { gapAcc += cfg.speed * dt; if (!cols.length || gapAcc >= W * cfg.gap) { gapAcc = 0; spawn(); } }
    for (let c = cols.length - 1; c >= 0; c--) {
      const col = cols[c]; col.x -= cfg.speed * dt;
      col.tiles.forEach((o, s) => { if (!o.gone) place(o.b, col.x, 8 + sh * (s + .5), size); });
      if (!col.done && Math.abs(col.x - sxp) < size * .45) {
        col.done = true; const s = clamp(Math.floor((y - 8) / sh), 0, k - 1), o = col.tiles[s];
        if (o && !o.gone && E.cur) collect(o, col.x, 8 + sh * (s + .5));
      }
      if (col.x < -size) { col.tiles.forEach(o => o.b.remove()); cols.splice(c, 1); }
    }
    requestAnimationFrame(frame);
  })(last);
  async function collect(o, x, yy) {
    if (o.X === E.cur) {
      o.gone = true; silk.splat(sxp, yy, size * .8); o.b.classList.add('webbed', 'popd'); SFX.pop(); burst(spider, 12); setMochi('happy hop');
      cols.forEach(c => c.tiles.forEach(q => q.b.classList.remove('hint')));
      if (E.hit(o.X)) return; await sleep(NEXT_CALL_MS); nextCall();
    } else if (performance.now() > mCool) {
      mCool = performance.now() + 700; o.gone = true; o.b.classList.add('popd'); silk.splat(sxp, yy, size * .6); E.mistake(hintFn, o.X);
    }
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 14. Bowling: slide the ball sideways, let go, knock the right pin ---------- */
async function playBowl(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena), size = cfg.size;
  const oy = H - 30, guide = svgel('path', { class: 'guide' }); silk.svg.append(guide);
  const items = [], shown = () => items.filter(o => !o.gone).map(o => o.X), span = W + size * 1.6;
  for (let r = 0; r < cfg.rows; r++) for (let c = 0; c < cfg.cols; c++) {
    const X = E.pickLetter(shown().slice(-cfg.cols)), b = tileEl(X, size, 'pin'); arena.append(b);
    items.push({ b, X, r, x: (c + .5) / cfg.cols * W + (cfg.speed ? (r % 2 ? size * .3 : -size * .3) : 0), y: 16 + size / 2 + r * (size + 10), dir: r % 2 ? -1 : 1, gone: false });
  }
  const sball = el('div', 'sball big'); arena.append(sball);
  let bx = W / 2, by = oy, rolling = false, aiming = false, last = performance.now(), locked = false;
  const hintFn = X => { const o = items.find(q => q.X === X && !q.gone); if (o) o.b.classList.add('hint'); };
  const nextCall = () => { if (!alive(id) || E.over) return; items.forEach(o => o.b.classList.remove('hint')); E.call(E.choose(shown()) || E.pool[0], hintFn); };
  const drawBall = () => { sball.style.transform = `translate(${bx - 17}px,${by - 17}px)`; };
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    for (const o of items) {
      if (o.gone) continue;
      if (cfg.speed) { o.x += o.dir * cfg.speed * dt; if (o.dir > 0 && o.x > W + size * .8) o.x -= span; if (o.dir < 0 && o.x < -size * .8) o.x += span; }
      place(o.b, o.x, o.y, size);
    }
    if (rolling) {
      by -= 560 * dt; drawBall();
      const o = items.filter(q => !q.gone && Math.abs(q.x - bx) <= size / 2 + cfg.assist && Math.abs(q.y - by) <= size / 2).sort((a, b) => b.y - a.y)[0];
      if (o) strike(o); else if (by < -20) { rolling = false; reset(); }
    }
    requestAnimationFrame(frame);
  })(last);
  const reset = () => { by = oy; drawBall(); locked = false; };
  async function strike(o) {
    rolling = false; silk.splat(o.x, o.y, size * .8);
    if (o.X === E.cur) {
      o.gone = true; o.b.classList.remove('hint'); o.b.classList.add('webbed'); SFX.pop(); setMochi('happy hop'); burst(o.b, 12);
      const x0 = o.x, y0 = o.y;
      await tween(id, 480, p => place(o.b, x0 + p * 40, y0 - p * 60, size, ` rotate(${p * 520}deg) scale(${1 - .7 * p})`));
      o.b.style.visibility = 'hidden'; reset();
      const X = o.X; if (E.hit(X)) return;
      await sleep(NEXT_CALL_MS - 300);
      o.X = E.pickLetter(shown().concat([X])); retile(o.b, o.X); o.b.classList.remove('webbed'); o.b.style.visibility = ''; o.gone = false; nextCall();
    } else { bonk(o.b); await sleep(250); reset(); E.mistake(hintFn, o.X); }
  }
  const setX = e => { bx = clamp(ptIn(e, arena).x, 18, W - 18); drawBall(); guide.setAttribute('d', cfg.guide ? `M${bx} ${by - 20}L${bx} 6` : ''); };
  arena.addEventListener('pointerdown', e => { if (locked || rolling || !E.cur || E.over) return; aiming = true; setX(e); });
  arena.addEventListener('pointermove', e => { if (aiming) setX(e); });
  arena.addEventListener('pointerup', () => { if (!aiming) return; aiming = false; guide.setAttribute('d', ''); locked = true; rolling = true; ac(); SFX.tap(); });
  arena.addEventListener('pointercancel', () => { aiming = false; });
  drawBall();
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 15. Treasure dig: tap the dirt until the letter pops out ---------- */
async function playDig(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena);
  const cols = 3, rows = Math.ceil(cfg.n / cols), cw = W / cols, ch = (H - 16) / rows, ms = Math.min(cw - 10, ch - 8, 118), tsz = Math.min(ms * .8, 84);
  const items = [], held = () => items.map(o => o.X);
  const letterFor = () => (E.cur && !held().includes(E.cur)) ? E.cur : E.pickLetter(held());
  for (let i = 0; i < cfg.n; i++) {
    const g = el('div', 'mnd'), cxp = (i % cols + .5) * cw, cyp = 8 + (Math.floor(i / cols) + .5) * ch;
    g.style.cssText = `width:${ms}px;height:${ms}px;transform:translate(${cxp - ms / 2}px,${cyp - ms / 2}px)`;
    const X = E.pickLetter(held()), t = tileEl(X, tsz, 'dt'), dirt = el('div', 'dirt'); dirt.innerHTML = '<i></i><i></i><i></i>';
    g.append(t, dirt); arena.append(g);
    const o = { g, t, dirt, X, hp: cfg.hp, open: false, cx: cxp, cy: cyp, busy: false }; items.push(o);
    g.addEventListener('click', () => tap(o));
  }
  const hintFn = X => { const o = items.find(q => q.X === X && !q.open); if (o) { o.g.classList.add('hint'); setTimeout(() => o.g.classList.remove('hint'), 2500); } };
  const nextCall = () => { if (!alive(id) || E.over) return; E.call(E.choose(held()) || E.pool[0], hintFn); };
  function rebury(o) { o.X = letterFor(); retile(o.t, o.X); o.hp = cfg.hp; o.open = false; o.busy = false; o.g.classList.remove('open', 'webbed'); }
  async function tap(o) {
    if (o.open || o.busy || E.over || !E.cur) return;
    ac(); o.hp--; o.g.classList.remove('dig'); void o.g.offsetWidth; o.g.classList.add('dig'); SFX.tap(); burst(o.g, 5, ['#b98552', '#8f5f35', '#d9a066']);
    if (o.hp > 0) return;
    o.open = true; o.g.classList.add('open'); SFX.pop();
    await sleep(420); if (!alive(id)) return;
    if (o.X === E.cur) {
      o.g.classList.remove('hint'); silk.splat(o.cx, o.cy, tsz * .9); o.g.classList.add('webbed'); burst(o.g, 12); setMochi('happy hop');
      if (E.hit(o.X)) return;
      await sleep(NEXT_CALL_MS); rebury(o); nextCall();
    } else {
      o.busy = true; bonk(o.t); await sleep(850); if (!alive(id)) return;
      E.mistake(hintFn, o.X); rebury(o);
    }
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 16. Butterflies: letters flutter around, tap the right one ---------- */
async function playWander(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena), size = cfg.size, m = size / 2 + 4;
  const items = [], shown = () => items.map(o => o.X);
  for (let i = 0; i < cfg.n; i++) {
    const X = E.pickLetter(shown()), b = tileEl(X, size, 'bfl'); b.insertAdjacentHTML('afterbegin', '<i class="wg l"></i><i class="wg r"></i>'); arena.append(b);
    const o = { b, X, x: rnd(m, W - m), y: rnd(m, H * .6), h: rnd(0, 6.28), v: cfg.speed * rnd(.8, 1.2), t: rnd(0, 9), ph: rnd(0, 6), boost: 0, gone: false, busy: false };
    items.push(o); b.addEventListener('click', e => { e.stopPropagation(); tap(o); });
  }
  const hintFn = X => { const o = items.find(q => q.X === X); if (o) o.b.classList.add('hint'); };
  const nextCall = () => { if (!alive(id) || E.over) return; items.forEach(o => o.b.classList.remove('hint')); E.call(E.choose(shown()) || E.pool[0], hintFn); };
  let last = performance.now();
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    for (const o of items) {
      if (o.busy) continue;
      o.t += dt; o.h += (Math.sin(o.t * 1.3 + o.ph) * 1.7 + Math.sin(o.t * .7) * 1.1) * dt; o.boost = Math.max(0, o.boost - dt * .8);
      const sp = o.v * (1 + o.boost);
      o.x += Math.cos(o.h) * sp * dt; o.y += Math.sin(o.h) * sp * dt + Math.sin(o.t * 3) * 12 * dt;
      if (o.x < m) { o.x = m; o.h = Math.PI - o.h; } if (o.x > W - m) { o.x = W - m; o.h = Math.PI - o.h; }
      if (o.y < m) { o.y = m; o.h = -o.h; } if (o.y > H - m - 6) { o.y = H - m - 6; o.h = -o.h; }
      place(o.b, o.x, o.y, size);
    }
    requestAnimationFrame(frame);
  })(last);
  async function tap(o) {
    if (o.busy || E.over || !E.cur) return; ac(); SFX.tap();
    if (o.X === E.cur) {
      o.busy = true; o.b.classList.remove('hint'); silk.splat(o.x, o.y, size * .9); o.b.classList.add('webbed'); SFX.pop(); burst(o.b, 12); setMochi('happy hop');
      const X = o.X, x0 = o.x, y0 = o.y;
      await tween(id, 380, p => place(o.b, x0, y0 - p * 30, size, ` scale(${1 - .8 * p})`)); if (!alive(id)) return;
      o.b.style.visibility = 'hidden'; if (E.hit(X)) return;
      await sleep(NEXT_CALL_MS - 300);
      o.X = E.pickLetter(shown().concat([X])); retile(o.b, o.X); o.b.classList.remove('webbed'); o.b.style.visibility = ''; o.busy = false; o.boost = 0; nextCall();
    } else { bonk(o.b); o.boost = 1.6; E.mistake(hintFn, o.X); }
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 17. Lanes: tap a lane to steer the spider into the right letter ---------- */
async function playLane(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena);
  const lanes = cfg.lanes, lw = W / lanes, size = Math.min(cfg.size, lw - 10), oy = H - 42;
  for (let i = 1; i < lanes; i++) { const d = el('div', 'lnl'); d.style.left = (i * lw - 1) + 'px'; arena.append(d); }
  const spider = el('div', 'spider swg'); spider.innerHTML = SPIDER; arena.append(spider);
  let pl = Math.floor(lanes / 2), px = (pl + .5) * lw, items = [], acc = cfg.every - .4, sinceCur = 0, mCool = 0, last = performance.now();
  const hintFn = X => { items.forEach(o => { if (o.X === X) o.b.classList.add('hint'); }); };
  const nextCall = () => { if (!alive(id) || E.over) return; E.call(E.choose(E.pool) || E.pool[0], hintFn); };
  function spawn() {
    const k = (lanes > 3 && Math.random() < .35) ? 2 : 1, ls = shuffle([...Array(lanes).keys()]).slice(0, k), shown = items.map(o => o.X), put = [];
    ls.forEach((ln, i) => {
      let X; if (E.cur && i === 0 && (sinceCur >= 2 || Math.random() < .5) && !shown.includes(E.cur)) { X = E.cur; sinceCur = 0; } else X = E.pickLetter(shown.concat(put));
      put.push(X); const b = tileEl(X, size); arena.append(b); items.push({ b, X, lane: ln, y: -size, gone: false });
    });
    sinceCur++;
  }
  const go = e => { pl = clamp(Math.floor(ptIn(e, arena).x / lw), 0, lanes - 1); ac(); };
  arena.addEventListener('pointerdown', go); arena.addEventListener('pointermove', e => { if (e.buttons || e.pointerType === 'touch') go(e); });
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    px += ((pl + .5) * lw - px) * Math.min(1, dt * 12); spider.style.transform = `translate(${px - 32}px,${oy - 28}px)`;
    if (E.started) { acc += dt; if (acc >= cfg.every) { acc = 0; spawn(); } }
    for (let k = items.length - 1; k >= 0; k--) {
      const o = items[k]; if (o.gone) { items.splice(k, 1); continue; }
      o.y += cfg.speed * dt; place(o.b, (o.lane + .5) * lw, o.y, size);
      if (o.lane === pl && Math.abs(o.y - oy) < size * .5 + 12 && E.cur) { o.gone = true; collect(o); }
      else if (o.y > H + size) { o.gone = true; o.b.remove(); }
    }
    requestAnimationFrame(frame);
  })(last);
  async function collect(o) {
    if (o.X === E.cur) {
      silk.splat(px, oy - 10, size * .9); o.b.classList.add('webbed', 'popd'); SFX.pop(); burst(spider, 12); setMochi('happy hop');
      items.forEach(q => q.b.classList.remove('hint'));
      if (E.hit(o.X)) return; await sleep(NEXT_CALL_MS); nextCall();
    } else if (performance.now() > mCool) {
      mCool = performance.now() + 600; o.b.classList.add('popd'); spider.classList.remove('shot'); void spider.offsetWidth; spider.classList.add('shot'); E.mistake(hintFn, o.X);
    } else o.b.classList.add('popd');
    setTimeout(() => o.b.remove(), 400);
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 18. Basket drag: pick up the right letter and drop it in the basket ---------- */
async function playDrag(id, E) {
  const cfg = E.cfg, arena = $('#arena'), [W, H] = arenaInit(arena), silk = makeSilk(arena), size = cfg.size, bw = cfg.bw, bh = bw * .52, btop = H - bh - 4;
  const bk = el('div', 'dbasket'); bk.style.cssText = `width:${bw}px;height:${bh}px`; bk.innerHTML = BASKET; arena.append(bk);
  let bxc = W / 2, bdir = 1;
  const items = [], shown = () => items.map(o => o.X);
  for (let i = 0; i < cfg.n; i++) {
    const X = E.pickLetter(shown()), b = tileEl(X, size, 'dr'); arena.append(b); const a = rnd(0, 6.28);
    const o = { b, X, x: (i + .5) / cfg.n * W, y: rnd(size, H * .45), vx: Math.cos(a) * cfg.speed, vy: Math.sin(a) * cfg.speed * .6, drag: false, gone: false, dx: 0, dy: 0 };
    items.push(o);
    b.addEventListener('pointerdown', e => { if (o.gone || !E.cur || E.over) return; o.drag = true; b.setPointerCapture(e.pointerId); const p = ptIn(e, arena); o.dx = o.x - p.x; o.dy = o.y - p.y; b.classList.add('lift'); ac(); SFX.tap(); });
    b.addEventListener('pointermove', e => { if (!o.drag) return; const p = ptIn(e, arena); o.x = clamp(p.x + o.dx, 0, W); o.y = clamp(p.y + o.dy, 0, H); });
    const end = () => { if (!o.drag) return; o.drag = false; b.classList.remove('lift'); drop(o); };
    b.addEventListener('pointerup', end); b.addEventListener('pointercancel', end);
  }
  const hintFn = X => { const o = items.find(q => q.X === X && !q.gone); if (o) o.b.classList.add('hint'); };
  const nextCall = () => { if (!alive(id) || E.over) return; items.forEach(o => o.b.classList.remove('hint')); E.call(E.choose(shown()) || E.pool[0], hintFn); };
  let last = performance.now();
  (function frame(t) {
    if (!alive(id) || E.over) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    if (cfg.slide) { bxc += bdir * cfg.slide * dt; if (bxc > W - bw / 2) bdir = -1; if (bxc < bw / 2) bdir = 1; }
    bk.style.transform = `translate(${bxc - bw / 2}px,${btop}px)`;
    for (const o of items) {
      if (o.gone) continue;
      if (!o.drag && !o.busy) { o.x += o.vx * dt; o.y += o.vy * dt; if (o.x < size / 2 || o.x > W - size / 2) o.vx *= -1; if (o.y < size / 2 || o.y > btop - size * .9) o.vy *= -1; o.x = clamp(o.x, size / 2, W - size / 2); o.y = clamp(o.y, size / 2, btop - size * .85); }
      place(o.b, o.x, o.y, size);
    }
    requestAnimationFrame(frame);
  })(last);
  async function drop(o) {
    if (Math.abs(o.x - bxc) > bw / 2 + 10 || o.y < btop - size * .45) return;
    o.busy = true; ac();
    if (o.X === E.cur) {
      o.gone = true; o.b.classList.remove('hint'); const x0 = o.x, y0 = o.y;
      await tween(id, 320, p => place(o.b, x0 + (bxc - x0) * p, y0 + (btop + bh * .35 - y0) * p, size, ` scale(${1 - .65 * p})`)); if (!alive(id)) return;
      silk.splat(bxc, btop + 8, bw * .5); o.b.style.visibility = 'hidden'; SFX.pop(); burst(bk, 12); setMochi('happy hop'); bk.classList.remove('bounce'); void bk.offsetWidth; bk.classList.add('bounce');
      const X = o.X; if (E.hit(X)) return;
      await sleep(NEXT_CALL_MS);
      o.X = E.pickLetter(shown().concat([X])); retile(o.b, o.X); o.b.style.visibility = ''; o.x = rnd(size, W - size); o.y = rnd(size, H * .35); o.gone = false; o.busy = false; nextCall();
    } else {
      bonk(o.b); o.x = clamp(o.x + rnd(-80, 80), size, W - size); o.y = rnd(size, H * .3); o.busy = false; E.mistake(hintFn, o.X);
    }
  }
  await sleep(ctx.intro); if (!alive(id)) return;
  nextCall(); await E.finished;
}

/* ---------- 19. Trace: tap the glowing dots in order (or slide a finger) to draw the letter ---------- */
// Strokes in a letter box: x 0..100, y 0 = top of capitals/ascenders, 100 = baseline, lowercase x-height from 45,
// descenders to 140. A stroke is a list of parts: [x, y] points and ARC(cx, cy, rx, ry, fromDeg, toDeg) arcs
// (0° = right, 90° = down; the arc runs from fromDeg to toDeg in that direction).
const ARC = (cx, cy, rx, ry, a0, a1) => ({ arc: [cx, cy, rx, ry, a0, a1] });
const UP_MARK = { breve: cx => [[ARC(cx, -24, 16, 12, 180, 0)]], hat: cx => [[[cx - 18, -10], [cx, -28], [cx + 18, -10]]] };
const LO_MARK = { breve: cx => [[ARC(cx, 26, 14, 10, 180, 0)]], hat: cx => [[[cx - 15, 33], [cx, 18], [cx + 15, 33]]] };
const UPPER_STROKES = {
  A: [[[50, 0], [10, 100]], [[50, 0], [90, 100]], [[25, 62], [75, 62]]],
  B: [[[15, 0], [15, 100]], [[15, 0], [55, 0], ARC(55, 25, 25, 25, -90, 90), [15, 50]], [[15, 50], [60, 50], ARC(60, 75, 25, 25, -90, 90), [15, 100]]],
  C: [[ARC(55, 50, 42, 50, -40, -320)]],
  D: [[[15, 0], [15, 100]], [[15, 0], [45, 0], ARC(45, 50, 45, 50, -90, 90), [15, 100]]],
  E: [[[15, 0], [15, 100]], [[15, 0], [75, 0]], [[15, 50], [65, 50]], [[15, 100], [75, 100]]],
  G: [[ARC(55, 50, 42, 50, -40, -345)], [[96, 58], [62, 58]]],
  H: [[[15, 0], [15, 100]], [[85, 0], [85, 100]], [[15, 50], [85, 50]]],
  I: [[[50, 0], [50, 100]]],
  K: [[[15, 0], [15, 100]], [[80, 0], [15, 60]], [[36, 42], [85, 100]]],
  L: [[[15, 0], [15, 100], [75, 100]]],
  M: [[[10, 100], [10, 0], [50, 70], [90, 0], [90, 100]]],
  N: [[[15, 100], [15, 0], [85, 100], [85, 0]]],
  O: [[ARC(50, 50, 42, 50, -90, -450)]],
  P: [[[15, 0], [15, 100]], [[15, 0], [50, 0], ARC(50, 27, 30, 27, -90, 90), [15, 54]]],
  Q: [[ARC(50, 50, 42, 50, -90, -450)], [[60, 72], [94, 106]]],
  R: [[[15, 0], [15, 100]], [[15, 0], [50, 0], ARC(50, 27, 30, 27, -90, 90), [15, 54]], [[45, 54], [85, 100]]],
  S: [[ARC(50, 26, 34, 26, -20, -270), ARC(50, 76, 36, 24, -90, 160)]],
  T: [[[10, 0], [90, 0]], [[50, 0], [50, 100]]],
  U: [[[15, 0], [15, 60], ARC(50, 60, 35, 40, 180, 0), [85, 0]]],
  V: [[[10, 0], [50, 100], [90, 0]]],
  X: [[[12, 0], [88, 100]], [[88, 0], [12, 100]]],
  Y: [[[12, 0], [50, 50]], [[88, 0], [50, 50], [50, 100]]]
};
UPPER_STROKES['Ă'] = UPPER_STROKES.A.concat(UP_MARK.breve(50));
UPPER_STROKES['Â'] = UPPER_STROKES.A.concat(UP_MARK.hat(50));
UPPER_STROKES['Ê'] = UPPER_STROKES.E.concat(UP_MARK.hat(45));
UPPER_STROKES['Ô'] = UPPER_STROKES.O.concat(UP_MARK.hat(50));
UPPER_STROKES['Ơ'] = UPPER_STROKES.O.concat([[[86, 12], [100, -4]]]);
UPPER_STROKES['Ư'] = UPPER_STROKES.U.concat([[[85, 8], [100, -6]]]);
UPPER_STROKES['Đ'] = UPPER_STROKES.D.concat([[[0, 50], [36, 50]]]);
const BOWL = ARC(45, 72.5, 28, 27.5, -15, -375);
const LOWER_STROKES = {
  A: [[BOWL], [[73, 45], [73, 100]]],
  B: [[[20, 0], [20, 100]], [ARC(48, 72.5, 28, 27.5, -160, 160)]],
  C: [[ARC(50, 72.5, 28, 27.5, -40, -320)]],
  D: [[BOWL], [[73, 0], [73, 100]]],
  E: [[[24, 72.5], [76, 72.5], ARC(50, 72.5, 26, 27.5, 0, -320)]],
  G: [[BOWL], [[73, 45], [73, 115], ARC(50, 115, 23, 22, 0, 150)]],
  H: [[[20, 0], [20, 100]], [ARC(45, 70, 25, 24, 180, 360), [70, 100]]],
  I: [[[50, 45], [50, 100]], [[50, 24]]],
  K: [[[20, 0], [20, 100]], [[68, 45], [20, 78]], [[36, 68], [72, 100]]],
  L: [[[50, 0], [50, 100]]],
  M: [[[12, 45], [12, 100]], [ARC(29, 68, 17, 22, 180, 360), [46, 100]], [ARC(63, 68, 17, 22, 180, 360), [80, 100]]],
  N: [[[20, 45], [20, 100]], [ARC(45, 68, 25, 22, 180, 360), [70, 100]]],
  O: [[ARC(50, 72.5, 28, 27.5, -90, -450)]],
  P: [[[20, 45], [20, 140]], [ARC(48, 72.5, 28, 27.5, -160, 160)]],
  Q: [[BOWL], [[73, 45], [73, 140]]],
  R: [[[25, 45], [25, 100]], [ARC(50, 70, 25, 22, 180, 300)]],
  S: [[ARC(50, 58, 22, 13.5, -20, -270), ARC(50, 86, 23, 14.5, -90, 160)]],
  T: [[[45, 15], [45, 92], [56, 100], [68, 97]], [[28, 45], [66, 45]]],
  U: [[[20, 45], [20, 75], ARC(45, 75, 25, 25, 180, 0)], [[70, 45], [70, 100]]],
  V: [[[18, 45], [45, 100], [72, 45]]],
  X: [[[20, 45], [72, 100]], [[72, 45], [20, 100]]],
  Y: [[[18, 45], [45, 100]], [[72, 45], [45, 100], [30, 140]]]
};
LOWER_STROKES['Ă'] = LOWER_STROKES.A.concat(LO_MARK.breve(45));
LOWER_STROKES['Â'] = LOWER_STROKES.A.concat(LO_MARK.hat(45));
LOWER_STROKES['Ê'] = LOWER_STROKES.E.concat(LO_MARK.hat(50));
LOWER_STROKES['Ô'] = LOWER_STROKES.O.concat(LO_MARK.hat(50));
LOWER_STROKES['Ơ'] = LOWER_STROKES.O.concat([[[76, 52], [90, 38]]]);
LOWER_STROKES['Ư'] = LOWER_STROKES.U.concat([[[70, 45], [86, 32]]]);
LOWER_STROKES['Đ'] = LOWER_STROKES.D.concat([[[55, 20], [92, 20]]]);
const STROKES = { upper: UPPER_STROKES, lower: LOWER_STROKES };
// Turn a stroke description into a dense point list.
function strokePts(parts) {
  const pts = [];
  for (const p of parts) {
    if (Array.isArray(p)) { pts.push(p); continue; }
    const [cx, cy, rx, ry, a0, a1] = p.arc, n = Math.max(8, Math.ceil(Math.abs(a1 - a0) / 6));
    for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
  }
  return pts;
}
// Evenly spaced dots along a point list (always includes both ends).
function dotsAlong(pts, gap) {
  if (pts.length === 1) return [pts[0]];
  const out = [pts[0]]; let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    let [x0, y0] = pts[i - 1]; const [x1, y1] = pts[i]; let seg = Math.hypot(x1 - x0, y1 - y0);
    while (acc + seg >= gap) {
      const t = (gap - acc) / seg; x0 += (x1 - x0) * t; y0 += (y1 - y0) * t; seg = Math.hypot(x1 - x0, y1 - y0);
      out.push([x0, y0]); acc = 0;
    }
    acc += seg;
  }
  const last = pts[pts.length - 1], prev = out[out.length - 1];
  if (out.length > 1 && Math.hypot(last[0] - prev[0], last[1] - prev[1]) < gap * .45) out[out.length - 1] = last; else out.push(last);
  return out;
}
const pathD = pts => (pts.length === 1 ? `M${pts[0][0]} ${pts[0][1]}h.01` : 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L'));
async function playTrace(id, E) {
  const cfg = E.cfg, arena = $('#arena'); arenaInit(arena); arena.classList.add('tracea');
  const gap = cfg.gap * (E.kid ? 1.12 : 1), R = Math.max(gap * .8, 16);
  let cur = null;
  const hintFn = () => { const d = cur && cur.dots[cur.k]; if (d) { d.el.classList.add('hint'); setTimeout(() => d.el.classList.remove('hint'), 2500); } };
  function draw(X) {
    arena.innerHTML = '';
    const lower = CASE === 'lower';
    const strokes = (STROKES[lower ? 'lower' : 'upper'][X.ch] || []).map(strokePts);
    const svg = svgel('svg', { viewBox: lower ? '-20 -12 140 165' : '-20 -42 140 160', class: 'tsvg', preserveAspectRatio: 'xMidYMid meet' });
    if (lower) svg.append(svgel('line', { x1: -20, y1: 45, x2: 120, y2: 45, class: 'tline' }));
    svg.append(svgel('line', { x1: -20, y1: 100, x2: 120, y2: 100, class: 'tline base' }));
    const dots = [], doneP = [], col = colOf(X).c;
    strokes.forEach((pts, si) => {
      svg.append(svgel('path', { d: pathD(pts), class: 'tguide' + (cfg.guide ? '' : ' faint') }));
      const dp = svgel('path', { d: '', class: 'tdone', stroke: col }); doneP.push({ el: dp, pts: [] }); svg.append(dp);
      dotsAlong(pts, gap).forEach((p, i) => dots.push({ x: p[0], y: p[1], si, first: i === 0 }));
    });
    dots.forEach(d => { d.el = svgel('circle', { cx: d.x, cy: d.y, r: d.first ? 7.5 : 5.5, class: 'tdot' + (d.first ? ' first' : '') }); svg.append(d.el); });
    arena.append(svg);
    cur = { X, svg, dots, doneP, k: 0, done: false };
    mark();
  }
  function mark() { cur.dots.forEach((d, i) => { d.el.classList.toggle('next', i === cur.k); d.el.classList.toggle('on', i < cur.k); }); }
  function toSvg(e) {
    const m = cur.svg.getScreenCTM(); if (!m) return null;
    const pt = cur.svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const q = pt.matrixTransform(m.inverse()); return [q.x, q.y];
  }
  function advance(p) {
    let moved = false;
    while (cur && !cur.done && cur.k < cur.dots.length) {
      const d = cur.dots[cur.k];
      if (Math.hypot(p[0] - d.x, p[1] - d.y) > R) break;
      const dp = cur.doneP[d.si]; dp.pts.push([d.x, d.y]); dp.el.setAttribute('d', pathD(dp.pts));
      d.el.classList.remove('hint');
      if (sfxOn()) tone(500 + cur.k * 40, AC.currentTime, .08, 'sine', .1);
      cur.k++; moved = true;
    }
    if (moved) { mark(); if (cur.k >= cur.dots.length) finish(); }
    return moved;
  }
  async function finish() {
    cur.done = true; cur.svg.classList.add('tfull'); SFX.pop(); burst(arena, 16); setMochi('happy hop');
    if (E.hit(cur.X)) return;
    await sleep(NEXT_CALL_MS + 400); if (!alive(id) || E.over) return;
    next();
  }
  function next() {
    const X = E.choose(E.pool.filter(Y => Y !== E.last)) || E.choose(E.pool) || E.pool[0];
    draw(X); E.call(X, hintFn);
  }
  let down = false;
  arena.addEventListener('pointerdown', e => {
    if (!cur || cur.done || E.over) return;
    ac(); down = true;
    try { arena.setPointerCapture(e.pointerId); } catch (err) { /* capture is optional */ }
    const p = toSvg(e); if (!p) return;
    if (!advance(p)) {
      const d = cur.dots[cur.k];
      if (d) { d.el.classList.remove('nudge'); void d.el.getBBox(); d.el.classList.add('nudge'); }
      SFX.soft();
    }
  });
  arena.addEventListener('pointermove', e => { if (!down || !cur || cur.done) return; const p = toSvg(e); if (p) advance(p); });
  const up = () => { down = false; };
  arena.addEventListener('pointerup', up); arena.addEventListener('pointercancel', up);
  await sleep(ctx.intro); if (!alive(id)) return;
  next(); await E.finished;
}

const GAMES = { trace: playTrace, mole: playMole, balloon: playBalloon, range: playRange, fruit: playFruit, web: playWeb, fish: playFish, swing: playSwing, toss: playToss, sling: playSling, cups: playCups, fog: playFog, wheel: playWheel, slide: playSlide, bowl: playBowl, dig: playDig, wander: playWander, lane: playLane, drag: playDrag };

function startLevel(g) {
  if (limitReached()) { showSleep(); return; }
  $('#result').hidden = true;
  runLevel(g);
}
const introSeen = {};
let lastW = -1; const recentW = [];
function mixNext() {
  const all = offeredWorlds(), fresh = all.filter(w => !recentW.includes(w)), w = pick(fresh.length ? fresh : all);
  recentW.push(w); if (recentW.length > Math.min(4, all.length - 1)) recentW.shift();
  let lv = -1;
  for (let k = 0; k < PER; k++) if (!best(w * PER + k)) { lv = k; break; }
  if (lv < 0) lv = Math.floor(Math.random() * PER);
  lv = clamp(lv + ((S.diff == null ? 1 : S.diff) - 1) * 2, 0, PER - 1);
  lastW = w;
  return w * PER + lv;
}
async function runLevel(g) {
  const id = ++runId, w = (lastW = Math.floor(g / PER)), lv = g % PER, Wd = WORLDS[w], cfg = levelCfg(g);
  ctx = { id, g, prompt: '' };
  stopSpeech(); show('play');
  { const old = $('#arena'), na = old.cloneNode(false); old.replaceWith(na); }
  const arena = $('#arena'); arena.innerHTML = ''; arena.className = 'arena'; arena.removeAttribute('style');
  $('#bubbleMain').innerHTML = '';
  $('#lvlName').textContent = Wd.name; $('#lvlNum').textContent = `Màn ${lv + 1}`;
  setMochi('hop');
  $('#play').dataset.w = w;
  { const bg = BGS[w], i = $('#bgi'); i.style.backgroundImage = `url(assets/world-backgrounds-${bg[0]}.webp)`; i.style.backgroundPosition = (bg[1] * 25) + '% 50%'; }
  CASE = S.case === 'both' ? (Math.random() < .5 ? 'lower' : 'upper') : S.case === 'upper' ? 'upper' : 'lower';
  const E = makeEngine(id, cfg, Wd); ctx.E = E;
  const cl = Math.max(3, E.pool.length);
  if (cfg.show) cfg.show = Math.min(cfg.show, cl);
  if (cfg.up) cfg.up = Math.min(cfg.up, cl);
  window.__E = E;
  $('#play').classList.toggle('kid', S.kid);
  { const m = [.85, 1, 1.22][S.diff == null ? 1 : S.diff]; ['speed', 'beltV', 'drift', 'amp', 'slide'].forEach(k => { if (cfg[k]) cfg[k] *= m; }); }
  if (S.kid) {
    if (Wd.key !== 'trace') cfg.hits = 4 + (lv >= 3 ? 1 : 0);
    cfg.time = 9999;
    ['speed', 'beltV', 'drift', 'amp', 'slide'].forEach(k => { if (cfg[k]) cfg[k] *= .8; });
    if (cfg.hide) cfg.hide = cfg.hide.map(v => v * 1.25);
    E.cfg = cfg; E.time = 9999;
    $('#caption').innerHTML = Array.from({ length: cfg.hits }, () => starSVG()).join('');
    E.dots = [...$('#caption').querySelectorAll('.star')];
  }
  // New letters get a short introduction card before play starts.
  for (const X of E.pool.filter(X => !S.met[X.ch]).slice(0, 2)) {
    await meetLetter(X);
    if (!alive(id)) return;
  }
  const firstTime = !introSeen[w]; introSeen[w] = 1;
  ctx.intro = firstTime ? 2300 : 800;
  const introHtml = Wd.intro.replace(/(đập|bắt|bắn|đu|quét|hứng|tô)/, '<b class="snd">$1</b>');
  if (firstTime) setPrompt(introHtml, Wd.intro);
  else { $('#bubbleMain').innerHTML = introHtml; ctx.prompt = Wd.intro; }
  await GAMES[Wd.key](id, E);
  if (!alive(id)) return;
  await sleep(E.result === 'win' ? 1400 : 700);
  if (!alive(id)) return;
  endLevel(g, E);
}
function endLevel(g, E) {
  if (E.result === 'win' && !E.shownEgg) { E.shownEgg = true; hatch(E, () => endLevel(g, E)); return; }
  const win = E.result === 'win';
  let stars = 0;
  if (win) {
    stars = E.kid ? (E.wrong <= 1 ? 3 : E.wrong <= 3 ? 2 : 1) : 1 + (E.hearts >= 2 ? 1 : 0) + (E.time / E.cfg.time >= .35 ? 1 : 0);
    if (stars > best(g)) S.best[g] = stars;
  }
  save();
  const hasNext = win && (E.kid || g + 1 < TOTAL);
  const reason = E.result === 'hearts' ? 'Hết tim rồi.' : 'Hết giờ rồi.';
  const ICON = {
    next: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
    again: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/></svg>'
  };
  const btn = (act, label, main) => `<button class="rb${main ? ' main' : ''}" type="button" data-act="${act}"><span>${ICON[act]}</span>${label}</button>`;
  const m = $('#result'); m.hidden = false;
  m.innerHTML = `<div class="rcard">
    <div id="rMochi" class="mochi ${win ? 'happy' : 'sad'}">${mochiSVG()}</div>
    <h2>${win ? 'Con thắng rồi!' : 'Thử lại nhé!'}</h2>
    ${win ? `<div class="rstars" aria-label="${stars} sao">${[0, 1, 2].map(k => `<span class="rs" style="--d:${k * .3}s">${starSVG().replace('class="star"', `class="star${k < stars ? ' on' : ''}"`)}</span>`).join('')}</div>` : `<p>${reason}</p>`}
    <div class="rbtns">
      ${win ? (hasNext ? btn('next', 'Tiếp', true) + btn('again', 'Chơi lại') : btn('again', 'Chơi lại', true)) : btn('again', 'Thử lại', true)}
      ${btn('home', 'Về nhà')}
    </div></div>`;
  if (win) {
    SFX.win(); confetti(); say('Hoan hô! Con thắng rồi!');
    for (let k = 0; k < stars; k++) setTimeout(() => SFX.star(k), 700 + k * 300);
  } else { SFX.lose(); say('Chưa được rồi. Mình thử lại nhé!'); }
  m.onclick = e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    ac(); SFX.tap();
    const a = b.dataset.act;
    if (a === 'next') startLevel(S.kid ? mixNext() : g + 1);
    else if (a === 'again') startLevel(g);
    else goHome();
  };
}

const PLAYICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>';
// "Meet the letter": big upper and lower case, the letter's animal friend and its word, read aloud.
function meetLetter(X) {
  return new Promise(res => {
    const m = $('#result'); m.hidden = false;
    m.innerHTML = `<div class="rcard meet">
      <button class="mglyph" type="button" aria-label="Nghe lại chữ ${X.ch}"><b>${X.ch}</b><b>${X.ch.toLowerCase()}</b></button>
      <div class="mrow"><span class="mpet">${animalSVG(animalOf(X))}</span><span class="mobj">${X.obj}</span></div>
      <p class="mword">${cap1(X.word)}</p>
      <div class="rbtns"><button class="rb main" type="button" data-go aria-label="Chơi"><span>${PLAYICON}</span></button></div>
    </div>`;
    const lines = [meetLine(X), `${nm(X)}, ${X.word}!`];
    sayAll(lines, 350);
    m.querySelector('.mglyph').addEventListener('click', () => { ac(); SFX.pop(); sayAll(lines, 350); });
    m.querySelector('[data-go]').addEventListener('click', () => {
      ac(); SFX.tap(); stopSpeech();
      S.met[X.ch] = 1; save();
      m.hidden = true; m.innerHTML = '';
      res();
    });
    m.onclick = null;
  });
}
const SPECIES = ['Mèo', 'Chó', 'Thỏ', 'Bọ ú', 'Hamster', 'Gà con', 'Vịt', 'Ngỗng', 'Bồ câu', 'Vẹt', 'Sóc', 'Bò', 'Trâu', 'Dê', 'Ngựa', 'Lừa', 'Nhím', 'Lợn con', 'Cừu', 'Rùa'];
const COATN = ['đỏ', 'xám', 'trắng', 'tím', 'xanh dương', 'xanh lá', 'hồng', 'cam'];
const collCount = () => Object.keys(S.coll).length;
const EGGSVG = `<svg viewBox="0 0 120 150" aria-hidden="true"><ellipse cx="60" cy="144" rx="38" ry="6" fill="rgba(29,39,80,.18)"/><path d="M60 6C90 6 108 52 108 92c0 30-22 52-48 52S12 122 12 92C12 52 30 6 60 6z" fill="#fff4d6"/><path d="M60 6C90 6 108 52 108 92c0 30-22 52-48 52S12 122 12 92C12 52 30 6 60 6z" fill="none" stroke="#e8c98a" stroke-width="4"/><circle cx="40" cy="60" r="9" fill="#ff8fbf"/><circle cx="78" cy="48" r="7" fill="#7bc8ff"/><circle cx="82" cy="88" r="10" fill="#ffc83d"/><circle cx="44" cy="102" r="8" fill="#74d9a8"/><ellipse cx="38" cy="34" rx="9" ry="16" fill="#fff" opacity=".6" transform="rotate(25 38 34)"/><g class="ck ck1" stroke="#a8703c" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M24 70l14 10 10-12 12 14"/></g><g class="ck ck2" stroke="#a8703c" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M60 70l12 12-10 10 14 10M30 96l12-8"/></g></svg>`;
function hatch(E, done) {
  const pool = E.hitLetters.length ? E.hitLetters : E.pool;
  const X = pick(pool), p = PET[X.ch][0];
  const free = [0, 1, 2, 3, 4, 5, 6, 7].filter(c => !S.coll[p + '-' + c]);
  const isNew = free.length > 0, c = isNew ? pick(free) : Math.floor(Math.random() * 8);
  const m = $('#result'); m.hidden = false;
  m.innerHTML = `<div class="rcard egg"><h2>Quà cho con!</h2><button class="eggb" type="button" aria-label="Trứng bí mật. Chạm để mở">${EGGSVG}</button><p class="eggp">Chạm vào trứng!</p></div>`;
  say(pick(PRAISE)); SFX.win(); confetti();
  const card = m.querySelector('.rcard'), eb = m.querySelector('.eggb');
  let taps = 0, opened = false;
  const open = () => {
    opened = true; SFX.win(); confetti();
    S.coll[p + '-' + c] = 1; save();
    card.classList.add('hatched');
    card.innerHTML = `<div class="newtag${isNew ? '' : ' old'}">${isNew ? 'Bạn mới!' : 'Bạn cũ'}</div><div class="hpet">${animalSVG({ p, c })}</div><h2>${SPECIES[p]} ${COATN[c]}</h2><p>Chữ ${X.ch}: ${cap1(X.word)} ${X.obj}</p><button class="rb main" type="button" data-go="1"><span><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg></span>Tiếp</button>`;
    setTimeout(() => say(`${nm(X)}, ${X.word}!`), 500);
    card.querySelector('[data-go]').addEventListener('click', () => { ac(); SFX.tap(); done(); });
  };
  eb.addEventListener('click', () => {
    if (opened) return;
    ac(); taps++; SFX.pop();
    eb.classList.remove('wob'); void eb.offsetWidth; eb.classList.add('wob');
    card.classList.toggle('c1', taps >= 1); card.classList.toggle('c2', taps >= 2);
    if (taps >= 3) setTimeout(open, 250);
  });
  m.onclick = null;
}
function renderZoo() {
  $('#zooTotal').textContent = collCount() + '/160';
  const grid = $('#zooGrid'); grid.innerHTML = '';
  SPECIES.forEach((name, p) => {
    let have = 0; for (let c = 0; c < 8; c++) if (S.coll[p + '-' + c]) have++;
    const sec = el('section', 'zsec');
    sec.innerHTML = `<h2>${name} <small>${have}/8</small></h2><div class="zrow"></div>`;
    const row = sec.querySelector('.zrow');
    for (let c = 0; c < 8; c++) {
      const own = !!S.coll[p + '-' + c], b = el('button', 'zcell' + (own ? '' : ' lock'));
      b.type = 'button'; b.setAttribute('aria-label', own ? `${name} ${COATN[c]}` : 'Chưa gặp');
      b.innerHTML = animalSVG({ p, c });
      b.addEventListener('click', () => {
        ac();
        b.classList.remove('hop'); void b.offsetWidth; b.classList.add('hop');
        if (!own) { SFX.soft(); return; }
        SFX.pop();
        const sel = selectedLetters(), mine = sel.filter(L => PET[L.ch][0] === p);
        const L = mine.length ? pick(mine) : pick(sel);
        say(`${nm(L)}, ${L.word}!`);
      });
      row.append(b);
    }
    grid.append(sec);
  });
}
function renderParent() {
  const cleared = Object.keys(S.best).filter(k => S.best[k] > 0).length;
  const rows = LETTERS.map(L => {
    const p = P(L.ch), rt = p.rn ? (p.rs / p.rn).toFixed(1) : '–';
    return `<tr><th scope="row">${L.ch} ${L.ch.toLowerCase()}</th><td>${cap1(L.word)}</td><td>${['Chưa gặp', 'Mới gặp', 'Nghe được', 'Vững'][stage(L)]}</td><td>${p.rn}</td><td>${p.wr}</td><td>${rt}</td></tr>`;
  }).join('');
  const pressed = c => c ? 'true' : 'false';
  $('#parent').innerHTML = `<div class="sheet">
    <div class="row"><h2>Dành cho phụ huynh</h2><button class="btn primary" data-act="close" type="button">Đóng</button></div>
    <div class="summary">
      <div><b>${cleared}/${TOTAL}</b><span>màn đã qua</span></div>
      <div><b>${totalStars()}</b><span>sao đã nhận</span></div>
      <div><b>${Math.floor(S.sec / 60)}</b><span>phút chơi hôm nay</span></div>
    </div>
    <div>
      <h3>Chế độ chơi</h3>
      <div class="seg">
        <button type="button" data-act="kid" data-v="1" aria-pressed="${pressed(S.kid)}">Bé nhỏ (không thua)</button>
        <button type="button" data-act="kid" data-v="0" aria-pressed="${pressed(!S.kid)}">Thử thách (tim và đồng hồ)</button>
      </div>
      <p style="margin-top:8px">Bé nhỏ: không có đồng hồ hay tim, chạm nhầm thì Mochi đọc tên chữ vừa chạm rồi nhắc lại chữ cần tìm. Mỗi lần thắng được một quả trứng nở ra bạn thú mới (đã sưu tầm ${collCount()}/160).</p>
    </div>
    <div>
      <h3>Độ khó</h3>
      <div class="seg">
        <button type="button" data-act="diff" data-v="0" aria-pressed="${pressed(S.diff === 0)}">Dễ</button>
        <button type="button" data-act="diff" data-v="1" aria-pressed="${pressed(S.diff === 1 || S.diff == null)}">Vừa</button>
        <button type="button" data-act="diff" data-v="2" aria-pressed="${pressed(S.diff === 2)}">Khó</button>
      </div>
      <p style="margin-top:8px">Chỉnh tốc độ chuyển động và màn bắt đầu. Bé giỏi lên thì chọn Khó, bé còn lạ thì chọn Dễ.</p>
    </div>
    <div>
      <h3>Trò chơi</h3>
      <div class="seg">
        <button type="button" data-act="games" data-v="easy" aria-pressed="${pressed(S.games !== 'all')}">Trò dễ (${WORLDS.filter(W => EASY.has(W.key)).length} trò)</button>
        <button type="button" data-act="games" data-v="all" aria-pressed="${pressed(S.games === 'all')}">Tất cả (${WORLDS.length} trò)</button>
      </div>
      <p style="margin-top:8px">Trò dễ chỉ cần chạm, không phải ngắm, kéo hay canh thời điểm. Hợp với bé 3–4 tuổi.</p>
    </div>
    <div>
      <h3>Kiểu chữ</h3>
      <div class="seg">
        <button type="button" data-act="case" data-v="lower" aria-pressed="${pressed(S.case === 'lower')}">Chữ thường (a b c)</button>
        <button type="button" data-act="case" data-v="upper" aria-pressed="${pressed(S.case === 'upper')}">Chữ hoa (A B C)</button>
        <button type="button" data-act="case" data-v="both" aria-pressed="${pressed(S.case === 'both')}">Cả hai</button>
      </div>
      <p style="margin-top:8px">Sách và truyện chủ yếu dùng chữ thường, nên cho bé học chữ thường trước. "Cả hai" có thêm câu hỏi ghép chữ hoa với chữ thường.</p>
    </div>
    <div>
      <h3>Chữ cái cho bé học</h3>
      <p style="margin-bottom:8px">Đang chọn ${S.letters.length}/${LETTERS.length} chữ.</p>
      <div class="seg"><button type="button" data-act="picker">Chọn chữ cho bé học</button></div>
    </div>
    <div>
      <h3>Theo dõi từng chữ</h3>
      <div class="tablewrap"><table><thead><tr><th>Chữ</th><th>Từ</th><th>Mức</th><th>Nghe gọi</th><th>Chạm nhầm</th><th>Phản xạ (giây)</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p style="margin-top:8px">“Nghe gọi” là số lần bé chạm đúng khi giọng đọc gọi chữ đó. “Chạm nhầm” là số lần bé chạm sai khi chữ đó được gọi, cho biết bé hay nhầm chữ nào. “Phản xạ” là số giây trung bình từ lúc giọng gọi đến lúc bé chạm đúng. Số càng nhỏ càng nhanh.</p>
    </div>
    <div>
      <h3>Cách đọc tên chữ</h3>
      <div class="seg">
        <button type="button" data-act="style" data-v="mam" aria-pressed="${pressed(S.style === 'mam')}">bờ, cờ, dờ (mầm non)</button>
        <button type="button" data-act="style" data-v="abc" aria-pressed="${pressed(S.style === 'abc')}">bê, xê, dê</button>
      </div>
    </div>
    <div>
      <h3>Âm thanh</h3>
      <div class="seg">
        <button type="button" data-act="sound" aria-pressed="${pressed(S.sound)}">Hiệu ứng: ${S.sound ? 'bật' : 'tắt'}</button>
        <button type="button" data-act="voice" aria-pressed="${pressed(S.voice)}">Giọng đọc: ${S.voice ? 'bật' : 'tắt'}</button>
      </div>
      <p style="margin-top:8px">${Object.keys(VOICE).length ? 'Đang dùng giọng thu sẵn của Mochi. Câu nào chưa có bản thu sẽ đọc bằng giọng tiếng Việt của thiết bị.' : 'Đang dùng giọng tiếng Việt có sẵn trên thiết bị. Nếu máy chưa có, chữ cần tìm sẽ hiện trên màn hình để bé vẫn chơi được.'}</p>
    </div>
    <div>
      <h3>Giới hạn thời gian mỗi ngày</h3>
      <div class="seg">${[[0, 'Không giới hạn'], [5, '5 phút'], [10, '10 phút'], [15, '15 phút'], [20, '20 phút']].map(([m, t]) => `<button type="button" data-act="limit" data-v="${m}" aria-pressed="${pressed(S.limit === m)}">${t}</button>`).join('')}</div>
      <p style="margin-top:8px">Hết giờ, Mochi sẽ đi ngủ sau khi bé xong màn đang chơi.</p>
    </div>
    <div class="row"><button class="btn danger" id="resetBtn" data-act="reset" type="button">Xóa tiến độ</button></div>
  </div>`;
}
function renderChips() {
  const sel = selectedLetters();
  const box = $('#chips');
  const show = L => (S.case === 'lower' ? L.ch.toLowerCase() : S.case === 'both' ? L.ch + L.ch.toLowerCase() : L.ch);
  box.innerHTML = sel.slice(0, 14).map(L => `<span>${show(L)}</span>`).join('') + (sel.length > 14 ? `<small>+${sel.length - 14}</small>` : '');
}
function renderPicker(msg) {
  const on = new Set(S.letters), n = on.size, ok = n >= 3;
  $('#picker').innerHTML = `<div class="sheet">
    <div class="row"><h2>Chọn chữ cho bé học</h2><button class="btn primary" data-pk="close" type="button">Xong</button></div>
    <p>Chạm vào chữ để chọn hoặc bỏ chọn. Trò chơi chỉ gọi những chữ được chọn. Chọn ít nhất 3 chữ.</p>
    <div class="ptiles">${LETTERS.map(L => `<button type="button" class="ptile" data-pk="tog" data-ch="${L.ch}" aria-pressed="${on.has(L.ch)}" aria-label="Chữ ${L.ch}"><b>${L.ch}</b><span>${L.obj}</span></button>`).join('')}</div>
    <div class="pfoot">
      <p class="pmsg${ok ? '' : ' bad'}">${ok ? `Đã chọn ${n} chữ.` : `Mới chọn ${n} chữ. Cần ít nhất 3 chữ.`}</p>
      <div class="seg"><button type="button" data-pk="all">Chọn tất cả</button><button type="button" data-pk="basic">12 chữ đầu</button></div>
      <button class="btn big" data-pk="play" type="button"${ok ? '' : ' disabled'}>Chơi ngay</button>
    </div></div>`;
}
function openPicker() { renderPicker(); $('#picker').hidden = false; }
$('#picker').addEventListener('click', e => {
  const b = e.target.closest('[data-pk]');
  if (!b) { if (e.target === $('#picker') && S.letters.length >= 3) { $('#picker').hidden = true; renderHome(); } return; }
  const a = b.dataset.pk, sc = $('#picker .sheet').scrollTop;
  if (a === 'tog') {
    const ch = b.dataset.ch, i = S.letters.indexOf(ch);
    if (i >= 0) S.letters.splice(i, 1); else S.letters.push(ch);
  } else if (a === 'all') S.letters = LETTERS.map(L => L.ch);
  else if (a === 'basic') S.letters = LETTERS.slice(0, 12).map(L => L.ch);
  else if (a === 'close' || a === 'play') {
    if (S.letters.length < 3) { renderPicker(); return; }
    save(); $('#picker').hidden = true; renderHome();
    if (a === 'play') { ac(); SFX.tap(); startLevel(nextG()); }
    return;
  }
  save(); renderPicker(); $('#picker .sheet').scrollTop = sc;
});
let resetArmed = 0;
$('#parent').addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) { if (e.target === $('#parent')) { $('#parent').hidden = true; renderHome(); } return; }
  const act = b.dataset.act, v = b.dataset.v;
  if (act === 'close') { $('#parent').hidden = true; renderHome(); return; }
  if (act === 'kid') S.kid = v === '1';
  if (act === 'diff') S.diff = +v;
  if (act === 'games') S.games = v;
  if (act === 'case') S.case = v;
  if (act === 'picker') { $('#parent').hidden = true; openPicker(); return; }
  if (act === 'style') S.style = v;
  if (act === 'sound') S.sound = !S.sound;
  if (act === 'voice') { S.voice = !S.voice; if (!S.voice) stopSpeech(); }
  if (act === 'limit') S.limit = Number(v);
  if (act === 'reset') {
    if (!resetArmed) {
      resetArmed = setTimeout(() => { resetArmed = 0; const r = $('#resetBtn'); if (r) { r.classList.remove('armed'); r.textContent = 'Xóa tiến độ'; } }, 4000);
      b.classList.add('armed'); b.textContent = 'Bấm lần nữa để xóa';
      return;
    }
    clearTimeout(resetArmed); resetArmed = 0;
    S.best = {}; S.prog = {}; S.sec = 0;
  }
  save(); renderParent();
});

$('#homeMochi').addEventListener('click', () => {
  ac(); SFX.pop(); say('Xin chào! Mochi đây!');
  const m = $('#homeMochi'); m.classList.add('happy'); m.classList.remove('hop'); void m.offsetWidth; m.classList.add('hop');
  setTimeout(() => m.classList.remove('happy'), 1400);
});
$('#playBtn').addEventListener('click', () => { ac(); SFX.tap(); startLevel(mixNext()); });
$('#zooBtn').addEventListener('click', () => { ac(); SFX.tap(); renderZoo(); show('zoo'); });
$('#zooBack').addEventListener('click', () => { ac(); SFX.tap(); goHome(); });
$('#bubble').addEventListener('click', () => { ac(); SFX.tap(); if (ctx) say(ctx.prompt); });
hold($('#homeHold'), 900, goHome);
hold($('#pickBtn'), 1000, openPicker);
$('#palL').innerHTML = animalSVG({ p: 2, c: 2 });
$('#palR').innerHTML = animalSVG({ p: 0, c: 7 });
hold($('#gear'), 1500, () => { renderParent(); $('#parent').hidden = false; });
hold($('#wake'), 1500, () => { S.sec = 0; save(); goHome(); });

$('#sleepMochi').innerHTML = mochiSVG();
$('#mochi').innerHTML = mochiSVG();

document.addEventListener('visibilitychange', () => { if (document.hidden) { stopSpeech(); save(); } });
try { if ('speechSynthesis' in window) speechSynthesis.getVoices(); } catch (e) {}

setInterval(() => {
  if (document.hidden || $('#play').hidden) return;
  S.sec++;
  if (S.sec % 10 === 0) save();
}, 1000);

renderHome();
show('home');
})();
