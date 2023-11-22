class Player {
    constructor(name) {
      this.name = name;
      this.score = 0;
      this.htmlElement = null;
      this.scoreElement = null;
      this.addButton = null;
      this.decreaseButton = null;
      this.nameElement = null;
      function add() {
        this.score++;
        // this.scoreElement.textContent = this.score;
      }

      function decrease() {
        this.score--;
        // this.scoreElement.textContent = this.score;
      }
    }
  }

document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const playerNamesInput = document.getElementById('player-names');
    const playerNames = playerNamesInput.value;
    const playerNamesArray = playerNames.split(',');
    let playerArrayObj = [];

    for (let i = 0; i < playerNamesArray.length; i++) {
        playerArrayObj.push(new Player(playerNamesArray[i]));
    }

    const errorMessage = document.getElementById('error-message');

    if (playerNames.trim() === '') {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const randomIndex = Math.floor(Math.random() * playerNamesArray.length);
    const randomPlayer = playerNamesArray[randomIndex];

    const resultDisplay = document.getElementById('result');
    resultDisplay.textContent = `The player who start ${randomPlayer}`;

    resultDisplay.classList.add('show');

    for (let i = 0; i < playerArrayObj.length; i++) {
        playerArrayObj[i].htmlElement = document.createElement('div');
        playerArrayObj[i].htmlElement.setAttribute('id', `div-${i}`);
        playerArrayObj[i].addButton = document.createElement('button');
        playerArrayObj[i].decreaseButton = document.createElement('button');
        playerArrayObj[i].scoreElement = document.createElement('span');
        playerArrayObj[i].scoreElement.textContent = `Score: ${playerArrayObj[i].score}`;
        playerArrayObj[i].addButton.textContent = '+';
        playerArrayObj[i].decreaseButton.textContent = '-';
        playerArrayObj[i].nameElement = document.createElement('span');
        playerArrayObj[i].nameElement.textContent = `Joueur: ${playerArrayObj[i].name}`;

        document.getElementById("leaderboardDiv").appendChild(playerArrayObj[i].htmlElement);
        document.getElementById(`div-${i}`).appendChild(playerArrayObj[i].nameElement);
        document.getElementById(`div-${i}`).appendChild(playerArrayObj[i].scoreElement);
        document.getElementById(`div-${i}`).appendChild(playerArrayObj[i].decreaseButton);
        document.getElementById(`div-${i}`).appendChild(playerArrayObj[i].addButton);
        
    }
});
