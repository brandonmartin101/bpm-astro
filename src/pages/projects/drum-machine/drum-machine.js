document.addEventListener('keydown', (e) => {
	//TODO replace keyCode with key
	if ([65, 83, 32, 70, 68, 72, 74, 75, 76].includes(e.keyCode)) playSound(e.keyCode);
});

const playSound = (key) => {
	let sound = document.querySelector('audio[data-key="' + key + '"]');
	sound.currentTime = 0;
	sound.play();
	animateDrum(key);
};

const animateDrum = (key) => {
	document.querySelector('div[data-key="' + key + '"]').style.background = '#00adad';
	window.setTimeout(() => {
		document.querySelector('div[data-key="' + key + '"]').style.background = '#ededed';
	}, 100);
};

const autoPlay = () => {
	document.querySelector('#auto-play').disabled = true;
	document.querySelector('#stop-auto-play').disabled = false;
	setInterval(() => {
		playSound(32);
	}, 1000); // kick
	setInterval(() => {
		playSound(83);
	}, 250); // hi-hat
	setTimeout(() => {
		setInterval(() => {
			playSound(74);
		}, 1000);
	}, 500); // snare
};

const stopAutoPlay = () => {
	document.querySelector('#auto-play').disabled = false;
	document.querySelector('#stop-auto-play').disabled = true;
	for (let i = 1; i < 99999; i++) window.clearInterval(i);
};

document.addEventListener('keydown', (e) => {
	if ([81, 87, 69, 82, 84, 89, 85, 73, 79, 80].includes(e.keyCode)) playTone(e.keyCode);
});

const playTone = (key) => {
	let tone = new Tone.Synth().toMaster();
	tone.triggerAttack('C4');
	document.addEventListener('keyup', (e) => {
		tone.triggerRelease();
	});
};

const playToneScale = () => {
	console.log('play scale');
};
