import fs from 'fs';
import os from 'os';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json'), 'utf8'));

export function index(): Record<string, unknown> {
  return {
    app: pkg.name,
    version: pkg.version,
    docs: '/api-docs/',
    host: os.hostname(),
  };
}

export function healthCheck(): void {
  return;
}
