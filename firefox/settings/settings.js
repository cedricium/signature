const editor = new Quill('#editor', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      [{'header': 1}, 'blockquote', 'code-block'],
      ['link', {'list': 'bullet'}, {'list': 'ordered'}]
    ]
  },
  placeholder: 'Compose your Medium signature...',
  theme: 'snow'
});

const saveBtn = document.querySelector('.button.save');
saveBtn.addEventListener('click', () => {
  const contents = editor.getContents(); // => returns a Quill Delta object
  saveSignatureToStorage(contents);
});

const clearBtn = document.querySelector('.button.clear');
clearBtn.addEventListener('click', () => {
  const editorLength = editor.getLength();
  editor.deleteText(0, editorLength, 'api');
});

// Notifications used for displaying info to the user to provide better UX
const warningNotification = document.querySelector('div.notification.warning');
const successNotification = document.querySelector('div.notification.success');

browser.runtime.onMessage.addListener(eventData => {
  switch (eventData.action) {
    case 'enable_warning':
      showNotification(warningNotification);
      break;
    default:
      break;
  }
});

function loadSignatureFromStorage () {
  browser.storage.local.get(null)
    .then(savedData => {
      if (Object.keys(savedData).length > 0) {
        setSavedSignature(savedData);
      }
    });
}

function saveSignatureToStorage (contents) {
  const signature = contents;
  browser.storage.local.set(signature)
    .then(() => {
      showNotification(successNotification);
    });
}

function setSavedSignature (signature) {
  editor.setContents(signature);
}

function showNotification (notification) {
  notification.classList.remove('is-hidden');
  setTimeout(() => {
    notification.classList.add('is-hidden');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  loadSignatureFromStorage();
});
