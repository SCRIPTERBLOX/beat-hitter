var config = [
    ["h", "key1"],
    ["j", "key2"],
    ["k", "key3"],
    ["l", "key4"]
];

function keyGetsPressed(keycode) {
    if (keycode.toString() == config[0][0]) functionButtonPressed(config[0][1]);
    else if (keycode.toString() == config[1][0]) functionButtonPressed(config[1][1]);
    else if (keycode.toString() == config[2][0]) functionButtonPressed(config[2][1]);
    else if (keycode.toString() == config[3][0]) functionButtonPressed(config[3][1]);
}

function genFinishMessage() {
    var toMessage = "Well done i guess";

    if (health == winHealth) {
        toMessage = "Maximum Healthcare";
        if (misses >= 20) {
            toMessage = "You will get them one day";
            if (wrongHits >= 20) {
                toMessage = "Not to strong on getting all today";
                if (earlys >= 50) {
                    toMessage = "C'mon";
                }
            }
        } else {
            if (wrongHits >= 20) {
                toMessage = "If only you wouldnt have mistyped";
                if (earlys >= 50) {
                    toMessage = "I guess there is still room for improvement";
                }
            }
        }
    } else {
        if (health < 100) {
            toMessage = "I would have expected more";
        } else {
            if (health > 100) {
                toMessage = "Above average";
            }

            if (misses >= 20) {
                toMessage = "Was it really that hard?";
                if (wrongHits >= 20) {
                    toMessage = "Im starting to lose hope";
                    if (earlys >= 50) {
                        toMessage = "Shame on you";
                    }
                }
            }
        }
    }

    songMessage = toMessage;
}

var damageStuff = [
    false,
    0,
    175
];

function damage() {
    damageStuff[0] = true;
    damageStuff[1] = 0;
}

function functionButtonPressed(button) {
    if (interface == "Game") {
        //create a note pattern to check with the intended pattern
        var pat = [];
        if (button == "key1") pat = ["key1", "x", "x", "x"];
        else if (button == "key2") pat = ["x", "key2", "x", "x"];
        else if (button == "key3") pat = ["x", "x", "key3", "x"];
        else if (button == "key4") pat = ["x", "x", "x", "key4"];

        //do the same for the viewnotes
        var patViewNotes  = [];

        for (var i = 0; i < viewNotes.length; i++) {
            var pat2 = [];
            if (viewNotes[i][5] == "key1") pat2 = ["key1", "x", "x", "x"];
            else if (viewNotes[i][5] == "key2") pat2 = ["x", "key2", "x", "x"];
            else if (viewNotes[i][5] == "key3") pat2 = ["x", "x", "key3", "x"];
            else if (viewNotes[i][5] == "key4") pat2 = ["x", "x", "x", "key4"];
            patViewNotes.push(pat2);
        }

        //should that button have been pressed?

        //gen what should have been clicked
        var buttonsThatShouldHaveBeenPressed = [];

        for (var i = 0; i < viewNotes.length; i++) {
            var notePos = viewNotes[i][2];
            if (notePos >= 250 && notePos <= 400) {
                console.log("NOTE SHOULD BE PRESSED");

                //add it
                var button = "";
                button = viewNotes[i][5];
                buttonsThatShouldHaveBeenPressed.push(button);
                buttonsThatShouldHaveBeenPressed.push(viewNotes[i][2]);
            }
        }

        buttonsThatShouldHaveBeenPressed = buttonsThatShouldHaveBeenPressed.reverse();

        if (buttonsThatShouldHaveBeenPressed.includes(button)) {
            //it was correct
            var posX;
            if (button == "key1") posX = 0;
            else if (button == "key2") posX = 100;
            else if (button == "key3") posX = 200;
            else if (button == "key4") posX = 300;

            var buttonThatShouldHaveBeenPressedIndex = buttonsThatShouldHaveBeenPressed.indexOf(button);
            var object = buttonsThatShouldHaveBeenPressed[buttonThatShouldHaveBeenPressedIndex];
            var noteIndex;

            for (var i = 0; i < viewNotes.length; i++) {
                if (viewNotes[i][5] == object) {
                    noteIndex = i;
                    break;
                }
            }

            var noteObject = viewNotes.reverse()[noteIndex];
            console.log(noteIndex);
            console.log(noteIndex);

            if (!viewNotes[noteIndex[3]]) {
                buttonsThatShouldHaveBeenPressed.splice(buttonsThatShouldHaveBeenPressed.indexOf(button));
                console.log(viewNotes);
                viewNotes[noteIndex][3] = true;
                addPlayedNote(button, posX, noteObject[2]);

                if (health >= 191) health = 200; else health += 10;
                hits++;
                viewNotes.splice(viewNotes.indexOf(noteObject), 1);

                //give a message
                var msgNum = getRandomInt(0, possibleMessagesForHits.length-1);
                var message = possibleMessagesForHits[msgNum];
                msg = message;
                isMsg = true;

                //check it it was the last note
                if (viewNotes.length == 0) {
                    playedSong = true;
                    lastSong = songStats[currentSong][2];
                    transitionToMenu = true;
                    transitionProgress = 0;
                    viewNotes = [];
                    playedNotes = [];
                    damageStuff[0] = false;
                    damageStuff[1] = 0;

                    //give a message
                    genFinishMessage();

                    interface = "MainMenu";
                }
            } else {
                //something was wrong
                document.getElementById("wrong-sound").play();
                damage();

                var posX;
                if (button == "key1") posX = 0;
                else if (button == "key2") posX = 100;
                else if (button == "key3") posX = 200;
                else if (button == "key4") posX = 300;

                //could have been an early though
                var found = false;
                for (var i = 0; i < viewNotes.length; i++) {
                    if (viewNotes[i][1] == posX) {
                        earlys++;

                        //should display message
                        var msgNum = getRandomInt(0, possibleMessagesForEarlies.length-1);
                        var message = possibleMessagesForEarlies[msgNum];
                        msg = message;
                        isMsg = true;

                        health -= 5
                        found = true;
                        break;
                    }
                }
                if (found) health -= 7; wrongHits++;
                return;
            }
        } else {
            //something was wrong
            document.getElementById("wrong-sound").play();
            damage();

            var posX;
            if (button == "key1") posX = 0;
            else if (button == "key2") posX = 100;
            else if (button == "key3") posX = 200;
            else if (button == "key4") posX = 300;

            //could have been an early though
            var found = false;
            for (var i = 0; i < viewNotes.length; i++) {
                if (viewNotes[i][1] == posX) {
                    earlys++;

                    //should display message
                    var msgNum = getRandomInt(0, possibleMessagesForEarlies.length-1);
                    var message = possibleMessagesForEarlies[msgNum];
                    msg = message;
                    isMsg = true;

                    health -= 5
                    found = true;
                    break;
                }
            }
            if (found) health -= 7; wrongHits++;
            return;
        }
    }
}

function areArraysIdentical(array1, array2) {
    if (array1.length != array2.length) return false;
    return array1.every((element, index) => element == array2[index]);
}

function addPlayedNote(noteType, posX, posY) {
    playedNotes.push([noteType, posX, posY]);
}