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
        <h1>Hot Pursuit</h1>
        <button id="start-btn">Start</button>
    `;
    document.querySelector('#game-score').textContent = '';
}

function startGame() {
    gameBox.focus();
    gameBox.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div id="hot-pursuit-game">
            <div id="hot-pursuit-obstacle"></div>
            <div id="hot-pursuit-character"></div>
        </div>
    `;
    document.querySelector('#game-score').style.visibility = 'visible';

    let gameScore = 0;
    let hotPursitGame = document.querySelector('#hot-pursuit-game');
    let hotPursitObstacle = document.querySelector('#hot-pursuit-obstacle');
    let hotPursitCharacter = document.querySelector('#hot-pursuit-character');

    function goLeft() {
        let characterPosition = parseInt(window.getComputedStyle(hotPursitCharacter).getPropertyValue('left'));
        characterPosition -= 100;
        if (characterPosition >= 0) {
            hotPursitCharacter.style.left = characterPosition + 'px';
        }
    }

    function goRight() {
        let characterPosition = parseInt(window.getComputedStyle(hotPursitCharacter).getPropertyValue('left'));
        characterPosition += 100;
        if (characterPosition < 300) {
            hotPursitCharacter.style.left = characterPosition + 'px';
        }
    }

    hotPursitObstacle.addEventListener('animationiteration', function() {
        gameScore += 1;
        let random = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        this.style.left = (random * 100) + 'px';
        document.querySelector('#game-score').textContent = 'Score: ' + (gameScore * 5);
    });

    setInterval(() => {
        let characterLeft = parseInt(window.getComputedStyle(hotPursitCharacter).getPropertyValue('left'));
        let obstacleLeft = parseInt(window.getComputedStyle(hotPursitObstacle).getPropertyValue('left'));
        let obstacleTop = parseInt(window.getComputedStyle(hotPursitObstacle).getPropertyValue('top'));
        if (characterLeft === obstacleLeft && obstacleTop < 500 && obstacleTop > 300) {
            endGame();
            hotPursitObstacle.style.animation = 'none';
        }
    }, 1);

    function gameOver() {
        gameBox.innerHTML = `
            <h1>Game Over</h1>
            <h2 id="earned-points"></h2>
            <button onclick="startGame()">Try Again</button>
            <button onclick="gameMenu()">Home</button>
        `;
        let pointsToJoCoins = gameScore * 5;
        document.querySelector('#earned-points').textContent = 'You earned ' + pointsToJoCoins + ' JOCOINS';
        fetch(`/user/${objectID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({points: pointsToJoCoins})
        }).then(res => {
            return res.json();
        }).then(data => {
            document.querySelector('#game-coin').textContent = 'JOCOINS: ' + data.data.points;
        }).catch(error => {
            console.log(error);
        });
        if (gameScore >= 0) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Hot Pursuit - Newbie') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Hot Pursuit - Newbie"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Hot Pursuit - Newbie`;
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
        if (gameScore >= 10) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Hot Pursuit - Lucky 50') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Hot Pursuit - Lucky 50"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Hot Pursuit - Lucky 50`;
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
        if (gameScore >= 20) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Hot Pursuit - Fantastic 100') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: 'Hot Pursuit - Fantastic 100'})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Hot Pursuit - Fantastic 100`;
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
        if (gameScore >= 50) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Hot Pursuit - Perfect 250') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Hot Pursuit - Perfect 250"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Hot Pursuit - Perfect 250`;
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
        if (gameScore >= 100) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Hot Pursuit - Extreme 500') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Hot Pursuit - Extreme 500"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Hot Pursuit - Extreme 500`;
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
        if (gameScore >= 200) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Hot Pursuit - Benjamin 1000') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Hot Pursuit - Benjamin 1000"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Hot Pursuit - Benjamin 1000`;
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

    function endGame() {
        setTimeout(gameOver, 50);
        return;
    }

    gameBox.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            goLeft();
        }
        if (event.key === 'ArrowRight') {
            goRight();
        }
    });
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