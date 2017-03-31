
import {CalculationConfig} from "./CalculationConfig";
import {Calculator} from "./calculators/Calculator";
import {RateBuilder} from "./rates/RateBuilder";
import {RateRange} from "./rates/RateRange";
import {DepositableCalculator} from "./calculators/DepositableCalculator";
export class CalculatorBuilder {

    public build(config : CalculationConfig) : Calculator {

        const rateBuilder = new RateBuilder();
        const rate = rateBuilder.build(
            config.rateType,
            {
                [RateBuilder.TIMED_RATE] : config.timedRate,
                [RateBuilder.TIMED_DURATION] : config.timedDuration,
                [RateBuilder.ADMINISTRATION_FEE] : config.timedAdministrationFee,
            },
            config.ranges.map((item, index, arr)=> new RateRange(item.from, item.to, item.rate, item.administrationFee))
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