if(typeof(Storage)!=="undefined") {
    if (!sessionStorage.getItem('balance')) {
        sessionStorage.setItem('balance', 10000)
    }
    
    if (!sessionStorage.getItem('betAmount')) {
        sessionStorage.setItem('betAmount', 100)
    }
}






changeBalance=(amount)=>{
    balance=amount;
    if(typeof(Storage)!=="undefined") {
        sessionStorage.balance=balance;
    }
}

changeBetAmount=(amount)=>{
    if(typeof(Storage)!=="undefined") {
        sessionStorage.setItem('betAmount', amount);
    }
}