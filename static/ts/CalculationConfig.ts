import {RateType} from "./rates/RateType";
export interface CalculationConfig {
    calculatorType : string,
    rateType : RateType,
    ranges : {
        from : number,
        to : number,
        rate : number,
        administrationFee: number
    }[],
    timedDuration : number,
    timedRate : number,
    timedAdministrationFee : number,
}