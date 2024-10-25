const soundBoard = {
	a: '/audio/drums/clap.wav',
	s: '/audio/drums/hihat.wav',
	f: '/audio/drums/openhat.wav',
	d: '/audio/drums/boom.wav',
	h: '/audio/drums/ride.wav',
	j: '/audio/drums/snare.wav',
	k: '/audio/drums/tom.wav',
	l: '/audio/drums/tink.wav',
	Space: '/audio/drums/kick.wav',
};

const synthBoard = {
	q: 'C5',
	w: 'D5',
	e: 'E5',
	r: 'F5',
	t: 'G5',
	y: 'A5',
	u: 'B5',
	i: 'C6',
	o: 'D6',
	p: 'E6',
};

const createAudioContext = () => {
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	return new AudioContext();
};

class DrumMachine {
	constructor() {
		this.audioContext = null;
		this.soundBuffers = new Map();
		this.keyMappings = new Map();
		this.autoPlayButton = document.querySelector('#auto-play');
		this.startButton = document.querySelector('#start-drum-machine');
		this.stopAutoPlayButton = document.querySelector('#stop-auto-play');
		this.keysWrapper = document.querySelector('.keys');
		this.tone = new Tone.Synth().toMaster();
	}

	async init() {
		console.log('Drum Machine Starting Up...');
		if (!this.audioContext) {
			this.audioContext = createAudioContext();
		}
		for (const [key, value] of Object.entries(soundBoard)) await this.loadDrum(key, value);
		this.setupListeners();
		this.autoPlayButton.disabled = false;
		this.startButton.disabled = true;
		this.keysWrapper.classList = 'keys';
		console.log('Drum Machine Ready');
	}

	async loadDrum(key, soundUrl) {
		try {
			const response = await fetch(soundUrl);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
			this.soundBuffers.set(key, audioBuffer);
			return true;
		} catch (e) {
			console.error('Error loading sound:', e);
			return false;
		}
	}

	playDrum(key) {
		const buffer = this.soundBuffers.get(key);
		if (buffer && this.audioContext) {
			const source = this.audioContext.createBufferSource();
			source.buffer = buffer;
			source.connect(this.audioContext.destination);
			source.start();
			this.animateSound(key);
		}
	}

	animateSound(key) {
		const drum = document.querySelector(`div[data-key="${key}"]`);
		if (drum) {
			// TODO add a fade out animation to the color; strike-and-fade
			drum.style.background = '#00adad';
			window.setTimeout(() => {
				drum.style.background = '#ededed';
			}, 100);
		}
	}

	playTone(key) {
		this.tone.triggerAttack(synthBoard[key]);
		setTimeout(() => this.tone.triggerRelease(), 125);
		this.animateSound('Synth');
	}

	playToneScale() {
		const notes = [
			'e',
			'w',
			'q',
			'w',
			'e',
			'e',
			'e',
			'e',
			'w',
			'w',
			'w',
			'w',
			'e',
			't',
			't',
			't',
			'e',
			'w',
			'q',
			'w',
			'e',
			'e',
			'e',
			'e',
			'w',
			'w',
			'e',
			'w',
			'q',
		];
		let delay = 0;
		notes.forEach((note) => {
			setTimeout(() => {
				this.playTone(note);
				this.animateSound(note);
			}, delay);
			delay += 250;
		});
	}

	setupListeners() {
		document.addEventListener('keydown', (e) => {
			const key = e.key === ' ' ? 'Space' : e.key;
			if (soundBoard.hasOwnProperty(key)) this.playDrum(key);
			if (synthBoard.hasOwnProperty(key)) this.playTone(key);
		});
	}

	autoPlay() {
		this.autoPlayButton.disabled = true;
		this.stopAutoPlayButton.disabled = false;

		let beat = 4;
		window.autoPlayInterval = setInterval(() => {
			(beat + 3) % 4 === 0 ? this.playDrum('f') : this.playDrum('s');
			if (beat % 4 === 0) this.playDrum('Space');
			if ((beat + 2) % 4 === 0) this.playDrum('j');
			if ((beat + 4) % 8 === 0) this.playDrum('h');
			beat++;
		}, 250);
	}

	stopAutoPlay = () => {
		this.autoPlayButton.disabled = false;
		this.stopAutoPlayButton.disabled = true;
		if (window.autoPlayInterval) clearInterval(window.autoPlayInterval);
	};
}

document.addEventListener('DOMContentLoaded', () => {
	window.drumMachine = new DrumMachine();
});

// const playToneScale = () => {
// 	console.log('play scale');
// };
