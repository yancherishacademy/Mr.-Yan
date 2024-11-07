// Inisialisasi canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Konfigurasi permainan
const boxSize = 20;
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;
let gameInterval;

// Musik
const gameMusic = document.getElementById("gameMusic");

// Fungsi untuk memulai game
function startGame() {
    snake = [{ x: boxSize * 5, y: boxSize * 5 }];
    direction = "RIGHT";
    score = 0;
    food = spawnFood();
    clearInterval(gameInterval);
    gameMusic.play();
    gameInterval = setInterval(gameLoop, 100);
}

// Fungsi untuk mengacak posisi makanan
function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
    };
}

// Fungsi untuk menggambar ular dan makanan
function draw() {
    // Bersihkan layar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar ular
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Gambar makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Fungsi utama game
function gameLoop() {
    // Hitung posisi kepala ular berikutnya
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;

    // Cek tabrakan dengan dinding
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }

    // Cek tabrakan dengan tubuh sendiri
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    // Tambahkan kepala baru ke ular
    snake.unshift(head);

    // Cek apakah ular makan makanan
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop(); // Hapus ekor jika tidak makan
    }

    draw();
}

// Fungsi Game Over
function gameOver() {
    clearInterval(gameInterval);
    gameMusic.pause();
    gameMusic.currentTime = 0;
    alert("Game Over! Skor Anda: " + score);
}

// Fungsi untuk mengontrol arah ular
document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});
