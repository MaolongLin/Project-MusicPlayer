    let Play = true;
    let audio = new Audio();
    let currentTrackIndex = 0;
    const progressBar = document.getElementById("progress");
    const volumeSlider = document.getElementById("volumeSlider");
    audio.volume = 1;


    const Playlist = [
        {
            ID: 1,
            Image:"Image/1.jpg",
            Title: "Unwelcome School",
            Artist: "Mitsukiyo",
            URL: "Songs/Unwelcome School.mp3"
        },
        {
            ID: 2,
            Image:"Image/2.jpg",
            Title: "雑踏、僕らの街",
            Artist: "TOGENASHI TOGEARI",
            URL: "Songs/雑踏、僕らの街.mp3"
        },
        {
            ID: 3,
            Image:"Image/3.jpg",
            Title: "春日影",
            Artist: "MyGO!!!!!",
            URL: "Songs/春日影.mp3"
        },
        {
            ID: 4,
            Image:"Image/4.gif",
            Title: "花の塔",
            Artist: "Sayuri covered by 道明寺ここあ",
            URL: "Songs/花の塔- さユり covered by 道明寺ここあ.mp3"
        }
    ];


    function PlayorPause() {
    if (!audio.src) {
        const track = Playlist[currentTrackIndex];
        audio.src = track.URL;

        document.getElementById("Image").src = track.Image;
        document.getElementById("TrackInfoDisplay").innerHTML =
            "《" + track.Title + "》<br> - " + track.Artist;
    }

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

    function Playsong() {
        const track = Playlist[currentTrackIndex];

        
        audio.src = track.URL;
        audio.play();
        Play = true;
        document.getElementById("Image").src = track.Image;
        document.getElementById("TrackInfoDisplay").innerHTML =
            "《"+track.Title + "》<br> - " + track.Artist;
    
    }
    audio.addEventListener("ended", function() {
        currentTrackIndex++;
        if (currentTrackIndex >= Playlist.length) {
            currentTrackIndex = 0;
        }
        Playsong();
    });


    function RandomPlay() {
        let Shuffled = Math.floor(Math.random() * Playlist.length);
        if (Shuffled === currentTrackIndex) {
            currentTrackIndex = (currentTrackIndex + 1) % Playlist.length;
        } else {
            currentTrackIndex = Shuffled;
        }
        Playsong();
    }


    function Track(direction) {
        if (direction === 'next') {
            currentTrackIndex = (currentTrackIndex + 1) % Playlist.length;
        } else if (direction === 'previous') {
            currentTrackIndex = (currentTrackIndex - 1 + Playlist.length) % Playlist.length;
        }
        Playsong();
    }
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
        }
    });

    progressBar.addEventListener('input', () => {
        if (audio.duration) {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        }
    });

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });
    Playsong();