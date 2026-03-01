let currentPageNum = 1;
const totalPages = 15;
const audio = document.getElementById('bgMusic');
const musicWidget = document.getElementById('musicWidget');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

audio.volume = 0.5;

// Display total pages
document.getElementById('totalPages').textContent = totalPages;

function updatePageIndicator() {
    document.getElementById('currentPage').textContent = currentPageNum;
    document.getElementById('prevBtn').disabled = currentPageNum === 1;
    document.getElementById('nextBtn').disabled = currentPageNum === totalPages;
}

function nextPage() {
    if (currentPageNum < totalPages) {
        const page = document.getElementById(`page${currentPageNum}`);
        if (page) page.classList.add('flipped');

        currentPageNum++;
        updatePageIndicator();

        // Start music when leaving cover page
        if (currentPageNum === 2 && !isPlaying) {
            playMusic();
        }
    }
}

function previousPage() {
    if (currentPageNum > 1) {
        currentPageNum--;
        const page = document.getElementById(`page${currentPageNum}`);
        if (page) page.classList.remove('flipped');

        updatePageIndicator();
    }
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶️';
        isPlaying = false;
    } else {
        playMusic();
    }
}

function playMusic() {
    audio.play().then(() => {
        isPlaying = true;
        musicWidget.classList.add('active');
        playPauseBtn.textContent = '⏸️';
    }).catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
    });
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    musicWidget.classList.remove('active');
    playPauseBtn.textContent = '▶️';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') previousPage();
});

updatePageIndicator();

// Ensure first user interaction can start music
document.body.addEventListener("click", () => {
    if (!isPlaying) playMusic();
}, { once: true });