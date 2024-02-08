function rollD20() {
    document.getElementById("summary").innerHTML = "Summary";
    document.getElementById("d20-txt").innerHTML = "";

    let roll = Math.floor(Math.random() * 20) + 1;

    if (roll == 1) {
        document.getElementById("d20-txt").style.color = "var(--red)";
        document.getElementById("d20-img").style.border = "var(--red) solid 3px";
        displaySummary(roll);
    } else if (roll == 20) {
        document.getElementById("d20-txt").style.color = "var(--green)";
        document.getElementById("d20-img").style.border = "var(--green) solid 3px";
        displaySummary(roll);
    } else {
        document.getElementById("d20-txt").style.color = "var(--txt_primary)";
        document.getElementById("d20-img").style.border = "var(--txt_primary) solid 3px";
        roll += calculateBonuses(roll);
    }

    document.getElementById("d20-txt").innerHTML = roll;
}


function calculateBonuses(roll) {
    let abName;
    let abScore;
    let abBonus;
    let usedExpr = false;
    let prof;
    let insp;
    let totalBonus = 0;

    // ability score bonus
    let radios = document.getElementsByName("abilities");
    for (var i=0; i<radios.length; i++) {
        if (radios[i].checked) {
            abName = radios[i].value;
            break;
        }
    }
    if (abName != "none") {
        abScore = Number(document.getElementById(abName).value);
        abBonus = (abScore-10)/2

        if (abBonus < 10) {
            abBonus = Math.floor(abBonus);
        } else {
            abBonus = Math.ceil(abBonus)
        }

        totalBonus += abBonus;
    }

    // proficiency and expertise bonuses
    if (document.getElementById("add-prof").checked) {
        prof = Number(document.getElementById("prof-bonus").value);
        totalBonus += prof;
    } 
    if (document.getElementById("add-expr").checked) {
        usedExpr = true;
        totalBonus += prof;
    }

    // inspiration bonus
    if (document.getElementById("add-insp").checked) {
        insp = Math.floor(Math.random() * 4) + 1;
    }

    displaySummary(roll, abName, abScore, abBonus, prof, usedExpr, insp, totalBonus);

    return totalBonus;
}


function displaySummary(roll, abName, abScore, abBonus, prof, usedExpr, insp, total) {
    if (roll == 20) {
        document.getElementById("summary").insertAdjacentHTML("beforeend", 
            "<div class=\"pos\">Critical Success!</div>");
    } else if (roll == 1) { 
        document.getElementById("summary").insertAdjacentHTML("beforeend", 
            "<div class=\"neg\">Critical Failure!</div>")
    } else {
        document.getElementById("summary").insertAdjacentHTML("beforeend",
            `<p>Roll (${roll})</p>`);

        if (abBonus > 0) {
            document.getElementById("summary").insertAdjacentHTML("beforeend",
            `<div class="pos">${abName} ${abScore} (+${abBonus})</div>`);
        } else if (abBonus < 0) {
            document.getElementById("summary").insertAdjacentHTML("beforeend",
            `<div class="neg">${abName} ${abScore} (${abBonus})</div>`);
        }

    if (document.getElementById("add-prof").checked) {
            document.getElementById("summary").insertAdjacentHTML("beforeend",
            `<div class="pos">Proficiency (+${prof})</div>`);
    }
    if (document.getElementById("add-expr").checked) {
        document.getElementById("summary").insertAdjacentHTML("beforeend",
        `<div class="pos">Expertise (+${prof})</div>`);
    }

    if (document.getElementById("add-insp").checked) {
        document.getElementById("summary").insertAdjacentHTML("beforeend",
            `<div class="pos">Inspiration (+${insp})</div>`);
        }
    }
}

window.onload = rollD20;