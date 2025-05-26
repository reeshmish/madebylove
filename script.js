const canvas = new fabric.Canvas('journal-canvas');

function addStickyNote() {
    const stickyNote = new fabric.Rect({
        left: 100,
        top: 100,
        width: 150,
        height: 150,
        fill: '#fffc9e',
        shadow: '2px 2px 5px rgba(0,0,0,0.2)',
        angle: -5,
    });
    canvas.add(stickyNote);
}

function addPolaroid() {
    fabric.Image.fromURL('https://via.placeholder.com/150', (img) => {
        img.set({ left: 200, top: 200, scaleX: 0.5, scaleY: 0.5 });
        const polaroid = new fabric.Group([img], { padding: 20, background: 'white' });
        canvas.add(polaroid);
    });
}

function saveJournal() {
    localStorage.setItem('journalData', JSON.stringify(canvas.toJSON()));
    alert('Journal saved!');
}

function loadJournal() {
    const savedData = localStorage.getItem('journalData');
    if (savedData) canvas.loadFromJSON(savedData, () => canvas.renderAll());
}

window.onload = loadJournal;
