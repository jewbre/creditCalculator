"use strict";
var RateRange = (function () {
    function RateRange(from, to, rate, administrationFee) {
        this.from = from;
        this.to = to;
        this._rate = rate;
        this._administrationFee = administrationFee;
    }
    Object.defineProperty(RateRange.prototype, "rate", {
        get: function () {
            return this._rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateRange.prototype, "administrationFee", {
        get: function () {
            return this._administrationFee;
        },
        enumerable: true,
        configurable: true
    });
    RateRange.prototype.isInRange = function (month) {
        return this.from <= month && month <= this.to;
    };
    return RateRange;
}());
exports.RateRange = RateRange;
