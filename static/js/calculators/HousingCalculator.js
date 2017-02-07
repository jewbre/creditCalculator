/// <reference path="../../typings/jquery.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HousingCalculator = (function (_super) {
    __extends(HousingCalculator, _super);
    function HousingCalculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HousingCalculator.prototype.getListenerItems = function () {
        return [
            {
                selector: '#prvi-slider',
                key: 'iznos-kredita'
            },
            {
                selector: '#broj-mjeseci',
                key: 'broj-mjeseci'
            },
        ];
    };
    HousingCalculator.prototype.displayResults = function (dictionary) {
        $('#result-1').text(dictionary.get('nks'));
        $('#result-2').text(dictionary.get('rata-kredita'));
    };
    return HousingCalculator;
}(Calculator));
