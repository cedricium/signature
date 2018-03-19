const toolbarOptions = {
  container: [
    ['bold', 'italic'],
    [{'header': 1}, 'blockquote', 'code-block'],
    ['link', {'list': 'bullet'}, {'list': 'ordered'}],
  ],
  handlers: {'emoji': function() {}}
};

const editor = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions,
    toolbar_emoji: true,
    short_name_emoji: true
  },
  placeholder: 'Compose your Medium signature...',
  theme: 'snow'
});

const saveBtn = document.querySelector('.button.save');
saveBtn.addEventListener('click', () => {
  const contents = editor.getContents();  // => returns a Quill Delta object
  saveSignatureToStorage(contents);
});

const clearBtn = document.querySelector('.button.clear');
clearBtn.addEventListener('click', () => {
  const editorLength = editor.getLength();
  editor.deleteText(0, editorLength, 'api');
});

const hideNotificationBtn = document.querySelector('button.delete');
const notification = hideNotificationBtn.parentElement;
hideNotificationBtn.addEventListener('click', () => {
  notification.classList.add('is-hidden');
});

// browser.runtime.onMessage.addListener(eventData => {
//   switch (eventData.action) {
//     case 'enable_warning':
//       notification.classList.remove('is-hidden');
//       break;
//     default:
//       break;
//   }
// });

function loadSignatureFromStorage() {
  chrome.storage.local.get(null, savedData => {
    if (Object.keys(savedData).length > 0) {
      setSavedSignature(savedData);
    }
  });
}

function saveSignatureToStorage(contents) {
  const signature = contents;
  chrome.storage.local.set(signature, function () { console.log('signature saved!'); });
}

function setSavedSignature(signature) {
  editor.setContents(signature);
}

document.addEventListener('DOMContentLoaded', () => {
  loadSignatureFromStorage();
});