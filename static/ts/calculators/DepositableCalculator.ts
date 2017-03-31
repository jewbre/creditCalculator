import {Calculator} from "./Calculator";
export class DepositableCalculator extends Calculator {

    protected getSliderSelection(): string {
        return `${super.getSliderSelection()},#depositSlider`;
    }

    protected setupData(): void {
        const depositPercent = ((100 - parseInt($('#depositSlider').val())) / 100);
        this.baseAmount = parseInt($('#baseAmountSlider').val()) * depositPercent;
        this.duration = parseInt($('#durationSlider').val());
    }
}