///<reference path="../../../node_modules/gulp-typescript/release/utils.d.ts"/>
"use strict";
var Rate = (function () {
    function Rate() {
    }
    Rate.prototype.getAverageDaysInMonth = function () {
        return 30.42;
    };
    return Rate;
}());
Rate.BASE_RATE = "baseRate";
Rate.TIMED_RATE = "timedRate";
exports.Rate = Rate;
