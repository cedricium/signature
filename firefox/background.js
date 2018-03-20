// Open Options page upon addon installation
// (function () {
//   browser.runtime.openOptionsPage();
// })();

browser.runtime.onMessage.addListener(eventData => {
  switch (eventData.action) {
    case 'open_options_page':
      browser.runtime.openOptionsPage()
        .then(() => {
          // once settings page is open, notify settings script to
          // enable the warning notification
          setTimeout(() => {
            browser.runtime.sendMessage({
              action: 'enable_warning'
            });
          }, 1000);
        });
      break;
    default:
      break;
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});
