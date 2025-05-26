// CONFIG - CHANGE THESE!
const DIARY_PASSWORD = "vanilla"; // Change to your password
const STICKERS = {
    polaroid: "https://i.imgur.com/5xJgZ9P.png",
    heart: "https://i.imgur.com/XW7JtQ2.png"
};

// Diary unlock system
function unlockDiary() {
    const password = document.getElementById("diary-password").value;
    if (password === DIARY_PASSWORD) {
        document.getElementById("lock-screen").style.display = "none";
        document.getElementById("diary").style.display = "block";
        initDiaryBook();
    } else {
        alert("Incorrect password! Try again.");
    }
}

// Initialize book flip effect
function initDiaryBook() {
    setTimeout(() => {
        $("#diary-book").turn({
            width: 800,
            height: 600,
            autoCenter: true,
            duration: 1000
        });
    }, 100);

    initStickerCanvas();
    setupStickerDrag();
}

// Sticker canvas (for page 2)
let canvas;
function initStickerCanvas() {
    canvas = new fabric.Canvas('sticker-canvas');
    canvas.backgroundColor = '#fff9e8';
    
    // Load saved stickers
    const savedStickers = localStorage.getItem('diary-stickers');
    if (savedStickers) {
        canvas.loadFromJSON(savedStickers);
    }
}

// Drag stickers from bin to canvas
function setupStickerDrag() {
    document.querySelectorAll('.sticker').forEach(sticker => {
        sticker.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('sticker-type', sticker.dataset.sticker);
        });
    });

    const stickerCanvas = document.getElementById('sticker-canvas');
    stickerCanvas.addEventListener('dragover', (e) => e.preventDefault());
    stickerCanvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('sticker-type');
        addStickerToCanvas(type, e.offsetX, e.offsetY);
    });
}

function addStickerToCanvas(type, x, y) {
    fabric.Image.fromURL(STICKERS[type], (img) => {
        img.set({
            left: x,
            top: y,
            scaleX: 0.5,
            scaleY: 0.5,
            selectable: true
        });
        canvas.add(img);
    });
}

// Save all stickers
function savePage() {
    localStorage.setItem('diary-stickers', JSON.stringify(canvas.toJSON()));
    alert("Page saved!");
}

// Auto-save text entries
document.querySelectorAll('.entry').forEach((textarea, index) => {
    const savedText = localStorage.getItem(`diary-page-${index + 1}`);
    if (savedText) textarea.value = savedText;
    textarea.addEventListener('input', () => {
        localStorage.setItem(`diary-page-${index + 1}`, textarea.value);
    });
});
