const songs = [
    {
        title: "Die With A Smile",
        artist: "Lady Gaga & Bruno Mars",
        src: "Die With A Smile - PagalHits.mp3",
        img: "card2img.jpg"
    },
    {
        title: "Espresso",
        artist: "Sabrina Carpenter",
        src: "Espresso - PagalHits.mp3",
        img: "card3img.jpg"
    },
    {
        title: "We Don't Talk Anymore",
        artist: "Charlie Puth & Selena Gomez",
        src: "We Don't Talk Anymore - Charlie Puth(Pagalworld.skin).mp3",
        img: "card4img.jpg"
    }
];

let currentIndex = 0;

// Select elements
const audio = new Audio(songs[currentIndex].src);
const playButton = document.querySelector(".player-control-icon:nth-child(3)");
const prevButton = document.querySelector(".player-control-icon:nth-child(2)");
const nextButton = document.querySelector(".player-control-icon:nth-child(4)");
const progressBar = document.querySelector(".progress");
const volumeSlider = document.querySelector(".volumn");
const currentTimeEl = document.querySelector(".current-time");
const totalTimeEl = document.querySelector(".total-time");
const songTitle = document.querySelector(".current-song");
const songImage = document.querySelector(".play img");

// Set default volume
audio.volume = 1;

// Update UI
function updateUI() {
    const currentSong = songs[currentIndex];
    songTitle.innerHTML = `${currentSong.title} <br> By ${currentSong.artist}`;
    songImage.src = currentSong.img;
    audio.src = currentSong.src;
    progressBar.value = 0;
    audio.addEventListener("loadedmetadata", () => {
        totalTimeEl.textContent = formatTime(audio.duration || 0);
    });
}

// Format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Play/pause functionality
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.src = "player_icon3_pause.png"; // Update to a pause icon
    } else {
        audio.pause();
        playButton.src = "player_icon3.png"; // Update to a play icon
    }
});

// Next song
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    updateUI();
    audio.play();
});

// Previous song
prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    updateUI();
    audio.play();
});

// Update progress bar and time
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

// Seek functionality
progressBar.addEventListener("input", () => {
    if (!isNaN(audio.duration)) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

// Volume control
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
});

// Handle errors
audio.addEventListener("error", () => {
    totalTimeEl.textContent = "0:00";
    console.error("Audio failed to load:", audio.src);
    alert("Failed to load audio. Please check the file!");
});

// Autoplay next song on end
audio.addEventListener("ended", () => {
    nextButton.click();
});

// Keyboard shortcuts (optional)
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault(); // Prevent default scrolling behavior
        playButton.click();
    }
    if (e.code === "ArrowRight") nextButton.click();
    if (e.code === "ArrowLeft") prevButton.click();
});

// Set default progress bar and volume
progressBar.max = 100;
volumeSlider.value = audio.volume * 100;

// Initial setup
updateUI();
