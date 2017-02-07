
abstract class BaseCreditFormula extends Formula<number, number> {

    /**
     * Returns interest rate in double value (not percentage):
     * - 0.1 instead of 10%
     */
    protected abstract getInterestRate() : number;

    /**
     * Calculates value of the following formula:
     *
     *              T
     * K * ------------------
     *              1
     *      1 - -----------
     *          (1 + T)^nbm
     *
     * where K is rest of the debt, T is global rate and nbm is number of months.
     *
     * @param debt
     * @param numberOfMonth
     * @returns {number}
     */
    public getRateAmount(debt : number, numberOfMonth : number) : number {
        let gr = this.getGlobalRate();
        return debt *
            ( gr / (1 - 1 / (Math.pow( 1 + gr, numberOfMonth))) );
    }


    /**
     * Calculates value of the following formula:
     *
     *    ks * avgDM
     *  -------------
     *    360 * 100
     *
     *  where ks if interest rate (i.e., 6m EURIBOR + some marginal value ) and avgDM is approximation of
     *  days in month that is used here.
     *
     * @returns {number}
     */
    public getGlobalRate() : number {
        return (this.getInterestRate() * this.getAverageDaysInMonth() ) /
            (360 * 100);
    }

    protected getAverageDaysInMonth() : number {
        return 30.42;
    }
}