document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matches = 0; // Track number of matches
    let startTime;
    let endTime;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (!startTime) {
            startTime = new Date();
        }

        if (this.classList.contains('flip')) {
            // Un-flip the card if it is already flipped, and it's not part of a match
            this.classList.remove('flip');
            if (this === firstCard) {
                hasFlippedCard = false;
                firstCard = null;
            }
            return;
        }

        this.classList.add('flip');

        if (!hasFlippedCard) {
            // First card flipped
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Second card flipped
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let firstCardId = firstCard.querySelector('.back-side').getAttribute('data-card-id');
        let secondCardId = secondCard.querySelector('.back-side').getAttribute('data-card-id');

        let isMatch = firstCardId === secondCardId;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matches++;
        if (matches === cards.length / 2) {
            endTime = new Date();
            showGameOverPopup();
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 300);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffle() {
        const game = document.querySelector('.memory-game');
        const cardsArray = Array.from(cards);

        // Fisher-Yates Shuffle Algorithm
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }

        // Append shuffled cards to the container
        cardsArray.forEach(card => game.appendChild(card));
    }

    function showGameOverPopup() {
        const popup = document.getElementById('game-over');
        const timeTaken = calculateTimeTaken(startTime, endTime)
        const timeElement = popup.querySelector('h3');
        timeElement.textContent = `Time Taken: ${timeTaken}`;
        popup.style.display = 'block';
    }

    function calculateTimeTaken(start, end) {
        const timeDiff = end - start;
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minutes and ${remainingSeconds} seconds`;
    }

    window.restartGame = function() {
        const popup = document.getElementById('game-over');
        popup.style.display = 'none';

        // Reset all cards
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });

        startTime = null;
        endTime = null;

        shuffle();
        matches = 0;
        resetBoard();
    }

    cards.forEach(card => card.addEventListener('click', flipCard));

    // Call shuffle function to shuffle the cards at the start
    shuffle();
});

window.onload = function() {
    let i = 0;
    let direction = 1;
    const animateGradient = () => {
        document.getElementById('game-over').style.background = `linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(76,29,149,1) ${i}%, rgba(0,0,0,1) 100%)`;
        if (i >= 100) {
            direction = -1;
        } else if (i <= 0) {
            direction = 1;
        }
        i += direction;
    };

    setInterval(animateGradient, 20);
}