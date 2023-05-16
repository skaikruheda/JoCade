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
        <h1>Flappy Bird</h1>
        <button id="start-btn">Start</button>
    `;
    document.querySelector('#game-score').textContent = '';
}

function startGame() {
    gameBox.focus();
    gameBox.innerHTML = `
        <img id="return-btn" src="../IMAGE/return.png" width="10%" height="10%"></img>
        <div id="obstacle"></div>
        <div id="gap"></div>
        <div id="player"></div>
    `;

    document.querySelector('#game-score').style.visibility = 'visible';

    function gameOver() {
        gameBox.innerHTML = `
            <h1>Game Over</h1>
            <h2 id="earned-points"></h2>
            <button onclick="startGame()">Try Again</button>
            <button onclick="gameMenu()">Home</button>
        `;
        if (gameScore >= 0) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Flappy Bird - Newbie') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Flappy Bird - Newbie"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Flappy Bird - Newbie`;
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
        if (gameScore >= 5) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Flappy Bird - Lucky 5') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Flappy Bird - Lucky 5"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Flappy Bird - Lucky 5`;
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
                    if (achievements[i] === 'Flappy Bird - Fantastic 10') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Flappy Bird - Fantastic 10"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Flappy Bird - Fantastic 10`;
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
        if (gameScore >= 25) {
            fetch(`/user/achievement/${objectID}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                const achievements = data.data;
                let hasIt = false;
                for (let i = 0; i < achievements.length; i++) {
                    if (achievements[i] === 'Flappy Bird - Perfect 25') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Flappy Bird - Perfect 25"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Flappy Bird - Perfect 25`;
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
                    if (achievements[i] === 'Flappy Bird - Extreme 50') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Flappy Bird - Extreme 50"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Flappy Bird - Extreme 50`;
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
                    if (achievements[i] === 'Flappy Bird - Benjamin 100') {
                        hasIt = true;
                    }
                }
                if (!hasIt) {
                    fetch(`/user/achievement/${objectID}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({achievement: "Flappy Bird - Benjamin 100"})
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        document.querySelector('#game-alert').textContent = `Achievement: Flappy Bird - Benjamin 100`;
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
    }

    function endGame() {
        gameBox.removeEventListener('keydown', jumpHandler);
        clearInterval(alwaysRun);
        setTimeout(gameOver, 50);
        return;
    }

    let obstacle = document.querySelector('#obstacle');
    let gap = document.querySelector('#gap');
    let player = document.querySelector('#player');
    let startTime = 1660;
    let endTime = 1956;
    let gameScore = 0;
    const animationName = window.getComputedStyle(obstacle).getPropertyValue('animation-name');
    const animation = document.getAnimations().find(anim => anim.animationName === animationName);

    gap.addEventListener('animationiteration', () => {
        let options = [-40, -50, -60, -70];
        let random = Math.floor(Math.random() * 4);
        gap.style.top = `${options[random]}%`;
        gameScore = gameScore + 1;
    });

    const jumpHandler = (event) => {
        if (event.key === ' ' || event.key === 'ArrowUp') {
            jumpAction();
        }
    };

    gameBox.addEventListener('keydown', jumpHandler);

    document.querySelector('#return-btn').addEventListener('click', () => {
        clearTimeout(alwaysRun);
    });

    setInterval(() => {
        startTime += 2000;
        endTime = startTime + 296;
    }, 2020);

    let alwaysRun = setInterval(() => {
        let currentTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        document.querySelector('#player').style.top = (currentTop + 2) + 'px';
        document.querySelector('#game-score').textContent = 'Score: ' + gameScore;

        if (currentTop <= 0 || currentTop >= 475) {
            endGame();
        }

        if (animation.currentTime >= startTime && animation.currentTime <= endTime) {
            if (window.getComputedStyle(gap).getPropertyValue('top') === '-199.195px') {
                if (player.style.top <= '299px' || player.style.top >= '423px') {
                    endGame();
                }
            }
            else if (window.getComputedStyle(gap).getPropertyValue('top') === '-249px') {
                if (player.style.top <= '249px' || player.style.top >= '374px') {
                    endGame();
                }
            }
            else if (window.getComputedStyle(gap).getPropertyValue('top') === '-298.797px') {
                if (player.style.top <= '199px' || player.style.top >= '324px') {
                    endGame();
                }
            }
            else if (window.getComputedStyle(gap).getPropertyValue('top') === '-348.594px') {
                if (player.style.top <= '149px' || player.style.top >= '274px') {
                    endGame();
                }
            }
        }
    }, 10);

    function jumpAction() {
        let currentTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        document.querySelector('#player').style.top = (currentTop - 70) + 'px';
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