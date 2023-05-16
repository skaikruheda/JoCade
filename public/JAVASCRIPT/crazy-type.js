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

let gameBox = document.querySelector('.crazy-container');

function gameMenu() {
    gameBox.style.backgroundColor = 'rgb(241, 247, 181)';
    gameBox.innerHTML = `
        <h1>Crazy Type</h1>
        <button id="start-btn">Start</button>
    `;
}

function startGame() {
    let won = false;
    gameBox.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div class="crazy-text"></div>
        <textarea class="crazy-input" autofocus></textarea>
        <div id="crazy-timer"></div>
    `;

    const timer = document.querySelector('#crazy-timer');
    let seconds = 0;

    setInterval(() => {
        if (seconds === 15 && !won) {
            gameOver();
        }
        seconds++;
        timer.textContent = seconds;
    }, 1000);

    const time = document.querySelector('#crazy-timer');
    time.textContent = 0;

    const randomNumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    fetch(`https://dummyjson.com/quotes/${randomNumber}`, {
        method: 'GET'
    }).then(res => {
        return res.json();
    }).then(data => {
        let quote = data.quote.split('');
        for (let i = 0; i < quote.length; i++) {
            const span = document.createElement('span');
            span.innerHTML = quote[i];
            document.querySelector('.crazy-text').append(span);
        }
    }).catch(error => {
        console.log(error);
    });

    document.querySelector('.crazy-input').addEventListener('input', () => {
        const spanText = document.querySelector('.crazy-text').querySelectorAll('span');
        const inputArray = document.querySelector('.crazy-input').value.split('');
        let correct = true

        spanText.forEach((value, index) => {
            const character = inputArray[index]
            if (character == null) {
                value.classList.remove('crazy-correct')
                value.classList.remove('crazy-incorrect')
                correct = false
            } 
            else if (character === value.innerText) {
                value.classList.add('crazy-correct')
                value.classList.remove('crazy-incorrect')
            } 
            else {
                value.classList.remove('crazy-correct')
                value.classList.add('crazy-incorrect')
                correct = false
            }
        });
      
        if (correct) {
            won = true;
            gameOver();
        }
    });

    function gameOver() {
        gameBox.innerHTML = `
            <h1 style="background-color: blue; color: red">Game Over</h1>
            <h2 id="earned-points" style="background-color: red; color: blue;"></h2>
            <button onclick="startGame()">Try Again</button>
            <button onclick="gameMenu()">Home</button>
        `;
        if (won) {
            document.querySelector('#earned-points').textContent = 'You earned 100 points!';
            fetch(`/user/${objectID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({points: 100})
            }).then(res => {
                return res.json();
            }).then(data => {
                document.querySelector('#game-coin').textContent = 'JOCOINS: ' + data.data.points;
            }).catch(error => {
                console.log(error);
            });
            if (timer.textContent >= 0 && timer.textContent <= 5) {
                fetch(`/user/achievement/${objectID}`, {
                    method: 'GET'
                }).then(res => {
                    return res.json();
                }).then(data => {
                    const achievements = data.data;
                    let hasIt = false;
                    for (let i = 0; i < achievements.length; i++) {
                        if (achievements[i] === 'Crazy Type - ELITE') {
                            hasIt = true;
                        }
                    }
                    if (!hasIt) {
                        fetch(`/user/achievement/${objectID}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({achievement: "Crazy Type - ELITE"})
                        }).then(res => {
                            return res.json();
                        }).then(data => {
                            document.querySelector('#game-alert').textContent = `Achievement: Crazy Type - ELITE`;
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
            if (timer.textContent >= 6 && timer.textContent <= 10) {
                fetch(`/user/achievement/${objectID}`, {
                    method: 'GET'
                }).then(res => {
                    return res.json();
                }).then(data => {
                    const achievements = data.data;
                    let hasIt = false;
                    for (let i = 0; i < achievements.length; i++) {
                        if (achievements[i] === 'Crazy Type - AVERAGE') {
                            hasIt = true;
                        }
                    }
                    if (!hasIt) {
                        fetch(`/user/achievement/${objectID}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({achievement: "Crazy Type - AVERAGE"})
                        }).then(res => {
                            return res.json();
                        }).then(data => {
                            document.querySelector('#game-alert').textContent = `Achievement: Crazy Type - AVERAGE`;
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
            if (timer.textContent >= 11 && timer.textContent <= 15) {
                fetch(`/user/achievement/${objectID}`, {
                    method: 'GET'
                }).then(res => {
                    return res.json();
                }).then(data => {
                    const achievements = data.data;
                    let hasIt = false;
                    for (let i = 0; i < achievements.length; i++) {
                        if (achievements[i] === 'Crazy Type - SNAIL') {
                            hasIt = true;
                        }
                    }
                    if (!hasIt) {
                        fetch(`/user/achievement/${objectID}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({achievement: "Crazy Type - SNAIL"})
                        }).then(res => {
                            return res.json();
                        }).then(data => {
                            document.querySelector('#game-alert').textContent = `Achievement: Crazy Type - SNAIL`;
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