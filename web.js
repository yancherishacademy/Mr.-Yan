window.addEventListener("load", function() {
    const gameMusic = document.getElementById("gameMusic");
    gameMusic.play().catch(error => {
        console.log("Autoplay tidak diizinkan oleh browser.");
    });
});