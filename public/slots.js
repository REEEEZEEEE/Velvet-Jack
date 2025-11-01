function spinSlots() {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("balance", Number(sessionStorage.getItem("balance")) - Number(sessionStorage.getItem("betAmount")));
        document.getElementById("balanceTab").innerHTML = "Balance: $" + sessionStorage.getItem('balance');
    }
    var symbols = ["🍒", "🍋", "🍊", "🍉", "🍇", "🔔", "⭐", "💎"];
    for (i = 1; i <= 25; i++) {
        document.getElementById("slot" + i).innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        document.getElementById("slot" + i).style.fontSize = "50px";
        document.getElementById("slot" + i).style.textAlign = "center";

    }
    var win = false;
    var slotValues = [];
    for (j = 1; j <= 25; j++) {
        slotValues.push(document.getElementById("slot" + j).innerHTML);
    }
    // Check for winning combinations
    if (slotValues[0] === slotValues[1] && slotValues[1] === slotValues[2]) {
        win = true;
    } else if (slotValues[3] === slotValues[4] && slotValues[4] === slotValues[5]) {
        win = true;
    } else if (slotValues[6] === slotValues[7] && slotValues[7] === slotValues[8]) {
        win = true;
    } else if (slotValues[9] === slotValues[10] && slotValues[10] === slotValues[11]) {
        win = true;
    } else if (slotValues[12] === slotValues[13] && slotValues[13] === slotValues[14]) {
        win = true;
    } else if (slotValues[15] === slotValues[16] && slotValues[16] === slotValues[17]) {
        win = true;
    } else if (slotValues[18] === slotValues[19] && slotValues[19] === slotValues[20]) {
        win = true;
    } else if (slotValues[21] === slotValues[22] && slotValues[22] === slotValues[23]) {
        win = true;
    } else if (slotValues[24] === slotValues[25]) {
        win = true;
    }

    if (win) {
        let winAmount =  Number(sessionStorage.getItem("betAmount")) * Math.floor(Math.random() * symbols.length)*Math.floor(Math.random() * symbols.length); // Example win amount
        document.getElementById("resultText").innerText = "You win: $"+String(winAmount);
        sessionStorage.setItem("balance", Number(sessionStorage.getItem("balance")) + winAmount);
        document.getElementById("balanceTab").innerHTML = "Balance: $" + sessionStorage.getItem('balance');
    } else {
        document.getElementById("resultText").innerText = "You win: $0";
    }
}