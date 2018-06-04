function startTimer() {
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

it("should be able to start the timer", function() {
    startTimer();
    expect(tens).toNotEqual(0);

});