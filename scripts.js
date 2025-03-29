// Liste des morceaux de musique (en incluant des liens complets ou relatifs)
const tracks = [
    { title: "Chanson 1", file: "music/track1.mp3" },
    { title: "Chanson 2", file: "music/track2.mp3" },
    { title: "Chanson 3", file: "music/track3.mp3" },
    { title: "Chanson 4", file: "music/track4.mp3" }
];

let currentTrackIndex = 0;
let isPlaylistPlaying = false;
let playlistInterval;

// Charger la liste des morceaux dans la page
const trackList = document.getElementById("trackList");
tracks.forEach((track, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = track.title;
    listItem.onclick = () => playSelectedTrack(index); // Ajouter un événement pour jouer la musique lorsqu'on clique sur un morceau
    trackList.appendChild(listItem);
});

// Fonction pour changer la source audio et jouer le morceau sélectionné
function playSelectedTrack(index) {
    const audioPlayer = document.getElementById("audioPlayer");
    const audioSource = document.getElementById("audioSource");

    // Changer la source audio en fonction de l'index
    audioSource.src = tracks[index].file;
    audioPlayer.load();
    audioPlayer.play();
    currentTrackIndex = index;
}

// Fonction pour changer la source audio et jouer le morceau suivant
function playNextTrack() {
    const audioPlayer = document.getElementById("audioPlayer");
    const audioSource = document.getElementById("audioSource");

    if (currentTrackIndex < tracks.length) {
        audioSource.src = tracks[currentTrackIndex].file;
        audioPlayer.load();
        audioPlayer.play();
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
}

// Fonction pour jouer la playlist
function playPlaylist() {
    if (isPlaylistPlaying) {
        clearInterval(playlistInterval);
        isPlaylistPlaying = false;
        document.getElementById("playPlaylist").textContent = "Lancer la playlist";
    } else {
        isPlaylistPlaying = true;
        document.getElementById("playPlaylist").textContent = "Arrêter la playlist";
        playlistInterval = setInterval(() => {
            playNextTrack();
        }, 5000); // change de musique toutes les 5 secondes
    }
}

// Initialiser la première musique
playNextTrack();
