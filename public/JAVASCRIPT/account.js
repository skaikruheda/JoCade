const objectIDFromLocalStorage = JSON.parse(localStorage.getItem('objectID'));

if (objectIDFromLocalStorage) {
    document.location = 'user.html';
}

const createButton = document.querySelector('#create-btn');
const loginButton = document.querySelector('#login-btn');
const accountMessage = document.querySelector('#account-message');

createButton.addEventListener('click', () => {
    const usernameValue = document.querySelector('#username-el').value;
    const passwordValue = document.querySelector('#password-el').value;
    const accountMessage = document.querySelector('#account-message');

    if (usernameValue == '' || passwordValue == '') {
        accountMessage.textContent = 'Empty Username or Password Field!';
        accountMessage.style.color = 'red';
        setTimeout(() => {
            accountMessage.textContent = '';
        }, 1000);
    } else {
        function hasSpaces(str) {
            return str.indexOf(' ') >= 0;
        }
        if (hasSpaces(usernameValue) || hasSpaces(passwordValue)) {
            accountMessage.textContent = 'Please remove spaces!';
            accountMessage.style.color = 'red';
            setTimeout(() => {
                accountMessage.textContent = '';
            }, 1000);
        } else {
            fetch('/user', {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                let isTaken = false;
                for (let i = 0; i < data.data.length; i++) {
                    if (usernameValue === data.data[i].username) {
                        accountMessage.textContent = 'Username is taken try another one!';
                        accountMessage.style.color = 'red';
                        setTimeout(() => {
                            accountMessage.textContent = '';
                        }, 1000);
                        isTaken = true;
                    }
                }
                if (!isTaken) {
                    fetch('/user', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: usernameValue,
                            password: passwordValue
                        })
                    }).then(res => {
                        return res.json();
                    }).then(data => {
                        accountMessage.textContent = 'Successfully Created Account!';
                        accountMessage.style.color = 'green';
                        setTimeout(() => {
                            accountMessage.textContent = '';
                        }, 1000);
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
});

loginButton.addEventListener('click', function() {
    const usernameValue = document.querySelector('#username-el').value;
    const passwordValue = document.querySelector('#password-el').value;
    const accountMessage = document.querySelector('#account-message');

    if (usernameValue == '' || passwordValue == '') {
        accountMessage.textContent = 'Empty Username or Password Field!';
        accountMessage.style.color = 'red';
        setTimeout(() => {
            accountMessage.textContent = '';
        }, 1000);
    } else {
        function hasSpaces(str) {
            return str.indexOf(' ') >= 0;
        }
        if (hasSpaces(usernameValue) || hasSpaces(passwordValue)) {
            accountMessage.textContent = 'Please remove spaces!';
            accountMessage.style.color = 'red';
            setTimeout(() => {
                accountMessage.textContent = '';
            }, 1000);
        } else {
            fetch('/user', {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                let foundUser = false;
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].username == usernameValue && data.data[i].password == passwordValue) {
                        accountMessage.textContent = 'Logged In!';
                        accountMessage.style.color = 'green';
                        document.location = 'user.html';
                        foundUser = true;
                        localStorage.setItem('objectID', JSON.stringify(data.data[i]._id));
                    }
                }
                if (!foundUser) {
                    accountMessage.textContent = 'Invalid Username or Password';
                    accountMessage.style.color = 'red';
                    setTimeout(() => {
                        accountMessage.textContent = '';
                    }, 1000);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
});