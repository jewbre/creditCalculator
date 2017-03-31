
export class RateRange {
    private from : number;
    private to: number;
    private _rate : number;
    private _administrationFee : number;


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

    public isInRange(month : number) : boolean{
        return this.from <= month && month <= this.to;
    }
}