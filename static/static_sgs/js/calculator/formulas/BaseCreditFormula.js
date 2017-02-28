var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseCreditFormula = (function (_super) {
    __extends(BaseCreditFormula, _super);
    function BaseCreditFormula() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    BaseCreditFormula.prototype.getRateAmount = function (debt, numberOfMonth) {
        var gr = this.getGlobalRate();
        return debt *
            (gr / (1 - 1 / (Math.pow(1 + gr, numberOfMonth))));
    };
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
    BaseCreditFormula.prototype.getGlobalRate = function () {
        return (this.getInterestRate() * this.getAverageDaysInMonth()) /
            (360 * 100);
    };
    BaseCreditFormula.prototype.getAverageDaysInMonth = function () {
        return 30.42;
    };
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
    BaseCreditFormula.prototype.getCreditRate = function (dept, months) {
        var divider = 0;
        for (var i = 1; i <= months; i++) {
            var multiply = 1;
            for (var j = 0; j < i; j++) {
                // multiply *= ( 1/ (1 + DataProvider.getInstance().getNCR(j) * this.getDaysInMonth(j) / 360 ));
                multiply *= (1 / (1 + DataProvider.getInstance().getNCR(j) * this.getAverageDaysInMonth() / 360));
            }
            divider += multiply;
        }
        return dept / divider;
    };
    //trenutno ovo ne koristimo jer koristimo getAverageDaysInMonth()
    BaseCreditFormula.prototype.getDaysInMonth = function (monthsFromNow) {
        // let date = new Date("2016-12-15");
        var date = new Date();
        date.setMonth(date.getMonth() + 1 + monthsFromNow);
        date.setDate(0);
        return date.getDate();
    };
    return BaseCreditFormula;
}(Formula));
