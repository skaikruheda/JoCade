const objectIDFromLocalStorage = JSON.parse(localStorage.getItem('objectID'));
let objectID;

if (objectIDFromLocalStorage) {
    objectID = objectIDFromLocalStorage;
}

if (objectID) {
    document.querySelector('#game-message').textContent = 'You are Logged in, ENJOY!';
    document.querySelector('#game-message').style.color = 'green';
}
else {
    document.querySelector('#game-message').textContent = 'You are Not LOGGED in!';
    document.querySelector('#game-message').style.color = 'red';
}

function convertToSlug(text) {
    return text.toLowerCase().replace(/ /g, '-');
}

document.querySelectorAll('.game-item').forEach((value, index, array) => {
    value.addEventListener('click', function() {
        if (objectID) {
            document.location = `${convertToSlug(this.textContent)}.html`;
        }
    });
});