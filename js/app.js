/*jshint esversion: 6 */

/*Variables*/
let fullDeck = ["diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb", "diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb"];
let nowTime;
let allOpenCards = [];
let match;
let second;
let moves;
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
    for (let i = 0; i < allCards.length; i++) {
       $('.deck').append("<li class=\"card\"><i class=\"fa fa-" + allCards[i] + "\"></i>");
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
var cardMatcher = function() {
    //check card to see if flipped
    $('.card').on('click', function() {
        if ($(this).hasClass('show') || $(this).hasClass('match')) {
            return true;}
        //push HTML of each card into an array
        let box = $(this).html();
        $(this).addClass('open show').removeClass('animated shake bounce');
        allOpenCards.push(box);

        //turn off clicks when two cards are open 
    if (allOpenCards.length >= 2) {$('.card').off('click');} 
       //match cards 
        if (allOpenCards.length > 1) {
        //match cards with animated bounce
            if (allOpenCards[1] === allOpenCards[0]) {
                    $('.deck').find('.open').addClass('match animated bounce').removeClass('shake open');
                    match++;
                    allOpenCards.length = 0;
                    cardMatcher();
       
        //Delay cards if not matched then cover up with animated shake
            } else  {
                $('.deck').find('.open').addClass('animated shake');
                setTimeout(function() {
                    $('.deck li.card').removeClass('open show animated shake bounce')
                    allOpenCards.length = 0;
                    cardMatcher();
                }, 1200);
         
            }
        
        moves++;
        rating(moves);
        $('.moves').html(moves);
        }

        if (match === 8) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function() {
                gameOver(moves,score);
            }, 500);
        }
    });
};

startGame();