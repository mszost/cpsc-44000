async function rollD20() {
    document.getElementById("summary").innerHTML = "Summary";
    document.getElementById("d20-txt").innerHTML = "";

    let res = await fetch('https://5e-dice-roller-api.azurewebsites.net/roll?d=20')
    let roll = parseInt(await res.text());

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
        roll += await calculateBonuses(roll);
    }

    document.getElementById("d20-txt").innerHTML = roll;
}


async function calculateBonuses(roll) {
    let abName;
    let abScore;
    let abBonus;
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
        totalBonus += prof;
    }

    // inspiration bonus
    if (document.getElementById("add-insp").checked) {
        let res =  await fetch('https://5e-dice-roller-api.azurewebsites.net/roll?d=4');
        insp = parseInt(await res.text());
    }

    displaySummary(roll, abName, abScore, abBonus, prof, insp);

    return totalBonus;
}


function displaySummary(roll, abName, abScore, abBonus, prof, insp) {
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