let dealerSum=0;
let yourSum=0;
let dealerAce=0;
let yourAce=0;
var hidden;
var deck;
let rewardsClaimed=true;
let gameStarted=false;
let canHit=true;
let winner=0

function onStart() {
    if (gameStarted) {
        return;
    }
    if(typeof(Storage)!=="undefined") {
        sessionStorage.setItem('balance',Number(sessionStorage.getItem('balance'))-Number(sessionStorage.getItem('betAmount')));
        document.getElementById("balanceTab").innerHTML="Balance: $"+sessionStorage.getItem('balance');
    }
    document.getElementById("winner").innerHTML="";
    dealerSum=0;
    yourSum=0;
    dealerAce=0;
    yourAce=0;
    gameStarted= true;
    canHit=true;
    var element = document.getElementById("dealer-cards"); 
    while (element.firstChild) { 
        element.removeChild(element.firstChild); 
    }
    var element = document.getElementById("your-cards"); 
    while (element.firstChild) { 
        element.removeChild(element.firstChild); 
    }
    let hiddenCard=document.createElement("img");
    hiddenCard.id="hidden"
    buildDeck();
    shuffle();
    hidden = deck.pop();
    hiddenCard.src="../cards/back_of_card.png";
    document.getElementById("dealer-cards").append(hiddenCard);
    dealerSum+=getValue(hidden);
    dealerAce+=checkAce(hidden);
    let card=deck.pop();
    let cardImg2=document.createElement("img");
    dealerSum+=getValue(card);
    dealerAce+=checkAce(card);
    cardImg2.src="../cards/"+card+".png";
    cardImg2.alt=card;
    document.getElementById("dealer-cards").append(cardImg2);
    for (let i=0; i<2; i++) {
        let card=deck.pop();
        let cardImg2=document.createElement("img");
        yourSum+=getValue(card);
        yourAce+=checkAce(card);
        cardImg2.src="../cards/"+card+".png";
        cardImg2.alt=card;
        document.getElementById("your-cards").append(cardImg2);
    }
    document.getElementById("hit-button").addEventListener("click", hit)
    document.getElementById("stand-button").addEventListener("click", stand) 
}

function stand() {
    document.getElementById("hidden").src="../cards/"+hidden+".png";
    
    while (dealerSum<17) {
        let card=deck.pop();
        let cardImg2=document.createElement("img");
        cardImg2.src="../cards/"+card+".png";
        cardImg2.alt=card;
        dealerSum+=getValue(card);
        dealerAce+=checkAce(card);
        document.getElementById("dealer-cards").append(cardImg2);
        if (reduceAces(dealerSum, dealerAce) > 21) {
            break;
        }
    }
    
    endGame();
}

function endGame() {
    if (!gameStarted) {
        return;
    }
    gameStarted=false;
    if (reduceAces(yourSum, yourAce)>21) {
        console.log("You Bust")
        document.getElementById("winner").innerHTML="You Bust";
    } else if (reduceAces(dealerSum,dealerAce)>21) {
        console.log("Dealer Busts")
        if(typeof(Storage)!=="undefined") {
            sessionStorage.setItem('balance',Number(sessionStorage.getItem('balance'))+Number(sessionStorage.getItem('betAmount'))*2);
            document.getElementById("balanceTab").innerHTML="Balance: $"+sessionStorage.getItem('balance');
            document.getElementById("winner").innerHTML="You Win!";
        }
    } else if (reduceAces(dealerSum,dealerAce)>reduceAces(yourSum, yourAce)) {
        console.log("Dealer Wins")
        document.getElementById("winner").innerHTML="You Lose";

    } else if (reduceAces(yourSum, yourAce)>reduceAces(dealerSum,dealerAce)) {
        console.log("Player Wins")
        if(typeof(Storage)!=="undefined") {
            sessionStorage.setItem('balance',Number(sessionStorage.getItem('balance'))+Number(sessionStorage.getItem('betAmount'))*2);
            document.getElementById("balanceTab").innerHTML="Balance: $"+sessionStorage.getItem('balance');
            document.getElementById("winner").innerHTML="You Win!";
        }
    } else {
        console.log("Tie")
        if(typeof(Storage)!=="undefined") {
            sessionStorage.setItem('balance',Number(sessionStorage.getItem('balance'))+Number(sessionStorage.getItem('betAmount')));
            document.getElementById("balanceTab").innerHTML="Balance: $"+sessionStorage.getItem('balance');
            document.getElementById("winner").innerHTML="You Tie";
        }
    }
}

function hit(){
    if (!canHit) {
        return;
    }
    let card=deck.pop();
    let cardImg2=document.createElement("img");
    yourSum+=getValue(card);
    yourAce+=checkAce(card);
    cardImg2.src="../cards/"+card+".png";
    cardImg2.alt=card;
    document.getElementById("your-cards").append(cardImg2);
    if (reduceAces(yourSum, yourAce) > 21) {
        canHit=false;
        stand();
    }
    
    
}

function reduceAces(sum, ace) {
    if (sum <= 21) {
        return sum
    }
    for (let val=0; val<ace; val++) {
        sum-=10
        if (sum <=10) {
            return sum
        }
    }
    return sum 
}

function buildDeck() {
    deck = [];
    let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    let values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

    for (let suit of suits) {
        for (let value of values) {
            deck.push(value + "_of_" +suit);
        }
    }
}

function shuffle() {   
    for (let i = 0; i < deck.length; i++) {
        let a = Math.floor(Math.random() * 52);
        let temp = deck[i];
        deck[i] = deck[a];
        deck[a] = temp;
    }
}

function getValue(card) {
    let value = card.split("_of_")[0];
    if (value == "ace") {
        return 11;
    } else if (value == "jack" || value == "queen" || value == "king") {
        return 10;
    } else {
        return parseInt(value);
    }
}

function checkAce(card) {
    if (card.split("_of_")[0]=="ace") {
        return 1;
    }
    return 0;
}