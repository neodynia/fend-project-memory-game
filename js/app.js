/*jshint esversion: 6 */

/*Variables*/
let fullDeck = ["diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb", "diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb"];
let allOpenCards = [];
let match;
let min = 0;
let second = 0;
let zeroPlaceholder = 0;
let moves;
let star1 = 28;
let stars2 = 19;
let stars3 = 9;

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
}

function countTimer() {
    setInterval(function() {
        second++; 
        if (second === 59) {
          second = 0;
          min++;
        } 
        if (second === 10) {
            zeroPlaceholder = '';
        }
        if (second === 0) {
            zeroPlaceholder = 0;
        }
        document.getElementById("timer").innerText = min+':'+zeroPlaceholder+second;
    }, 2000);
}

function playerRating(moves) {
    if (moves > 9 && moves < 19) {
        $('#star-three').removeClass('fa fa-star');
    } else if (moves > 19 && moves < 29) {
        $('#star-two').removeClass('fa fa-star');
    } else if (moves > 29) {
        $('#star-one').removeClass('fa fa-star');
    }
    return moves;
}

//End of game stats on modal
function gameOver(moves,score) {
    $('#winnerText').text(`Moves : ${moves} - Time: ${second}`);
    $("#myModal").modal();
}

//restart game
    $('.restart').bind('click', function(confirmed) {
        if (confirmed) {
            $('.stars').removeClass('fa fa-star-o').addClass('fa fa-star');
            startGame();
        }
    });

//match like cards and indicate matches and nonmatches
var cardMatcher = function() {
    //check card to see if flipped
    $('.card').on('click', function() {
        countTimer();
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
        playerRating(moves);
        $('.moves').html(moves);
        }

        if (match === 8) {
            playerRating(moves);
            let score = playerRating(moves).score;
            setTimeout(function() {
                gameOver(moves,score);
            }, 500);
        }
    });
};

startGame();