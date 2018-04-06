// Programa para generar tesoros aleatorios en Swords and Wizardry
// El código es excesivamente verboso para reflejar paso a paso el manual
// http://www.d20swsrd.com/for-the-referee/treasure/

var minorGemsAndJewelry = [
    "Gem or jewelry worth 1d6 gp",
    "Gem or jewelry worth 1d100 + 25 gp",
    "Gem or jewelry worth 1d100 + 75 gp",
    "Gem or jewelry worth 1d100 x 100 gp"
];

var mediumGemsAndJewelry = [
    "Gem or jewelry worth 1d100 gp",
    "Gem or jewelry worth 1d6 x 200 gp",
    "Gem or jewelry worth 1d6 x 300 gp",
    "Gem or jewelry worth 1d100 x 100 gp"
];


var majorGemsAndJewelry = [
    "Gem or jewelry worth 1d100 x 10 gp",
    "Gem or jewelry worth 1d100 x 80 gp",
    "Gem or jewelry worth 1d100 x 120 gp",
    "Gem or jewelry worth 1d100 x 200 gp"
];


var potions1 = [
    "Animal Control",
    "Clairaudience",
    "Clairvoyance",
    "Diminution",
    "Dragon Control",
    "Ethereality",
    "Fire Resistance",
    "Flying"
];

var potions2 = [
    "Giant Strength",
    "Growth",
    "Heroism",
    "Invisibility",
    "Invulnerability",
    "Levitation",
    "Plant Control"
];

var potions3 = [
    "Slipperiness",
    "Treasure Finding",
    "Undead Control"
];

var scrolls = [
    "noScrolls",
    "noScrolls",
    "noScrolls"
];

var treasure = "";

function searchPotion(dice){
    if ( dice < 25){
        return potions1[(dice-1)/3];
    }
    if ( dice == 25 ){
        return "Frozen Concoction";
    }
    if ( dice == 26 || dice == 27 ){
        return "Gaseous Form";
    }
    if ( dice >= 28 && dice <= 48 ) {
        return potions2[(dice-28)/3];
    }
    if ( dice >= 49 && dice <= 55 ){
        return "Poison";
    }
    if ( dice >= 56 && dice <= 64 ) {
        return potions3[(dice-56)/3];
    }
    if ( dice >= 65 && dice <= 75 ){
        return "Extra Healing";
    }
    if ( dice >= 76 && dice <= 100 ){
        return "Healing";
    }
    
    
}

function rollTableMinorMagicItems(dice){
    switch(dice){
        case 1:
            treasure += searchPotion(tirarDado(12));
            break;
        case 2:
            treasure += scrolls[tirarDado(6)-1];
            break;
        case 3:
            treasure += magicArmorAndWeapons[tirarDado(6)-1];
            break;
        case 4:
            treasure += remarkableMagicItems[tirarDado(20)-1];
            break;
    }
}

function rollTableMediumMagicItems(dice){
    switch(dice){
        case 1:
            for ( var i = 0; i < 3 ; i++){
                treasure += searchPotion(tirarDado(100)); 
            }    
            break;
        case 2:
            treasure += scrolls[(tirarDado(6)-1)+12];
            break;
        case 3:
            treasure += magicArmorAndWeapons[(tirarDado(6)-1)+12];
            break;
        case 4:
            treasure += remarkableMagicItems[(tirarDado(20)-1)+40];
            break;
    }
}

function rollTableMajorMagicItems(dice){
    switch(dice){
        case 1:
            for ( var i = 0; i < 6 ; i++){
                treasure += searchPotion(tirarDado(100)); 
            }    
            break;
        case 2:
            treasure += scrolls[(tirarDado(6)-1)+6];
            break;
        case 3:
            treasure += magicArmorAndWeapons[(tirarDado(6)-1)+6];
            break;
        case 4:
            treasure += remarkableMagicItems[(tirarDado(20)-1)+20];
            break;
    }
}

$(document).ready(function () {
    $('button').click(function () {
        if ($(this).hasClass("botonCalcularXP")){
                calcularTesoro($(".areaXP").val());
            }     
    });
    
    function calcularTesoro ( inputXP ) {
        if (inputXP == null || inputXP == 0){
            alert("Please insert a valid XP value");
            console.log("Invalid XP value:" + inputXP);
            return;
        }
        //Begin by multiplying the total XP value of the monsters by 1d3+1
        var totalGP = inputXP * ( tirarDado(3) + 1);
        console.log("totalGP:" + totalGP);
        // 100 Trade out
        if ( totalGP >= 100 ){
            console.log("================100GP TRADEOUTS================")
            //10% of the number of 100GP inside the totalGP
            var nRolls = Math.floor((totalGP/100)/10);
            console.log("nRolls:" + nRolls);
            //Roll 1d20 for each nRolls
            for ( var i = 0; i < nRolls ;i++){
                var resultRoll = tirarDado(20);
                if ( resultRoll <= 19){
                    //Table: Minor Gems and Jewelry 
                    treasure += minorGemsAndJewelry[tirarDado(4)-1] + "\n";  
                } else {
                    //Table: Minor Magic Items, it's a roll table
                    rollTableMinorMagicItems(tirarDado(4));
                }
            }
        }
        
        // 1000 Trade out
        if ( totalGP >= 1000 ){
            console.log("================1000GP TRADEOUTS================")
            //10% of the number of 1000GP inside the totalGP
            var nRolls = Math.floor((totalGP/1000)/10);
            console.log("nRolls:" + nRolls);
            //Roll 1d20 for each nRolls
            for ( var i = 0; i < nRolls ;i++){
                var resultRoll = tirarDado(20);
                if ( resultRoll <= 19){
                    //Table: Medium Gems and Jewelry 
                    treasure += mediumGemsAndJewelry[tirarDado(4)-1] + "\n";  
                } else {
                    //Table: Medium Magic Items, it's a roll table
                    rollTableMediumMagicItems(tirarDado(4));
                }
            }
        }
        // 5000 Trade out
        if ( totalGP >= 5000 ){
            console.log("================5000GP TRADEOUTS================")
           //10% of the number of 5000GP inside the totalGP
            var nRolls = Math.floor((totalGP/5000)/10);
            console.log("nRolls:" + nRolls);
            //Roll 1d20 for each nRolls
            for ( var i = 0; i < nRolls ;i++){
                var resultRoll = tirarDado(20);
                if ( resultRoll <= 19){
                    //Table: Major Gems and Jewelry 
                    treasure += majorGemsAndJewelry[tirarDado(4)-1] + "\n";  
                } else {
                    //Table: Magor Magic Items, it's a roll table
                    rollTableMajorMagicItems(tirarDado(4));
                }
            }
        }
        alert(treasure);
        console.log(treasure);
        treasure = "";
    }
    
    function tirarDado( caras ){
        resultado = Math.floor(Math.random()* caras )+1;
        return resultado;
    }

});