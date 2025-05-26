// Set your password here (change "mydiary123" to your own)
const DIARY_PASSWORD = "rishirishu";

function unlockDiary() {
    const password = document.getElementById("diary-password").value;
    if (password === DIARY_PASSWORD) {
        document.getElementById("lock-screen").style.display = "none";
        document.getElementById("diary").style.display = "block";
        initDiaryBook();
    } else {
        alert("Wrong password! Try again.");
    }
}

function initDiaryBook() {
    // Initialize the book-flip effect
    $("#diary-book").turn({
        width: 600,
        height: 400,
        autoCenter: true,
        duration: 1000
    });
}

// Save entries to localStorage
function saveEntry(pageNumber, text) {
    localStorage.setItem(`diary-page-${pageNumber}`, text);
}

// Load saved entries
window.onload = function() {
    document.querySelectorAll(".entry").forEach((textarea, index) => {
        const savedText = localStorage.getItem(`diary-page-${index + 1}`);
        if (savedText) textarea.value = savedText;
        textarea.addEventListener("input", () => saveEntry(index + 1, textarea.value));
    });
};
