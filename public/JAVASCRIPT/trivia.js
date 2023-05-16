const objectIDFromLocalStorage = JSON.parse(localStorage.getItem('objectID'));
let objectID;

if (objectIDFromLocalStorage) {
    objectID = objectIDFromLocalStorage;
}

if (objectID) {
    fetch(`/user/${objectID}`).then(res => {
        return res.json();
    }).then(data => {
        document.querySelector('#game-coin').textContent = 'JOCOINS: ' + data.data.points;
    }).catch(error => {
        console.log(error);
    });
}

let gameBox = document.querySelector('.game-box');

function gameMenu() {
    gameBox.style.backgroundColor = 'rgb(241, 247, 181)';
    gameBox.innerHTML = `
        <h1 id="trivia-visible">Trivia</h1>
        <button id="start-btn">Start</button>
    `;
}

function startGame() {
    let won = false;
    let count = 0;
    gameBox.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div id="quiz-question">Quiz Question</div>
        <div class="quiz-options">
        </div>
        <div id="submit-btn">SUBMIT</div>
    `;

    fetch('https://opentdb.com/api.php?amount=1', {
        method: 'GET'
    }).then(res => {
        return res.json();
    }).then(data => {
        let question;
        const questionOptions = [];
        let questionAnswer;
        question = data.results[0].question;
        questionOptions.push([...data.results[0].incorrect_answers, data.results[0].correct_answer].sort(() => Math.random() - 0.5));
        questionAnswer = data.results[0].correct_answer;
        document.querySelector('#quiz-question').innerHTML = question;
        for (let i = 0; i < questionOptions[0].length; i++) {
            const div = document.createElement('div');
            div.innerHTML = questionOptions[0][i];
            div.classList.add('quiz-option');
            document.querySelector('.quiz-options').append(div);
        }
        document.querySelectorAll('.quiz-option').forEach(value => {
            value.addEventListener('click', function() {
                if (this.textContent === questionAnswer) {
                    won = true;
                    gameOver();
                }
                else {
                    won = false;
                    gameOver();
                }
            });
        });
    }).catch(error => {
        console.log(error);
    })

    function gameOver() {
        gameBox.innerHTML = `
            <h1 style="background-color: blue; color: red">Game Over</h1>
            <h2 id="earned-points" class="visible"></h2>
            <button onclick="startGame()">Try Again</button>
            <button onclick="gameMenu()">Home</button>
        `;
        if (won) {
            document.querySelector('#earned-points').textContent = 'You earned 50 points!';
            fetch(`/user/${objectID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({points: 50})
            }).then(res => {
                return res.json();
            }).then(data => {
                document.querySelector('#game-coin').textContent = 'JOCOINS: ' + data.data.points;
            }).catch(error => {
                console.log(error);
            });
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === `Trivia - KING`) {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: `Trivia - KING`})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Trivia - KING`;
                        setTimeout(() => {
                            document.querySelector('#game-alert').textContent = ``;
                        }, 2000);
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            document.querySelector('#earned-points').textContent = 'You earned 0 points!';
        }
    }
}

const menuFunctions = {
    'start-btn': startGame,
    'return-btn': gameMenu
};
  
gameBox.addEventListener('click', (event) => {
    const buttonId = event.target.getAttribute('id');
    if (buttonId in menuFunctions) {
      menuFunctions[buttonId]();
    }
});