"use strict";
var Calculator_1 = require("./calculators/Calculator");
var RateBuilder_1 = require("./rates/RateBuilder");
var RateRange_1 = require("./rates/RateRange");
var DepositableCalculator_1 = require("./calculators/DepositableCalculator");
var CalculatorBuilder = (function () {
    function CalculatorBuilder() {
    }
    CalculatorBuilder.prototype.build = function (config) {
        var rateBuilder = new RateBuilder_1.RateBuilder();
        var rate = rateBuilder.build(config.rateType, (_a = {},
            _a[RateBuilder_1.RateBuilder.TIMED_RATE] = config.timedRate,
            _a[RateBuilder_1.RateBuilder.TIMED_DURATION] = config.timedDuration,
            _a[RateBuilder_1.RateBuilder.ADMINISTRATION_FEE] = config.timedAdministrationFee,
            _a), config.ranges.map(function (item, index, arr) { return new RateRange_1.RateRange(item.from, item.to, item.rate, item.administrationFee); }));
        switch (config.calculatorType) {
            case Calculator_1.Calculator.BASE_CALCULATOR:
                return new Calculator_1.Calculator(rate);
            case Calculator_1.Calculator.DEPOSITABLE_CALCULATOR:
                return new DepositableCalculator_1.DepositableCalculator(rate);
        }
        throw new Error('Invalid calculator type provided.');
        var _a;
    };
    return CalculatorBuilder;
}());
exports.CalculatorBuilder = CalculatorBuilder;
