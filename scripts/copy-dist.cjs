const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, '.output', 'public');
const destDist = path.join(root, 'dist');
const destPublicAssets = path.join(root, 'public', 'assets');

if (fs.existsSync(src)) {
  // 1. Copy .output/public to dist
  fs.mkdirSync(destDist, { recursive: true });
  fs.cpSync(src, destDist, { recursive: true });

  // 2. Copy compiled assets to public/assets
  const compiledAssets = path.join(src, 'assets');
  if (fs.existsSync(compiledAssets)) {
    fs.mkdirSync(destPublicAssets, { recursive: true });
    fs.cpSync(compiledAssets, destPublicAssets, { recursive: true });
  }

  // 3. Find index js & css file in compiled assets
  let indexJs = '';
  let indexCss = '';
  if (fs.existsSync(compiledAssets)) {
    const files = fs.readdirSync(compiledAssets);
    const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
    const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
    if (jsFile) indexJs = jsFile;
    if (cssFile) indexCss = cssFile;
  }

  if (indexJs) {
    const rootHtmlPath = path.join(root, 'index.html');
    let htmlContent = fs.readFileSync(rootHtmlPath, 'utf8');

    // Replace uncompiled client.tsx script tag with compiled JS & CSS bundle tags
    const scriptTagRegex = /<script\s+type=["']module["']\s+src=["'].*?client\.tsx["']\s*><\/script>/gi;
    const replacement = `${indexCss ? `<link rel="stylesheet" href="./assets/${indexCss}">\n` : ''}<script type="module" src="./assets/${indexJs}"></script>`;
    
    if (scriptTagRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(scriptTagRegex, replacement);
      fs.writeFileSync(rootHtmlPath, htmlContent, 'utf8');
    }
    fs.writeFileSync(path.join(destDist, 'index.html'), htmlContent, 'utf8');
    console.log(`Successfully patched root & dist index.html to load ./assets/${indexJs}!`);
  }

  console.log('Successfully synced compiled assets & production index.html for Vercel!');
} else {
  console.error('Source directory .output/public does not exist!');
}
