/// <reference path="../../typings/jquery.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HousingCalculator = (function (_super) {
    __extends(HousingCalculator, _super);
    function HousingCalculator(dataSet, formula) {
        return _super.call(this, dataSet, formula) || this;
    }
    HousingCalculator.prototype.getListenerItems = function () {
        return [
            {
                selector: '#credit-amount',
                key: 'credit-amount'
            },
            {
                selector: '#number-of-months',
                key: 'number-of-months'
            },
        ];
    };
    HousingCalculator.prototype.displayResults = function (dictionary) {
        console.log(dictionary.get('rate'));
    };
    return HousingCalculator;
}(Calculator));
