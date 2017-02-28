/// <reference path="../typings/jquery.d.ts" />
var DataProvider = (function () {
    function DataProvider() {
        this.data = null;
        this._hasCalculator = false;
        var rawData = $("#calculator-data");
        if (rawData.length > 0) {
            this.data = JSON.parse(rawData.html());
            this._hasCalculator = true;
        }
        console.log(this);
    }
    DataProvider.getInstance = function () {
        if (DataProvider.instance == null) {
            DataProvider.instance = new DataProvider();
        }
        return DataProvider.instance;
    };
    Object.defineProperty(DataProvider.prototype, "hasCalculator", {
        get: function () {
            return this._hasCalculator;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get nominal credit rate for n months from now (including current month) as a number.
     * @param monthsFromNow
     */
    // ovde se moze napraviti if petlja ako je vece od 12 meseci da vrati tu i tu kamatnu stopu
    DataProvider.prototype.getNCR = function (monthsFromNow) {
        return 0.1295;
    };
    DataProvider.prototype.getCalculatorType = function () {
        return "housing";
    };
    DataProvider.prototype.getCalculatorSubType = function () {
        return "sfd";
    };
    DataProvider.prototype.getAdministrationFee = function () {
        return 0.0295;
    };
    return DataProvider;
}());
DataProvider.instance = null;
