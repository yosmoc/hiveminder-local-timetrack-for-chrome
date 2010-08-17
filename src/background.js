var hiveminder_url = 'http://hiveminder.com/';

function isHiveminderUrl(url) {
    if (url.indexOf(hiveminder_url) != 0) {
        return false;
    } else {
        return true;
    }
}

function goToHiveminder() {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isHiveminderUrl(tab.url)) {
        chrome.tabs.update(tab.id, {selected: true});
        return;
      }
    }
    chrome.tabs.create({url: hiveminder_url});
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  goToHiveminder();
});