
var hasOwnProperty = Object.prototype.hasOwnProperty;

var isType = function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj).replace(/\[object\s(.+?)\]/, '$1').toLowerCase() === type;
    };
};

var clone = function(obj) {
    if (!obj || !isObject(obj)) return null;

    var target = {};

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            target[key] = obj[key];
        }
    }
    return target;
};
var isObject = isType('object');

var extend = function(source, target) {

    if (!isObject(source) || !isObject(target)) return source;

    var t = clone(source);

    for (var key in target) {
        if (hasOwnProperty.call(target, key)) {
            t[key] = target[key];
        }
    }

    return t;

};
var trim = function(string) {
    return string.trim && string.trim() || string.replace(/^\s+|\s+$/g, '');
};
var parseQuery = function(queryString) {
        if (!queryString || !trim(queryString)) return {};

        var queryArray = queryString.split('&');

        var target = {};
        var q;

        for (var i = 0, len = queryArray.length; i < len; i++) {
            q = queryArray[i];
            q = q.split('=');
            target[q[0]] = decodeURIComponent(q[1]);
        }

        return target;
    };
var S4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

var guid = function() {
    return S4() + S4() + S4() + S4();
};  

var httpRequestCallbacks = {};

var sendParentRequest = function(options, type) {

    var requestId = guid();

    var defaults = {
        url: '',
        params: {},
        respType: 'json',
        cacheType: '',
        success: function() {},
        error: function() {}
    };

    var opts = extend(defaults, options);
    var urlArr = opts.url.split('?');
    var baseUrl = urlArr[0];
    var queryString = urlArr[1];

    var finalQueryObject = extend(parseQuery(queryString), opts.params);

    httpRequestCallbacks[requestId] = {};

    httpRequestCallbacks[requestId].onSuccess = opts.success;
    httpRequestCallbacks[requestId].onFail = opts.error;


    window.parent.postMessage({
        type: 'httpRequest',
        requestType: type,
        requestId: requestId,
        url: baseUrl,
        queryObject: finalQueryObject
    }, '*');
};
window.addEventListener('message', function(e) {
    var type = e.data.type;

    switch (type) {
        case 'execActionButtonCallback':
            var btnId = 'btn' + e.data.tag;
            actionButtonCallbacks[btnId] && actionButtonCallbacks[btnId]();
            break;
        case 'execHttpRequestCallback':
            if (e.data.status === 'success') {
                httpRequestCallbacks[e.data.requestId].onSuccess && httpRequestCallbacks[e.data.requestId].onSuccess(e.data.responseData);
            } else if (e.data.status === 'fail') {
                httpRequestCallbacks[e.data.requestId].onFail && httpRequestCallbacks[e.data.requestId].onFail();
            }
            break;
    }
}, false);

;(function($) {
    $.oldajax = $.ajax;
    $.ajax = function (options) {
        var method = options.type.toLowerCase();
        switch (method) {
            case 'get':
            case 'post':
                sendParentRequest(options, method);
                break;
            case 'jsonp':
                $.oldajax(options);
        }
    }

})(jQuery);