/**
 * Assembles the Cloudflare Pages output.
 *
 *   archive/v1/            original glass portfolio, prebuilt with base /v1/
 *   archive/v2/            current master revamp, prebuilt with base /v2/
 *   dist-v3/               the Vue 3 editorial app, built from v3/
 *   deploy/worker.js       cookie-controlled variant router -> dist/_worker.js
 *
 * v1 and v2 are frozen Vite snapshots, so only v3 is compiled at deploy time
 * (`npm run build:v3`). This script assembles the final dist/ tree.
 */

import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const v3Build = path.join(root, "dist-v3");
const v3Dir = path.join(dist, "v3");

const ARCHIVED = ["v1", "v2"];

async function main() {
  if (!existsSync(path.join(v3Build, "index.html"))) {
    throw new Error(
      "Missing dist-v3/index.html — run `npm run build:v3` before assembling."
    );
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

  // 3. The Vue 3 editorial app becomes the v3 variant served at `/`.
  await mkdir(v3Dir, { recursive: true });
  await cp(v3Build, v3Dir, { recursive: true });

  // 4. Pages router (advanced mode).
  await cp(
    path.join(root, "deploy", "worker.js"),
    path.join(dist, "_worker.js")
  );

  console.log("✓ archive/v1 → dist/v1");
  console.log("✓ archive/v2 → dist/v2");
  console.log("✓ dist-v3 → dist/v3");
  console.log("✓ deploy/worker.js → dist/_worker.js");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
