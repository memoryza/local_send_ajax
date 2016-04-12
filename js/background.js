
chrome.browserAction.onClicked.addListener(function(tab) {
    var simulatorPageUri = chrome.extension.getURL('../app/simulator.html');
    chrome.tabs.create({
        url: simulatorPageUri
    });
});