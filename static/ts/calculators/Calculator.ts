///<reference path="../../typings/jquery.d.ts"/>

import {Rate} from "../interfaces/Rate";
export class Calculator {

    public static readonly BASE_CALCULATOR = 'baseCalculator';
    public static readonly DEPOSITABLE_CALCULATOR = 'depositableCalculator';

    protected rate : Rate;
    protected baseAmount : number;
    protected duration : number;

    constructor(rate: Rate) {
        this.rate = rate;

        this.setListeners();
    }

    private setListeners() {
        $(this.getSliderSelection()).on('change', () => {
            this.setupData();
            this.doCalculations();
        });
    }

    private doCalculations() {
        const calculatedValues = this.rate.getRates(this.baseAmount, this.duration);
        const administrationFeeAmount = this.rate.getAdministrationFee(this.baseAmount, this.duration);
        // ...

        const baseAmountDisplay = $('#baseAmountDisplay');
        if(baseAmountDisplay.length > 0) {
            baseAmountDisplay.text(this.baseAmount);
        }
        const durationDisplay = $('#durationDisplay');
        if(durationDisplay.length > 0) {
            durationDisplay.text(this.duration);
        }
        const baseRateDisplay = $('#baseRateDisplay');
        if(baseRateDisplay.length > 0) {
            baseRateDisplay.text(calculatedValues[Rate.BASE_RATE]);
        }
        const administrationFee = $('#administrationFee');
        if(administrationFee.length > 0) {
            administrationFee.text(administrationFeeAmount);
        }

        // ..
    }


    protected getSliderSelection() {
        return '#baseAmountSlider,#durationSlider';
    }
    protected setupData() : void {
        this.baseAmount = parseInt($('#baseAmountSlider').val());
        this.duration = parseInt($('#durationSlider').val());
    }
}