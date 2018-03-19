// Open Options page upon addon installation
// (function () {
//   browser.runtime.openOptionsPage();
// })();

chrome.runtime.onMessage.addListener(eventData => {
  switch (eventData.action) {
    case 'open_options_page':
      chrome.runtime.openOptionsPage(() => {
        // once settings page is open, notify settings script to
        // enable the warning notification
        setTimeout(() => {
          chrome.runtime.sendMessage({
            action: 'enable_warning'
          });
        }, 1000);
      });
      break;
    default:
      break;
  }
});