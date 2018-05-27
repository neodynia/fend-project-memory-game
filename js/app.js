/*jshint esversion: 6 */

/*Global Recurring Variables*/
let fullDeck = ["diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb", "diamond", "bolt", "cube", "paper-plane-o", "anchor", "leaf", "bicycle", "bomb"];
let allOpenCards = [];
let match;
let moves;
let seconds = 0;
let tens = 0;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let Interval;

/*Shuffle function from http://stackoverflow.com/a/2450976*/
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
    // Shuffle Deck 
    let allCards = shuffle(fullDeck);
    //Empty Board Space for Incoming New Shuffled Cards
    $('.deck').empty();
    // Game starts with no matching cards and zero moves
    match = 0;
    moves = 0;
    $('.moves').text('0');
    // Loop to create and place the 16 cards
    for (let i = 0; i < allCards.length; i++) {
        $('.deck').append("<li class=\"card\"><i class=\"fa fa-" + allCards[i] + "\"></i>");
    }
    // Call function that will handle the bulk of the game play
    cardMatcher();
}

/*Game Timer*/
function startTimer() {
    // Increment tenth of seconds 
    tens++;
    // Display tenths of seconds with only one digit
    if (tens < 9) {
        appendTens.innerHTML = "0" + tens;
    }
    // Display tenths of seconds with two digits
    if (tens > 9) {
        appendTens.innerHTML = tens;
    }
    // Group 100 (one-tenth seconds) into one second for display and increment seconds
    if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    // Display 2 digit second values
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}

/*Star to Moves Made Relationship*/
function playerRating(moves) {
    // Establishes moves needed to earn stars and displays those results by removing star classes
    if (moves > 9 && moves < 19) {
        $('#star-three').removeClass('fa fa-star');
    } else if (moves > 19 && moves < 29) {
        $('#star-two').removeClass('fa fa-star');
    } else if (moves > 29) {
        $('#star-one').removeClass('fa fa-star');
    }
    return moves;
}

/*End of Game Function*/
function gameOver(moves, score) {
    // Displays game stats on end modal
    $('#winnerText').text(`Moves : ${moves} - Time: ${seconds}.${tens} seconds`);
    // Determines star stats on end modal
    if (moves > 9 && moves < 19) {
        $('span.starCount').text('THREE STARS!');
    } else if (moves > 19 && moves < 29) {
        $('span.starCount').text('TWO STARS!');
    } else if (moves > 29) {
        $('span.starCount').text('ONE STAR!');
    }
    // Generates end modal upon game end
    $("#myModal").modal();
    // Restarts the game at the end of the modal with user permission and also with reset game icon during gammeplay
    $('.restart').bind('click', function (confirmed) {
        if (confirmed) {
            // Place three stars back
            $('.stars').removeClass('fa fa-star-o').addClass('fa fa-star');
            // Stop timer
            clearInterval(Interval);
            // Display timer 
            tens = "00";
            seconds = "00";
            appendTens.innerHTML = tens;
            appendSeconds.innerHTML = seconds;
            // Start the game again
            startGame();
        }
    });
}

/* Match like cards and indicate matches and nonmatches */
var cardMatcher = function () {
    // Listener on card click
    $('.card').on('click', function () {
        // Reset timer 
        clearInterval(Interval);
        // Start timer
        Interval = setInterval(startTimer, 10);
        // Determine if card is face up 
        if ($(this).hasClass('show') || $(this).hasClass('match')) {
            return true;
        }
        // Push HTML of each card into an array
        let box = $(this).html();
        // Turn card face up and remove existing classes from previous turns
        $(this).addClass('open show').removeClass('animated shake bounce');
        // Push both cards into an array to compare 
        allOpenCards.push(box);
        // Turn off clicks when two cards are open 
        if (allOpenCards.length >= 2) {
            $('.card').off('click');
        }
        //match cards 
        if (allOpenCards.length > 1) {
            //match cards with animated bounce
            if (allOpenCards[1] === allOpenCards[0]) {
                $('.deck').find('.open').addClass('match animated bounce').removeClass('shake open');
                match++;
                allOpenCards.length = 0;
                cardMatcher();

                //Delay cards if not matched then cover up with animated shake
            } else {
                $('.deck').find('.open').addClass('animated shake');
                setTimeout(function () {
                    $('.deck li.card').removeClass('open show animated shake bounce');
                    allOpenCards.length = 0;
                    cardMatcher();
                }, 1200);

            }

            moves++;
            playerRating(moves);
            $('.moves').html(moves);
        }

        if (match === 8) {
            clearInterval(Interval);
            playerRating(moves);
            let score = playerRating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 500);
        }
    });
};
$(document).ready(function () {
    startGame();

});