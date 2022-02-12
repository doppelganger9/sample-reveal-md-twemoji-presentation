#!/usr/bin/env node
const fs = require("fs");
const replace = require("replace-in-file");

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (file of files) {
    const filePath = dir + '/' + file;
    if (fs.statSync(filePath).isDirectory()) {
      // directory : recurse
      walkDir(filePath, callback);
    } else {
      // file
      callback(filePath);
    }
  }
}

try {
  const files = [];
  walkDir('./dist', file => files.push(file));
  const filesWithRootDir = files.map(file => file.replace('./dist', 'https://doppelganger9.github.io/sample-reveal-md-twemoji-presentation')).filter(file => file.indexOf('sw.js')<0);
  const fileListToReplaceInServiceWorker = filesWithRootDir.map(f => `        '${f}'`).join(',\n');

  const result = replace.sync({
    files: './dist/sw.js',
    from: /__REPLACE_FILES_HERE__/g,
    to: fileListToReplaceInServiceWorker,
  });
  result.forEach(r => r.hasChanged 
    ? console.log(`replaced list of cached assets in ${r.file} file`) 
    : console.log(`did not replace list of cached assets in ${r.file} file`)
  );


} catch(e) {
  console.log(e)
}

