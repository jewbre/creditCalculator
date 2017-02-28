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
            {
                selector: '#credit-amount-mobile',
                key: 'credit-amount'
            },
            {
                selector: '#number-of-months-mobile',
                key: 'number-of-months'
            },
        ];
    };
    HousingCalculator.prototype.displayResults = function (dictionary) {
        console.log(dictionary.get('rate'));
        var creditAmountValue = $('#credit-amount').val();
        var creditamountFeeOutput = $('#creditamountFeeOutput');
        creditamountFeeOutput.text(creditAmountValue);
        var numberOfMonthsValue = $('#number-of-months').val();
        var numberOfMonthsFeeOutput = $('#numberOfMonthsFeeOutput');
        numberOfMonthsFeeOutput.text(numberOfMonthsValue);
        var administrationFeeOutput = $('#administrationFee');
        administrationFeeOutput.text((dictionary.get('administration-fee') * 100).toFixed(2) + "%");
        var administrationFeeCountOutput = $('#administrationFeeCount');
        administrationFeeCountOutput.text(creditAmountValue * dictionary.get('administration-fee'));
        var nksOutput = $('#nks');
        nksOutput.text((dictionary.get('nks') * 100).toFixed(2) + "%");
        var rateFeeOutput = $('#rate');
        rateFeeOutput.text(Math.ceil(dictionary.get('rate')));
        ;
        // if(administrationFeeOutput.length > 0) {
        //   administrationFeeOutput.text(dictionary.get('rate'));
        // }
        //let administrationFeeOutput = $('#nekomid');
        //if(administrationFeeOutput.length > 0) {
        //   administrationFeeOutput.text(dictionary.get('rate'));
        //}
    };
    return HousingCalculator;
}(Calculator));
