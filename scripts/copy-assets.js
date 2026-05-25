import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('.vercel/output/static');
const targets = [
  path.resolve('.output/public'),
  path.resolve('dist/client'),
  path.resolve('dist')
];

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

try {
  if (fs.existsSync(srcDir)) {
    console.log(`[copy-assets] Copying static assets from ${srcDir}...`);
    targets.forEach(target => {
      copyFolderSync(srcDir, target);
      console.log(`[copy-assets] Copied to ${target}`);
    });
  } else {
    console.log(`[copy-assets] Source directory ${srcDir} does not exist. Skipping copy.`);
  }
} catch (err) {
  console.error('[copy-assets] Error copying assets:', err);
}
