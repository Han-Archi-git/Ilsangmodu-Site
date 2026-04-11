import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__filename:', __filename);
console.log('__dirname:', __dirname);
console.log('Attempting to resolve ../dist/node/cli.js relatively...');

try {
    const target = path.resolve(__dirname, '../dist/node/cli.js');
    console.log('Resolved target:', target);
} catch (e) {
    console.error('Resolution failed:', e);
}
