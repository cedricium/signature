const toolbarOptions = {
  container: [
    ['bold', 'italic'],
    [{'header': 1}, 'blockquote', 'code-block'],
    ['link', {'list': 'bullet'}, {'list': 'ordered'}]
  ],
  handlers: {'emoji': function () {}}
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

chrome.runtime.onMessage.addListener(eventData => {
  switch (eventData.action) {
    case 'enable_warning':
      showNotification(warningNotification);
      break;
    default:
      break;
  }
});

function loadSignatureFromStorage () {
  chrome.storage.local.get(null, savedData => {
    if (Object.keys(savedData).length > 0) {
      setSavedSignature(savedData);
    }
  });
}

function saveSignatureToStorage (contents) {
  const signature = contents;
  chrome.storage.local.set(signature, () => {
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
