/// <reference path="../../typings/jquery.d.ts" />

class HousingCalculator extends Calculator<HousingRateFormula> {

    constructor(dataSet: Dictionary<number>, formula: HousingRateFormula) {
        super(dataSet, formula);
    }

    protected getListenerItems(): {selector: string; key: string}[] {
        return [
            {
                selector : '#credit-amount',
                key : 'credit-amount'
            },
            {
                selector : '#number-of-months',
                key : 'number-of-months'
            },
        ];
    }

    protected displayResults(dictionary: Dictionary<number>): void {
        console.log(dictionary.get('rate'));
    }

}