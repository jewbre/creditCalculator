
import {CalculationConfig} from "./CalculationConfig";
import {CalculatorBuilder} from "./CalculatorBuilder";

class CalculationInstantiator {

    constructor() {
        const config : CalculationConfig = JSON.parse($('#calculatorConfig').text());

        const calculatorBuilder = new CalculatorBuilder();
        const calculator = calculatorBuilder.build(config);
    }
}

$(document).ready(()=> {
    new CalculationInstantiator();
});