const cardsArray = [
    { id: 1, imgSrc: 'image1.png' },
    { id: 2, imgSrc: 'image2.png' },
    { id: 3, imgSrc: 'image3.png' },
    { id: 4, imgSrc: 'image4.png' },
    { id: 5, imgSrc: 'image5.png' },
    { id: 6, imgSrc: 'image6.png' },
    { id: 7, imgSrc: 'image7.png' },
    { id: 8, imgSrc: 'image8.png' },
    { id: 9, imgSrc: 'image1.png' },
    { id: 10, imgSrc: 'image2.png' },
    { id: 11, imgSrc: 'image3.png' },
    { id: 12, imgSrc: 'image4.png' },
    { id: 13, imgSrc: 'image5.png' },
    { id: 14, imgSrc: 'image6.png' },
    { id: 15, imgSrc: 'image7.png' },
    { id: 16, imgSrc: 'image8.png' }
];
let timer;
let timeLeft = 30;
let firstCard = null;
let secondCard = null;
let lockBoard = false; // iki kart muqayise olunarken ucuncunu kenarda saxlamaq
let matchedPairs = 0;

document.addEventListener('DOMContentLoaded', () => {
    startGame();
    document.getElementById('restart-btn').addEventListener('click', restartGame);
});

function startGame() {
    shuffleCards();
    createBoard();
    showAllCards(); // 3 saniyelik kartlari usere gosterir
}
/// burda kartlari qarisdiririq
// sort arrayin elementlerini deyisdirir
function shuffleCards() {
    cardsArray.sort(() => 0.5 - Math.random());
}
// bu htmlde kartlari yaratmaq hissesi kimidir her defe srclari cardlara yerlesdirib sonra containere qoyur
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.imgSrc = card.imgSrc;
        cardElement.innerHTML = `<img src="${card.imgSrc}" alt="Card Image">`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}
// 3 saniyelik kartlari gosterir
function showAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
        startTimer();
    }, 3000);
}
// kartlari ceviririk
function flipCard() {
    if (lockBoard) return;
    const clickedCard = this;

    if (clickedCard === firstCard) return;

    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    checkForMatch();
}
// eyniliyi yoxlayir
function checkForMatch() {
    const isMatch = firstCard.dataset.imgSrc === secondCard.dataset.imgSrc;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === cardsArray.length / 2) {
        endGame('Congratulations! You matched all the cards!');
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function startTimer() {
    timeLeft = 30;
    matchedPairs = 0;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            endGame('Time\'s up! Game over.');
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
}

function endGame(message) {
    clearInterval(timer);
    alert(message);
    document.querySelectorAll('.card').forEach(card => card.removeEventListener('click', flipCard));
}
// herseyi sifirlayir
function restartGame() {
    clearInterval(timer);
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    startGame();
}
