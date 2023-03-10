const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const jocadeUsersFromLocalStorage = JSON.parse(localStorage.getItem('jocadeUsers'));
let jocadeUsers;

if (jocadeUsersFromLocalStorage) {
    jocadeUsers = jocadeUsersFromLocalStorage;
}

document.getElementById('disconnect-btn').onclick = function() {
    for (let i = 0; i < jocadeUsers.length; i++) {
        if (jocadeUsers[i].userName === currentUser.userName && jocadeUsers[i].passWord === currentUser.passWord) {
            jocadeUsers[i].points = currentUser.points;
            jocadeUsers[i].items = currentUser.items;
            jocadeUsers[i].flappyJoCustomization = currentUser.flappyJoCustomization;
        }
    }
    localStorage.clear();
    localStorage.setItem('jocadeUsers', JSON.stringify(jocadeUsers));
    document.location = 'account.html';
}

document.getElementById('point-el').textContent = 'JOCOINS: ' + currentUser.points;
document.getElementById('welcome-user').textContent = 'Welcome ' + currentUser.userName;

const userItems = document.querySelector('.user-items');

for (let i = 0; i < currentUser.items.length; i++) {
    let li = document.createElement('li');
    li.textContent = currentUser.items[i].split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    userItems.append(li);
    li.style.margin = '10px';
}