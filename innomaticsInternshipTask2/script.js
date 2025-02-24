const categories = {
    fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥭", "🍍"],
    emojis: ["😀", "😂", "😍", "😎", "😜", "🤩", "😱", "🥳"],
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
    planets: ["🌍", "🪐", "🌕", "⭐", "☀️", "🌑", "🌟", "🌌"],
    flags: ["🇺🇸", "🇬🇧", "🇫🇷", "🇩🇪", "🇮🇳", "🇨🇦", "🇯🇵", "🇦🇺"]
};

let gameBoard, score, timer, cards, flippedCards, matchedPairs, timeLeft, gameTimer;

function startGame(category) {
    document.getElementById("landing-page").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    gameBoard = document.getElementById("game-board");
    score = 0;
    matchedPairs = 0;
    timeLeft = 30;
    flippedCards = [];
    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timeLeft;

    createBoard(category);
    startTimer();
}

function createBoard(category) {
    let items = [...categories[category], ...categories[category]]; // Create pairs
    items.sort(() => Math.random() - 0.5); // Shuffle
    gameBoard.innerHTML = "";

    items.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = item;
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains("matched")) return;

    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        score += 10;
        matchedPairs++;
        if (matchedPairs === 8) endGame("You Win! 🎉");
    } else {
        setTimeout(() => {
            card1.textContent = "";
            card2.textContent = "";
        }, 1000);
    }
    flippedCards = [];
    document.getElementById("score").textContent = score;
}

function startTimer() {
    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) endGame("Time's Up! 😢");
    }, 1000);
}

function endGame(message) {
    clearInterval(gameTimer);
    alert(message + " Final Score: " + score);
    restartGame();
}

function restartGame() {
    clearInterval(gameTimer);
    document.getElementById("landing-page").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}
