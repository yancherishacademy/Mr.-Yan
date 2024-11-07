const gridSize = 5; // Ukuran grid 5x5
const totalCells = gridSize * gridSize;
let bombPosition;
let gameEnded = false;
let musicStarted = false; // Menandakan apakah musik sudah dimulai

// Fungsi untuk memulai ulang permainan
function startGame() {
    gameEnded = false;
    musicStarted = false; // Reset status musik
    bombPosition = Math.floor(Math.random() * totalCells); // Tentukan posisi bom secara acak
    document.getElementById("message").textContent = "";
    generateGrid();
}

// Fungsi untuk membuat grid
function generateGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; // Hapus isi grid

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        grid.appendChild(cell);
    }
}

// Fungsi ketika kotak diklik
function handleCellClick(event) {
    if (gameEnded) return;

    // Memulai musik saat klik pertama
    if (!musicStarted) {
        const backgroundMusic = document.getElementById("backgroundMusic");
        backgroundMusic.play();
        musicStarted = true;
    }

    const cell = event.target;
    const cellIndex = parseInt(cell.dataset.index);

    if (cellIndex === bombPosition) {
        cell.classList.add("bomb");
        cell.textContent = "💣";
        document.getElementById("message").textContent = "Game Over! Kamu menemukan bom!";
        
        // Mainkan efek suara bom
        const bombSound = document.getElementById("bombSound");
        bombSound.play();

        gameEnded = true;
    } else {
        cell.classList.add("revealed");
        cell.textContent = "✓";
    }

    // Cek apakah semua kotak selain bom sudah dibuka
    if (document.querySelectorAll(".cell:not(.revealed):not(.bomb)").length === 1) {
        document.getElementById("message").textContent = "Selamat! Kamu memenangkan permainan!";
        gameEnded = true;
    }
}

// Inisialisasi permainan saat halaman dimuat
window.onload = startGame;
