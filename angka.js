function guessNumber() {
    const userGuess = parseInt(document.getElementById("guessInput").value);
    const resultMessage = document.getElementById("resultMessage");
    const gameMusic = document.getElementById("gameMusic");
    gameMusic.play();
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 0;
    attempts++;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultMessage.innerHTML = "<img src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png' alt='Invalid' class='icon'> Masukkan angka yang valid antara 1 hingga 10.";
        return;
    }

    if (userGuess === randomNumber) {
        resultMessage.innerHTML = `<img src='https://cdn-icons-png.flaticon.com/512/1055/1055183.png' alt='Correct' class='icon'> Selamat! Anda menebak angka yang benar (${randomNumber}) dalam ${attempts} percobaan.`;
    } else if (userGuess > randomNumber) {
        resultMessage.innerHTML = "<img src='https://cdn-icons-png.flaticon.com/512/1828/1828807.png' alt='High' class='icon'> Tebakan Anda terlalu tinggi, coba lagi.";
    } else {
        resultMessage.innerHTML = "<img src='https://cdn-icons-png.flaticon.com/512/1828/1828805.png' alt='Low' class='icon'> Tebakan Anda terlalu rendah, coba lagi.";
    }
}

 // Event listener untuk menekan tombol "Enter"
 document.getElementById("guessInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // Jika tombol yang ditekan adalah "Enter"
        guessNumber();  // Panggil fungsi guessNumber
    }
});