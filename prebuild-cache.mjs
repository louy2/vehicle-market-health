#!/usr/bin/env node
/**
 * Pre-build script that populates the Observable Framework npm cache
 * with locally bundled ESM packages, bypassing the cdn.jsdelivr.net dependency.
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, cpSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = process.cwd();
const CACHE_DIR = join(ROOT, "docs", ".observablehq", "cache", "_npm");

function getPkgVersion(name) {
  const pkgPath = join(ROOT, "node_modules", name, "package.json");
  return JSON.parse(readFileSync(pkgPath, "utf-8")).version;
}

function bundleToEsm(entryPoint, outfile, opts = {}) {
  mkdirSync(dirname(outfile), { recursive: true });
  const external = opts.external ? opts.external.map(e => `--external:${e}`).join(" ") : "";
  const platform = opts.platform || "browser";
  try {
    execSync(
      `npx esbuild "${entryPoint}" --bundle --format=esm --outfile="${outfile}" --platform=${platform} --minify ${external}`,
      { stdio: "pipe", maxBuffer: 50 * 1024 * 1024 }
    );
    console.log(`  Bundled: ${outfile}`);
  } catch (e) {
    console.error(`  ERROR bundling ${entryPoint}: ${e.stderr?.toString().slice(0, 200)}`);
    // Write a stub so the build doesn't fail looking for the file
    writeFileSync(outfile, `export default {};\n`);
    console.log(`  Wrote stub: ${outfile}`);
  }
}

function cachePackageJson(name, version) {
  const src = join(ROOT, "node_modules", name, "package.json");
  const dest = join(CACHE_DIR, `${name}@${version}`, "package.json");
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest);
}

function cacheFile(name, version, filePath, srcBase) {
  const src = join(srcBase || join(ROOT, "node_modules", name), filePath);
  const dest = join(CACHE_DIR, `${name}@${version}`, filePath);
  mkdirSync(dirname(dest), { recursive: true });
  if (existsSync(src)) {
    cpSync(src, dest);
    console.log(`  Cached: ${filePath}`);
  }
}

function bundlePackage(name, opts = {}) {
  const version = getPkgVersion(name);
  console.log(`\n${name}@${version}`);
  cachePackageJson(name, version);

  const pkg = JSON.parse(readFileSync(join(ROOT, "node_modules", name, "package.json"), "utf-8"));
  const entry = opts.entry || pkg.module || pkg.main || "index.js";
  const entryPath = join(ROOT, "node_modules", name, entry);

  bundleToEsm(entryPath, join(CACHE_DIR, `${name}@${version}`, "_esm.js"), opts);
  return version;
}

// ---- Main ----
console.log("Pre-building Observable Framework npm cache...");

// Core packages used by the dashboard
bundlePackage("@observablehq/plot", { entry: "src/index.js" });
bundlePackage("d3-dsv", { entry: "src/index.js" });

// Standard library packages required by Observable Framework client runtime
bundlePackage("react");
bundlePackage("react-dom", { entry: "client.js" });
// react-dom also needs a "client" subpath
const rdVer = getPkgVersion("react-dom");
const rdClientPath = join(CACHE_DIR, `react-dom@${rdVer}`, "client._esm.js");
if (!existsSync(rdClientPath)) {
  bundleToEsm(join(ROOT, "node_modules", "react-dom", "client.js"), rdClientPath);
}

bundlePackage("d3", { entry: "src/index.js" });
bundlePackage("htl");
bundlePackage("lodash", { entry: "lodash.js" });
bundlePackage("topojson-client", { entry: "src/index.js" });

// These may not be used but Framework resolves their versions
const optionalPackages = ["arquero", "apache-arrow", "echarts", "leaflet", "mapbox-gl", "@observablehq/sample-datasets"];
for (const pkg of optionalPackages) {
  try {
    const ver = getPkgVersion(pkg);
    console.log(`\n${pkg}@${ver} (version marker only)`);
    cachePackageJson(pkg, ver);
    // Create directory so version cache scan finds it
    const dir = join(CACHE_DIR, `${pkg}@${ver}`);
    mkdirSync(dir, { recursive: true });
    // Write a minimal stub ESM
    const esmFile = join(dir, "_esm.js");
    if (!existsSync(esmFile)) {
      writeFileSync(esmFile, `export default {};\n`);
    }
  } catch {
    console.log(`  Skipping ${pkg} (not installed)`);
  }
}

// Handle special case: echarts needs dist/echarts.esm.min.js
try {
  const echartsVer = getPkgVersion("echarts");
  const echartsSrc = join(ROOT, "node_modules", "echarts", "dist", "echarts.esm.min.js");
  const echartsDest = join(CACHE_DIR, `echarts@${echartsVer}`, "dist", "echarts.esm.min.js");
  if (existsSync(echartsSrc)) {
    mkdirSync(dirname(echartsDest), { recursive: true });
    cpSync(echartsSrc, echartsDest);
    // Also create the +esm version
    const echartsEsm = join(CACHE_DIR, `echarts@${echartsVer}`, "dist", "echarts.esm.min._esm.js");
    cpSync(echartsSrc, echartsEsm);
  }
} catch { /* ignore */ }

// Handle leaflet CSS and images
try {
  const lfVer = getPkgVersion("leaflet");
  cacheFile("leaflet", lfVer, "dist/leaflet.css");
  for (const img of ["layers.png", "layers-2x.png", "marker-icon.png", "marker-icon-2x.png", "marker-shadow.png"]) {
    cacheFile("leaflet", lfVer, `dist/images/${img}`);
  }
} catch { /* ignore */ }

// Handle mapbox-gl CSS
try {
  const mgVer = getPkgVersion("mapbox-gl");
  cacheFile("mapbox-gl", mgVer, "dist/mapbox-gl.css");
} catch { /* ignore */ }

console.log("\n\nDone! Cache populated at:", CACHE_DIR);
