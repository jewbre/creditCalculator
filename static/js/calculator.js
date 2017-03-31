"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var RateType;
(function (RateType) {
    RateType[RateType["FixedRate"] = 0] = "FixedRate";
    RateType[RateType["TimedFixedRate"] = 1] = "TimedFixedRate";
})(RateType || (RateType = {}));
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
            var multiply = 1;
            for (var j = 0; j < i; j++) {
                multiply *= (1 / (1 + this.getRate(duration) * this.getAverageDaysInMonth() / 360));
            }
            divider += multiply;
        }
        var valueMap = {};
        valueMap[Rate.BASE_RATE] = duration > 0 ? baseAmount / divider : 0;
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
}(Rate));
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
            var multiply = 1;
            for (var j = 0; j < i; j++) {
                multiply *= (1 / (1 + this.rate * this.getAverageDaysInMonth() / 360));
            }
            divider += multiply;
        }
        var valueMap = {};
        valueMap[Rate.TIMED_RATE] = duration > 0 ? baseAmount / divider : 0;
        valueMap[Rate.BASE_RATE] = this.additionalRate.getRates(baseAmount, Math.max(0, duration - this.time))[Rate.BASE_RATE];
        return valueMap;
    };
    TimedFixedRate.prototype.getAdministrationFee = function (baseAmount, duration) {
        return baseAmount * this.administrationFee;
    };
    return TimedFixedRate;
}(Rate));
var RateBuilder = (function () {
    function RateBuilder() {
    }
    RateBuilder.prototype.build = function (type, values, ranges) {
        switch (type) {
            case RateType.FixedRate:
                var fixedRate_1 = new FixedRate();
                ranges.every(function (rateRange, index, calleeArray) {
                    fixedRate_1.addRateRange(rateRange);
                    return true;
                });
                return fixedRate_1;
            case RateType.TimedFixedRate:
                return new TimedFixedRate(values[RateBuilder.TIMED_RATE], values[RateBuilder.TIMED_DURATION], values[RateBuilder.ADMINISTRATION_FEE], this.build(RateType.FixedRate, values, ranges));
        }
        throw new Error('Missing valid type.');
    };
    return RateBuilder;
}());
RateBuilder.TIMED_DURATION = "timedRate-time";
RateBuilder.TIMED_RATE = "timedRate-rate";
RateBuilder.ADMINISTRATION_FEE = "administrationFee";
var Calculator = (function () {
    function Calculator(rate) {
        this.rate = rate;
        this.setListeners();
    }
    Calculator.prototype.setListeners = function () {
        var _this = this;
        $(this.getSliderSelection()).on('change', function () {
            _this.setupData();
            _this.doCalculations();
        });
    };
    Calculator.prototype.doCalculations = function () {
        var calculatedValues = this.rate.getRates(this.baseAmount, this.duration);
        var administrationFeeAmount = this.rate.getAdministrationFee(this.baseAmount, this.duration);
        // ...
        var baseAmountDisplay = $('#baseAmountDisplay');
        if (baseAmountDisplay.length > 0) {
            baseAmountDisplay.text(this.baseAmount);
        }
        var durationDisplay = $('#durationDisplay');
        if (durationDisplay.length > 0) {
            durationDisplay.text(this.duration);
        }
        var baseRateDisplay = $('#baseRateDisplay');
        if (baseRateDisplay.length > 0) {
            baseRateDisplay.text(calculatedValues[Rate.BASE_RATE]);
        }
        var administrationFee = $('#administrationFee');
        if (administrationFee.length > 0) {
            administrationFee.text(administrationFeeAmount);
        }
        // ..
    };
    Calculator.prototype.getSliderSelection = function () {
        return '#baseAmountSlider,#durationSlider';
    };
    Calculator.prototype.setupData = function () {
        this.baseAmount = parseInt($('#baseAmountSlider').val());
        this.duration = parseInt($('#durationSlider').val());
    };
    return Calculator;
}());
Calculator.BASE_CALCULATOR = 'baseCalculator';
Calculator.DEPOSITABLE_CALCULATOR = 'depositableCalculator';
var DepositableCalculator = (function (_super) {
    __extends(DepositableCalculator, _super);
    function DepositableCalculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DepositableCalculator.prototype.getSliderSelection = function () {
        return _super.prototype.getSliderSelection.call(this) + ",#depositSlider";
    };
    DepositableCalculator.prototype.setupData = function () {
        var depositPercent = ((100 - parseInt($('#depositSlider').val())) / 100);
        this.baseAmount = parseInt($('#baseAmountSlider').val()) * depositPercent;
        this.duration = parseInt($('#durationSlider').val());
    };
    return DepositableCalculator;
}(Calculator));
var CalculatorBuilder = (function () {
    function CalculatorBuilder() {
    }
    CalculatorBuilder.prototype.build = function (config) {
        var rateBuilder = new RateBuilder();
        var rate = rateBuilder.build(config.rateType, (_a = {},
            _a[RateBuilder.TIMED_RATE] = config.timedRate,
            _a[RateBuilder.TIMED_DURATION] = config.timedDuration,
            _a[RateBuilder.ADMINISTRATION_FEE] = config.timedAdministrationFee,
            _a), config.ranges.map(function (item, index, arr) { return new RateRange(item.from, item.to, item.rate, item.administrationFee); }));
        switch (config.calculatorType) {
            case Calculator.BASE_CALCULATOR:
                return new Calculator(rate);
            case Calculator.DEPOSITABLE_CALCULATOR:
                return new DepositableCalculator(rate);
        }
        throw new Error('Invalid calculator type provided.');
        var _a;
    };
    return CalculatorBuilder;
}());
var CalculationInstantiator = (function () {
    function CalculationInstantiator() {
        var config = JSON.parse($('#calculatorConfig').text());
        var calculatorBuilder = new CalculatorBuilder();
        var calculator = calculatorBuilder.build(config);
    }
    return CalculationInstantiator;
}());
$(document).ready(function () {
    new CalculationInstantiator();
});
