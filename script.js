let moodEntries = [];
const moodCount = {
    glücklich: 0,
    traurig: 0,
    gestresst: 0,
    ruhig: 0,
    wütend: 0,
    ängstlich: 0,
};

function showFeedback(emotion) {
    const feedback = document.getElementById('feedback');
    const suggestions = {
        glücklich: "Feiere diesen Moment! Vielleicht möchtest du ein Foto machen oder dich jemandem mitteilen.",
        traurig: "Nimm dir Zeit für dich. Vielleicht hilft dir ein beruhigendes Lied oder eine kurze Pause.",
        gestresst: "Wie wäre es mit einer 5-minütigen Atemübung? Konzentriere dich auf deinen Atem.",
        ruhig: "Genieße die Ruhe. Lies ein Buch oder mach einen Spaziergang.",
        wütend: "Atme tief durch. Vielleicht hilft es dir, die Gedanken niederzuschreiben.",
        ängstlich: "Lenke dich mit etwas Positivem ab, wie einem Film oder einem Gespräch mit einem Freund."
    };

    feedback.textContent = suggestions[emotion];
    feedback.style.display = 'block';

    document.getElementById('suggestion').textContent = suggestions[emotion];

    moodCount[emotion]++;
    updateStats();
}

function saveEntry() {
    const note = document.getElementById('note').value.trim();
    const selectedEmotion = document.querySelector('.selected')?.textContent || 'Keine Stimmung';
    const date = new Date().toLocaleDateString();

    if (note) {
        moodEntries.push({ emotion: selectedEmotion, note, date });
        saveToLocal();
        document.getElementById('note').value = '';
        updateEntries();
    } else {
        alert('Bitte eine Notiz eingeben!');
    }
}

function updateEntries() {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '<h4>Gespeicherte Einträge:</h4>';
    moodEntries.forEach(({ emotion, note, date }) => {
        entriesDiv.innerHTML += `<p><strong>${emotion}</strong> (${date}): ${note}</p>`;
    });
}

function filterEntries() {
    const filter = document.getElementById('emotionFilter').value;
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '<h4>Gefilterte Einträge:</h4>';

    const filteredEntries = moodEntries.filter(entry => filter === 'alle' || entry.emotion === filter);
    filteredEntries.forEach(({ emotion, note, date }) => {
        entriesDiv.innerHTML += `<p><strong>${emotion}</strong> (${date}): ${note}</p>`;
    });
}

function exportEntries() {
    const blob = new Blob([JSON.stringify(moodEntries, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mood_entries.json';
    link.click();
}

function updateStats() {
    const statsList = document.getElementById('emotion-stats');
    statsList.innerHTML = '';
    Object.entries(moodCount).forEach(([emotion, count]) => {
        statsList.innerHTML += `<li>${emotion}: ${count} Mal gewählt</li>`;
    });
}

function saveToLocal() {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
}

function loadFromLocal() {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
        moodEntries = JSON.parse(savedEntries);
        updateEntries();
    }
}

window.onload = loadFromLocal;
