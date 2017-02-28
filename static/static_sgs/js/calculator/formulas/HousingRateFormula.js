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
        // izracunaj_mesecnu_ratu(iznos_kredita, broj_meseci)
        output.put('rate', this.getCreditRate(input.get('credit-amount'), input.get('number-of-months')));
        // iznos_kredita
        output.put('credit-amount', input.get('credit-amount'));
        //vraca nominalnu kamatnu stopu da prosledjen broj meseci
        output.put('nks', DataProvider.getInstance().getNCR(input.get('number-of-months')));
        //vraca administrativni trosak
        output.put('administration-fee', DataProvider.getInstance().getAdministrationFee());
        return output;
    };
    return HousingRateFormula;
}(BaseCreditFormula));
