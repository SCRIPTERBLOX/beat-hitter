function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

function calc() {
    //disco lights
    var newLights = discoLights;

    // Add new lights if necessary
    if (discoLights.length < maxLights) {
        var newLight = [];
        var col = [];
        var pos = [];

        col.push(getRandomInt(1, 255));
        col.push(getRandomInt(1, 255));
        col.push(getRandomInt(1, 255));

        pos.push(getRandomInt(0, gameWidth));
        pos.push(getRandomInt(0, gameHeight));

        newLight.push(col);
        newLight.push(pos);
        newLight.push(getRandomInt(minLightSize, maxLightSize));

        discoLights.push(newLight); // Add new light to the array
    }

    // Modify the existing lights
    for (var i = 0; i < discoLights.length; i++) {
        var currentLight = discoLights[i];

        // Move it
        var xDiff = getRandomInt(-1, 1);
        var yDiff = getRandomInt(-1, 1);
        var newX = currentLight[1][0] + xDiff;
        var newY = currentLight[1][1] + yDiff;

        currentLight[1] = [newX, newY]; // Update position

        // Modify color
        var newCol = [];
        for (var n = 0; n < 3; n++) {
            var colPart = currentLight[0][n] + getRandomInt(-7, 7);
            newCol.push(colPart);
        }
        currentLight[0] = newCol; // Update color

        // Modify size with a chance to change it
        var newSize = currentLight[2];
        if (getRandomInt(1, 2) == 1) {
            var sizeChange = getRandomInt(-2, 2);
            newSize = Math.min(Math.max(newSize + sizeChange, minLightSize), maxLightSize);
        }
        currentLight[2] = newSize; // Update size
    }

    discoLights = newLights;

    //disco ball
    if (dangleProgress >= 320) discoBallDir = "B";
    else if (dangleProgress <= 180) discoBallDir = "F";

    if (discoBallDir == "F") dangleProgress++;
    else if (discoBallDir == "B") dangleProgress--;

    ballPos[0] = 200 + 30 * Math.sin(fCount * 0.04);

    var diff;
    if (ballPos[0] <= 200) diff = ballPos[0] - 200;
    else if (ballPos[0] >= 200) diff = 200 - ballPos[0];
    ballPos[1] = diff + 65;

    //dance floor
    danceFloorProgress++;

    if (danceFloorProgress == danceFloorInterval) {
        danceFloorProgress = 0;

        //change its stuff
        for (var i = 0; i < danceFloor.length; i++) {
            //give it a random color
            var color = danceFloorColors[getRandomInt(0, danceFloorColors.length-1)];
            danceFloor[i] = color;
        }
    }
}

function drawMainMenu(processingInstance) {
    with (processingInstance) {
    calc();
    //background design
    background(50, 50, 50);

    //render the dance floor
    //background
    fill(0, 0, 0);
    strokeWeight(3);
    stroke(255, 255, 255);
    quad(75, 225, 325, 225, 375, 375, 25, 375);

    //tiles
    fill(danceFloor[0][0], danceFloor[0][1], danceFloor[0][2]);
    quad(80, 230, 130, 230, 120, 260, 70, 260);

    fill(danceFloor[1][0], danceFloor[1][1], danceFloor[1][2]);
    quad(137, 230, 180, 230, 177, 260, 128, 260);

    fill(danceFloor[2][0], danceFloor[2][1], danceFloor[2][2]);
    quad(185, 230, 225, 230, 228, 260, 183, 260);

    fill(danceFloor[3][0], danceFloor[3][1], danceFloor[3][2]);
    quad(230, 230, 270, 230, 277, 260, 235, 260);

    fill(danceFloor[4][0], danceFloor[4][1], danceFloor[4][2]);
    quad(275, 230, 320, 230, 330, 260, 282, 260);


    fill(danceFloor[5][0], danceFloor[0][1], danceFloor[0][2]);
    quad(68, 266, 118, 266, 108, 296, 58, 296);

    fill(danceFloor[6][0], danceFloor[1][1], danceFloor[1][2]);
    quad(126, 266, 176, 266, 171, 296, 117, 296);

    fill(danceFloor[7][0], danceFloor[2][1], danceFloor[2][2]);
    quad(181, 266, 229, 266, 233, 296, 177, 296);

    fill(danceFloor[8][0], danceFloor[3][1], danceFloor[3][2]);
    quad(237, 266, 279, 266, 287, 296, 242, 296);

    fill(danceFloor[9][0], danceFloor[4][1], danceFloor[4][2]);
    quad(285, 266, 333, 266, 342, 296, 294, 296);


    fill(danceFloor[10][0], danceFloor[0][1], danceFloor[0][2]);
    quad(56, 302, 106, 302, 96, 332, 46, 332);

    fill(danceFloor[11][0], danceFloor[1][1], danceFloor[1][2]);
    quad(116, 302, 170, 302, 164, 332, 106, 332);

    fill(danceFloor[12][0], danceFloor[2][1], danceFloor[2][2]);
    quad(177, 302, 235, 302, 239, 332, 173, 332);

    fill(danceFloor[13][0], danceFloor[3][1], danceFloor[3][2]);
    quad(242, 302, 289, 302, 297, 332, 247, 332);

    fill(danceFloor[14][0], danceFloor[4][1], danceFloor[4][2]);
    quad(297, 302, 345, 302, 355, 332, 305, 332);


    fill(danceFloor[10][0], danceFloor[0][1], danceFloor[0][2]);
    quad(44, 338, 94, 338, 84, 368, 34, 368);

    fill(danceFloor[11][0], danceFloor[1][1], danceFloor[1][2]);
    quad(104, 338, 164, 338, 158, 368, 96, 368);

    fill(danceFloor[12][0], danceFloor[2][1], danceFloor[2][2]);
    quad(172, 338, 240, 338, 244, 368, 167, 368);

    fill(danceFloor[13][0], danceFloor[3][1], danceFloor[3][2]);
    quad(248, 338, 300, 338, 308, 368, 252, 368);

    fill(danceFloor[14][0], danceFloor[4][1], danceFloor[4][2]);
    quad(308, 338, 357, 338, 367, 368, 316, 368);

    // Render the disco lights
    for (var i = 0; i < discoLights.length; i++) {
        var currentLight = discoLights[i];
        var col = currentLight[0];
        var x = currentLight[1][0] - currentLight[2] / 2;
        var y = currentLight[1][1] - currentLight[2] / 2;
        var size = currentLight[2];

        fill(col[0], col[1], col[2]);
        noStroke();
        ellipse(x, y, size, size);
    }

    //disco ball
    fill(255, 255, 255)
    strokeWeight(3);
    stroke(0, 0, 0);
    line(200, 0, ballPos[0], ballPos[1]);

    fill(0, 0, 0);
    strokeWeight(2.5);
    stroke(255, 255, 255);
    ellipse(ballPos[0], ballPos[1], 75, 75);

    noStroke();
    for (var i = 0; i < 20; i++) {
        var posX = random(ballPos[0]-25, ballPos[0]+25);
        var posY = random(ballPos[1]-25, ballPos[1]+25);

        var colorIndex = getRandomInt(0, ballColors.length-1);
        var partColor = ballColors[colorIndex]
        fill(partColor[0], partColor[1], partColor[2]);

        ellipse(posX, posY, 10, 10);
    }

    //title
    textSize(25);
    textAlign(CENTER, TOP);
    image(title, 15, 75, 415, 50);
    fill(255, 255, 255);
    text("A game by SCRIPTERBLOX", 200, 115);

    //buttons
    //free play
    fill(200, 0, 0);
    strokeWeight(5);
    stroke(0, 0, 0);

    beginShape();
    vertex(100, 175);
    vertex(300, 175);
    vertex(310, 185);
    vertex(310, 200);
    vertex(300, 210);
    vertex(100, 210);
    vertex(90, 200);
    vertex(90, 185);
    vertex(100, 175);
    endShape();

    if (freePlayButtonState == "over") {
        beginShape();
        vertex(110, 160);
        vertex(310, 160);
        vertex(320, 170);
        vertex(320, 185);
        vertex(310, 195);
        vertex(110, 195);
        vertex(100, 185);
        vertex(100, 170);
        vertex(110, 160);
        endShape();

        fill(0, 0, 0);
        line(90, 185, 100, 170);
        line(90, 200, 100, 185);
        line(100, 210, 110, 195);
        line(300, 210, 310, 195);
        line(310, 200, 320, 185);
        text("Free Play", 210, 162);
    } else if (freePlayButtonState == "down") {
        beginShape();
        vertex(103, 167);
        vertex(303, 167);
        vertex(313, 177);
        vertex(313, 192);
        vertex(303, 202);
        vertex(103, 202);
        vertex(93, 192);
        vertex(93, 177);
        vertex(103, 167);
        endShape();

        fill(0, 0, 0);
        line(90, 185, 93, 177);
        line(90, 200, 93, 192);
        line(100, 210, 103, 202);
        line(300, 210, 303, 202);
        line(310, 200, 313, 192);
        text("Free Play", 203, 168);
    } else if (freePlayButtonState == "non") {
        beginShape();
        vertex(105, 165);
        vertex(305, 165);
        vertex(315, 175);
        vertex(315, 190);
        vertex(305, 200);
        vertex(105, 200);
        vertex(95, 190);
        vertex(95, 175);
        vertex(105, 165);
        endShape();

        fill(0, 0, 0);
        line(90, 185, 95, 175);
        line(90, 200, 95, 190);
        line(100, 210, 105, 200);
        line(300, 210, 305, 200);
        line(310, 200, 315, 190);
        textFont(createFont("Arial Bold"));
        text("Free Play", 205, 166);
    }
}
}