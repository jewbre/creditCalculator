/// <reference path="../typings/jquery.d.ts" />
setTimeout(function () {
    if (DataProvider.getInstance().hasCalculator) {
        var builder = new CalculatorBuilder();
        var calculator = builder.generate(DataProvider.getInstance().getCalculatorType());
    }
}, 1000);
