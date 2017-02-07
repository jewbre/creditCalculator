/// <reference path="../../typings/jquery.d.ts" />

class HousingCalculator extends Calculator<HousingRateFormula> {
    protected getListenerItems(): {selector: string; key: string}[] {
        return [
            {
                selector : '#prvi-slider',
                key : 'iznos-kredita'
            },
            {
                selector : '#broj-mjeseci',
                key : 'broj-mjeseci'
            },
        ];
    }

    protected displayResults(dictionary: Dictionary<number>): void {
        $('#result-1').text(dictionary.get('nks'));
        $('#result-2').text(dictionary.get('rata-kredita'));
    }

}