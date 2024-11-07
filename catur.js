const chessBoard = document.getElementById("chessBoard");
let selectedPiece = null;
let currentPlayer = "white";
let musicStarted = false; // Menandakan apakah musik sudah dimulai

// Konfigurasi bidak awal
const initialBoardSetup = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

// Fungsi untuk membuat papan catur
function createBoard() {
    chessBoard.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", (row + col) % 2 === 0 ? "white" : "black");
            cell.dataset.row = row;
            cell.dataset.col = col;

            const piece = initialBoardSetup[row][col];
            if (piece) {
                const pieceElement = document.createElement("span");
                pieceElement.textContent = piece;
                pieceElement.classList.add("piece");
                pieceElement.dataset.color = row < 2 ? "black" : "white";
                cell.appendChild(pieceElement);
            }

            cell.addEventListener("click", handleCellClick);
            chessBoard.appendChild(cell);
        }
    }
}

// Fungsi untuk menangani klik sel papan
function handleCellClick(event) {
    const cell = event.currentTarget;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (selectedPiece) {
        movePiece(cell, row, col);
    } else {
        selectPiece(cell);
    }
}

// Fungsi untuk memilih bidak
function selectPiece(cell) {
    const piece = cell.querySelector(".piece");
    if (piece && piece.dataset.color === currentPlayer) {
        selectedPiece = { element: piece, row: parseInt(cell.dataset.row), col: parseInt(cell.dataset.col) };
        cell.classList.add("selected");
    }
}

// Fungsi untuk memindahkan bidak
function movePiece(cell, row, col) {
    const targetPiece = cell.querySelector(".piece");

    // Cek jika sel tujuan berisi bidak lawan
    if (targetPiece && targetPiece.dataset.color !== currentPlayer) {
        targetPiece.remove(); // Hapus bidak lawan
    } else if (targetPiece && targetPiece.dataset.color === currentPlayer) {
        alert("Langkah tidak valid! Anda tidak bisa memakan bidak sendiri.");
        deselectPiece();
        return;
    }

    // Mainkan musik saat bidak pertama kali digerakkan
    if (!musicStarted) {
        const backgroundMusic = document.getElementById("backgroundMusic");
        backgroundMusic.play();
        musicStarted = true;
    }

    // Pindahkan bidak ke sel tujuan
    cell.appendChild(selectedPiece.element);

    // Cek apakah langkah ini menyebabkan skak
    if (isKingInCheck(currentPlayer)) {
        alert("Langkah tidak valid! Raja Anda dalam keadaan skak.");
        deselectPiece();
        return;
    }

    // Batalkan pilihan bidak dan ganti giliran pemain
    deselectPiece();
    currentPlayer = currentPlayer === "white" ? "black" : "white";

    // Cek apakah langkah ini menyebabkan skakmat
    if (isCheckmate(currentPlayer)) {
        alert("Skakmat! " + (currentPlayer === "white" ? "Hitam" : "Putih") + " menang!");
    } else {
        alert("Giliran pemain: " + currentPlayer);
    }
}

// Fungsi untuk membatalkan pilihan bidak
function deselectPiece() {
    const selectedCell = chessBoard.querySelector(".selected");
    if (selectedCell) selectedCell.classList.remove("selected");
    selectedPiece = null;
}

// Fungsi untuk mengecek apakah raja pemain dalam keadaan skak
function isKingInCheck(player) {
    const kingPosition = findKing(player);
    // Panggil fungsi validasi untuk semua bidak lawan
    // Jika salah satu bidak lawan dapat mencapai posisi raja, maka raja dalam keadaan skak
    return isAttackedByOpponent(kingPosition, player === "white" ? "black" : "white");
}

// Fungsi untuk mencari posisi raja
function findKing(player) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = chessBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            const piece = cell.querySelector(".piece");
            if (piece && piece.textContent === (player === "white" ? "♔" : "♚")) {
                return { row, col };
            }
        }
    }
    return null;
}

// Fungsi untuk mengecek apakah posisi tertentu diserang oleh bidak lawan
function isAttackedByOpponent(position, opponentColor) {
    // Di sini kita harus memeriksa semua bidak lawan dan melihat apakah ada yang bisa mencapai posisi raja
    // Implementasi lengkap perlu melibatkan aturan setiap bidak (pion, benteng, kuda, menteri, dll.)
    return false; // Placeholder
}

// Fungsi untuk mengecek apakah pemain dalam keadaan skakmat
function isCheckmate(player) {
    if (!isKingInCheck(player)) return false;

    // Periksa apakah ada langkah yang dapat mengeluarkan raja dari skak
    // Implementasi lengkap perlu mencoba semua kemungkinan langkah pemain dan melihat apakah skak dapat dihindari
    return false; // Placeholder
}

// Inisialisasi papan permainan
createBoard();
