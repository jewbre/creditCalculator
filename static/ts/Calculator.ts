import {Map} from "gulp-typescript/release/utils";

abstract class Rate {

    public static readonly BASE_RATE = "baseRate";
    public static readonly TIMED_RATE = "timedRate";

    protected getAverageDaysInMonth(): number {
        return 30.42;
    }

    abstract getRates(baseAmount: number, duration: number): Map<number>;

    abstract getAdministrationFee(baseAmount: number, duration: number): number;

}

enum RateType {
    FixedRate, TimedFixedRate
}

class RateRange {
    private from: number;
    private to: number;
    private _rate: number;
    private _administrationFee: number;


    constructor(from: number, to: number, rate: number, administrationFee: number) {
        this.from = from;
        this.to = to;
        this._rate = rate;
        this._administrationFee = administrationFee;
    }


    get rate(): number {
        return this._rate;
    }

    get administrationFee(): number {
        return this._administrationFee;
    }

    public isInRange(month: number): boolean {
        return this.from <= month && month <= this.to;
    }
}

class FixedRate extends Rate {

    private ranges: RateRange[];

    constructor() {
        super();

        this.ranges = [];
    }

    getRates(baseAmount: number, duration: number): Map<number> {
        let divider = 0;

        for (let i = 1; i <= duration; i++) {
            let multiply = 1;
            for (let j = 0; j < i; j++) {
                multiply *= ( 1 / (1 + this.getRate(duration) * this.getAverageDaysInMonth() / 360));
            }
            divider += multiply;
        }

        const valueMap: { [key: string]: number; } = {};

        valueMap[Rate.BASE_RATE] = duration > 0 ? baseAmount / divider : 0;

        return valueMap;
    }

    public addRateRange(rateRange: RateRange): void {
        this.ranges.push(rateRange);
    }

    private getRate(duration: number): number {
        return this.ranges
            .filter((item: RateRange) => item.isInRange(duration))[0].rate;
    }

    getAdministrationFee(baseAmount: number, duration: number): number {
        return this.ranges
                .filter((item: RateRange) => item.isInRange(duration))[0].administrationFee * baseAmount;
    }

}

class TimedFixedRate extends Rate {

    private time: number;
    private rate: number;
    private administrationFee: number;
    private additionalRate: Rate;


    constructor(time: number, rate: number, administrationFee: number, additionalRate: Rate) {
        super();
        this.time = time;
        this.rate = rate;
        this.administrationFee = administrationFee;
        this.additionalRate = additionalRate;
    }

    getRates(baseAmount: number, duration: number): Map<number> {
        let divider = 0;

        for (let i = 1; i <= duration; i++) {
            let multiply = 1;
            for (let j = 0; j < i; j++) {
                multiply *= ( 1 / (1 + this.rate * this.getAverageDaysInMonth() / 360));
            }
            divider += multiply;
        }

        const valueMap: { [key: string]: number; } = {};

        valueMap[Rate.TIMED_RATE] = duration > 0 ? baseAmount / divider : 0;
        valueMap[Rate.BASE_RATE] = this.additionalRate.getRates(baseAmount, Math.max(0, duration - this.time))[Rate.BASE_RATE];

        return valueMap;
    }

    getAdministrationFee(baseAmount: number, duration: number): number {
        return baseAmount * this.administrationFee;
    }

}

class RateBuilder {

    public static readonly TIMED_DURATION = "timedRate-time";
    public static readonly TIMED_RATE = "timedRate-rate";
    public static readonly ADMINISTRATION_FEE = "administrationFee";

    public build(type: RateType, values: Map<number>, ranges: RateRange[]): Rate {
        switch (type) {

            case RateType.FixedRate :
                const fixedRate = new FixedRate();
                ranges.every((rateRange: RateRange, index: number, calleeArray: RateRange[]) => {
                    fixedRate.addRateRange(rateRange);
                    return true;
                });
                return fixedRate;

            case RateType.TimedFixedRate :
                return new TimedFixedRate(
                    values[RateBuilder.TIMED_RATE],
                    values[RateBuilder.TIMED_DURATION],
                    values[RateBuilder.ADMINISTRATION_FEE],
                    this.build(RateType.FixedRate, values, ranges)
                );
        }

        throw new Error('Missing valid type.');
    }
}

class Calculator {

    public static readonly BASE_CALCULATOR = 'baseCalculator';
    public static readonly DEPOSITABLE_CALCULATOR = 'depositableCalculator';

    protected rate: Rate;
    protected baseAmount: number;
    protected duration: number;

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
        if (baseAmountDisplay.length > 0) {
            baseAmountDisplay.text(this.baseAmount);
        }
        const durationDisplay = $('#durationDisplay');
        if (durationDisplay.length > 0) {
            durationDisplay.text(this.duration);
        }
        const baseRateDisplay = $('#baseRateDisplay');
        if (baseRateDisplay.length > 0) {
            baseRateDisplay.text(calculatedValues[Rate.BASE_RATE]);
        }
        const administrationFee = $('#administrationFee');
        if (administrationFee.length > 0) {
            administrationFee.text(administrationFeeAmount);
        }

        // ..
    }


    protected getSliderSelection() {
        return '#baseAmountSlider,#durationSlider';
    }

    protected setupData(): void {
        this.baseAmount = parseInt($('#baseAmountSlider').val());
        this.duration = parseInt($('#durationSlider').val());
    }
}


class DepositableCalculator extends Calculator {

    protected getSliderSelection(): string {
        return `${super.getSliderSelection()},#depositSlider`;
    }

    protected setupData(): void {
        const depositPercent = ((100 - parseInt($('#depositSlider').val())) / 100);
        this.baseAmount = parseInt($('#baseAmountSlider').val()) * depositPercent;
        this.duration = parseInt($('#durationSlider').val());
    }
}


interface CalculationConfig {
    calculatorType: string,
    rateType: RateType,
    ranges: {
        from: number,
        to: number,
        rate: number,
        administrationFee: number
    }[],
    timedDuration: number,
    timedRate: number,
    timedAdministrationFee: number,
}


class CalculatorBuilder {

    public build(config: CalculationConfig): Calculator {

        const rateBuilder = new RateBuilder();
        const rate = rateBuilder.build(
            config.rateType,
            {
                [RateBuilder.TIMED_RATE]: config.timedRate,
                [RateBuilder.TIMED_DURATION]: config.timedDuration,
                [RateBuilder.ADMINISTRATION_FEE]: config.timedAdministrationFee,
            },
            config.ranges.map((item, index, arr) => new RateRange(item.from, item.to, item.rate, item.administrationFee))
        );

        switch (config.calculatorType) {
            case Calculator.BASE_CALCULATOR :
                return new Calculator(rate);
            case Calculator.DEPOSITABLE_CALCULATOR :
                return new DepositableCalculator(rate);
        }

        throw new Error('Invalid calculator type provided.');
    }
}

class CalculationInstantiator {

    constructor() {
        const config: CalculationConfig = JSON.parse($('#calculatorConfig').text());

        const calculatorBuilder = new CalculatorBuilder();
        const calculator = calculatorBuilder.build(config);
    }
}

$(document).ready(() => {
    new CalculationInstantiator();
    console.log('nesto drugo');
});
