// Make the text box
const quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Write your thoughts here...'
});

// make the buttons button
const saveBtn = document.getElementById("saveEntryBtn");
const deleteBtn = document.getElementById("deleteEntryBtn");

// if its saved, get text, theme, and mood
const savedContent = localStorage.getItem("diary_entry");
if (savedContent) {
    quill.root.innerHTML = savedContent;
}

const savedTheme = localStorage.getItem("diary_theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

const savedMood = localStorage.getItem("diary_mood");
if (savedMood) {
    const activeBtn = document.querySelector(`#moodOptions button[data-mood="${savedMood}"]`);
    if (activeBtn) activeBtn.classList.add("active");
}

// make save button work
saveBtn.addEventListener("click", () => {
    const userText = quill.root.innerHTML;
    localStorage.setItem("diary_entry", userText);
    alert("Everything saved successfully!");
});

// make delete button work
deleteBtn.addEventListener("click", () => {
    quill.root.innerHTML = "";
    localStorage.removeItem("diary_entry");
    localStorage.removeItem("diary_mood");
    document.querySelectorAll("#moodOptions button").forEach(b => b.classList.remove("active"));
    alert("Entry deleted!");
});

// darkmode!
document.getElementById("themeToggle").onclick = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("diary_theme", currentTheme);
};

// mood tracker!
document.getElementById("moodOptions").onclick = (e) => {
    const btn = e.target.closest("button");
    if (btn) {
        document.querySelectorAll("#moodOptions button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        localStorage.setItem("diary_mood", btn.dataset.mood);
    }
};

// Home screen button
document.getElementById("openDiaryBtn").addEventListener("click", () => {
    document.getElementById("homeScreen").classList.add("hidden");
});
