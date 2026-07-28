import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, 'src', 'assets', 'gotcha_logo.jpg');
const buf = fs.readFileSync(imgPath);
const base64 = buf.toString('base64');
const dataUrl = `data:image/jpeg;base64,${base64}`;

const code = `export const GOTCHA_LOGO_DATA_URL = "${dataUrl}";\n`;
fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'logo-data-url.ts'), code);
console.log('LOGO DATA URL GENERATED! Length:', dataUrl.length);
