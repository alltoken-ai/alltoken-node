#!/usr/bin/env node
/**
 * Generate TypeScript types from OpenAPI specs.
 *
 * Reads spec files from ../megaopenrouter/openapi/ (sibling repo)
 * and writes types to src/generated/.
 *
 * Run: npm run generate
 */
import openapiTS, { astToString } from 'openapi-typescript';
import { writeFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SPEC_DIR = resolve(__dirname, '../../megaopenrouter/openapi');
const OUT_DIR  = resolve(__dirname, '../src/generated');

// (internal spec name, input file)
const specs = [
  { name: 'chat',      file: 'chat.yml' },
  { name: 'anthropic', file: 'anthropic.yml' },
];

// Sanity check: megaopenrouter must be cloned as sibling
try {
  await access(SPEC_DIR);
} catch {
  console.error(`✗ Spec directory not found: ${SPEC_DIR}`);
  console.error('  Clone megaopenrouter as a sibling to alltoken-node:');
  console.error('    git clone <megaopenrouter-url> ../megaopenrouter');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

for (const { name, file } of specs) {
  const specPath = resolve(SPEC_DIR, file);
  const ast = await openapiTS(`file://${specPath.replace(/\\/g, '/')}`);
  const body = astToString(ast);
  const contents =
    `/* eslint-disable */\n` +
    `/* auto-generated from ${file} — do not edit by hand. */\n` +
    `/* Regenerate via: npm run generate */\n\n` +
    body;
  const outPath = resolve(OUT_DIR, `${name}.d.ts`);
  await writeFile(outPath, contents, 'utf-8');
  console.log(`✓ ${name.padEnd(10)} → src/generated/${name}.d.ts`);
}

console.log('\n✓ Done. Types regenerated. Run `npm run typecheck` to verify.');
