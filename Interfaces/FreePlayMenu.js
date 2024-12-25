var scrolled = 0;

var yMin = 95;
var yMax = 385;

var yStart = 100;
var minScroll = -20;

var backButtonState = "none";
var backButtonDown = false;

var songButtonDown = false;

window.addEventListener("wheel", (event) => {
    if (interface == "FreePlayMenu"){
        if (scrolled - ((event.deltaY/100)*20) <= minScroll) scrolled -= (event.deltaY/100)*15;
    }
});

function ifMouseReleasedInFreePlayMenuThenDoThing(mouseX, mouseY) {
    //find all song positions
    for (var i = 0; i < gameSongs.length; i++) {
        var song = gameSongs[i];
        var posY = yStart+(i*30)+scrolled;

        if (mouseY >= posY+2 && mouseY <= posY+23 && mouseX >= 60+2 && mouseX <= 340-2) {
            //this is the correct song start it
            currentSong = i;
            health = 100;
            winHealth = 200;   
            misses = 0;
            wrongHits = 0;
            hits = 0;
            earlys = 0;
            songPlaying = true;
            songIndex = 0;

            interface = "Game";
            repeat();
        }
    }
}

function drawFreePlayMenu(processingInstance) {
    const {mouseX, mouseY, CENTER, RIGHT, LEFT, draw, background, fill, stroke, beginShape, vertex, endShape, textAlign, textSize, text, line, createFont, textFont} = processingInstance;

    if (mouseX >= 10 && mouseX <= 105 && mouseY >= 48 && mouseY <= 88 && backButtonDown) backButtonState = "down"
    else if (mouseX >= 10 && mouseX <= 105 && mouseY >= 48 && mouseY <= 88) backButtonState = "over"
    else backButtonState = "none";

    processingInstance.background(50, 50, 50);

    processingInstance.fill(255, 0, 0);
    processingInstance.stroke(5);
    processingInstance.beginShape();
    processingInstance.vertex(50, 0);
    processingInstance.vertex(50, 15);
    processingInstance.vertex(80, 30);
    processingInstance.vertex(320, 30);
    processingInstance.vertex(350, 15);
    processingInstance.vertex(350, 0);
    processingInstance.vertex(50, 0);
    processingInstance.endShape();

    processingInstance.fill(0, 0, 0);
    processingInstance.textAlign(CENTER, CENTER);
    processingInstance.textSize(25);
    textFont(createFont("Arial Bold"));
    processingInstance.text("Free play songs", 200, 15);

    processingInstance.fill(255, 0, 0);
    processingInstance.beginShape();
    /*
    top left corner: 50, 50
    top right corner: 350, 50
    bottom right corner: 350, 350
    bottom left corner: 50, 350
    */
    processingInstance.vertex(55, 60+35);
    processingInstance.vertex(345, 60+35);
    processingInstance.vertex(350, 65+35);
    processingInstance.vertex(350, 345+35);
    processingInstance.vertex(345, 350+35);
    processingInstance.vertex(55, 350+35);
    processingInstance.vertex(50, 345+35);
    processingInstance.vertex(50, 65+35);
    processingInstance.vertex(55, 60+35);
    processingInstance.endShape();

    processingInstance.beginShape();
    /*
    top left corner: 25, 50
    top right corner: 125, 50
    bottom right corner: 125, 100
    bottom left corner: 25, 100
    */
    processingInstance.vertex(15, 48);
    processingInstance.vertex(105, 48);
    processingInstance.vertex(110, 53);
    processingInstance.vertex(110, 83);
    processingInstance.vertex(105, 88);
    processingInstance.vertex(15, 88);
    processingInstance.vertex(10, 83);
    processingInstance.vertex(10, 53);
    processingInstance.vertex(15, 48);
    processingInstance.endShape();

    processingInstance.textSize(50);
    processingInstance.textAlign(CENTER, CENTER);
    if (backButtonState == "none") {
        processingInstance.beginShape();
        processingInstance.vertex(20, 38);
        processingInstance.vertex(110, 38);
        processingInstance.vertex(115, 43);
        processingInstance.vertex(115, 73);
        processingInstance.vertex(110, 78);
        processingInstance.vertex(20, 78);
        processingInstance.vertex(15, 73);
        processingInstance.vertex(15, 43);
        processingInstance.vertex(20, 38);
        processingInstance.endShape();

        processingInstance.fill(0, 0, 0);
        processingInstance.line(15, 43, 10, 53);
        processingInstance.line(15, 73, 10, 83);
        processingInstance.line(20, 78, 15, 88);
        processingInstance.line(110, 78, 105, 88);
        processingInstance.line(115, 73, 110, 83);

        processingInstance.fill(0, 0, 0);
        processingInstance.text("⇦", 40, 54);
    } else if (backButtonState == "over") {
            processingInstance.beginShape();
            processingInstance.vertex(25, 33);
            processingInstance.vertex(115, 33);
            processingInstance.vertex(120, 38);
            processingInstance.vertex(120, 68);
            processingInstance.vertex(115, 73);
            processingInstance.vertex(25, 73);
            processingInstance.vertex(20, 68);
            processingInstance.vertex(20, 38);
            processingInstance.vertex(25, 33);
            processingInstance.endShape();

            processingInstance.fill(0, 0, 0);
            processingInstance.line(20, 38, 10, 53);
            processingInstance.line(20, 68, 10, 83);
            processingInstance.line(25, 73, 15, 88);
            processingInstance.line(115, 73, 105, 88);
            processingInstance.line(120, 68, 110, 83);

            processingInstance.fill(0, 0, 0);
            processingInstance.text("⇦", 45, 49);
    } else {
            processingInstance.beginShape();
            processingInstance.vertex(17, 41);
            processingInstance.vertex(107, 41);
            processingInstance.vertex(112, 46);
            processingInstance.vertex(112, 76);
            processingInstance.vertex(107, 81);
            processingInstance.vertex(17, 81);
            processingInstance.vertex(12, 76);
            processingInstance.vertex(12, 46);
            processingInstance.vertex(17, 41);
            processingInstance.endShape();

            processingInstance.fill(0, 0, 0);
            processingInstance.line(12, 51, 10, 53);
            processingInstance.line(13, 81, 10, 83);
            processingInstance.line(17, 81, 15, 88);
            processingInstance.line(107, 81, 105, 88);
            processingInstance.line(112, 76, 110, 83);

            processingInstance.fill(0, 0, 0);
            processingInstance.text("⇦", 37, 57);
    }

    //render the song buttons
    for (var i = 0; i < gameSongs.length; i++) {
        var song = gameSongs[i];
        var songName = songStats[i][2];
        var posY = yStart+(i*30)+scrolled;

        if (posY >= yMin && posY+25 <= yMax) {
            processingInstance.fill(255, 0, 0);
            //draw this button
            /*
                top left corner: 60, posY
                top right corner: 340, posY
                bottom right corner: 340, posY+25
                bottom left corner: 60, posY+25
            */
            if (mouseX >= 60 && mouseX <= 340 && mouseY >= posY && mouseY <= posY+25) {
                //over
                if (songButtonDown) {
                    // down
                    processingInstance.beginShape();
                    processingInstance.vertex(65, posY+2);
                    processingInstance.vertex(335, posY+2);
                    processingInstance.vertex(340-2, posY+5);
                    processingInstance.vertex(340-2, posY+20);
                    processingInstance.vertex(335, posY+25-2);
                    processingInstance.vertex(65, posY+25-2);
                    processingInstance.vertex(60+2, posY+20);
                    processingInstance.vertex(60+2, posY+5);
                    processingInstance.vertex(65, posY+2);
                    processingInstance.endShape();
                } else {
                    //regular over
                    processingInstance.beginShape();
                    processingInstance.vertex(65, posY-2);
                    processingInstance.vertex(335, posY-2);
                    processingInstance.vertex(340+2, posY+5);
                    processingInstance.vertex(340+2, posY+20);
                    processingInstance.vertex(335, posY+25+2);
                    processingInstance.vertex(65, posY+25+2);
                    processingInstance.vertex(60-2, posY+20);
                    processingInstance.vertex(60-2, posY+5);
                    processingInstance.vertex(65, posY-2);
                    processingInstance.endShape();
                }
            } else {
                processingInstance.beginShape();
                processingInstance.vertex(65, posY);
                processingInstance.vertex(335, posY);
                processingInstance.vertex(340, posY+5);
                processingInstance.vertex(340, posY+20);
                processingInstance.vertex(335, posY+25);
                processingInstance.vertex(65, posY+25);
                processingInstance.vertex(60, posY+20);
                processingInstance.vertex(60, posY+5);
                processingInstance.vertex(65, posY);
                processingInstance.endShape();
            }

            textFont(createFont("Arial"));
            processingInstance.fill(0, 0, 0);
            processingInstance.textAlign(LEFT, CENTER);
            processingInstance.textSize(15);
            processingInstance.text(songName, 70, posY+12);

            if (songStats[i][0] == "EASY") processingInstance.fill(0, 255, 0);
            else if (songStats[i][0] == "MEDIUM") processingInstance.fill(150, 100, 0);
            else if (songStats[i][0] == "HARD") processingInstance.fill(255, 0, 0);
            else if (songStats[i][0] == "EXTREME") processingInstance.fill(100, 0, 100);

            processingInstance.textAlign(LEFT, CENTER);
            processingInstance.textSize(20)
            processingInstance.text(songStats[i][0], 145, posY+12);

            textFont(createFont("Arial Italic"));
            processingInstance.fill(0, 0, 0);
            processingInstance.textAlign(RIGHT, CENTER);
            processingInstance.textSize(12);
            processingInstance.text(songStats[i][3], 335, posY+12)
        }
    }
}