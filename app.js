// --- Canvas and Context Setup ---
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// --- Control Panel Elements ---
const resetButton = document.getElementById('resetButton');
const generateButton = document.getElementById('generateButton');
const passwordOutput = document.getElementById('passwordOutput');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');

let w, h, anchorX, anchorY;
let pendulumA, pendulumB;
let animationFrameId;

// --- Configuration ---
const L1 = 180, L2 = 180, m1 = 20, m2 = 20, g = 1;

function setup() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    anchorX = w / 2;
    anchorY = h / 2 - 100;

    pendulumA = { a1: Math.PI / 2, a2: Math.PI / 2, a1_v: 0, a2_v: 0, trace: [], color: 'white' };
    pendulumB = { a1: Math.PI / 2 + 0.00001, a2: Math.PI / 2, a1_v: 0, a2_v: 0, trace: [], color: 'rgba(0, 242, 234, 0.6)' };

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    loop();
}

function getAccelerations(p) {
    let num1 = -g * (2 * m1 + m2) * Math.sin(p.a1);
    let num2 = -m2 * g * Math.sin(p.a1 - 2 * p.a2);
    let num3 = -2 * Math.sin(p.a1 - p.a2) * m2;
    let num4 = p.a2_v * p.a2_v * L2 + p.a1_v * p.a1_v * L1 * Math.cos(p.a1 - p.a2);
    let den = L1 * (2 * m1 + m2 - m2 * Math.cos(2 * p.a1 - 2 * p.a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * Math.sin(p.a1 - p.a2);
    num2 = (p.a1_v * p.a1_v * L1 * (m1 + m2));
    num3 = g * (m1 + m2) * Math.cos(p.a1);
    num4 = p.a2_v * p.a2_v * L2 * m2 * Math.cos(p.a1 - p.a2);
    den = L2 * (2 * m1 + m2 - m2 * Math.cos(2 * p.a1 - 2 * p.a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;
    return { a1_a, a2_a };
}

function updatePendulum(p) {
    const { a1_a, a2_a } = getAccelerations(p);
    p.a1_v += a1_a;
    p.a2_v += a2_a;
    p.a1 += p.a1_v;
    p.a2 += p.a2_v;

    const x1 = anchorX + L1 * Math.sin(p.a1);
    const y1 = anchorY + L1 * Math.cos(p.a1);
    const x2 = x1 + L2 * Math.sin(p.a2);
    const y2 = y1 + L2 * Math.cos(p.a2);
    
    p.trace.push({ x: x2, y: y2 });
    if (p.trace.length > 1500) p.trace.shift();
    return { x1, y1, x2, y2 };
}

function drawPendulum(p, coords) {
    ctx.beginPath();
    ctx.moveTo(anchorX, anchorY);
    ctx.lineTo(coords.x1, coords.y1);
    ctx.lineTo(coords.x2, coords.y2);
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    if (p.trace.length > 1) {
        ctx.moveTo(p.trace[0].x, p.trace[0].y);
        for (let i = 1; i < p.trace.length; i++) {
            ctx.lineTo(p.trace[i].x, p.trace[i].y);
        }
    }
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function loop() {
    ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
    ctx.fillRect(0, 0, w, h);
    const coordsA = updatePendulum(pendulumA);
    const coordsB = updatePendulum(pendulumB);
    drawPendulum(pendulumA, coordsA);
    drawPendulum(pendulumB, coordsB);
    animationFrameId = requestAnimationFrame(loop);
}

function generatePassword() {
    let characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (includeNumbers.checked) { characterSet += '0123456789'; }
    if (includeSymbols.checked) { characterSet += '!@#$%^&*()-_=+[]{}|;:,.<>?'; }

    if (characterSet.length === 26*2) { // Only letters are selected
        passwordOutput.value = "Select numbers or symbols!";
        return;
    }

    const passwordLength = parseInt(lengthSlider.value, 10);
    const p = pendulumA;
    let entropyString = (String(p.a1) + String(p.a2) + String(p.a1_v) + String(p.a2_v)).replace(/[.-]/g, '');
    let password = '';
    let entropyIndex = 0;

    for (let i = 0; i < passwordLength; i++) {
        if (entropyIndex + 2 > entropyString.length) {
            entropyIndex = 0;
        }
        const chunk = parseInt(entropyString.substring(entropyIndex, entropyIndex + 2), 10);
        password += characterSet[chunk % characterSet.length];
        entropyIndex += 2;
    }
    
    passwordOutput.value = password;
}

function copyToClipboard() {
    const pass = passwordOutput.value;
    if (pass && pass !== "Click Generate..." && !pass.includes("Select")) {
        navigator.clipboard.writeText(pass).then(() => {
            passwordOutput.value = "Copied!";
            setTimeout(() => {
                passwordOutput.value = pass;
            }, 1500);
        });
    }
}

// --- Event Listeners ---
resetButton.addEventListener('click', setup);
generateButton.addEventListener('click', generatePassword);
passwordOutput.addEventListener('click', copyToClipboard);
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});
window.addEventListener('resize', setup);

// --- Initial Start ---
setup();