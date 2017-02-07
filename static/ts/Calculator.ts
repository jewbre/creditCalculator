/// <reference path="../typings/jquery.d.ts" />

abstract class Calculator<F extends Formula<number, number>> {

    private dataSet : Dictionary<number>;
    private formula : Formula<number, number>;

    constructor(dataSet : Dictionary<number>, formula : F) {
        this.dataSet = dataSet;
        this.formula = formula;

        this.initListeners();
    }

    protected initListeners() : void {
        for( let item of this.getListenerItems() ) {
            this.setListener(item.selector, item.key);
        }
    }

    private setListener(selector: string, key: string) {
        let self = this;
        $(selector).on('change', function() {
            self.dataSet.put(key, parseInt($(this).val(), 10));
            self.recalculate();
        })
    }

    private recalculate() : void {
        this.displayResults(
            this.formula.calculateResults(
                this.dataSet
            )
        )
    }

    protected abstract getListenerItems() : { selector : string, key : string}[];
    protected abstract displayResults(dictionary : Dictionary<number>) : void;
}