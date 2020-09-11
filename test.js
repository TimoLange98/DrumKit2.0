const test = async () => {
    await delay(10000);
    console.log('Hello');
}

const delay = (ms) => {
    return new Promise(rslv => {
        setTimeout(rslv, ms);
    })
}

test();