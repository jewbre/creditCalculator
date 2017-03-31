"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Calculator_1 = require("./Calculator");
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
}(Calculator_1.Calculator));
exports.DepositableCalculator = DepositableCalculator;
