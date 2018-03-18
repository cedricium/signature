const editor = new Quill('#editor', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      [{'header': 1}, 'blockquote', 'code-block'],
      ['link', {'list': 'bullet'}, {'list': 'ordered'}],
    ]
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

function loadSignatureFromStorage() {
  browser.storage.local.get(null)
    .then(savedData => {
      if (Object.keys(savedData).length > 0) {
        setSavedSignature(savedData);
      }
    });
}

function saveSignatureToStorage(contents) {
  const signature = contents;
  browser.storage.local.set(signature);
}

function setSavedSignature(signature) {
  editor.setContents(signature);
}

document.addEventListener('DOMContentLoaded', () => {
  loadSignatureFromStorage();
});