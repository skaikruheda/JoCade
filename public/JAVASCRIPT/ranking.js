fetch('/user/', {
    method: 'GET'
}).then(res => {
    return res.json();
}).then(data => {
    const result = data.data;
    for (let i = 0; i < result.length; i++) {
        const div = document.createElement('div');
        div.classList.add('ranking-person');
        div.innerHTML = `
            <div>Username: ${result[i].username}</div>
            <div>Points: ${result[i].points}</div>
            <div>Achievements: ${result[i].achievements}</div>
        `;
        document.querySelector('.ranking-container').append(div);
    }
}).catch(error => {
    console.log(error);
});

document.querySelector('#sort-users').addEventListener('click', () => {
    document.querySelector('.ranking-container').innerHTML = '';
    fetch('/user/', {
        method: 'GET'
    }).then(res => {
        return res.json();
    }).then(data => {
        const result = data.data;
        const allUsers = [];
        for (let i = 0; i < result.length; i++) {
            allUsers.push(result[i]);
        }
        const sortedUsers = allUsers.sort((a, b) => b.points - a.points);
        for (let i = 0; i < sortedUsers.length; i++) {
            const div = document.createElement('div');
            div.classList.add('ranking-person');
            div.innerHTML = `
                <div>Username: ${sortedUsers[i].username}</div>
                <div>Points: ${sortedUsers[i].points}</div>
                <div>Achievements: ${sortedUsers[i].achievements}</div>
            `;
            document.querySelector('.ranking-container').append(div);
        }
    }).catch(error => {
        console.log(error);
    });
});