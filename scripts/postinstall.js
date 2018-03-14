#! /usr/bin/env node

const { copySync } = require('fs-extra');

const files = [
  copySync('node_modules/quill/LICENSE', 'src/settings/vendor/quill.LICENSE'),
  copySync('node_modules/quill/dist/quill.min.js', 'src/settings/vendor/quill.js'),
  copySync('node_modules/quill/dist/quill.snow.css', 'src/settings/vendor/quill.snow.css'),

  copySync('node_modules/quill-delta-to-html/LICENSE', 'src/content/vendor/quill-delta-to-html.LICENSE'),
  copySync('node_modules/quill-delta-to-html/dist/browser/QuillDeltaToHtmlConverter.bundle.js', 'src/content/vendor/quill-delta-to-html.js'),

  copySync('node_modules/clipboard-polyfill/LICENSE.md', 'src/content/vendor/clipboard-polyfill.LICENSE'),
  copySync('node_modules/clipboard-polyfill/build/clipboard-polyfill.js', 'src/content/vendor/clipboard-polyfill.js'),

  // Chrome Extension
  copySync('node_modules/quill/LICENSE', 'chrome/settings/vendor/quill.LICENSE'),
  copySync('node_modules/quill/dist/quill.min.js', 'chrome/settings/vendor/quill.js'),
  copySync('node_modules/quill/dist/quill.snow.css', 'chrome/settings/vendor/quill.snow.css'),

  copySync('node_modules/quill-delta-to-html/LICENSE', 'chrome/content/vendor/quill-delta-to-html.LICENSE'),
  copySync('node_modules/quill-delta-to-html/dist/browser/QuillDeltaToHtmlConverter.bundle.js', 'chrome/content/vendor/quill-delta-to-html.js'),

  copySync('node_modules/clipboard-polyfill/LICENSE.md', 'chrome/content/vendor/clipboard-polyfill.LICENSE'),
  copySync('node_modules/clipboard-polyfill/build/clipboard-polyfill.js', 'chrome/content/vendor/clipboard-polyfill.js'),

  copySync('node_modules/quill-emoji/dist/quill-emoji.css', 'src/settings/vendor/quill-emoji.css'),
  copySync('node_modules/quill-emoji/dist/quill-emoji.js', 'src/settings/vendor/quill-emoji.js'),

  copySync('node_modules/quill-emoji/dist/quill-emoji.css', 'chrome/settings/vendor/quill-emoji.css'),
  copySync('node_modules/quill-emoji/dist/quill-emoji.js', 'chrome/settings/vendor/quill-emoji.js')
];

Promise.all(files).catch(err => {
  console.error(err);
  process.exit(1);
});