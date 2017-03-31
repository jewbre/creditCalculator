"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rate_1 = require("../interfaces/Rate");
var TimedFixedRate = (function (_super) {
    __extends(TimedFixedRate, _super);
    function TimedFixedRate(time, rate, administrationFee, additionalRate) {
        var _this = _super.call(this) || this;
        _this.time = time;
        _this.rate = rate;
        _this.administrationFee = administrationFee;
        _this.additionalRate = additionalRate;
        return _this;
    }
    TimedFixedRate.prototype.getRates = function (baseAmount, duration) {
        var divider = 0;
        for (var i = 1; i <= duration; i++) {
            for (var j = 1; j <= i; j++) {
                divider += (1 / (1 + this.rate * this.getAverageDaysInMonth()));
            }
        }
        var valueMap = {};
        valueMap[Rate_1.Rate.TIMED_RATE] = duration > 0 ? baseAmount / divider : 0;
        valueMap[Rate_1.Rate.BASE_RATE] = this.additionalRate.getRates(baseAmount, Math.max(0, duration - this.time))[Rate_1.Rate.BASE_RATE];
        return valueMap;
    };
    TimedFixedRate.prototype.getAdministrationFee = function (baseAmount, duration) {
        return baseAmount * this.administrationFee;
    };
    return TimedFixedRate;
}(Rate_1.Rate));
exports.TimedFixedRate = TimedFixedRate;
