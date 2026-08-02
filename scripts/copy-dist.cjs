const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', '.output', 'public');
const dest = path.join(__dirname, '..', 'dist');

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log('Successfully copied .output/public to dist for Vercel static hosting!');
} else {
  console.error('Source directory .output/public does not exist!');
}
