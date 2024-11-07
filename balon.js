let gameArea = document.getElementById("gameArea");
let scoreDisplay = document.getElementById("score");
let score = 0;
let gameRunning = false;
const colors = ["red", "blue", "green", "yellow", "purple"];
const gameDuration = 60000; // Durasi permainan dalam milidetik (30 detik)
const balloonSound = document.getElementById("balloonSound");
let gameTimer;

// Fungsi untuk membuat balon baru
function createBalloon() {
    if (!gameRunning) return;

    let balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Mengatur warna balon secara acak
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = randomColor;

    // Posisi balon acak
    balloon.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 40)) + "px";
    balloon.style.bottom = "0px";

    // Event saat balon diklik
    balloon.addEventListener("click", function () {
        balloonSound.play();
        balloon.remove();
        score++;
        scoreDisplay.textContent = "Skor: " + score; 
        
    });

    gameArea.appendChild(balloon);

    // Hapus balon setelah beberapa detik agar tidak menumpuk
    setTimeout(() => {
        if (gameArea.contains(balloon)) {
            balloon.remove();
        }
    }, 4000);
}

// Fungsi untuk memulai permainan
function startGame() {
    score = 0;
    scoreDisplay.textContent = "Skor: " + score;
    gameRunning = true;

    // Membuat balon setiap 1 detik
    const balloonInterval = setInterval(createBalloon, 1000);

    // Hentikan pembuatan balon dan permainan setelah gameDuration habis
    gameTimer = setTimeout(() => {
        stopGame(balloonInterval);
    }, gameDuration);
}

// Fungsi untuk menghentikan permainan
function stopGame(balloonInterval) {
    clearInterval(balloonInterval);
    gameRunning = false;
    alert("Waktu habis! Skor akhir Anda: " + score);
}

// Tombol mulai ulang
document.getElementById("restartButton").addEventListener("click", function () {
    clearTimeout(gameTimer);
    gameArea.innerHTML = ""; // Hapus semua balon
    startGame();
});

// Memulai permainan pertama kali
startGame();
