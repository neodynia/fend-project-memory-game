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
    for (let card of allCards) {
        let iClass = `<i class="fa fa-${card}">`;
        $('ul.deck').append('<li class="card"></li>');
        $('li.card').html(iClass);
    }

cardMatcher();
//timer set to zero at game start
    resetTimer(nowTime);
    second = 0;
    $('.timer').text(`${second}`);
    initTime();
}

function playerRating(moves) {
    let rating = 3; 
    if (moves > stars3 && moves < stars2) {
        $('.rating').eq(3).removeClass('fa fa-star').addClass('fa fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $('.rating').eq(2).removeClass('fa fa-star').addClass('fa fa-star-o');
    } else if (moves > star1) {
        $('.rating').eq(1).removeClass('fa fa-star').addClass('fa fa-star-o');
    }
    return rating;
}

//End of game stats on modal
function gameEnd(moves,score) {
    $('#winnerText').text(`Moves: ${moves} - Time: ${seconds}`);
    $('#winnerModal').modal('toggle');
}

//restart game
    $('.restart').bind('click', function(confirmed) {
        if (confirmed) {
            $('.rating').removeClass('fa fa-star-o').addClass('fa fa-star');
            startGame();
        }
    });

//match like cards and indicate matches and nonmatches
let cardMatcher() = function() {
    //check card to see if flipped
    $('.deck').find('.card').bind('click', function() {
        if ($(this).hasClass('show') || $(this).hasClass('match')) {
            return true;
        }
        let currentCard = $(this).context.innerHTML;
        $(this).addClass('open show');
        allOpenCards.push(currentCard);

        //check for matches
        if (allOpenCards.length > 1) {
            if (currentCard === allOpenCards[0]) {
                $('.deck').find('open').addClass('match');
                setTimeout(function() {
                    $('.deck').find('open').removeClass('open show');
                }, wait); 
                match++;

        //Delay cards if not matched then cover up
            } else {
                $('.deck').find('open').addClass('notmatch');
                setTimeout(function() {
                    $('.deck').find('open').removeClass('open show'); 
                }, wait / 1.5);
            }
        }
    });
}

startGame();
