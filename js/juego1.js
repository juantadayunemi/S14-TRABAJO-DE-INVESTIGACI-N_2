function LoadJuego() {
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let flippedCards = [];
    let matchedCards = [];

    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5);

    const memoryGame = document.getElementById('memoryGame');

    // Create card elements and append to the game board
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardIndex = index;
        cardElement.textContent = card;
        cardElement.addEventListener('click', flipCard);
        memoryGame.appendChild(cardElement);
    });

    function flipCard() {
        if (flippedCards.length < 2) {
            const selectedCard = this;
            selectedCard.classList.add('flipped');
            flippedCards.push(selectedCard);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const index1 = card1.dataset.cardIndex;
        const index2 = card2.dataset.cardIndex;

        if (cards[index1] === cards[index2]) {
            // Match found
            matchedCards.push(card1, card2);
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
        } else {
            // No match, flip back the cards
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];

        // Check if all cards are matched
        if (matchedCards.length === cards.length) {
            alert('¡Felicidades! Has encontrado todas las coincidencias.');
        }
    }
}
