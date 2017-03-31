"use strict";
var RateType_1 = require("./RateType");
var FixedRate_1 = require("./FixedRate");
var TimedFixedRate_1 = require("./TimedFixedRate");
var RateBuilder = (function () {
    function RateBuilder() {
    }
    RateBuilder.prototype.build = function (type, values, ranges) {
        switch (type) {
            case RateType_1.RateType.FixedRate:
                var fixedRate_1 = new FixedRate_1.FixedRate();
                ranges.every(function (rateRange, index, calleeArray) {
                    fixedRate_1.addRateRange(rateRange);
                    return true;
                });
                return fixedRate_1;
            case RateType_1.RateType.TimedFixedRate:
                return new TimedFixedRate_1.TimedFixedRate(values[RateBuilder.TIMED_RATE], values[RateBuilder.TIMED_DURATION], values[RateBuilder.ADMINISTRATION_FEE], this.build(RateType_1.RateType.FixedRate, values, ranges));
        }
        throw new Error('Missing valid type.');
    };
    return RateBuilder;
}());
RateBuilder.TIMED_DURATION = "timedRate-time";
RateBuilder.TIMED_RATE = "timedRate-rate";
RateBuilder.ADMINISTRATION_FEE = "administrationFee";
exports.RateBuilder = RateBuilder;
