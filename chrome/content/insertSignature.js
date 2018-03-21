// on each hashchange (for Medium.com), check for `inlineTooltip`
(function () {
  startScript();
})();

function startScript () {
  let previousUrl = location.href;
  window.setInterval(() => {
    if (previousUrl !== location.href) {
      previousUrl = location.href;
      const hasInlineTooltip = doesInlineTooltipExist();
      const hasSignatureBtn = doesSignatureBtnExist();
      // Check to see if inline-tooltip exists and that there is no previous Signature
      // button before creating a new one. This corrects the edge case of
      // `medium.com/new-story` changing to `medium.com/p/<some_hash>/edit` which
      // resulted in a duplicate Signature button being added.
      // Refs: https://github.com/cedricium/signature/issues/7
      if (hasInlineTooltip && !hasSignatureBtn) {
        createSignatureButton();
      }
    }
  }, 250);
}

function doesInlineTooltipExist () {
  return !!document.querySelector('.inlineTooltip');
}

function doesSignatureBtnExist () {
  return !!document.querySelector('button.button.ms-icon');
}

// wrap creating button and adding to tooltip in a function
function createSignatureButton () {
  const inlineTooltip = document.querySelector('.inlineTooltip');
  const inlineTooltipMenu = document.querySelector('.inlineTooltip-menu');
  inlineTooltip.style.width = '360px';

  const signatureBtn = document.createElement('button');
  signatureBtn.classList.add('button', 'button--small', 'button--circle', 'button--dark', 'button--withChrome', 'u-baseColor--buttonDark', 'button--withIcon', 'ms-icon');
  signatureBtn.title = 'Add your Medium Signature';
  signatureBtn.setAttribute('aria-label', 'Add your Medium Signature');
  const signatureBtnIcon = chrome.extension.getURL('content/nib-icon.svg');
  signatureBtn.style.backgroundImage = `url('${signatureBtnIcon}')`;
  signatureBtn.style.backgroundRepeat = 'no-repeat';

  inlineTooltipMenu.appendChild(signatureBtn);

  signatureBtn.addEventListener('click', () => {
    loadSignatureFromStorage();
  });
}

function loadSignatureFromStorage () {
  chrome.storage.local.get(null, savedData => {
    if (Object.keys(savedData).length > 0 && savedData.ops[0].insert !== '\n') {
      const converter = new QuillDeltaToHtmlConverter(savedData.ops, {});
      const signature = converter.convert();
      copyToClipboard(signature);
      pasteSignature();
    } else {
      chrome.runtime.sendMessage({
        action: 'open_options_page'
      });
    }
  });
}

function copyToClipboard (text) {
  const dt = new clipboard.DT();
  dt.setData('text/html', text);
  clipboard.write(dt);
}

function pasteSignature () {
  const selectedElement = document.querySelector('.is-selected');
  selectedElement.focus();
  document.execCommand('paste');
}
