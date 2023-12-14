//TODO add ability to change brush type

const canvas = document.querySelector('.drawing-pad');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// beginning defaults
ctx.strokeStyle = 'hsl(0, 100%, 37%)';
ctx.fillStyle = 'hsl(0, 100%, 37%)';
ctx.lineWidth = 0;

let active = 0;
let r = 10;
let rInc = 1;
let hue = 0;

canvas.addEventListener('mousedown', (e) => {
	active = 1;
	draw(e.clientX, e.clientY);
});
canvas.addEventListener('mousemove', (e) => {
	if (active === 1) draw(e.clientX, e.clientY);
});
canvas.addEventListener('mouseup', (e) => {
	active = 0;
});

const draw = (x, y) => {
	console.log(x, y, r, rInc);
	// adjust radius and hue
	if (r === 15) rInc = 0;
	if (r === 5) rInc = 1;
	if (rInc === 1) {
		r++;
	} else {
		r--;
	}
	hue++;

	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fillStyle = 'hsl(' + hue + ', 100%, 37%)';
	ctx.fill();
};

document.getElementById('reset-button').addEventListener('click', (e) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});
