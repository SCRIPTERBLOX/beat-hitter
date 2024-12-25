var programCode = function(processingInstance) {
  with (processingInstance) {
    size(300, 400);
    frameRate(60);

    draw = function() {
        background(25, 25, 25);

        //color(255, 255, 255);
        if (interface == "Game") {
            textSize(32);
            fill(100, 100, 100);
            textAlign(LEFT, BOTTOM);
            text("Performance Stats:", 10, 40);

            textSize(30);
            fill(255, 0, 0);
            text("Health: "+health+"/"+winHealth, 10, 70);

            fill(255, 255, 255);
            textSize(30);
            text("Hits: "+hits, 10, 102);
            text("Wrongs: "+wrongHits, 10, 132);
            text("Misses: "+misses, 10, 162);
            text("Erlies: "+earlys, 10, 195)

            textSize(40);
            fill(100, 100, 100);
            text("Song Stats:", 50, 235);

            textSize(30);
            //textFont("monospace");
            if (songStats[currentSong][0] == "EASY") fill(0, 100, 0);
            else if (songStats[currentSong][0] == "MEDIUM") fill(0, 100, 0);
            else if (songStats[currentSong][0] == "HARD") fill(0, 100, 0);
            else if (songStats[currentSong][0] == "EXTREME") fill(0, 100, 0);
            text("Difficulty: "+songStats[currentSong][0], 8, 270);

            fill(255, 255, 255);
            text("Lines: "+gameSongs[currentSong].length, 10, 300);
            text("Notes: "+songStats[currentSong][1], 10, 330);
        } else {
            if (playedSong) {
                textAlign(CENTER, TOP);
                textSize(24);
                var first = `${songMessage}`;
                var second = `You completed ${lastSong}`;
                var third = `You ended with ${health} health`;
                var fourth = `You hit ${hits} notes`;
                var fifth = `You made ${wrongHits} mistakes`;

                text(`${first}\n${second}\n${third}\n${fourth}\n${fifth}`, 150, 10);
            } else {
                textAlign(CENTER, CENTER);
                textSize(45);
                text("NO\nGAME\nCURRENTLY\nON", 150, 200);
            }
        }
    }
  }
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("stats");
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);