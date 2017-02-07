
class HousingRateFormula extends BaseCreditFormula {
    protected getInterestRate(): number {
        return 0.1;
    }

    calculateResults(input: Dictionary<number>): Dictionary<number> {
        let output = new Dictionary<number>();

        // TODO: izracunaj gluposti

        output.put('iznos-rate', 1000);
        return output;
    }

}