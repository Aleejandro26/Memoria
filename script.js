const symbols = ['😀', '😎', '😍', '🚀', '🌟', '🎉', '🍕', '🍔'];
let shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
let flippedCards = [];
let locked = false;

function createCard(symbol, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.innerHTML = '<span class="symbol">' + symbol + '</span>';
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (locked || flippedCards.length === 2 || card.classList.contains('flipped')) {
        return;
    }
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.querySelector('.symbol').textContent !== card2.querySelector('.symbol').textContent) {
            locked = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                locked = false;
            }, 1000);
        } else {
            flippedCards = [];
        }
    }
}

function resetGame() {
    flippedCards.forEach(card => card.classList.remove('flipped'));
    flippedCards = [];
    shuffledSymbols = shuffledSymbols.sort(() => Math.random() - 0.5);
    const board = document.getElementById('board');
    board.innerHTML = '';
    shuffledSymbols.forEach((symbol, index) => {
        const card = createCard(symbol, index);
        board.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    shuffledSymbols.forEach((symbol, index) => {
        const card = createCard(symbol, index);
        board.appendChild(card);
    });
});
