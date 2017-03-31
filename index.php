<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ceci's calculator</title>
</head>
<body>
<script id="calculatorConfig" type="application/json">
    {
        "calculatorType" : "baseCalculator",
        "rateType" : 0,
        "ranges" : [{
            "from": 6,
            "to": 72,
            "rate": 0.1295,
            "administrationFee": 0.0295
        }],
        "timedDuration" : 36,
        "timedRate" : 0.05,
        "timedAdministrationFee" : 0.01
    }
</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="static/js/calculator.js"></script>


Iznos kredita:
<input type="range" id="baseAmountSlider" min="50000" max="200000"/>
<span id="baseAmountDisplay"></span> <br>

Rok otplate:
<input type="range" id="durationSlider" min="6" max="72"/>
<span id="durationDisplay"></span> <br>

Rata :
<span id="baseRateDisplay"></span><br>

Administration fee :
<span id="administrationFee"></span><br>

</body>
</html>