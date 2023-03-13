const jocadeUsersFromLocalStorage = JSON.parse(localStorage.getItem('jocadeUsers'));
const currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
let jocadeUsers = [];
let currentUser;

if (jocadeUsersFromLocalStorage) {
    jocadeUsers = jocadeUsersFromLocalStorage;
}

if (currentUserFromLocalStorage) {
    currentUser = currentUserFromLocalStorage;
}

if (currentUser) {
    document.location = 'user.html';
}

function User(userName, passWord, points) {
    this.userName = userName;
    this.passWord = passWord;
    this.points = points;
    this.items = [];
    this.flappyJoCustomization = new Map([
        ['character', 'coral'],
        ['obstacle', 'black'],
        ['background', 'rgb(249, 245, 231)']
    ]);
};

const loginBtn = document.getElementById('login-btn');
const createBtn = document.getElementById('create-btn');

createBtn.addEventListener('click', function() {
    let userName = document.getElementById('username-el');
    let passWord = document.getElementById('password-el');
    let loginError = document.getElementById('login-error');
    if (userName.value == '' || passWord.value == '') {
        loginError.textContent = 'Empty Username or Password Field!';
        loginError.style.color = 'red';
        setTimeout(() => {
            loginError.textContent = '';
        }, 5000);
    } else {
        function hasSpaces(str) {
            return str.indexOf(' ') >= 0;
        }
        if (hasSpaces(userName.value) || hasSpaces(passWord.value)) {
            loginError.textContent = 'Please remove spaces!';
            loginError.style.color = 'red';
            setTimeout(() => {
                loginError.textContent = '';
            }, 5000);
        } else {
            let isTaken = false;
            for (let i = 0; i < jocadeUsers.length; i++) {
                if (userName.value === jocadeUsers[i].userName) {
                    loginError.textContent = 'Username is taken try another one!';
                    setTimeout(() => {
                        loginError.textContent = '';
                    }, 5000);
                    isTaken = true;
                }
            }
            if (!isTaken) {
                loginError.textContent = 'Successfully Created Account!';
                loginError.style.color = 'green';
                setTimeout(() => {
                    loginError.textContent = '';
                }, 5000);
                const newUser = new User(userName.value, passWord.value, 0);
                newUser.flappyJoCustomization = Array.from(newUser.flappyJoCustomization);
                jocadeUsers.push(newUser);
                localStorage.setItem('jocadeUsers', JSON.stringify(jocadeUsers));
            }
        }
    }
});

loginBtn.addEventListener('click', function() {
    let userName = document.getElementById('username-el');
    let passWord = document.getElementById('password-el');
    let loginError = document.getElementById('login-error');
    if (userName.value == '' || passWord.value == '') {
        loginError.textContent = 'Empty Username or Password Field!';
        loginError.style.color = 'red';
        setTimeout(() => {
            loginError.textContent = '';
        }, 5000);
    } else {
        function hasSpaces(str) {
            return str.indexOf(' ') >= 0;
        }
        if (hasSpaces(userName.value) || hasSpaces(passWord.value)) {
            loginError.textContent = 'Please remove spaces!';
            loginError.style.color = 'red';
            setTimeout(() => {
                loginError.textContent = '';
            }, 5000);
        } else {
            let foundUser = false;
            for (let i = 0; i < jocadeUsers.length; i++) {
                if (jocadeUsers[i].userName == userName.value && jocadeUsers[i].passWord == passWord.value) {
                    loginError.textContent = 'Logged In!';
                    loginError.style.color = 'green';
                    localStorage.setItem('currentUser', JSON.stringify(jocadeUsers[i]));
                    document.location = 'user.html';
                    foundUser = true;
                }
            }
            if (foundUser == false) {
                loginError.textContent = 'Invalid Username or Password';
                loginError.style.color = 'red';
                setTimeout(() => {
                    loginError.textContent = '';
                }, 5000);
            }
        }
    }
});