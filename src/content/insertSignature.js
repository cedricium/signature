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
  signatureBtn.classList.add('button', 'button--small', 'button--circle', 'button--dark', 'button--withChrome', 'u-baseColor--buttonDark', 'button--withIcon');
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
  browser.storage.local.get(null)
    .then(savedData => {
      if (Object.keys(savedData).length > 0) {
        const converter = new QuillDeltaToHtmlConverter(savedData.ops, {});
        const signature = converter.convert();
        const signatureElement = htmlToElement(signature);
        signatureElement.classList.add('graf', 'graf--p', 'graf-after--p', 'graf--trailing', 'is-selected');

        const selectedElemenet = document.querySelector('.is-selected');
        selectedElemenet.classList.remove('is-selected', 'graf--trailing');
        selectedElemenet.parentNode.insertBefore(signatureElement, selectedElemenet.nextSibling);
      }
    });
}

function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}