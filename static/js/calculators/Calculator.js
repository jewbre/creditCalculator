///<reference path="../../typings/jquery.d.ts"/>
"use strict";
var Rate_1 = require("../interfaces/Rate");
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
            baseRateDisplay.text(calculatedValues[Rate_1.Rate.BASE_RATE]);
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
exports.Calculator = Calculator;
