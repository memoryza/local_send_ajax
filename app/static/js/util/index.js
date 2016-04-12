
var hasOwnProperty = Object.prototype.hasOwnProperty;

var isType = (type) => {
    return (obj) => {
        return Object.prototype.toString.call(obj).replace(/\[object\s(.+?)\]/, '$1').toLowerCase() === type;
    };
};

var isObject = isType('object');

var stringifyQuery = (queryObject) => {

    if (!queryObject || !isObject(queryObject)) return '';

    var strArr = [];

    for (var key in queryObject) {
        if (hasOwnProperty.call(queryObject, key)) {
            strArr.push(key + '=' + encodeURIComponent(queryObject[key]));
        }
    }

    return strArr.join('&');

};

var isEmptyObject = (obj) => {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
};

var ajax = function(options, successCallback, failCallback) {
    var url = options.url,
        type = options.requestType,
        params = options.queryObject,
        requestId = options.requestId;

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (this.status === 200 || this.status === 304) {
            successCallback && successCallback(requestId, this.response);
        } else {
            failCallback && failCallback(requestId);
        }
    };

    xhr.onerror = function() {
        failCallback && failCallback(requestId);
    };

    xhr.responseType = 'json';
    xhr.open(type, url + (type === 'get' && !isEmptyObject(params) ? ('?' + stringifyQuery(params)) : ''), true);
    if (type === 'post') {
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    }
    xhr.send(type === 'post' ? stringifyQuery(params) : null);
};

exports.stringifyQuery = stringifyQuery;
exports.isEmptyObject = isEmptyObject;
exports.ajax = ajax;
