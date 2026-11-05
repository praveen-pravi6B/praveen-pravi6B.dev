/**
 * Assembles the Cloudflare Pages output.
 *
 *   archive/v1/            original glass portfolio, prebuilt with base /v1/
 *   archive/v2/            current master revamp, prebuilt with base /v2/
 *   mockup-v4-editorial    new editorial design -> dist/v3/
 *   deploy/worker.js       cookie-controlled variant router -> dist/_worker.js
 *
 * None of these require a Vite build at deploy time: v1 and v2 are frozen
 * snapshots and v3 is plain HTML. `npm run build` only assembles dist/.
 */

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const v3Dir = path.join(dist, "v3");

const NEW_DESIGN = "mockup-v4-editorial.html";
const ARCHIVED = ["v1", "v2"];

/** Make asset paths work from the nested /v3/ folder. */
function rewriteAssetPaths(html) {
  return html
    .replaceAll('src="public/logo.png"', 'src="/logo.png"')
    .replaceAll('src="public/favicon.png"', 'src="/favicon.png"')
    .replaceAll('href="public/favicon.png"', 'href="/favicon.png"');
}

async function main() {
  if (!existsSync(path.join(root, NEW_DESIGN))) {
    throw new Error(`Missing ${NEW_DESIGN} — cannot build the v3 variant.`);
  }

  for (const version of ARCHIVED) {
    if (!existsSync(path.join(root, "archive", version, "index.html"))) {
      throw new Error(
        `Missing archive/${version}/index.html — rebuild that snapshot first.`
      );
    }
  }

  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  // 1. Shared public assets (favicon, logo) at the domain root.
  await cp(path.join(root, "public"), dist, { recursive: true });

  // 2. Frozen builds, already compiled with /v1/ and /v2/ asset bases.
  for (const version of ARCHIVED) {
    await cp(path.join(root, "archive", version), path.join(dist, version), {
      recursive: true,
    });
  }

  // 3. The selected design becomes the v3 variant served at `/`.
  await mkdir(v3Dir, { recursive: true });
  const newDesign = await readFile(path.join(root, NEW_DESIGN), "utf8");
  await writeFile(path.join(v3Dir, "index.html"), rewriteAssetPaths(newDesign));

  // 4. Pages router (advanced mode).
  await cp(
    path.join(root, "deploy", "worker.js"),
    path.join(dist, "_worker.js")
  );

  console.log("✓ archive/v1 → dist/v1");
  console.log("✓ archive/v2 → dist/v2");
  console.log(`✓ ${NEW_DESIGN} → dist/v3/index.html`);
  console.log("✓ deploy/worker.js → dist/_worker.js");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
