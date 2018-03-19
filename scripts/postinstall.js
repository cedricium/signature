#! /usr/bin/env node

const { copySync } = require('fs-extra');

const files = [
  copySync('node_modules/quill/LICENSE', 'firefox/settings/vendor/quill.LICENSE'),
  copySync('node_modules/quill/dist/quill.min.js', 'firefox/settings/vendor/quill.js'),
  copySync('node_modules/quill/dist/quill.snow.css', 'firefox/settings/vendor/quill.snow.css'),

  copySync('node_modules/quill-delta-to-html/LICENSE', 'firefox/content/vendor/quill-delta-to-html.LICENSE'),
  copySync('node_modules/quill-delta-to-html/dist/browser/QuillDeltaToHtmlConverter.bundle.js', 'firefox/content/vendor/quill-delta-to-html.js'),

  copySync('node_modules/clipboard-polyfill/LICENSE.md', 'firefox/content/vendor/clipboard-polyfill.LICENSE'),
  copySync('node_modules/clipboard-polyfill/build/clipboard-polyfill.js', 'firefox/content/vendor/clipboard-polyfill.js'),

  copySync('node_modules/quill-emoji/dist/quill-emoji.css', 'firefox/settings/vendor/quill-emoji.css'),
  copySync('node_modules/quill-emoji/dist/quill-emoji.js', 'firefox/settings/vendor/quill-emoji.js'),

  copySync('node_modules/bulma/css/bulma.css', 'firefox/settings/vendor/bulma.css'),

  // Chrome Extension
  copySync('node_modules/quill/LICENSE', 'chrome/settings/vendor/quill.LICENSE'),
  copySync('node_modules/quill/dist/quill.min.js', 'chrome/settings/vendor/quill.js'),
  copySync('node_modules/quill/dist/quill.snow.css', 'chrome/settings/vendor/quill.snow.css'),

  copySync('node_modules/quill-delta-to-html/LICENSE', 'chrome/content/vendor/quill-delta-to-html.LICENSE'),
  copySync('node_modules/quill-delta-to-html/dist/browser/QuillDeltaToHtmlConverter.bundle.js', 'chrome/content/vendor/quill-delta-to-html.js'),

  copySync('node_modules/clipboard-polyfill/LICENSE.md', 'chrome/content/vendor/clipboard-polyfill.LICENSE'),
  copySync('node_modules/clipboard-polyfill/build/clipboard-polyfill.js', 'chrome/content/vendor/clipboard-polyfill.js'),

  copySync('node_modules/quill-emoji/dist/quill-emoji.css', 'chrome/settings/vendor/quill-emoji.css'),
  copySync('node_modules/quill-emoji/dist/quill-emoji.js', 'chrome/settings/vendor/quill-emoji.js'),

  copySync('node_modules/bulma/css/bulma.css', 'chrome/settings/vendor/bulma.css')
];

Promise.all(files).catch(err => {
  console.error(err);
  process.exit(1);
});