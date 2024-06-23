document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cardValues = [...letters, ...letters]; // Create pairs
    cardValues.sort(() => 0.5 - Math.random()); // Shuffle cards

    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerText = value; // Set the card's value, initially hidden
        card.addEventListener('click', onCardClicked);
        gameBoard.appendChild(card);
    });

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function onCardClicked(event) {
        const clickedCard = event.target;

        if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains('flipped')) {
            return;
        }

        clickedCard.classList.add('flipped');

        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            lockBoard = true;

            if (firstCard.dataset.value === secondCard.dataset.value) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                resetBoard();
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    resetBoard();
                }, 1000);
            }
        }
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
});
