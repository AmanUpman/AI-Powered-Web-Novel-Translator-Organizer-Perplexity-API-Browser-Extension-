const API_KEY = "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";

// 1. Extract chapter text from Booktoki page
function getChapterText() {
    // Booktoki often uses <div class="content"> or similar for chapters
    const contentDiv = document.querySelector('.content');
    return contentDiv ? contentDiv.innerText.trim() : null;
}

// 2. Send text to Perplexity API for translation & refinement
async function translateChapter(text) {
    const prompt = `Act as an English translator, editor, and improver. I will provide you with a chapter of a Korean novel. Detect the language, translate it into English, and elevate the writing style. Keep the gender, names, and narrative tone consistent with the original. Replace basic or awkward phrasing with more elegant, literary English, while preserving the original meaning and tone. Do not simplify or omit content. Do not provide explanations—only return the translated and refined English version of the text.\n\n${text}`;
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "sonar-pro",
            messages: [
                {role: "system", content: "You are a skilled literary translator and editor."},
                {role: "user", content: prompt}
            ],
            temperature: 0.2
        })
    });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    return data.choices[0].message.content;
}

// 3. Save translated chapter to localStorage by novel title
function saveChapter(novelTitle, chapterTitle, translatedText) {
    let book = JSON.parse(localStorage.getItem(novelTitle) || "{}");
    book[chapterTitle] = translatedText;
    localStorage.setItem(novelTitle, JSON.stringify(book));
}

// 4. Export all chapters as a book
function exportBook(novelTitle) {
    let book = JSON.parse(localStorage.getItem(novelTitle) || "{}");
    let content = Object.keys(book).sort().map(chap => `# ${chap}\n\n${book[chap]}`).join('\n\n');
    let blob = new Blob([content], {type: "text/plain"});
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `${novelTitle}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// 5. Add UI button to page
function addTranslateButton() {
    if (document.getElementById("translate-chapter-btn")) return;
    let btn = document.createElement("button");
    btn.id = "translate-chapter-btn";
    btn.innerText = "Translate & Save Chapter";
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.right = "10px";
    btn.style.zIndex = 9999;
    btn.onclick = async () => {
        btn.disabled = true;
        btn.innerText = "Translating...";
        try {
            let text = getChapterText();
            if (!text) throw new Error("Chapter text not found.");
            let novelTitle = document.querySelector('.book-title')?.innerText.trim() || "Booktoki_Novel";
            let chapterTitle = document.querySelector('.episode-title')?.innerText.trim() || document.title;
            let translated = await translateChapter(text);
            // Replace chapter content on page
            document.querySelector('.content').innerText = translated;
            // Save to localStorage
            saveChapter(novelTitle, chapterTitle, translated);
            btn.innerText = "Translated & Saved!";
        } catch (e) {
            btn.innerText = "Error: " + e.message;
        }
        setTimeout(() => { btn.disabled = false; btn.innerText = "Translate & Save Chapter"; }, 3000);
    };
    document.body.appendChild(btn);

    // Export book button
    let exportBtn = document.createElement("button");
    exportBtn.id = "export-book-btn";
    exportBtn.innerText = "Export Book";
    exportBtn.style.position = "fixed";
    exportBtn.style.top = "50px";
    exportBtn.style.right = "10px";
    exportBtn.style.zIndex = 9999;
    exportBtn.onclick = () => {
        let novelTitle = document.querySelector('.book-title')?.innerText.trim() || "Booktoki_Novel";
        exportBook(novelTitle);
    };
    document.body.appendChild(exportBtn);
}

// Run on page load
addTranslateButton();
