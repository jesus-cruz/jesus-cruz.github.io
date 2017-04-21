$(document).ready(function () {


    $('button').click(function () {
        if ($(this).hasClass("botonCalcularIban")){
                calcularIban($(".areaCuenta").val());
            }
        
    });
    
    function calcularIban ( cuenta ) {
        var cuentaBigInt = bigInt(cuenta);
        var resto = cuentaBigInt.divmod(97).remainder;
        var ibanNumerico = bigInt(98).minus(resto)
        alert("ES"+ibanNumerico+cuenta);
    }

});