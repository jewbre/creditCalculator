"use strict";
var CalculatorBuilder_1 = require("./CalculatorBuilder");
var CalculationInstantiator = (function () {
    function CalculationInstantiator() {
        var config = JSON.parse($('#calculatorConfig').text());
        var calculatorBuilder = new CalculatorBuilder_1.CalculatorBuilder();
        var calculator = calculatorBuilder.build(config);
    }
    return CalculationInstantiator;
}());
$(document).ready(function () {
    new CalculationInstantiator();
});
