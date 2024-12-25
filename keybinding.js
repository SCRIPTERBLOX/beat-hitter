var waitingForText = false;
var waitButton;

var programCode = function(processingInstance) {
  with (processingInstance) {
    size(400, 200);
    frameRate(60);

    function waitForText() {
        fill(255, 0, 0);
        textSize(30);
        text("Waiting for next input", 10, 180);
    }

    function gotText(text) {
        if (waitButton == "key1") config[0][0] = text;
        else if (waitButton == "key2") config[1][0] = text;
        else if (waitButton == "key3") config[2][0] = text;
        else if (waitButton == "key4") config[3][0] = text;
        waitButton = null;
        waitingForText = false;
        console.log();
    }

    //receive the button presses
    mouseClicked = function() {
        if (mouseY >= 80 && mouseY <= 140) {
            if (mouseX >= 10 && mouseX <= 70) {
                waitingForText = true;
                waitButton = "key1";
            } else if (mouseX >= 80 && mouseX <= 140) {
                waitingForText = true;
                waitButton = "key2";
            } else if (mouseX >= 150 && mouseX <= 210) {
                waitingForText = true;
                waitButton = "key3";
            } else if (mouseX >= 220 && mouseX <= 280) {
                waitingForText = true;
                waitButton = "key4";
            }
        }
    }

    //receive key input
    keyTyped = function() {
        if (waitingForText) {
            //if (key.toString().length == 1) {
                gotText(key.toString());
            //}
        }
    }

    draw = function() {
        background(25, 25, 25);

        if (waitingForText) waitForText();

        //add the buttons
        fill(255, 255, 255);

        rect(10, 10, 60, 60);
        rect(80, 10, 60, 60);
        rect(150, 10, 60, 60);
        rect(220, 10, 60, 60);

        //images

        image(arrow1, 10, 10, 60, 60);
        image(arrow2, 80, 10, 60, 60);
        image(arrow3, 150, 10, 60, 60);
        image(arrow4, 220, 10, 60, 60);

        // lower

        rect(10, 80, 60, 60);
        rect(80, 80, 60, 60);
        rect(150, 80, 60, 60);
        rect(220, 80, 60, 60);

        //display text
        textSize(60);
        fill(0, 0, 0);

        if (waitButton == "key1") text("...", 20, 130); else text(config[0][0], 20, 130);
        if (waitButton == "key2") text("...", 90, 130); else text(config[1][0], 90, 130);
        if (waitButton == "key3") text("...", 160, 130); else text(config[2][0], 160, 130);
        if (waitButton == "key4") text("...", 230, 130); else text(config[3][0], 230, 130);
    }
  }
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("keybindings");
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);