const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
}

class Debree {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
    update() {
        this.draw();
        this.x = this.x + this.speed.x;
        this.y = this.y + this.speed.y;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue');

player.draw();

const obstacles = [];

function animate() {
    requestAnimationFrame(animate);
    obstacles.forEach((value, index, array) => {
        value.update();
    });
}

canvas.addEventListener('click', function(event) {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const speed = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
    obstacles.push(new Debree(canvas.width / 2, canvas.height / 2, 5, 'red', speed));
});

animate();