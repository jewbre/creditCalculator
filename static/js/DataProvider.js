var calculatorData = calculatorData || {};
var DataProvider = (function () {
    function DataProvider() {
        // TODO: procitaj json s vrijednostima koji je ispucan na site
    }
    DataProvider.getInstance = function () {
        if (DataProvider.instance == null) {
            DataProvider.instance = new DataProvider();
        }
        return DataProvider.instance;
    };
    /**
     * Get nominal credit rate for n months from now (including current month) as a number.
     * @param monthsFromNow
     */
    DataProvider.prototype.getNCR = function (monthsFromNow) {
        // TODO:: fill with data
        return 0.1;
    };
    return DataProvider;
}());
DataProvider.instance = null;
