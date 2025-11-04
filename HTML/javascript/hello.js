// create Start and Cancel buttons and a setTimeout that fires after 3 seconds
let timerId = null;

const startBtn = document.createElement('button');
startBtn.textContent = 'Start 3s timer';
startBtn.style.marginRight = '8px';

const cancelBtn = document.createElement('button');
cancelBtn.textContent = 'Cancel timer';
cancelBtn.disabled = true;

document.body.appendChild(startBtn);
document.body.appendChild(cancelBtn);

startBtn.addEventListener('click', () => {
    if (timerId) return;
    startBtn.disabled = true;
    cancelBtn.disabled = false;
    timerId = setTimeout(() => {
        // action when timer fires
        startBtn.disabled = false;
        cancelBtn.disabled = true;
        timerId = null;
        const msg = document.createElement('div');
        msg.textContent = 'Timer fired!';
        msg.style.marginTop = '8px';
        document.body.appendChild(msg);
        console.log('Timer fired');
    }, 3000);
});

cancelBtn.addEventListener('click', () => {
    if (!timerId) return;
    clearTimeout(timerId);
    timerId = null;
    startBtn.disabled = false;
    cancelBtn.disabled = true;
    console.log('Timer cancelled');
});