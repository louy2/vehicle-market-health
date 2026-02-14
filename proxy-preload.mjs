// Preload script to replace global fetch with a curl-based implementation
// This is needed because Node.js's built-in fetch cannot resolve DNS or
// reach external CDNs in this sandboxed environment, while curl can.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const originalFetch = globalThis.fetch;

globalThis.fetch = async function patchedFetch(url, options = {}) {
  const urlStr = typeof url === "string" ? url : url.toString();

  // Only intercept external HTTPS requests
  if (!urlStr.startsWith("https://")) {
    return originalFetch(url, options);
  }

  const tmp = mkdtempSync(join(tmpdir(), "fetch-"));
  const bodyFile = join(tmp, "body");
  const headerFile = join(tmp, "headers");

  try {
    // Build curl args - write body and headers to separate files
    const args = [
      "-s", "-S",
      "--connect-timeout", "30",
      "--max-time", "60",
      "-L",
      "--http1.1",
      "-o", bodyFile,
      "-D", headerFile,
    ];
    if (options.headers) {
      const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
      for (const [key, value] of headers.entries()) {
        args.push("-H", `${key}: ${value}`);
      }
    }
    args.push(urlStr);

    execFileSync("curl", args, {
      timeout: 60000,
      stdio: "pipe",
    });

    // Read body
    const body = readFileSync(bodyFile);

    // Parse headers from the header file
    let statusCode = 200;
    const headers = {};
    try {
      const headerStr = readFileSync(headerFile, "utf-8");
      // Handle chained responses (redirects) - take the last HTTP response
      const blocks = headerStr.split(/\r?\n\r?\n/).filter(b => b.trim());
      const lastBlock = blocks[blocks.length - 1] || "";
      const lines = lastBlock.split(/\r?\n/);

      const statusMatch = lines[0]?.match(/HTTP\/[\d.]+ (\d+)/);
      if (statusMatch) statusCode = parseInt(statusMatch[1]);

      for (let i = 1; i < lines.length; i++) {
        const colonIdx = lines[i].indexOf(":");
        if (colonIdx > 0) {
          const key = lines[i].slice(0, colonIdx).trim().toLowerCase();
          const value = lines[i].slice(colonIdx + 1).trim();
          headers[key] = value;
        }
      }
    } catch { /* use defaults */ }

    // Cleanup
    try { unlinkSync(bodyFile); } catch {}
    try { unlinkSync(headerFile); } catch {}
    try { unlinkSync(tmp); } catch {}

    return new Response(body, { status: statusCode, headers });
  } catch (e) {
    // Cleanup on error
    try { unlinkSync(bodyFile); } catch {}
    try { unlinkSync(headerFile); } catch {}
    try { unlinkSync(tmp); } catch {}
    // Fall back to original fetch
    return originalFetch(url, options);
  }
};
