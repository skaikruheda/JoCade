const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let currentUser;

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

if (currentUser) {
    document.getElementById('game-message').textContent = 'Status: You are logged in, ENJOY!';
    document.getElementById('game-message').style.color = 'green';

    let flappyjo = document.querySelector('.flappyjo');
    flappyjo.addEventListener('click', function() {
        document.location = '../HTML/flappyjo.html';
    });
    let endlessjo = document.querySelector('.endlessjo');
    endlessjo.addEventListener('click', function() {
        document.location = '../HTML/endlessjo.html';
    });
    let crazyassault = document.querySelector('.crazyassault');
    crazyassault.addEventListener('click', function() {
        document.location = '../HTML/crazyassault.html';
    });
} else {
    document.getElementById('game-message').textContent = 'Status: You are NOT logged in, you cannot play!';
    document.getElementById('game-message').style.color = 'red';
}