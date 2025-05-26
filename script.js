// Initialize canvas
const canvas = new fabric.Canvas('diary-canvas');
let currentPageType = 'blank';

// Change page type (grid/lined/blank)
function changePageType(type) {
    currentPageType = type;
    canvas.setBackgroundColor('#fff9e8', () => {
        if (type === 'grid') {
            canvas.setBackgroundColor({
                source: 'https://i.imgur.com/JZ5Q3vN.jpg',
                repeat: 'repeat'
            }, canvas.renderAll.bind(canvas));
        } else if (type === 'lined') {
            canvas.setBackgroundColor({
                source: 'https://i.imgur.com/XW7JtQ2.png',
                repeat: 'repeat'
            }, canvas.renderAll.bind(canvas));
        }
    });
}

// Add stickers
document.querySelectorAll('.sticker-option').forEach(sticker => {
    sticker.addEventListener('click', () => {
        fabric.Image.fromURL(sticker.src, (img) => {
            img.set({
                left: 100,
                top: 100,
                scaleX: 0.5,
                scaleY: 0.5,
                selectable: true
            });
            canvas.add(img);
        });
    });
});

// Custom cover
function applyCover() {
    const color = document.getElementById('cover-color').value;
    const image = document.getElementById('cover-image').files[0];
    
    if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fabric.Image.fromURL(e.target.result, (img) => {
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
            });
        };
        reader.readAsDataURL(image);
    } else {
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    }
}
