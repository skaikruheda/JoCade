const greeting = document.querySelector('#greeting');
const jocoin = document.querySelector('#jocoin');
const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
const jocadeUsersFromLocalStorage = JSON.parse(localStorage.getItem('jocadeUsers'));
let jocadeUsers;
let currentUser;

if (jocadeUsersFromLocalStorage) {
    jocadeUsers = jocadeUsersFromLocalStorage;
}

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

if (currentUser) {
    greeting.textContent = 'Welcome back ' + currentUser.userName;
    jocoin.textContent = 'JOCOINS: ' + currentUser.points;
    const itemBuy = document.querySelectorAll('.item-buy');

    itemBuy.forEach((value, index, array) => {
        value.addEventListener('click', function() {
            const theItemDescription = value.parentElement.children[1];
            const thePriceOfItem = value.parentElement.children[2];
            if (thePriceOfItem.textContent > currentUser.points) {
                window.alert('Insufficient Balance');
            }
            else {
                currentUser.points -= Number(thePriceOfItem.textContent);
                currentUser.items.push(theItemDescription.textContent);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                jocoin.textContent = 'JOCOINS: ' + currentUser.points;
            }
        });
    });
}
else {
    document.querySelector('#jocoin').textContent = 'Note: User must be logged in to make use of the marketplace.'
}