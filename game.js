var gameWidth = 400;
var gameHeight = 400;

var currentSong = 1;

var viewNotes = [];
var playNotes = [];
var playedNotes = [];

var arrow1;
var arrow2;
var arrow3;
var arrow4;
var title;

var health = 100;
var winHealth = 200;

var expireTime = 400

var misses = 0;
var wrongHits = 0;
var hits = 0;
var earlys = 0;

var songPlaying = false;

var discoLights = [];
var maxLights = 7;
var minLightSize = 50;
var maxLightSize = 100;

var ballPos = [200, 50];
var discoBallDir = "f";
var dangleProgress = 200;
var ballColors = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 255],
    [255, 255, 0],
    [0, 255, 255],
    [255, 0, 255]
];

var danceFloor = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
var danceFloorColors = [
    [0, 0, 0],
    [255, 255, 255],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 0, 255],
    [255, 255, 0],
    [0, 255, 255],
    [100, 0, 0],
    [0, 100, 0],
    [0, 0, 100],
    [100, 0, 100],
    [100, 100, 0],
    [0, 100, 100]
];
var danceFloorInterval = 120;
var danceFloorProgress = 119;

var freePlayButtonState = "non";

var interface = "MainMenu";

var fCount

var playedSong = false;
var songMessage = "";
var lastSong = "";

var transitionToMenu = false;
var transitionProgress = 0;
var maxTransitionProgress = 100;

var msg = "";
var isMsg = false;
var msgProgress = 0;
var maxMsgProgress = 20;
var possibleMessagesForHits = ["Nice", "Good", "Yeah", "Hit!", "Nice one", "Good job", "If you would have \n gone a little later it \n would have been bad", "Theoretically as well as \n physically and emotionally \n rewarding"];
var possibleMessagesForEarlies = ["Late", "Aww", "Not quite", "Not yet", "Why?", "Just a little later"];
var possibleMessagesForWrongs = ["Nope", "Aww", "Not quite", "What was that for?", "Why?", "That was not correct", "If you would have \n done that it would \n have been good", "Theoretically as well as \n physically and emotionally \n wrong"];

var programCode = function(processingInstance) {
  with (processingInstance) {

    var width = gameWidth;
    var height = gameHeight;

    size(width, height);
    frameRate(60);

    var img;

    function preload() {
        img = loadImage("Images/char.png");
        arrow1 = loadImage("Images/LeftArrow.png");
        arrow2 = loadImage("Images/UpArrow.png");
        arrow3 = loadImage("Images/DownArrow.png");
        arrow4 = loadImage("Images/RightArrow.png");
        title = loadImage("Images/title.png");
    }

    keyPressed = function() {
        keyGetsPressed(key);
    };

    preload();

    function startGame(song) {
        currentSong = song;
        health = 100;
        misses = 0;
        hits = 0;
        wrongHits = 0;
        earlys = 0;
        songPlaying = true;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    };

    mousePressed = function() {
        if (interface == "MainMenu") {
            if (mouseX >= 90 && mouseX <= 310 && mouseY >= 175 && mouseY <= 210) freePlayButtonState = "down";
        } else if (interface == "FreePlayMenu") {
            songButtonDown = true;
            backButtonDown = true;
        }
    }

    mouseReleased = function() {
        if (interface == "MainMenu") {
            freePlayButtonState = "non";
            if (mouseX >= 90 && mouseX <= 310 && mouseY >= 175 && mouseY <= 210) {
                interface = "FreePlayMenu";
            }
        } else if (interface == "FreePlayMenu") {
            backButtonDown = false;
            songButtonDown = false;
            ifMouseReleasedInFreePlayMenuThenDoThing(mouseX, mouseY);
            if (mouseX >= 10 && mouseX <= 105 && mouseY >= 48 && mouseY <= 88) {
                interface = "MainMenu";
            }
        }
    }

    draw = function() {
        fCount = frameCount;
        if (mouseX >= 90 && mouseX <= 310 && mouseY >= 175 && mouseY <= 210) {
            if (freePlayButtonState != "down") freePlayButtonState = "over";
        } else freePlayButtonState = "non";

        if (interface == "Game") {
            //order viewNotes by ascending y height
            viewNotes = viewNotes.sort((a, b) => a[2] - b[2]);

            //move notes
            for (var i = 0; i < playedNotes.length; i++) {
                playedNotes[i][2]++;

                if (playedNotes[i][2] >= expireTime) playedNotes.splice(i, 1);
            }

            for (var i = 0; i < viewNotes.length; i++) {
                viewNotes[i][2]++;
                viewNotes[i][4]++;

                if (viewNotes[i][4] >= expireTime) {
                    if (!viewNotes[i][3]) {
                        health -= 10;
                        viewNotes.splice(i, 1);
                        misses++;
                    }
                }
            }

            if (viewNotes.length == 0 && songIndex > 1) {
                //the song is also over
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

            background(150, 150, 150);

            fill(0, 0, 0);

            rect(0, 0, 3, height);
            rect(width/4*1, 0, 3, height);
            rect((width/4)*2, 0, 3, height);
            rect((width/4)*3, 0, 3, height);
            rect(width-3, 0, 3, height);
            rect(0, (height/5)*4, width, 3);

            //render notes
            for (var i = 0; i < viewNotes.length; i++) {
                image(viewNotes[i][0], viewNotes[i][1], viewNotes[i][2], 100, 100);
            }
            //played notes
            for (var i = 0; i < playedNotes.length; i++) {
                var noteImage;
                if (playedNotes[i][0] == "key1") noteImage = arrow1;
                else if (playedNotes[i][0] == "key2") noteImage = arrow2;
                else if (playedNotes[i][0] == "key3") noteImage = arrow3;
                else if (playedNotes[i][0] == "key4") noteImage = arrow4;

                image(noteImage, playedNotes[i][1], playedNotes[i][2], 100, 100);
           }

           //damage taking rendering
           if (damageStuff[0]) {
            if (damageStuff[1] < damageStuff[2]) damageStuff[1] += 5;
            else damageStuff[0] = false;
           } else if (damageStuff[1] > 0) {
            damageStuff[1] -= 10;
           }

           //render the progress
           if (damageStuff[1] < damageStuff[2] + damageStuff[2]/2) {
            //add the effect
            fill(255, 0, 0, damageStuff[1]);
           } else {
            //remove the effect
            fill(255, 0, 0, damageStuff[1]/damageStuff[2]*255);
           }
           rect(0, 0, 400, 400);

           //handle message rendering
           console.log(isMsg);
           if (isMsg) {
                if (msgProgress < maxMsgProgress) {
                    console.log("Should display message");
                    msgProgress++;

                    //render the message
                    textAlign(CENTER, BOTTOM);
                    fill(255, 0, 0);
                    strokeWeight(10);
                    stroke(0, 0, 255);
                    textSize(20);
                    text(msg, 200, 100);
                    stroke(0, 0, 0);
                    strokeWeight(5);
                } else {
                    isMsg = false;
                    msgProgress = 0;
                }
           }
        } else if (interface == "MainMenu") {
            if (transitionToMenu) {
                if (transitionProgress < maxTransitionProgress) {
                    transitionProgress++;
                } else {
                    transitionProgress = 0;
                    transitionToMenu = false;
                }
                if (transitionProgress > 50) {
                    drawMainMenu(processingInstance);
                    fill(255, 255, 255);
                    rect(
                        transitionProgress*4-200, transitionProgress*4-200,
                        400 - ((transitionProgress - 50) * 8), 400 - ((transitionProgress - 50) * 8)
                    )
                } else {
                    // 50 would be 200 in all directions
                    //so transitionProgress*4
                    fill(255, 255, 255);
                    rect(
                        200-transitionProgress*4, 200-transitionProgress*4,
                        transitionProgress*8, transitionProgress*8
                    );
                }
           } else {
                drawMainMenu(processingInstance);
           }
        } else if (interface == "FreePlayMenu") {
            drawFreePlayMenu(processingInstance);
        }
    }
};
}

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("game");
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);