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
    return BaseCreditFormula;
}(Formula));
