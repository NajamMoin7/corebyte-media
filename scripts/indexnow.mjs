// Submit URLs to IndexNow (Bing, Yandex, etc.). Run after a deploy:
//   node scripts/indexnow.mjs                -> submits every sitemap URL
//   node scripts/indexnow.mjs /services /work -> submits just those paths
import { readFileSync } from "fs";

const HOST = "corebytemedia.vercel.app";
const KEY = readFileSync(".indexnow-key", "utf8").trim();
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `https://${HOST}${p}`))
  : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

console.log(`Submitted ${urlList.length} URLs -> IndexNow status ${res.status}`);
