
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

    /**
     * Calculates credit rate base on the following formula:
     *                  K
     * ---------------------------------------
     *                                1
     *  Sum(i=1..nbe) Prod(j=1..i) --------
     *                              1 + Tj
     *
     *  Where :
     *  K = Base debt
     *  nbe = number of rates
     *  Tj = global rate that is calculated by following formula:
     *
     *  Ti = ti * Ni / 360
     *  where:
     *      ti = nominal credit rate at current year
     *      Ni = real number of days in month
     *
     * @param dept
     * @param months
     * @returns {number}
     */
    public getCreditRate(dept : number, months : number) : number{
        let divider = 0;

        for(let i = 1; i <= months; i++) {
            for(let j = 1; j <= i; j++) {
                divider += ( 1/ (1 + DataProvider.getInstance().getNCR(j) * this.getDaysInMonth(j) / 360 ));
            }
        }

        return dept / divider;
    }

    protected getDaysInMonth(monthsFromNow : number) : number {
        let date = new Date();
        date.setMonth(date.getMonth() + 1 + monthsFromNow);
        date.setDate(0);

        return date.getDate();
    }
}