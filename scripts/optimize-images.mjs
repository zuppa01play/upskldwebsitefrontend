import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile, stat } from "fs/promises";
import { existsSync } from "fs";

const kb = async (f) => Math.round((await stat(f)).size / 1024);
const rows = [];
const log = (name, before, after) => {
  rows.push({ file: name, before: `${before} KB`, after: `${after} KB` });
};

// [source, output, max width, quality]
const WEBP = [
  ...[
    "Small_Business_Owner",
    "Small_Business_Owner_1",
    "students",
    "students_2",
    "working_professionals",
    "working_professionals_1",
  ].map((n) => [`public/assests/images/${n}.png`, `public/assests/images/${n}.webp`, 1200, 78]),

  ["src/Components/HomeAiPage/ImageOne.png", "src/Components/HomeAiPage/ImageOne.webp", 1200, 80],
  ["src/Components/HomeAiPage/ImageTwo.png", "src/Components/HomeAiPage/ImageTwo.webp", 1200, 80],
  ["src/Components/HomeAiReplace/aihand.png", "src/Components/HomeAiReplace/aihand.webp", 1000, 80],
  ["src/Components/HomeAiReplace/humanhand.png", "src/Components/HomeAiReplace/humanhand.webp", 1000, 80],

  ...["Aparna", "Joe", "RajaSri", "RajMohan", "Sai", "Venkat", "Vivek"].map((n) => [
    `src/Components/StudentFooter/PeopleImage/${n}.png`,
    `src/Components/StudentFooter/PeopleImage/${n}.webp`,
    600,
    80,
  ]),

  ["src/HeadFootPage/HeaderPage/headerLogo.png", "src/HeadFootPage/HeaderPage/headerLogo.webp", 432, 90],
  ["src/POPUP/PopupVideo/popup-poster.png", "src/POPUP/PopupVideo/popup-poster.webp", 1000, 75],
];

for (const [src, out, width, quality] of WEBP) {
  if (!existsSync(src)) {
    console.warn("SKIP (file illa):", src);
    continue;
  }
  const before = await kb(src);
  await sharp(await readFile(src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(out);
  log(out, before, await kb(out));
}

for (const size of [192, 512]) {
  const f = `public/logo${size}.png`;
  if (!existsSync(f)) continue;
  const before = await kb(f);
  const buf = await sharp(await readFile(f))
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ palette: true, quality: 85, compressionLevel: 9 })
    .toBuffer();
  await writeFile(f, buf);
  log(f, before, await kb(f));
}

if (existsSync("public/logo512.png")) {
  const before = existsSync("public/favicon.ico") ? await kb("public/favicon.ico") : 0;
  const src = await readFile("public/logo512.png");
  const sizes = await Promise.all(
    [16, 32, 48].map((s) =>
      sharp(src).resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
    )
  );
  await writeFile("public/favicon.ico", await pngToIco(sizes));
  log("public/favicon.ico", before, await kb("public/favicon.ico"));
}

if (existsSync("public/og-image.png")) {
  const before = await kb("public/og-image.png");
  const input = await readFile("public/og-image.png");
  for (const q of [82, 74, 66, 58, 50]) {
    await sharp(input)
      .resize(1200, 630, { fit: "cover" })
      .jpeg({ quality: q, mozjpeg: true })
      .toFile("public/og-image.jpg");
    if ((await kb("public/og-image.jpg")) < 300) break;
  }
  log("public/og-image.jpg", before, await kb("public/og-image.jpg"));
}

console.table(rows);