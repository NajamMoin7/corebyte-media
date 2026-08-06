import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

// Build a manifest of downloaded portfolio images per source folder.
const ROOT = "public/images/portfolio";
const dirs = ["logos", "web_design", "branding", "ui-ux", "social-media", "graphic-design"];

const manifest = {};
for (const dir of dirs) {
  let files = [];
  try {
    files = readdirSync(join(ROOT, dir))
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort();
  } catch {
    files = [];
  }
  manifest[dir] = files.map((f) => `/images/portfolio/${dir}/${f}`);
}

writeFileSync(
  "src/lib/portfolio-manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
const total = Object.values(manifest).reduce((a, b) => a + b.length, 0);
console.log("manifest written,", total, "images");
