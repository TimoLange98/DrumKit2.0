//Option-elements
const bpmSlider = document.getElementById('bpm-slider');
const bpmDisplay = document.getElementById('bpm-display');
const toggleBarLengthButton = document.getElementById('toggleBarLength-btn');
const toggleBeatButton = document.getElementById('toggleBeat-btn');

//Sound-steps-container and matrix-row container
const stepsContainer = document.getElementById('seq-steps-wrap');
const matrixRowsContainer = Array.from(document.getElementsByClassName('matrix-field-wrap'));

//Other globals
var steps = Array.from(document.getElementById('seq-steps-wrap').children);

var bpm = 120;
var beat = 8;
var barLength = 8;

var playing = false;
var running = false;

//OPTIONS//

//Showing bpm
const changeVal = (val) => {
    bpmDisplay.textContent = `${val} bpm`;
    bpm = val;
}

//Resetting bpm
const resetBpm = () => {
    document.getElementById('bpm-slider').value = 120;
    changeVal(120);
}

//Playing
const play = () => {
    if (running && playing)
        return;

    playing = true;
    running = true;
    document.getElementById('toggleBarLength-btn').disabled = true;
    document.getElementById('toggleBeat-btn').disabled = true;

    showRun();
}

const showRun = async (i = 0) => {
    if (!playing)
        return;

    var index = i++ % steps.length;
    steps[index].classList.add('active-step');
    await delay((60 / bpm) * 1000 / (beat / 4));
    steps[index].classList.remove('active-step');
    showRun(i);
}

const delay = (ms) => {
    return new Promise(rslv => {
        setTimeout(rslv, ms);
    });
}

const stop = () => {
    playing = false;
    running = false;
    document.getElementById('toggleBarLength-btn').disabled = false;
}

//Toogle bar length
const toggleBarLength = () => {
    barLength = barLength < 32 ? barLength * 2 : 8;
    toggleBarLengthButton.textContent = barLength;

    if (barLength === 8) {
        removeBars();
        steps = Array.from(document.getElementById('seq-steps-wrap').children);
    } else if (barLength === 16) {
        makeBar(2, 1);
        steps = Array.from(document.getElementById('seq-steps-wrap').children);
    } else if (barLength === 32) {
        makeBar(3, 2);
        steps = Array.from(document.getElementById('seq-steps-wrap').children);
    }
    fillBarContent();
}

const makeBar = (index, n) => {
    if (index % 2 === 0) {
        Array.from(Array(8)).forEach(_ => {
            var stepDiv = document.createElement('div');
            stepDiv.classList.add('step-mark', 'even-beat-step');
            stepsContainer.appendChild(stepDiv);
            matrixRowsContainer.forEach(container => {
                var matrixDiv = document.createElement('div');
                matrixDiv.classList.add('matrix-field', 'even-beat-matrix-field')
                container.appendChild(matrixDiv);
            })
        })
        if (--n > 0)
            makeBar(++index, n);
    } else {
        Array.from(Array(8)).forEach(_ => {
            var stepDiv = document.createElement('div');
            stepDiv.classList.add('step-mark', 'odd-beat-step');
            stepsContainer.appendChild(stepDiv);
            matrixRowsContainer.forEach(container => {
                var matrixDiv = document.createElement('div');
                matrixDiv.classList.add('matrix-field', 'odd-beat-matrix-field')
                container.appendChild(matrixDiv);
            })
        })
        if (--n > 0)
            makeBar(++index, n);
    }
}

const removeBars = () => {
    Array.from(Array(24)).forEach(_ => {
        stepsContainer.removeChild(stepsContainer.lastChild);
        matrixRowsContainer.forEach(container => {
            container.removeChild(container.lastChild);
        })
    })
}

const fillBarContent = (b = 1, c = 0, index = 0, empty = false) => {
    if (steps[index] === undefined)
        return;
    if (!empty) {
        if (++c % 5 === 0) {
            b++;
            c = 1;
        }
        steps[index].textContent = b + '.' + c;
        empty = true;
    } else {
        empty = false;
    }
    fillBarContent(b, c, ++index, empty);
}

//Toggle beat
const toggleBeat = () => {
    if (beat === 8) {
        beat = 4;
        toggleBeatButton.textContent = '1/4';
    } else {
        beat = 8;
        toggleBeatButton.textContent = '1/8';
    }
}

//Programm maxtrix
const toggleMatrixField = (field) => {
    _ = field.classList.contains('play-this') ? field.classList.remove('play-this') : field.classList.add('play-this');
}

//Event handler

window.onload = fillBarContent();