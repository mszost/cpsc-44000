function rollD20() {
    var roll = Math.floor(Math.random() * 20) + 1;

    if (roll == 1) {
        document.getElementById("d20-txt").style.color = "var(--red)";
        document.getElementById("d20-img").style.border = "var(--red) solid 3px";
    } else if (roll == 20) {
        document.getElementById("d20-txt").style.color = "var(--green)";
        document.getElementById("d20-img").style.border = "var(--green) solid 3px";
    } else {
        document.getElementById("d20-txt").style.color = "var(--txt_primary)";
        document.getElementById("d20-img").style.border = "var(--txt_primary) solid 3px";
        roll += calculateBonuses();
    }

    document.getElementById("d20-txt").innerText = roll;
}


function calculateBonuses() {
    var totalBonus = 0;

    // ability score bonus
    radios = document.getElementsByName("abilities");

    for (var i=0; i<radios.length; i++) {
        if (radios[i].checked) {
            var ability = radios[i].value;
            break;
        }
    }

    if (ability != "none") {
        var abilityBonus = (Number(document.getElementById(ability).value)-10)/2;
        totalBonus += abilityBonus;
    }

    // proficiency and expertise bonuses
    var usedExpr = false;

    if (document.getElementById("add-prof").checked) {
        var profBonus = Number(document.getElementById("prof-bonus").value);
        totalBonus += profBonus;
    } 

    if (document.getElementById("add-expr").checked) {
        usedExpr = true;
        totalBonus += profBonus;
    }

    // inspiration bonus
    if (document.getElementById("add-insp").checked) {
        var inspBonus = Math.floor(Math.random() * 4) + 1;
    }

    displaySummary(abilityBonus, profBonus, usedExpr, inspBonus);
    return totalBonus;

}

function displaySummary(ability, prof, expr, insp) {

}

window.onload = rollD20;