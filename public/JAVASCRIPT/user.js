const objectIDFromLocalStorage = JSON.parse(localStorage.getItem('objectID'));
let objectID;

if (objectIDFromLocalStorage) {
    objectID = objectIDFromLocalStorage;
}
else {
    document.location = 'account.html';
}

if (objectID) {
    fetch(`/user/${objectID}`).then(res => {
        return res.json();
    }).then(data => {
        const pointElement = document.querySelector('#point-el');
        const userAchievements = document.querySelector('.user-achievements');
        pointElement.textContent = data.data.points;
        if (data.data.achievements.length !== 0) {
            for (let i = 0; i < data.data.achievements.length; i++) {
                let li = document.createElement('li');
                li.textContent = data.data.achievements[i];
                userAchievements.append(li);
                li.style.margin = '10px';
            }
        }
        document.querySelector('#welcome-user').textContent = `Welcome ${data.data.username}!`;
    }).catch(error => {
        console.log(error);
    });
}

document.querySelector('#disconnect-btn').addEventListener('click', () => {
    localStorage.clear();
    document.location = 'account.html';
});