var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HousingRateFormula = (function (_super) {
    __extends(HousingRateFormula, _super);
    function HousingRateFormula() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HousingRateFormula.prototype.getInterestRate = function () {
        return 0.1;
    };
    HousingRateFormula.prototype.calculateResults = function (input) {
        var output = new Dictionary();
        // TODO: izracunaj gluposti
        output.put('iznos-rate', 1000);
        return output;
    };
    return HousingRateFormula;
}(BaseCreditFormula));
