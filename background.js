chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openTab") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("popup.html")
    });
  }
});