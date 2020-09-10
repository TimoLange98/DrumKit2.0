const bpmSlider = document.getElementById('bpm-slider');
const bpmDisplay = document.getElementById('bpm-display');

var bpm = 120;

const showVal = (val) => {
    bpmDisplay.textContent = `${val} bpm`;
}
