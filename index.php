<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ceci's calculator</title>
</head>
<body>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="static/js/Dictionary.js"></script>
<script src="static/js/DataProvider.js"></script>
<script src="static/js/Formula.js"></script>
<script src="static/js/formulas/BaseCreditFormula.js"></script>
<script src="static/js/formulas/HousingRateFormula.js"></script>
<script src="static/js/Calculator.js"></script>
<script src="static/js/calculators/HousingCalculator.js"></script>
<script src="static/js/calculator-main.js"></script>


Iznos kredita: <input type="range" id="credit-amount" min="50000" max="1500000" onchange="document.getElementById('kredit').textContent = this.value"/> <span id="kredit"></span> <br>
Rok otplate: <input type="range" id="number-of-months" min="60" max="300" onchange="document.getElementById('rok').textContent = this.value"/> <span id="rok"></span> <br>

</body>
</html>