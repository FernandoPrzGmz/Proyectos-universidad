$(document).ready(function () {
    Array.prototype.contains = function (obj) {
        return this.indexOf(obj) > -1;
    };
    var t = require('json-tokenizer');
    modules.json.init(t());
});