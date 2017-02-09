
class HousingRateFormula extends BaseCreditFormula {
    protected getInterestRate(): number {
        return 0.1;
    }

    calculateResults(input: Dictionary<number>): Dictionary<number> {
        let output = new Dictionary<number>();

        output.put('rate', this.getCreditRate(input.get('credit-amount'), input.get('number-of-months')));
        return output;
    }

}