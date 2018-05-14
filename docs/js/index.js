/* eslint-disable no-multi-spaces, max-len */

/* Browser detection used to display a different button
 * Courtesy of Rob W (https://stackoverflow.com/users/938089/rob-w)
 * refs: https://stackoverflow.com/a/9851769/6698029
 * */
// Firefox 1.0+
let isFirefox = typeof InstallTrigger !== 'undefined';
// Chrome 1+
let isChrome = !!window.chrome && !!window.chrome.webstore;
/* ---- End browser detection ---- */

const githubBtn = document.querySelector('a.github.button');
const firefoxInstallBtn = document.querySelector('a.firefox.button');
const chromeInstallBtn = document.querySelector('a.chrome.button');

if (isFirefox) {
  firefoxInstallBtn.classList.remove('is-hidden');
  githubBtn.classList.add('is-hidden');
  chromeInstallBtn.classList.add('is-hidden');
} else if (isChrome) {
  chromeInstallBtn.classList.remove('is-hidden');
  githubBtn.classList.add('is-hidden');
  firefoxInstallBtn.classList.add('is-hidden');
} else {
  githubBtn.classList.remove('is-hidden');
  firefoxInstallBtn.classList.add('is-hidden');
  chromeInstallBtn.classList.add('is-hidden');
}