//Option-elements
const bpmSlider = document.getElementById('bpm-slider');
const bpmDisplay = document.getElementById('bpm-display');
const toggleBarLengthButton = document.getElementById('toggleBarLength-btn');

//Sound-steps-container and matrix-row container
const stepsContainer = document.getElementById('seq-steps-container');
const matrixRowsContainer = Array.from(document.getElementsByClassName('matrix-field-wrap'));

//Steps
var steps;

var bpm = 120;
var playing = false;
var running = false;
var barLength = 8;

//OPTIONS

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

    steps = Array.from(document.getElementById('seq-steps-container').children);

    playing = true;
    running = true;
    document.getElementById('toggleBarLength-btn').disabled = true;
    
    run();
}


const run = async (i = 0) => {
    if (!playing)
        return;

    var index = i++ % steps.length;
    steps[index].classList.add('active-step');
    matrixRowsContainer.forEach(container => {
        Array.from(container.children)[index].classList.add('active-matrix-field');
    });
    await delay((60 / bpm) * 1000);
    steps[index].classList.remove('active-step');
    matrixRowsContainer.forEach(container => {
        Array.from(container.children)[index].classList.remove('active-matrix-field');
    });
    run(i);
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
const toggleBar = () => {
    if (barLength === 8) {
        barLength = 16;
        toggleBarLengthButton.textContent = barLength;
        Array(8).fill(8).forEach(_ => {
            var stepDiv = document.createElement('div');
            stepDiv.classList.add('step-mark', 'two-beat-seq');

            stepsContainer.appendChild(stepDiv);
            matrixRowsContainer.forEach(container => {
                var matrixDiv = document.createElement('div');
                matrixDiv.classList.add('matrix-field', 'two-beat-track')
                container.appendChild(matrixDiv);
            })
        })
    } //else if (barLength === 16) { //do smth}....
    
    
    
    
    
    
    // else {
    //     barLength = 8;
    //     toggleBarLengthButton.textContent = barLength;
    //     Array.from(stepsContainer.getElementsByClassName('two-beat-seq')).forEach(e => {
    //         stepsContainer.removeChild(e);
    //     });

    //     matrixRowsContainer.forEach(container => {
    //         Array.from(container.getElementsByClassName('two-beat-track')).forEach(e => {
    //             container.removeChild(e);
    //         });
    //     });
    // }
}