<!DOCTYPE html>
<html dir="ltr">
<head>
    <meta charset="utf-8">
    <title>SOCIETE GENERALE SRBIJA</title>
    <meta name="author" content="Degordian (http://www.degordian.com)">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link rel="stylesheet" href="static/static_sgs/css/style.css">

    <?php
    /**
     * @var $fields array
     */

    $calculatorData = [
        'nks' =>  0.1295,
        'rateFixedAmount' =>  0.015,
        'administrationFee' =>  0.0295,
    ];
    ?>

    <script id="calculator-data" type="application/json"><?= json_encode($calculatorData) ?></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    <script src="static/static_sgs/js/js.js "></script>



    <script src="static/static_sgs/js/calculator/Dictionary.js "></script>
    <script src="static/static_sgs/js/calculator/DataProvider.js "></script>
    <script src="static/static_sgs/js/calculator/Formula.js "></script>
    <script src="static/static_sgs/js/calculator/Calculator.js "></script>
    <script src="static/static_sgs/js/calculator/formulas/BaseCreditFormula.js "></script>
    <script src="static/static_sgs/js/calculator/formulas/HousingRateFormula.js "></script>
    <script src="static/static_sgs/js/calculator/CalculatorBuilder.js "></script>
    <script src="static/static_sgs/js/calculator/calculators/HousingCalculator.js "></script>
    <script src="static/static_sgs/js/calculator/calculator-main.js "></script>

</head>
<body>

<!--Main wrapper-->
<main class="main__wrapper">





<!--Calculator-->
<section class="calculator">

    <h2>Izračunajte mesečnu ratu za traženi iznos kredita i željeni period otplate.</h2>

    <!--Slider-->
    <div class="calculator__slider">
        <input type="text" id="credit-amount" data-js="range-slider" data-min="10000" data-max="1000000" data-from="0" data-step="1000" data-grid-num="4" data-postfix=" RSD" data-grid="true" value="" />
        <div class="calculator__trigger calculator__trigger--minus" data-js="btn-minus"><svg class="icon icon-minus"><use xlink:href="static/static_sgs/icomoon/symbol-defs.svg#icon-minus" /></svg></div>
        <div class="calculator__trigger calculator__trigger--plus" data-js="btn-plus"><svg class="icon icon-plus"><use xlink:href="static/static_sgs/icomoon/symbol-defs.svg#icon-plus" /></svg></div>
    </div>
    <!--/Slider-->

    <!--Slider-->
    <div class="calculator__slider">
        <input type="text" id="number-of-months" data-js="range-slider" data-min="12" data-max="300" data-from="0" data-step="1" data-grid-num="4" data-postfix=" meseci" data-grid="true" value="" />
        <div class="calculator__trigger calculator__trigger--minus" data-js="btn-minus"><svg class="icon icon-minus"><use xlink:href="static/static_sgs/icomoon/symbol-defs.svg#icon-minus" /></svg></div>
        <div class="calculator__trigger calculator__trigger--plus" data-js="btn-plus"><svg class="icon icon-plus"><use xlink:href="static/static_sgs/icomoon/symbol-defs.svg#icon-plus" /></svg></div>
    </div>
    <!--/Slider-->


    <!--Calculator info-->
    <div class="calculator__info">
        <div class="calculator__info-item">
            <span id="creditamountFeeOutput" class="value">0 <small>RSD</small></span>
            <span class="title">Kredit</span>
        </div>
        <div class="calculator__info-item">
            <span id="numberOfMonthsFeeOutput" class="value">0 <small>meseci</small></span>
            <span class="title">Period otplate</span>
        </div>
        <div class="calculator__info-item">
            <span id="administrationFee" class="value">73 </span>
            <span class="title">Adm trošak</span>
        </div>
        <div class="calculator__info-item">
            <span id="administrationFeeCount" class="value">73 </span>
            <span class="title">Iznos adm troška</span>
        </div>
    </div>

    <!--Calculator info-->
    <div class="calculator__info">
        <div class="calculator__info-item">
            <span id="nks"  class="value">4,61%</span>
            <span class="title">NKS</span>
        </div>
        <div class="calculator__info-item">
            <span id="rate"  class="value">4.554 <small>EUR</small></span>
            <span class="title">MESEČNA RATA<span class="highlight">*</span></span>
        </div>
    </div>

    <!--Calculator cta-->
    <div class="calculator__cta">
        <button type="button" class="btn btn--center btn--big-font">Podnesi zahtev</button>
    </div>

    <!--Calculator other info-->
    <div class="calculator__other-info">
        <span class="highlight">*</span> kalkulator je informativnog karaktera.
    </div>

</section>
<!--/Calculator-->

    </main>


</body>
</html>