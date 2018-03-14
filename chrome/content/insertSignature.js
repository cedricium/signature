// on each hashchange (for Medium.com), check for `inlineTooltip`
(function () {
  console.log('started!');
  startScript();
})();

function startScript() {
  let previousUrl = location.href;
  window.setInterval(() => {
    if (previousUrl !== location.href) {
      previousUrl = location.href;
      const hasInlineTooltip = doesInlineTooltipExist();
      if (hasInlineTooltip) {
        console.log('has inlinetooltip');
        createSignatureButton();
      } else {
        console.log('does not have inlinetooltip');
      }
    }
  }, 250);
}

function doesInlineTooltipExist() {
  // edge case: medium.com/new-story --> medium.com/p/<random-hashed-id>/edit
  // this occurs when the user creates a new story then gives the article some text
  // to a totally new / blank story.
  if (location.href === 'https://medium.com/new-story')
    return false;

  return document.querySelector('.inlineTooltip');
}

// wrap creating button and adding to tooltip in a function
function createSignatureButton() {
  const inlineTooltip = document.querySelector('.inlineTooltip');
  const inlineTooltipMenu = document.querySelector('.inlineTooltip-menu');
  inlineTooltip.style.width = '360px';

  const signatureBtn = document.createElement('button');
  signatureBtn.classList.add('button', 'button--small', 'button--circle', 'button--dark', 'button--withChrome', 'u-baseColor--buttonDark', 'button--withIcon', 'ms-icon');
  signatureBtn.title = 'Add your Medium Signature';
  signatureBtn.setAttribute('aria-label', 'Add your Medium Signature');

  inlineTooltipMenu.appendChild(signatureBtn);

  signatureBtn.addEventListener('click', () => {
    console.log('signature button clicked!');
    // get saved signature
    loadSignatureFromStorage();
  });
}

function loadSignatureFromStorage() {
  chrome.storage.local.get(null, savedData => {
    if (Object.keys(savedData).length > 0) {
      const converter = new QuillDeltaToHtmlConverter(savedData.ops, {});
      const signature = converter.convert();
      copyToClipboard(signature);
      pasteSignature();
    }
  });
}

function copyToClipboard(text) {
  const dt = new clipboard.DT();
  dt.setData('text/html', text);
  clipboard.write(dt);
}

function pasteSignature() {
  const selectedElement = document.querySelector('.is-selected');
  selectedElement.focus();
  document.execCommand('paste');
}