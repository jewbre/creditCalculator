var Dictionary = (function () {
    function Dictionary() {
        this.length = 0;
        this._map = new DictionaryMap();
    }
    Dictionary.prototype.put = function (key, value) {
        if (!this.hasKey(key)) {
            this.length++;
        }
        this.map[key] = value;
    };
    Dictionary.prototype.get = function (key) {
        if (this.hasKey(key)) {
            return this.map[key];
        }
        return null;
    };
    Dictionary.prototype.getKeys = function () {
        var output = [];
        for (var key in this._map) {
            if (this._map.hasOwnProperty(key)) {
                continue;
            }
            output.push(key);
        }
        return output;
    };
    Dictionary.prototype.remove = function (key) {
        if (this.hasKey(key)) {
            var value = this.map[key];
            delete this.map[key];
            this.length--;
            return value;
        }
        return null;
    };
    Dictionary.prototype.hasKey = function (key) {
        return typeof this.map[key] !== 'undefined';
    };
    Object.defineProperty(Dictionary.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    return Dictionary;
}());
var DictionaryMap = (function () {
    function DictionaryMap() {
    }
    return DictionaryMap;
}());
