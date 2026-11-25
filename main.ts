import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// One-line roast of a smart fridge that refuses to open after midnight.
// The joke targets the fridge's petty midnight rule: it locks itself like a
// nightclub bouncer, even though it is only a cold box of leftovers.
const ENTRY =
  "My fridge locks at midnight like a bouncer — pal, you're a cold box of leftovers, not a nightclub, let me in.";

const MAX_CHARS = 200;

function outPath(): string {
  const arg = process.argv[2];
  if (arg) {
    const p = resolve(arg);
    // A .txt argument names the output file itself; anything else is a
    // directory that receives entry.txt.
    return p.endsWith(".txt") ? p : `${p}/entry.txt`;
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return `${dir}/entry.txt`;
}

function main(): void {
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }
  const path = outPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, line, "utf8");
  console.log(`wrote ${path} (${line.length} characters)`);
}

main();
