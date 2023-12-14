document.addEventListener('DOMContentLoaded', () => {
	changeImg(1);

	// Pickr - JS Color Picker
	const pickr = Pickr.create({
		el: '#color-picker',
		default: 'rgba(0, 0, 0, 1)',
		defaultRepresentation: 'RGBA',

		components: {
			// Main components
			preview: false,
			opacity: true,
			hue: true,

			// Input / output Options
			interaction: {
				hex: false,
				rgba: true,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				clear: false,
				save: true,
			},
		},

		onChange(hsva, instance) {
			let color = hsva.toRGBA().toString();
			document.getElementById('drop-shadow-color-picker').value = color;
			document.querySelector('html').style.setProperty('--img-drop-shadow-color', color);
		},
	});
});
