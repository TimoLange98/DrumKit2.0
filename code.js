const bpmSlider = document.getElementById('bpm-slider');
const bpmDisplay = document.getElementById('bpm-display');

const steps = Array.from(document.getElementById('seq-steps-container').children);

var bpm;
var playing = false;

const showVal = (val) => {
    bpmDisplay.textContent = `${val} bpm`;
    bpm = val; 
}

const play = async () => {
    steps.forEach(step => {
        await blink(step);
    })
}

const blink = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    })
}

const stop = () => {
    playing = false;
}