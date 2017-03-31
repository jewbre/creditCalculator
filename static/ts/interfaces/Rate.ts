///<reference path="../../../node_modules/gulp-typescript/release/utils.d.ts"/>

import {Map} from "gulp-typescript/release/utils";
export abstract class Rate {

    public static readonly BASE_RATE = "baseRate";
    public static readonly TIMED_RATE = "timedRate";

    protected getAverageDaysInMonth() : number {
        return 30.42;
    }

    abstract getRates(baseAmount : number, duration : number) : Map<number>;

    abstract getAdministrationFee(baseAmount : number, duration : number): number;

}