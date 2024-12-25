var songIndex = 0;

function startNote(note) {
    for (var i = 1; i <= 4; i++) {
       var noteType = "arrow"+i;

        if (noteType == "arrow1") noteType = arrow1;
        else if (noteType == "arrow2") noteType = arrow2;
        else if (noteType == "arrow3") noteType = arrow3;
        else if (noteType == "arrow4") noteType = arrow4;

        var notePosX = (gameWidth/4)*(i-1);
        var notePosY = 0;

        if (note[i-1] == 1) viewNotes.push([noteType, notePosX, notePosY, false, 0, "key"+i]);
    }
}

function repeat() {
    setTimeout(function() {
        console.log("ADDED NOTE");
        if (songPlaying) {
            var song = gameSongs[currentSong]

            if (songIndex < song.length) {
                startNote(song[songIndex]);

                songIndex++;

                //take care of music starting
                if (songIndex >= 3) {
                    //start the music
                    var elementName = songStats[currentSong][4];
                    console.log(elementName);
                    document.getElementById(elementName).play();
                }
            } else {
                //end the song
                return;
            }
        }
        repeat()
    }, 2000)
}