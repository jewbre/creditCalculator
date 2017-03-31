"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rate_1 = require("../interfaces/Rate");
var FixedRate = (function (_super) {
    __extends(FixedRate, _super);
    function FixedRate() {
        var _this = _super.call(this) || this;
        _this.ranges = [];
        return _this;
    }
    FixedRate.prototype.getRates = function (baseAmount, duration) {
        var divider = 0;
        for (var i = 1; i <= duration; i++) {
            for (var j = 1; j <= i; j++) {
                divider += (1 / (1 + this.getRate(duration) * this.getAverageDaysInMonth()));
            }
        }
        var valueMap = {};
        valueMap[Rate_1.Rate.BASE_RATE] = duration > 0 ? baseAmount / divider : 0;
        return valueMap;
    };
    FixedRate.prototype.addRateRange = function (rateRange) {
        this.ranges.push(rateRange);
    };
    FixedRate.prototype.getRate = function (duration) {
        return this.ranges
            .filter(function (item) { return item.isInRange(duration); })[0].rate;
    };
    FixedRate.prototype.getAdministrationFee = function (baseAmount, duration) {
        return this.ranges
            .filter(function (item) { return item.isInRange(duration); })[0].administrationFee * baseAmount;
    };
    return FixedRate;
}(Rate_1.Rate));
exports.FixedRate = FixedRate;
