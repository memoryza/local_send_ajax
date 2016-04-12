var bnjsUri = chrome.extension.getURL('js/http.js?time=' + (+new Date()));

if (window.location.search.indexOf('bnjs_simulator') > -1) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.src = bnjsUri;

    document.head.appendChild(script);
}