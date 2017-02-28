var CalculatorBuilder = (function () {
    function CalculatorBuilder() {
    }
    CalculatorBuilder.prototype.generate = function (type) {
        switch (type) {
            case 'housing':
                var dataSet = new Dictionary();
                dataSet.put('credit-amount', 250000);
                dataSet.put('number-of-months', 72);
                return new HousingCalculator(dataSet, new HousingRateFormula());
        }
        return null;
    };
    return CalculatorBuilder;
}());
