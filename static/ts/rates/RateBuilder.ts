import {RateType} from "./RateType";
import {Map} from "gulp-typescript/release/utils";
import {Rate} from "../interfaces/Rate";
import {FixedRate} from "./FixedRate";
import {TimedFixedRate} from "./TimedFixedRate";
import {RateRange} from "./RateRange";

export class RateBuilder {

    public static readonly TIMED_DURATION = "timedRate-time";
    public static readonly TIMED_RATE = "timedRate-rate";
    public static readonly ADMINISTRATION_FEE = "administrationFee";

    public build(type: RateType, values: Map<number>, ranges : RateRange[]): Rate {
        switch (type) {

            case RateType.FixedRate :
                const fixedRate =  new FixedRate();
                ranges.every((rateRange : RateRange, index : number, calleeArray : RateRange[]) => {
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