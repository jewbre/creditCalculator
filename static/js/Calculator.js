/// <reference path="../typings/jquery.d.ts" />
var Calculator = (function () {
    function Calculator(dataSet, formula) {
        this.dataSet = dataSet;
        this.formula = formula;
        this.initListeners();
    }
    Calculator.prototype.initListeners = function () {
        for (var _i = 0, _a = this.getListenerItems(); _i < _a.length; _i++) {
            var item = _a[_i];
            this.setListener(item.selector, item.key);
        }
    };
    Calculator.prototype.setListener = function (selector, key) {
        var self = this;
        $(selector).on('change', function () {
            self.dataSet.put(key, parseInt($(this).val(), 10));
            self.recalculate();
        });
    };
    Calculator.prototype.recalculate = function () {
        this.displayResults(this.formula.calculateResults(this.dataSet));
    };
    return Calculator;
}());
