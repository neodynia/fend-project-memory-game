/*jshint esversion: 6 */

/*Variables*/
let fullDeck = ["diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb", "diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb"];
let nowTime;
let allOpenCards = [];
let match;
let second;
let moves;
let wait;
let totalCard = fullDeck.length / 2;
let star1, star2, star3;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*Function to Begin Game Play*/
function startGame() {
    let allCards = shuffle(fullDeck);
    $('.deck').empty(); 

// Game starts with no matching cards and zero moves
    match = 0;
    moves = 0;
    $('.moves').text('0');

//Loop to create and place the 16 cards
    




}