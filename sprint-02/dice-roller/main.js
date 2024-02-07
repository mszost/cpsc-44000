function RollD20() {
    let roll = Math.floor(Math.random() * 20) + 1;

    document.getElementById("d20").innerText = roll;
}

window.onload = RollD20;