var bnjsUri = chrome.extension.getURL('js/http.js?time=' + (+new Date()));

var script = document.createElement('script');
script.type = 'text/javascript';

script.src = bnjsUri;

document.head.appendChild(script);
