
import {Rate} from "../interfaces/Rate";
import {Map} from "gulp-typescript/release/utils";
export class TimedFixedRate extends Rate {

    private time : number;
    private rate : number;
    private administrationFee : number;
    private additionalRate : Rate;


    constructor(time: number, rate: number, administrationFee: number, additionalRate: Rate) {
        super();
        this.time = time;
        this.rate = rate;
        this.administrationFee = administrationFee;
        this.additionalRate = additionalRate;
    }

    getRates(baseAmount: number, duration: number): Map<number> {
        let divider = 0;

        for(let i = 1; i <= duration; i++) {
            for(let j = 1; j <= i; j++) {
                divider += ( 1/ (1 + this.rate * this.getAverageDaysInMonth()));
            }
        }

        const valueMap : { [key:string]:number; } = {};

        valueMap[Rate.TIMED_RATE] = duration > 0 ? baseAmount / divider : 0;
        valueMap[Rate.BASE_RATE] = this.additionalRate.getRates(baseAmount, Math.max(0, duration - this.time))[Rate.BASE_RATE];

        return valueMap;
    }

    getAdministrationFee(baseAmount: number, duration: number): number {
        return baseAmount * this.administrationFee;
    }

}