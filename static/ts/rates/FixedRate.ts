import {Rate} from "../interfaces/Rate";
import {Map} from "gulp-typescript/release/utils";
import {RateRange} from "./RateRange";
export class FixedRate extends Rate {

    private ranges: RateRange[];

    constructor() {
        super();

        this.ranges = [];
    }

    getRates(baseAmount: number, duration: number): Map<number> {
        let divider = 0;

        for (let i = 1; i <= duration; i++) {
            for (let j = 1; j <= i; j++) {
                divider += ( 1 / (1 + this.getRate(duration) * this.getAverageDaysInMonth()));
            }
        }

        const valueMap: { [key: string]: number; } = {};

        valueMap[Rate.BASE_RATE] = duration > 0 ? baseAmount / divider : 0;

        return valueMap;
    }

    public addRateRange(rateRange : RateRange) : void {
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
