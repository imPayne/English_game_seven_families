document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const playerNamesInput = document.getElementById('player-names');
    const playerNames = playerNamesInput.value;
    const playerNamesArray = playerNames.split(',');

    const errorMessage = document.getElementById('error-message');

    if (playerNames.trim() === '') {
        errorMessage.style.display = 'block';
        return;
    }
    

    errorMessage.style.display = 'none';

    const randomIndex = Math.floor(Math.random() * playerNamesArray.length);
    const randomPlayer = playerNamesArray[randomIndex];

    const resultDisplay = document.getElementById('result');
    resultDisplay.textContent = `The player who start is ${randomPlayer}`;

    resultDisplay.classList.add('show');
});
