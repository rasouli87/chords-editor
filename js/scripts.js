// =============== MUSIC CONSTANTS ===============
// Note index lookup table
const NOTE_INDEX = {
    'C': 0, 'B#': 0,
    'C#': 1, 'Db': 1,
    'D': 2,
    'D#': 3, 'Eb': 3,
    'E': 4, 'Fb': 4,
    'F': 5, 'E#': 5,
    'F#': 6, 'Gb': 6,
    'G': 7,
    'G#': 8, 'Ab': 8,
    'A': 9,
    'A#': 10, 'Bb': 10,
    'B': 11, 'Cb': 11,
};

// Index to note lookup table (using standardized note names)
const INDEX_TO_NOTE = {
    0: 'C', 1: 'Db', 2: 'D', 3: 'Eb', 4: 'E', 5: 'F',
    6: 'Gb', 7: 'G', 8: 'Ab', 9: 'A', 10: 'Bb', 11: 'B'
};

// Index to note lookup table with sharp notes
const INDEX_TO_NOTE_SHARP = {
    0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
    6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'
};

// Index to note lookup table with flat notes
const INDEX_TO_NOTE_FLAT = {
    0: 'C', 1: 'Db', 2: 'D', 3: 'Eb', 4: 'E', 5: 'F',
    6: 'Gb', 7: 'G', 8: 'Ab', 9: 'A', 10: 'Bb', 11: 'B'
};

// Equivalence mappings for enharmonic notes
const SHARP_TO_FLAT = {
    'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
};

const FLAT_TO_SHARP = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
};

// Common chords in major keys
const MAJOR_KEYS = {
    'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am'],
    'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em'],
    'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm'],
    'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m'],
    'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m'],
    'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m'],
    'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m'],
    'C#': ['C#', 'D#m', 'Fm', 'F#', 'G#', 'A#m'],
    'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm'],
    'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm'],
    'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm'],
    'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm'],
};

// Common chords in minor keys
const MINOR_KEYS = {
    'Am': ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'],
    'Em': ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D'],
    'Bm': ['Bm', 'C#dim', 'D', 'Em', 'F#m', 'G', 'A'],
    'F#m': ['F#m', 'G#dim', 'A', 'Bm', 'C#m', 'D', 'E'],
    'C#m': ['C#m', 'D#dim', 'E', 'F#m', 'G#m', 'A', 'B'],
    'G#m': ['G#m', 'A#dim', 'B', 'C#m', 'D#m', 'E', 'F#'],
    'D#m': ['D#m', 'E#dim', 'F#', 'G#m', 'A#m', 'B', 'C#'],
    'A#m': ['A#m', 'B#dim', 'C#', 'D#m', 'E#m', 'F#', 'G#'],
    'Dm': ['Dm', 'Edim', 'F', 'Gm', 'Am', 'Bb', 'C'],
    'Gm': ['Gm', 'Adim', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
    'Cm': ['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'],
    'Fm': ['Fm', 'Gdim', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
};

// =============== CHORD UTILITIES ===============

/**
 * Toggles between sharp and flat notation for chords
 * @param {string} text - Text containing chord markers
 * @param {boolean} toFlat - Whether to convert to flat notation (true) or sharp notation (false)
 * @returns {string} The text with converted chord notation
 */
function toggleAccidentals(text, toFlat) {
    return text.replace(/\[([A-Ga-g][#b]?(?:[^/\]]*)(?:\/[^/\]]*)?)\]/g, (match, chord) => {
        const parts = chord.split('/');
        const mainChord = parts[0];
        const bassNote = parts.length > 1 ? parts[1] : null;

        // Process main chord
        let newMainChord = mainChord;

        // Extract root note and suffix
        const rootMatch = mainChord.match(/^([A-Ga-g][#b]?)(.*)$/);
        if (rootMatch) {
            const [_, rootNote, suffix] = rootMatch;

            if (toFlat && SHARP_TO_FLAT[rootNote]) {
                newMainChord = SHARP_TO_FLAT[rootNote] + suffix;
            } else if (!toFlat && FLAT_TO_SHARP[rootNote]) {
                newMainChord = FLAT_TO_SHARP[rootNote] + suffix;
            }
        }

        // Process bass note if present
        let newBassNote = bassNote;
        if (bassNote) {
            const bassMatch = bassNote.match(/^([A-Ga-g][#b]?)(.*)$/);
            if (bassMatch) {
                const [_, bassRoot, bassSuffix] = bassMatch;

                if (toFlat && SHARP_TO_FLAT[bassRoot]) {
                    newBassNote = SHARP_TO_FLAT[bassRoot] + bassSuffix;
                } else if (!toFlat && FLAT_TO_SHARP[bassRoot]) {
                    newBassNote = FLAT_TO_SHARP[bassRoot] + bassSuffix;
                }
            }
        }

        // Reconstruct chord
        const newChord = newBassNote ? `${newMainChord}/${newBassNote}` : newMainChord;
        return `[${newChord}]`;
    });
}

/**
 * Transposes a chord by a given number of steps
 * @param {string} chord - The chord to transpose (e.g. "C", "Dm", "G/B")
 * @param {number} steps - Number of semitones to transpose by
 * @returns {string} The transposed chord
 */
function transposeChord(chord, steps) {
    const match = chord.trim().match(/^([A-Ga-g])([#b]?)([^/]*)?(?:\/([A-Ga-g])([#b]?))?$/);
    if (!match) {
        return chord;
    }

    const [_, root, accidental, suffix, bass, bassAcc] = match;
    const rootFull = root.toUpperCase() + (accidental || '');
    const bassFull = bass ? bass.toUpperCase() + (bassAcc || '') : null;

    if (!NOTE_INDEX.hasOwnProperty(rootFull)) {
        return chord;
    }

    const newRoot = INDEX_TO_NOTE[(NOTE_INDEX[rootFull] + steps + 12) % 12];

    let newBass = '';
    if (bassFull && NOTE_INDEX.hasOwnProperty(bassFull)) {
        newBass = '/' + INDEX_TO_NOTE[(NOTE_INDEX[bassFull] + steps + 12) % 12];
    } else if (bass) {
        newBass = '/' + bassFull;
    }

    return `${newRoot}${suffix || ''}${newBass}`;
}

/**
 * Transposes all chords in a given text
 * @param {string} text - Text containing [chord] markers
 * @param {number} steps - Number of semitones to transpose by
 * @returns {string} The text with transposed chords
 */
function transposeText(text, steps) {
    return text.replace(/\[([A-Ga-g][#b]?(?:[^/\]]*)(?:\/[^/\]]*)?)\]/g, (match, chord) => {
        return `[${transposeChord(chord, steps)}]`;
    });
}

/**
 * Extracts chords from a text with chord markers
 * @param {string} text - Text containing [chord] markers
 * @returns {string[]} Array of chord names
 */
function extractChords(text) {
    const matches = text.match(/\[([A-Ga-g][#b]?(?:[^/\]]*)(?:\/[^/\]]*)?)\]/g) || [];
    return matches.map(match => match.slice(1, -1));
}

/**
 * Detects the likely key of a song based on its chords
 * @param {string[]} chords - Array of chord names
 * @returns {[string, string]} Tuple of [majorKey, minorKey]
 */
function detectSongKey(chords) {
    const majorScore = {};
    const minorScore = {};

    // Initialize scores for all keys
    Object.keys(MAJOR_KEYS).forEach(key => majorScore[key] = 0);
    Object.keys(MINOR_KEYS).forEach(key => minorScore[key] = 0);

    chords.forEach(chord => {
        const root = chord.split('/')[0];

        // Check against major keys
        Object.entries(MAJOR_KEYS).forEach(([key, keyChords]) => {
            if (keyChords.includes(root)) {
                majorScore[key] += 1;
            }
        });

        // Check against minor keys
        Object.entries(MINOR_KEYS).forEach(([key, keyChords]) => {
            if (keyChords.includes(root)) {
                minorScore[key] += 1;
            }
        });
    });

    // Find the highest scoring keys
    let majorKey = Object.keys(majorScore).reduce((a, b) =>
        majorScore[a] > majorScore[b] ? a : b, Object.keys(majorScore)[0]);

    let minorKey = Object.keys(minorScore).reduce((a, b) =>
        minorScore[a] > minorScore[b] ? a : b, Object.keys(minorScore)[0]);

    return [majorKey, minorKey];
}

// =============== EXPORT UTILITIES ===============

/**
 * Generates HTML representation of lyrics with chord markings
 * @param {string} lyricsText - Raw lyrics text with chord markers
 * @param {number} capoFret - Capo fret position
 * @param {string[]} keyChords - Array of chords in the song's key
 * @param {number} fontSize - Base font size for the HTML
 * @returns {string} Complete HTML document
 */
function generateHtml(lyricsText, capoFret = 0, keyChords = [], fontSize = 16) {
    const lines = lyricsText.trim().split('\n');
    const htmlLines = [];

    // Color palette for chords
    const chordColors = [
        '#d32f2f', // Red
        '#1976d2', // Blue
        '#388e3c', // Green
        '#f57c00', // Orange
        '#7b1fa2', // Purple
        '#c2185b', // Pink
        '#0097a7', // Cyan
        '#5d4037', // Brown
    ];

    for (const line of lines) {
        const chordPattern = /\[([A-Ga-g][#b]?(?:[^/\]]*)(?:\/[^/\]]*)?)\]/g;
        let match;
        const chords = [];

        // Find all chords in the line
        while ((match = chordPattern.exec(line)) !== null) {
            chords.push({
                chord: match[1],
                start: match.index,
                end: match.index + match[0].length
            });
        }

        // Build chord line and lyrics line separately
        let chordLineHtml = '';
        let lyricsLineHtml = '';
        let charPosition = 0;

        let chordIndex = 0;
        let lastPos = 0;

        for (let i = 0; i < line.length; i++) {
            // Check if we're at a chord
            if (chordIndex < chords.length && i === chords[chordIndex].start) {
                const chord = chords[chordIndex].chord;
                const chordColor = chordColors[chordIndex % chordColors.length];

                // Add text before chord
                const textBefore = line.substring(lastPos, i);
                if (textBefore) {
                    lyricsLineHtml += textBefore;
                    // Count visible characters for positioning
                    for (let c of textBefore) {
                        if (c.charCodeAt(0) !== 8204) { // Not half-space
                            charPosition++;
                        }
                    }
                }

                // Check for / before chord
                let hasSlashBefore = false;
                if (i > 0 && line.charAt(i - 1) === '/') {
                    hasSlashBefore = true;
                    charPosition--; // Adjust because we counted the / as text
                }

                // Check for --- after chord
                let hasDashAfter = false;
                const afterPos = chords[chordIndex].end;
                if (afterPos + 2 < line.length && line.substring(afterPos, afterPos + 3) === '---') {
                    hasDashAfter = true;
                }

                // Add chord above at this character position
                chordLineHtml += `<span class="chord-positioner" data-pos="${charPosition}">`;
                if (hasSlashBefore) {
                    chordLineHtml += `<span style="color: #888; font-size:${fontSize + 2}px;">/</span>`;
                }
                chordLineHtml += `<span class="chord" data-original="${chord}" style="color:${chordColor}; font-size:${fontSize + 8}px; font-weight:bold;">${chord}</span>`;
                if (hasDashAfter) {
                    chordLineHtml += `<span style="color: #888; font-size:${fontSize + 2}px;">---</span>`;
                }
                chordLineHtml += `</span>`;

                // Highlight character after chord (if not /, ---, or half-space)
                const charAfterChord = line.charAt(chords[chordIndex].end);
                if (charAfterChord && charAfterChord !== '/' && charAfterChord !== '-' && charAfterChord.charCodeAt(0) !== 8204) {
                    lyricsLineHtml += `<span class="highlighted-char" style="background-color:${chordColor}33; border-bottom-color:${chordColor};">${charAfterChord}</span>`;
                    lastPos = chords[chordIndex].end + 1;
                    charPosition++;
                } else {
                    lastPos = chords[chordIndex].end;
                }

                i = chords[chordIndex].end - 1;
                chordIndex++;
            } else if (line[i] === '[') {
                // Skip if it's part of a chord we haven't processed
                continue;
            }
        }

        // Add remaining text
        const remainingText = line.substring(lastPos);
        if (remainingText) {
            lyricsLineHtml += remainingText;
        }

        // Combine chord line and lyrics line
        htmlLines.push(`<div class="line-container">
            <div class="chord-line">${chordLineHtml || '&nbsp;'}</div>
            <div class="lyrics-line">${lyricsLineHtml}</div>
        </div>`);
    }

    const capoHtml = capoFret > 0
        ? `<p><strong>🎸 Capo on Fret: ${capoFret}</strong></p>`
        : "";

    const html = `
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>Lyrics Viewer</title>
        <style>
            body {
                font-family: Tahoma, sans-serif;
                direction: rtl;
                text-align: right;
                background: #f9f9f9;
                padding: 2em;
                font-size: ${fontSize}px;
                font-weight: bold;
            }
            .chord {
                font-family: monospace;
                font-weight: bold;
                direction: ltr;
                display: inline-block;
                text-align: left;
            }
            .highlighted-char {
                font-weight: bolder;
                border-bottom: 3px solid;
                padding-bottom: 2px;
            }
            .line-container {
                position: relative;
                margin-bottom: 1em;
                font-family: monospace;
            }
            .chord-line {
                position: relative;
                height: 2em;
                direction: ltr;
                text-align: left;
                white-space: nowrap;
            }
            .chord-positioner {
                position: absolute;
                top: 0;
                white-space: nowrap;
            }
            .lyrics-line {
                position: relative;
                direction: rtl;
                text-align: right;
                font-family: Tahoma, sans-serif;
            }
            .controls {
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                width: 100%;
                background: white;
                padding: 10px 20px;
                border-bottom: 1px solid #ccc;
                z-index: 999;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                direction: rtl;
                flex-wrap: wrap;
            }
            .controls button, .controls span, .controls input[type="number"] {
                font-size: 16px;
                font-weight: bold;
                padding: 5px 10px;
            }
            .controls input[type="number"] {
                width: 50px;
            }
            .control-group {
                display: flex;
                align-items: center;
                gap: 5px;
                border: 1px solid #ddd;
                padding: 5px 10px;
                border-radius: 4px;
                background: #f9f9f9;
            }
            .speed-slider {
                width: 300px;
                height: 8px;
                cursor: pointer;
            }
            .content {
                margin-top: 120px;
                direction: rtl;
                text-align: right;
            }
        </style>
    </head>
    <body>
    <div class="controls">
        <div class="control-group">
            <button onclick="startScroll()">▶ Start</button>
            <button onclick="stopScroll()">⏸ Stop</button>
        </div>
        <div class="control-group">
            <span>Speed:</span>
            <button onclick="decreaseSpeed()">➖</button>
            <span id="speedValue">200</span>
            <button onclick="increaseSpeed()">➕</button>
            <input type="range" min="5" max="300" value="200" class="speed-slider" id="speedSlider" oninput="updateSpeedFromSlider(this.value)">
        </div>
        <div class="control-group">
            <span>🎸 Capo:</span>
            <input type="number" id="capoInput" min="0" max="11" value="${capoFret}" onchange="updateCapo(this.value)">
        </div>
        <div class="control-group">
            <button onclick="transposeUp()">🔼 Transpose Up</button>
            <button onclick="transposeDown()">🔽 Transpose Down</button>
        </div>
        <div class="control-group">
            <span>🔠 Font:</span>
            <button onclick="decreaseFontSize()">➖</button>
            <span id="fontSizeValue">${fontSize}</span>
            <button onclick="increaseFontSize()">➕</button>
        </div>
    </div>
    <div class="content" id="content">
    ${capoHtml}
    ${htmlLines.join('\n')}
    </div>
    <script>
    let scrollInterval;
    let speed = 200;
    let currentCapo = ${capoFret};
    let currentFontSize = ${fontSize};

    // Music theory constants
    const NOTE_INDEX = {
        'C': 0, 'B#': 0,
        'C#': 1, 'Db': 1,
        'D': 2,
        'D#': 3, 'Eb': 3,
        'E': 4, 'Fb': 4,
        'F': 5, 'E#': 5,
        'F#': 6, 'Gb': 6,
        'G': 7,
        'G#': 8, 'Ab': 8,
        'A': 9,
        'A#': 10, 'Bb': 10,
        'B': 11, 'Cb': 11,
    };

    const INDEX_TO_NOTE_SHARP = {
        0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
        6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'
    };

    const INDEX_TO_NOTE_FLAT = {
        0: 'C', 1: 'Db', 2: 'D', 3: 'Eb', 4: 'E', 5: 'F',
        6: 'Gb', 7: 'G', 8: 'Ab', 9: 'A', 10: 'Bb', 11: 'B'
    };

    // Position chords above characters when page loads
    window.addEventListener('DOMContentLoaded', function() {
        positionChords();
    });

    function positionChords() {
        document.querySelectorAll('.line-container').forEach(container => {
            const lyricsLine = container.querySelector('.lyrics-line');

            container.querySelectorAll('.chord-positioner').forEach(positioner => {
                const charPos = parseInt(positioner.getAttribute('data-pos'));

                // Calculate position based on character count
                const text = lyricsLine.textContent;
                let charCount = 0;
                let targetNode = null;
                let targetOffset = 0;

                // Walk through text nodes to find the position
                const walker = document.createTreeWalker(lyricsLine, NodeFilter.SHOW_TEXT);
                while (walker.nextNode()) {
                    const node = walker.currentNode;
                    const nodeLength = node.textContent.length;

                    if (charCount + nodeLength >= charPos) {
                        targetNode = node;
                        targetOffset = charPos - charCount;
                        break;
                    }
                    charCount += nodeLength;
                }

                if (targetNode) {
                    const range = document.createRange();
                    range.setStart(targetNode, Math.min(targetOffset, targetNode.textContent.length));
                    range.setEnd(targetNode, Math.min(targetOffset + 1, targetNode.textContent.length));
                    const rect = range.getBoundingClientRect();
                    const containerRect = lyricsLine.getBoundingClientRect();
                    // Position so chord ends at the start of highlighted character (right edge in RTL)
                    const chordWidth = positioner.offsetWidth;
                    const leftOffset = containerRect.right - rect.right - chordWidth;
                    positioner.style.right = leftOffset + 'px';
                } else {
                    positioner.style.right = '0px';
                }
            });
        });
    }

    // Transpose chord by semitones
    function transposeChord(chord, semitones) {
        const rootMatch = chord.match(/^([A-Ga-g][#b]?)(.*)$/);
        if (!rootMatch) return chord;

        const [_, rootNote, suffix] = rootMatch;
        const noteIndex = NOTE_INDEX[rootNote];
        if (noteIndex === undefined) return chord;

        const newIndex = (noteIndex + semitones + 12) % 12;
        const useFlat = rootNote.includes('b');
        const newNote = useFlat ? INDEX_TO_NOTE_FLAT[newIndex] : INDEX_TO_NOTE_SHARP[newIndex];

        return newNote + suffix;
    }

    // Transpose all chords in the document
    function transposeAll(semitones) {
        document.querySelectorAll('.chord').forEach(chordEl => {
            const chordText = chordEl.textContent.trim();
            const newChord = transposeChord(chordText, semitones);
            chordEl.textContent = newChord;

            // Also update the original chord data so capo still works
            const originalChord = chordEl.getAttribute('data-original');
            if (originalChord) {
                const newOriginal = transposeChord(originalChord, semitones);
                chordEl.setAttribute('data-original', newOriginal);
            }
        });
        positionChords();
    }

    function transposeUp() {
        transposeAll(1);
    }

    function transposeDown() {
        transposeAll(-1);
    }

    function updateCapo(value) {
        const newCapo = parseInt(value);
        const capoChange = newCapo - currentCapo;
        currentCapo = newCapo;

        // Transpose all chords by the capo change
        if (capoChange !== 0) {
            document.querySelectorAll('.chord').forEach(chordEl => {
                const originalChord = chordEl.getAttribute('data-original');
                if (originalChord) {
                    // Transpose from original chord by total capo amount
                    const transposedChord = transposeChord(originalChord, currentCapo);
                    chordEl.textContent = transposedChord;
                }
            });
            positionChords();
        }

        // Update capo display if exists
        const capoDisplay = document.querySelector('p strong');
        if (capoDisplay && capoDisplay.textContent.includes('Capo')) {
            capoDisplay.textContent = currentCapo > 0 ? \`🎸 Capo on Fret: \${currentCapo}\` : '';
        }
    }

    function increaseFontSize() {
        currentFontSize = Math.min(48, currentFontSize + 2);
        document.body.style.fontSize = currentFontSize + 'px';
        document.getElementById('fontSizeValue').textContent = currentFontSize;
        positionChords();
    }

    function decreaseFontSize() {
        currentFontSize = Math.max(10, currentFontSize - 2);
        document.body.style.fontSize = currentFontSize + 'px';
        document.getElementById('fontSizeValue').textContent = currentFontSize;
        positionChords();
    }

    function startScroll() {
        stopScroll();
        scrollInterval = setInterval(() => {
            window.scrollBy(0, 1);
        }, speed);
    }
    function stopScroll() {
        clearInterval(scrollInterval);
    }
    function increaseSpeed() {
        speed = Math.max(5, speed - 5);
        document.getElementById("speedValue").innerText = speed;
        document.getElementById("speedSlider").value = speed;
        if (scrollInterval) startScroll();
    }
    function decreaseSpeed() {
        speed = Math.min(300, speed + 5);
        document.getElementById("speedValue").innerText = speed;
        document.getElementById("speedSlider").value = speed;
        if (scrollInterval) startScroll();
    }
    function updateSpeedFromSlider(value) {
        speed = parseInt(value);
        document.getElementById("speedValue").innerText = speed;
        if (scrollInterval) startScroll();
    }
    </script>
    </body>
    </html>
    `;

    return html;
}

/**
 * Exports the HTML content to PDF
 * @param {string} htmlContent - The HTML content to convert to PDF
 * @returns {void}
 */
function exportPdf(htmlContent) {
    if (!htmlContent) {
        alert('No HTML content to export to PDF. Please generate HTML first.');
        return;
    }

    // For demonstration purposes, we'll open the HTML in a new window
    // which can then be printed to PDF using the browser's print function
    const win = window.open('', '_blank');
    win.document.write(htmlContent);
    win.document.close();
    win.print(); // This will open the print dialog where the user can select "Save as PDF"
}

// =============== IMPORT UTILITIES ===============

/**
 * Parses HTML content into raw lyrics format with chord markers
 * @param {string} html - HTML content to parse
 * @returns {string} Reconstructed lyrics with chord markers
 */
function parseHtml(html) {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find the content div
    const contentDiv = doc.querySelector('.content');
    if (!contentDiv) {
        throw new Error('Could not find content div in HTML');
    }

    // Process all children
    const rawLines = [];
    processNode(contentDiv, rawLines);

    // Join the lines and clean up
    let reconstructed = rawLines.join('');

    // Clean up extra line breaks
    reconstructed = reconstructed.replace(/\n+/g, '\n');

    return reconstructed.trim();
}

/**
 * Recursively processes a DOM node to extract text and chords
 * @param {Node} node - DOM node to process
 * @param {string[]} lines - Output array to collect text
 */
function processNode(node, lines) {
    // Special case for the node itself
    if (node.nodeName.toLowerCase() === 'span' &&
        node.classList && node.classList.contains('chord')) {
        lines.push(`[${node.textContent.trim()}]`);
        return;
    }

    // Process text nodes
    if (node.nodeType === Node.TEXT_NODE) {
        lines.push(node.textContent);
        return;
    }

    // Process br nodes
    if (node.nodeName.toLowerCase() === 'br') {
        lines.push('\n');
        return;
    }

    // Process all child nodes
    if (node.childNodes) {
        for (let i = 0; i < node.childNodes.length; i++) {
            processNode(node.childNodes[i], lines);
        }
    }
}

// =============== MAIN APP ===============

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const lyricsInput = document.getElementById('lyrics-input');
    const previewPane = document.getElementById('preview-pane');
    const keyInfo = document.getElementById('key-info');
    const capoInput = document.getElementById('capo');
    const fontSizeInput = document.getElementById('font-size');

    // Buttons
    const btnTransposeUp = document.getElementById('btn-transpose-up');
    const btnTransposeDown = document.getElementById('btn-transpose-down');
    const btnDetect = document.getElementById('btn-detect');
    const btnSave = document.getElementById('btn-save');
    const btnLoad = document.getElementById('btn-load');
    const btnHtml = document.getElementById('btn-html');
    const btnPdf = document.getElementById('btn-pdf');
    const btnLoadHtml = document.getElementById('btn-load-html');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnCut = document.getElementById('btn-cut');
    const btnPaste = document.getElementById('btn-paste');
    const btnPasteDash = document.getElementById('btn-paste-dash');
    const btnHtmlPreview = document.getElementById('btn-html-preview');
    const btnFlip = document.getElementById('btn-flip');
    const btnAddDash = document.getElementById('btn-add-dash');
    const btnAddSlash = document.getElementById('btn-add-slash');
    const btnUndoChord = document.getElementById('btn-undo-chord');
    const btnCharSelectMode = document.getElementById('btn-char-select-mode');

    // State
    let currentHtml = "";
    let lastDetectedKey = null;
    let cutChordBuffer = null;
    let htmlPreviewOpen = false;
    let htmlPreviewWindow = null;
    let selectedChordElement = null;
    let selectedCharacterElement = null;
    let isCharacterSelectionMode = false;
    let copiedChordBuffer = null;  // Stores copied chord
    let contextMenuElement = null;  // Reference to context menu DOM element
    let contextMenuTarget = null;   // Element that was right-clicked

    // Initialize capo old value
    capoInput.oldValue = parseInt(capoInput.value);

    // Create context menu
    contextMenuElement = document.createElement('div');
    contextMenuElement.id = 'context-menu';
    contextMenuElement.className = 'context-menu hidden';
    document.body.appendChild(contextMenuElement);

    // Add sample lyrics if textarea is empty
    if (!lyricsInput.value.trim()) {
        lyricsInput.value = `[C]سلام دنیا، [G]خوش آمدید
[Am]این یک نمونه [F]است
[C]روی آکوردها [G]راست کلیک کنید
[F]برای کپی یا [G]پیست`;
    }

    // Initialize the preview
    updatePreview();

    // New button event listeners and functions
    btnTransposeUp.addEventListener('click', () => transpose(1));
    btnTransposeDown.addEventListener('click', () => transpose(-1));
    btnDetect.addEventListener('click', detectKey);
    btnSave.addEventListener('click', saveLyrics);
    btnLoad.addEventListener('click', loadLyrics);
    btnHtml.addEventListener('click', exportHtml);
    btnPdf.addEventListener('click', () => exportPdf(currentHtml));
    btnLoadHtml.addEventListener('click', loadHtml);
    btnLeft.addEventListener('click', () => moveChord(-1));
    btnRight.addEventListener('click', () => moveChord(1));
    btnCut.addEventListener('click', cutChord);
    btnPaste.addEventListener('click', pasteChord);
    btnPasteDash.addEventListener('click', pasteChordWithDash);
    btnFlip.addEventListener('click', flipChordsOnLine);
    btnAddDash.addEventListener('click', addDashAfterChord);
    btnAddSlash.addEventListener('click', addSlashAfterChord);
    btnUndoChord.addEventListener('click', undoChordModification);
    btnCharSelectMode.addEventListener('click', toggleCharacterSelectionMode);
    btnHtmlPreview.addEventListener('click', toggleHtmlPreview);
    capoInput.addEventListener('change', applyCapo);

    // Add toggle accidentals button if it exists
    const btnToggleAccidentals = document.getElementById('btn-toggle-accidentals');
    if (btnToggleAccidentals) {
        btnToggleAccidentals.addEventListener('click', toggleAccidentalsInText);
    }

    // Hide context menu on click outside
    document.addEventListener('click', (e) => {
        if (contextMenuElement && !contextMenuElement.contains(e.target)) {
            hideContextMenu();
        }
    });

    // Functions
    function updatePreview() {
        const lyrics = lyricsInput.value;
        const fontSize = fontSizeInput.value;

        let htmlContent = '';
        const lines = lyrics.split('\n');
        const keyChords = lastDetectedKey ? MAJOR_KEYS[lastDetectedKey] : null;

        lines.forEach((line, lineIndex) => {
            const chordPattern = /\[([A-Ga-g][#b]?(?:[^/\]]*)(?:\/[^/\]]*)?)\]/g;
            let match;
            const chords = [];

            // Find all chords in the line
            while ((match = chordPattern.exec(line)) !== null) {
                chords.push({
                    chord: match[1],
                    start: match.index,
                    end: match.index + match[0].length
                });
            }

            // Build chord line and lyrics line separately
            let chordLineHtml = '';
            let lyricsLineHtml = '';
            let charPosition = 0; // Track visible character position (excluding chords)

            if (isCharacterSelectionMode) {
                // Character selection mode: split into individual characters
                let chordIndex = 0;
                for (let i = 0; i < line.length; i++) {
                    // Check if we're at a chord
                    if (chordIndex < chords.length && i === chords[chordIndex].start) {
                        const chord = chords[chordIndex].chord;
                        const isKeyChord = keyChords && keyChords.includes(chord.split('/')[0]);
                        const chordClass = isKeyChord ? 'preview-chord key-chord clickable-chord' : 'preview-chord clickable-chord';

                        // Check for / before chord
                        let hasSlashBefore = false;
                        if (i > 0 && line.charAt(i - 1) === '/') {
                            hasSlashBefore = true;
                        }

                        // Check for --- after chord
                        let hasDashAfter = false;
                        const afterPos = chords[chordIndex].end;
                        if (afterPos + 2 < line.length && line.substring(afterPos, afterPos + 3) === '---') {
                            hasDashAfter = true;
                        }

                        // Add chord above at this character position
                        chordLineHtml += `<span class="chord-positioner" data-pos="${charPosition}">`;
                        if (hasSlashBefore) {
                            chordLineHtml += `<span style="color: #888; font-size: ${parseInt(fontSize) + 2}px;">/</span>`;
                        }
                        chordLineHtml += `<span class="${chordClass}" data-chord="${chord}" data-line="${lineIndex}" data-pos="${i}" style="font-size: ${parseInt(fontSize) + 4}px">${chord}</span>`;
                        if (hasDashAfter) {
                            chordLineHtml += `<span style="color: #888; font-size: ${parseInt(fontSize) + 2}px;">---</span>`;
                        }
                        chordLineHtml += `</span>`;

                        // Add insertion point in lyrics line
                        lyricsLineHtml += `<span class="insert-point" data-line="${lineIndex}" data-pos="${i}"></span>`;

                        i = chords[chordIndex].end - 1;
                        chordIndex++;
                    } else if (line[i] === '[') {
                        // Skip if it's part of a chord we haven't processed
                        continue;
                    } else {
                        // Check for Persian half-space (ZWNJ - U+200C)
                        const isHalfSpace = line.charCodeAt(i) === 8204;

                        // Check if this character comes immediately after a chord
                        let isAfterChord = false;
                        for (let c of chords) {
                            if (i === c.end) {
                                isAfterChord = true;
                                break;
                            }
                        }

                        // Regular character - add insertion point and character
                        lyricsLineHtml += `<span class="insert-point" data-line="${lineIndex}" data-pos="${i}"></span>`;

                        if (isHalfSpace) {
                            // Preserve half-space as-is (doesn't count as visible character)
                            lyricsLineHtml += `<span class="char half-space">\u200C</span>`;
                        } else if (line[i] === ' ') {
                            lyricsLineHtml += `<span class="char${isAfterChord ? ' highlighted-char' : ''}" data-charpos="${charPosition}">&nbsp;</span>`;
                            charPosition++;
                        } else {
                            lyricsLineHtml += `<span class="char${isAfterChord ? ' highlighted-char' : ''}" data-charpos="${charPosition}">${line[i]}</span>`;
                            charPosition++;
                        }
                    }
                }
                // Add final insertion point at the end
                lyricsLineHtml += `<span class="insert-point" data-line="${lineIndex}" data-pos="${line.length}"></span>`;
            } else {
                // Normal mode: keep text as continuous, only show chords and highlights
                let chordIndex = 0;
                let lastPos = 0;

                for (let i = 0; i < line.length; i++) {
                    // Check if we're at a chord
                    if (chordIndex < chords.length && i === chords[chordIndex].start) {
                        const chord = chords[chordIndex].chord;
                        const isKeyChord = keyChords && keyChords.includes(chord.split('/')[0]);
                        const chordClass = isKeyChord ? 'preview-chord key-chord clickable-chord' : 'preview-chord clickable-chord';

                        // Add text before chord
                        const textBefore = line.substring(lastPos, i);
                        if (textBefore) {
                            lyricsLineHtml += textBefore;
                            // Count visible characters for positioning
                            for (let c of textBefore) {
                                if (c.charCodeAt(0) !== 8204) { // Not half-space
                                    charPosition++;
                                }
                            }
                        }

                        // Check for / before chord
                        let hasSlashBefore = false;
                        if (i > 0 && line.charAt(i - 1) === '/') {
                            hasSlashBefore = true;
                            charPosition--; // Adjust because we counted the / as text
                        }

                        // Check for --- after chord
                        let hasDashAfter = false;
                        const afterPos = chords[chordIndex].end;
                        if (afterPos + 2 < line.length && line.substring(afterPos, afterPos + 3) === '---') {
                            hasDashAfter = true;
                        }

                        // Add chord above at this character position
                        chordLineHtml += `<span class="chord-positioner" data-pos="${charPosition}">`;
                        if (hasSlashBefore) {
                            chordLineHtml += `<span style="color: #888; font-size: ${parseInt(fontSize) + 2}px;">/</span>`;
                        }
                        chordLineHtml += `<span class="${chordClass}" data-chord="${chord}" data-line="${lineIndex}" data-pos="${i}" style="font-size: ${parseInt(fontSize) + 4}px">${chord}</span>`;
                        if (hasDashAfter) {
                            chordLineHtml += `<span style="color: #888; font-size: ${parseInt(fontSize) + 2}px;">---</span>`;
                        }
                        chordLineHtml += `</span>`;

                        // Highlight character after chord (if not /, ---, or half-space)
                        const charAfterChord = line.charAt(chords[chordIndex].end);
                        if (charAfterChord && charAfterChord !== '/' && charAfterChord !== '-' && charAfterChord.charCodeAt(0) !== 8204) {
                            lyricsLineHtml += `<span class="highlighted-char">${charAfterChord}</span>`;
                            lastPos = chords[chordIndex].end + 1;
                            charPosition++;
                        } else {
                            lastPos = chords[chordIndex].end;
                        }

                        i = chords[chordIndex].end - 1;
                        chordIndex++;
                    } else if (line[i] === '[') {
                        // Skip if it's part of a chord we haven't processed
                        continue;
                    }
                }

                // Add remaining text
                const remainingText = line.substring(lastPos);
                if (remainingText) {
                    lyricsLineHtml += remainingText;
                }
            }

            // Combine chord line and lyrics line
            htmlContent += '<div class="line-container">';
            htmlContent += `<div class="chord-line">${chordLineHtml || '&nbsp;'}</div>`;
            htmlContent += `<div class="lyrics-line">${lyricsLineHtml}</div>`;
            htmlContent += '</div>';
        });

        // Show capo information if set
        const capo = parseInt(capoInput.value);
        if (capo > 0) {
            htmlContent = `<p><strong>🎸 Capo on Fret: ${capo}</strong></p>` + htmlContent;
        }

        previewPane.innerHTML = htmlContent;
        previewPane.style.fontSize = `${fontSize}px`;

        // Set the direction of the preview pane to RTL
        previewPane.style.direction = 'rtl';
        previewPane.style.textAlign = 'right';

        // Update the HTML preview if it's open
        updateHtmlPreview();

        // Position chords above their corresponding characters
        positionChords();

        // Attach interactive event listeners to preview pane
        attachPreviewInteractivity();
    }

    // Function to position chords above corresponding characters
    function positionChords() {
        previewPane.querySelectorAll('.line-container').forEach(container => {
            const lyricsLine = container.querySelector('.lyrics-line');

            container.querySelectorAll('.chord-positioner').forEach(positioner => {
                const charPos = parseInt(positioner.getAttribute('data-pos'));

                // In character selection mode, use data-charpos
                if (isCharacterSelectionMode) {
                    const targetChar = lyricsLine.querySelector(`[data-charpos="${charPos}"]`);
                    if (targetChar) {
                        const containerRect = lyricsLine.getBoundingClientRect();
                        const charRect = targetChar.getBoundingClientRect();
                        // Position so chord ends at the start of highlighted character (right edge in RTL)
                        const chordWidth = positioner.offsetWidth;
                        const leftOffset = containerRect.right - charRect.right - chordWidth;
                        positioner.style.right = leftOffset + 'px';
                    } else {
                        positioner.style.right = '0px';
                    }
                } else {
                    // Normal mode: calculate position from text content
                    const text = lyricsLine.textContent;
                    let charCount = 0;
                    let targetNode = null;
                    let targetOffset = 0;

                    // Walk through text nodes to find the position
                    const walker = document.createTreeWalker(lyricsLine, NodeFilter.SHOW_TEXT);
                    while (walker.nextNode()) {
                        const node = walker.currentNode;
                        const nodeLength = node.textContent.length;

                        if (charCount + nodeLength >= charPos) {
                            targetNode = node;
                            targetOffset = charPos - charCount;
                            break;
                        }
                        charCount += nodeLength;
                    }

                    if (targetNode) {
                        const range = document.createRange();
                        range.setStart(targetNode, Math.min(targetOffset, targetNode.textContent.length));
                        range.setEnd(targetNode, Math.min(targetOffset + 1, targetNode.textContent.length));
                        const rect = range.getBoundingClientRect();
                        const containerRect = lyricsLine.getBoundingClientRect();
                        // Position so chord ends at the start of highlighted character (right edge in RTL)
                        const chordWidth = positioner.offsetWidth;
                        const leftOffset = containerRect.right - rect.right - chordWidth;
                        positioner.style.right = leftOffset + 'px';
                    } else {
                        positioner.style.right = '0px';
                    }
                }
            });
        });
    }

    // Function to attach interactive chord movement to preview pane
    function attachPreviewInteractivity() {
        // Add context menu handler to preview pane
        previewPane.addEventListener('contextmenu', handleContextMenu);

        // Handle chord selection
        previewPane.querySelectorAll('.clickable-chord').forEach(chord => {
            chord.addEventListener('click', function(e) {
                e.stopPropagation();

                // If in character selection mode, wait for character selection
                if (isCharacterSelectionMode) {
                    // Deselect previous chord
                    if (selectedChordElement) {
                        selectedChordElement.classList.remove('selected');
                    }
                    // Select this chord
                    selectedChordElement = this;
                    this.classList.add('selected');
                    // Show instruction
                    if (!selectedCharacterElement) {
                        previewPane.style.cursor = 'crosshair';
                    }
                    return;
                }

                // Normal mode: select/deselect chord
                if (selectedChordElement) {
                    selectedChordElement.classList.remove('selected');
                }
                if (selectedChordElement === this) {
                    selectedChordElement = null;
                } else {
                    selectedChordElement = this;
                    this.classList.add('selected');
                }
            });
        });

        // Handle character clicks for selection mode
        previewPane.querySelectorAll('.char:not(.half-space)').forEach(char => {
            char.addEventListener('click', function(e) {
                e.stopPropagation();

                if (!isCharacterSelectionMode) {
                    return; // Only work in character selection mode
                }

                // Deselect previous character
                if (selectedCharacterElement) {
                    selectedCharacterElement.classList.remove('char-selected');
                }

                // Select this character
                if (selectedCharacterElement === this) {
                    selectedCharacterElement = null;
                    previewPane.style.cursor = 'default';
                } else {
                    selectedCharacterElement = this;
                    this.classList.add('char-selected');
                    previewPane.style.cursor = 'default';

                    // If chord is already selected, move it here
                    if (selectedChordElement) {
                        moveChordToCharacter();
                    }
                }
            });

            // Add hover effect in character selection mode
            char.addEventListener('mouseenter', function() {
                if (isCharacterSelectionMode) {
                    this.classList.add('char-hover');
                }
            });

            char.addEventListener('mouseleave', function() {
                this.classList.remove('char-hover');
            });
        });

        // Handle insertion point clicks (old method still works)
        previewPane.querySelectorAll('.insert-point').forEach(point => {
            point.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!selectedChordElement || isCharacterSelectionMode) {
                    return;
                }

                // Get chord info
                const chordText = selectedChordElement.getAttribute('data-chord');
                const oldLine = parseInt(selectedChordElement.getAttribute('data-line'));
                const oldPos = parseInt(selectedChordElement.getAttribute('data-pos'));
                const newLine = parseInt(this.getAttribute('data-line'));
                const newPos = parseInt(this.getAttribute('data-pos'));

                // Update the textarea value
                const lines = lyricsInput.value.split('\n');

                // Remove chord from old position (including --- or / markers)
                const oldLineText = lines[oldLine];
                const chordWithBrackets = `[${chordText}]`;

                // Check for --- after chord
                let fullChordText = chordWithBrackets;
                let afterChordPos = oldPos + chordWithBrackets.length;
                if (oldLineText.substring(afterChordPos, afterChordPos + 3) === '---') {
                    fullChordText += '---';
                    afterChordPos += 3;
                }

                // Check for / before chord
                let beforeChordPos = oldPos;
                if (oldPos > 0 && oldLineText.charAt(oldPos - 1) === '/') {
                    fullChordText = '/' + fullChordText;
                    beforeChordPos = oldPos - 1;
                }

                const beforeChord = oldLineText.substring(0, beforeChordPos);
                const afterChord = oldLineText.substring(afterChordPos);
                lines[oldLine] = beforeChord + afterChord;

                // Insert chord at new position (adjust position if on same line and after old position)
                let adjustedNewPos = newPos;
                if (newLine === oldLine && newPos > beforeChordPos) {
                    adjustedNewPos = newPos - (afterChordPos - beforeChordPos);
                }

                const newLineText = lines[newLine];
                lines[newLine] = newLineText.substring(0, adjustedNewPos) + fullChordText + newLineText.substring(adjustedNewPos);

                // Update textarea
                lyricsInput.value = lines.join('\n');

                // Deselect
                selectedChordElement = null;

                // Update preview
                updatePreview();
            });
        });

        // Deselect when clicking on empty space in preview
        previewPane.addEventListener('click', function(e) {
            if (e.target === previewPane) {
                if (selectedChordElement) {
                    selectedChordElement.classList.remove('selected');
                    selectedChordElement = null;
                }
                if (selectedCharacterElement) {
                    selectedCharacterElement.classList.remove('char-selected');
                    selectedCharacterElement = null;
                }
                previewPane.style.cursor = 'default';
            }
        });
    }

    // Function to move selected chord to selected character
    function moveChordToCharacter() {
        if (!selectedChordElement || !selectedCharacterElement) {
            return;
        }

        // Get the line and position from the selected character's parent insertion point
        const lineContainer = selectedCharacterElement.closest('.line-container');
        const lyricsLine = lineContainer.querySelector('.lyrics-line');
        const allChars = Array.from(lyricsLine.querySelectorAll('.char:not(.half-space)'));
        const charIndex = allChars.indexOf(selectedCharacterElement);

        // Find the corresponding insertion point before this character
        const insertionPoints = Array.from(lyricsLine.querySelectorAll('.insert-point'));
        let targetInsertionPoint = null;

        // Find insertion point that comes before this character
        for (let i = 0; i < insertionPoints.length; i++) {
            const nextChar = insertionPoints[i].nextElementSibling;
            if (nextChar === selectedCharacterElement) {
                targetInsertionPoint = insertionPoints[i];
                break;
            }
        }

        if (!targetInsertionPoint) {
            alert('Could not find position for character');
            return;
        }

        // Get chord and position info
        const chordText = selectedChordElement.getAttribute('data-chord');
        const oldLine = parseInt(selectedChordElement.getAttribute('data-line'));
        const oldPos = parseInt(selectedChordElement.getAttribute('data-pos'));
        const newLine = parseInt(targetInsertionPoint.getAttribute('data-line'));
        const newPos = parseInt(targetInsertionPoint.getAttribute('data-pos'));

        // Update the textarea value
        const lines = lyricsInput.value.split('\n');

        // Remove chord from old position (including --- or / markers)
        const oldLineText = lines[oldLine];
        const chordWithBrackets = `[${chordText}]`;

        // Check for --- after chord
        let fullChordText = chordWithBrackets;
        let afterChordPos = oldPos + chordWithBrackets.length;
        if (oldLineText.substring(afterChordPos, afterChordPos + 3) === '---') {
            fullChordText += '---';
            afterChordPos += 3;
        }

        // Check for / before chord
        let beforeChordPos = oldPos;
        if (oldPos > 0 && oldLineText.charAt(oldPos - 1) === '/') {
            fullChordText = '/' + fullChordText;
            beforeChordPos = oldPos - 1;
        }

        const beforeChord = oldLineText.substring(0, beforeChordPos);
        const afterChord = oldLineText.substring(afterChordPos);
        lines[oldLine] = beforeChord + afterChord;

        // Insert chord at new position (adjust position if on same line and after old position)
        let adjustedNewPos = newPos;
        if (newLine === oldLine && newPos > beforeChordPos) {
            adjustedNewPos = newPos - (afterChordPos - beforeChordPos);
        }

        const newLineText = lines[newLine];
        lines[newLine] = newLineText.substring(0, adjustedNewPos) + fullChordText + newLineText.substring(adjustedNewPos);

        // Update textarea
        lyricsInput.value = lines.join('\n');

        // Deselect
        selectedChordElement = null;
        selectedCharacterElement = null;
        previewPane.style.cursor = 'default';

        // Update preview
        updatePreview();
    }

    // =============== CONTEXT MENU FUNCTIONS ===============

    // Main context menu handler
    function handleContextMenu(e) {
        e.preventDefault();
        const target = e.target;

        if (target.classList.contains('clickable-chord')) {
            showChordContextMenu(e, target);
        } else if (target.classList.contains('char') && isCharacterSelectionMode) {
            showCharacterContextMenu(e, target);
        } else {
            showGeneralContextMenu(e);
        }
    }

    // Show context menu for chord
    function showChordContextMenu(e, chordElement) {
        contextMenuTarget = chordElement;
        const chordText = chordElement.getAttribute('data-chord');

        const menuItems = [
            {
                label: `Copy Chord "${chordText}"`,
                icon: '📋',
                action: copyChord
            },
            {
                label: `Cut Chord "${chordText}"`,
                icon: '✂',
                action: cutChordFromContextMenu
            },
            {
                label: `Delete Chord "${chordText}"`,
                icon: '🗑️',
                action: deleteChordFromContextMenu
            }
        ];

        buildAndShowMenu(menuItems, e.pageX, e.pageY);
    }

    // Show context menu for character
    function showCharacterContextMenu(e, charElement) {
        contextMenuTarget = charElement;

        const menuItems = [
            {
                label: 'Add New Chord Here',
                icon: '➕',
                action: addNewChordAtCharacter
            }
        ];

        // Add paste option if chord is copied
        if (copiedChordBuffer) {
            menuItems.push({
                label: `Paste Chord "${copiedChordBuffer.slice(1, -1)}"`,
                icon: '📌',
                action: pasteChordAtCharacter
            });
        }

        buildAndShowMenu(menuItems, e.pageX, e.pageY);
    }

    // Show general context menu
    function showGeneralContextMenu(e) {
        contextMenuTarget = null;

        const menuItems = [];

        // Only show paste if we have a copied chord
        if (copiedChordBuffer) {
            menuItems.push({
                label: `Paste Chord "${copiedChordBuffer.slice(1, -1)}"`,
                icon: '📌',
                action: pasteChordAtCursor
            });
        }

        if (menuItems.length === 0) {
            // Don't show empty menu
            return;
        }

        buildAndShowMenu(menuItems, e.pageX, e.pageY);
    }

    // Generic menu builder
    function buildAndShowMenu(items, x, y) {
        // Clear existing menu items
        contextMenuElement.innerHTML = '';

        // Build menu items
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'context-menu-item';
            menuItem.innerHTML = `<span class="menu-icon">${item.icon}</span> ${item.label}`;
            menuItem.addEventListener('click', () => {
                item.action();
                hideContextMenu();
            });
            contextMenuElement.appendChild(menuItem);
        });

        // Position and show menu
        positionContextMenu(x, y);
        contextMenuElement.classList.remove('hidden');
    }

    // Position context menu
    function positionContextMenu(x, y) {
        // Set initial position
        contextMenuElement.style.left = x + 'px';
        contextMenuElement.style.top = y + 'px';

        // Ensure menu stays within viewport
        const menuRect = contextMenuElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Adjust horizontal position if menu goes off-screen
        if (menuRect.right > viewportWidth) {
            contextMenuElement.style.left = (x - menuRect.width) + 'px';
        }

        // Adjust vertical position if menu goes off-screen
        if (menuRect.bottom > viewportHeight) {
            contextMenuElement.style.top = (y - menuRect.height) + 'px';
        }
    }

    // Hide context menu
    function hideContextMenu() {
        contextMenuElement.classList.add('hidden');
        contextMenuTarget = null;
    }

    // Copy chord function
    function copyChord() {
        if (!contextMenuTarget) return;

        const chordText = contextMenuTarget.getAttribute('data-chord');
        copiedChordBuffer = `[${chordText}]`;
    }

    // Cut chord from context menu
    function cutChordFromContextMenu() {
        if (!contextMenuTarget) return;

        const chordText = contextMenuTarget.getAttribute('data-chord');
        const line = parseInt(contextMenuTarget.getAttribute('data-line'));
        const pos = parseInt(contextMenuTarget.getAttribute('data-pos'));

        // Store in both buffers
        const chordWithBrackets = `[${chordText}]`;
        cutChordBuffer = chordWithBrackets;
        copiedChordBuffer = chordWithBrackets;

        // Remove chord from text
        const lines = lyricsInput.value.split('\n');
        const lineText = lines[line];

        // Handle --- and / markers
        let fullChordText = chordWithBrackets;
        let afterChordPos = pos + chordWithBrackets.length;

        if (lineText.substring(afterChordPos, afterChordPos + 3) === '---') {
            fullChordText += '---';
            afterChordPos += 3;
        }

        let beforeChordPos = pos;
        if (pos > 0 && lineText.charAt(pos - 1) === '/') {
            fullChordText = '/' + fullChordText;
            beforeChordPos = pos - 1;
        }

        const beforeChord = lineText.substring(0, beforeChordPos);
        const afterChord = lineText.substring(afterChordPos);
        lines[line] = beforeChord + afterChord;

        lyricsInput.value = lines.join('\n');
        updatePreview();
    }

    // Delete chord from context menu
    function deleteChordFromContextMenu() {
        if (!contextMenuTarget) return;

        const chordText = contextMenuTarget.getAttribute('data-chord');
        const line = parseInt(contextMenuTarget.getAttribute('data-line'));
        const pos = parseInt(contextMenuTarget.getAttribute('data-pos'));

        // Remove chord from text (without storing in buffer)
        const lines = lyricsInput.value.split('\n');
        const lineText = lines[line];

        // Handle --- and / markers
        const chordWithBrackets = `[${chordText}]`;
        let fullChordText = chordWithBrackets;
        let afterChordPos = pos + chordWithBrackets.length;

        if (lineText.substring(afterChordPos, afterChordPos + 3) === '---') {
            fullChordText += '---';
            afterChordPos += 3;
        }

        let beforeChordPos = pos;
        if (pos > 0 && lineText.charAt(pos - 1) === '/') {
            fullChordText = '/' + fullChordText;
            beforeChordPos = pos - 1;
        }

        const beforeChord = lineText.substring(0, beforeChordPos);
        const afterChord = lineText.substring(afterChordPos);
        lines[line] = beforeChord + afterChord;

        lyricsInput.value = lines.join('\n');
        updatePreview();
    }

    // Add new chord at character
    function addNewChordAtCharacter() {
        if (!contextMenuTarget) return;

        // Prompt user for chord name
        const chordName = prompt('Enter chord name (e.g., C, Dm, G7):');
        if (!chordName) return;

        // Find the insertion point before this character
        const lineContainer = contextMenuTarget.closest('.line-container');
        const lyricsLine = lineContainer.querySelector('.lyrics-line');
        const allChars = Array.from(lyricsLine.querySelectorAll('.char:not(.half-space)'));

        // Find corresponding insertion point
        const insertionPoints = Array.from(lyricsLine.querySelectorAll('.insert-point'));
        let targetInsertionPoint = null;

        for (let i = 0; i < insertionPoints.length; i++) {
            const nextChar = insertionPoints[i].nextElementSibling;
            if (nextChar === contextMenuTarget) {
                targetInsertionPoint = insertionPoints[i];
                break;
            }
        }

        if (!targetInsertionPoint) {
            alert('Could not find position for character');
            return;
        }

        const line = parseInt(targetInsertionPoint.getAttribute('data-line'));
        const pos = parseInt(targetInsertionPoint.getAttribute('data-pos'));

        // Insert chord
        const lines = lyricsInput.value.split('\n');
        const lineText = lines[line];
        lines[line] = lineText.substring(0, pos) + `[${chordName}]` + lineText.substring(pos);

        lyricsInput.value = lines.join('\n');
        updatePreview();
    }

    // Paste chord at character
    function pasteChordAtCharacter() {
        if (!contextMenuTarget || !copiedChordBuffer) return;

        // Find the insertion point before this character
        const lineContainer = contextMenuTarget.closest('.line-container');
        const lyricsLine = lineContainer.querySelector('.lyrics-line');
        const insertionPoints = Array.from(lyricsLine.querySelectorAll('.insert-point'));
        let targetInsertionPoint = null;

        for (let i = 0; i < insertionPoints.length; i++) {
            const nextChar = insertionPoints[i].nextElementSibling;
            if (nextChar === contextMenuTarget) {
                targetInsertionPoint = insertionPoints[i];
                break;
            }
        }

        if (!targetInsertionPoint) {
            alert('Could not find position for character');
            return;
        }

        const line = parseInt(targetInsertionPoint.getAttribute('data-line'));
        const pos = parseInt(targetInsertionPoint.getAttribute('data-pos'));

        const lines = lyricsInput.value.split('\n');
        const lineText = lines[line];
        lines[line] = lineText.substring(0, pos) + copiedChordBuffer + lineText.substring(pos);

        lyricsInput.value = lines.join('\n');
        updatePreview();
    }

    // Paste chord at cursor
    function pasteChordAtCursor() {
        if (!copiedChordBuffer) return;

        // Paste at textarea cursor position
        const textarea = lyricsInput;
        const pos = textarea.selectionStart;
        const fullText = textarea.value;

        const newText = fullText.substring(0, pos) + copiedChordBuffer + fullText.substring(pos);
        textarea.value = newText;

        const newPos = pos + copiedChordBuffer.length;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();

        updatePreview();
    }

    // Function to toggle character selection mode
    function toggleCharacterSelectionMode() {
        isCharacterSelectionMode = !isCharacterSelectionMode;

        if (isCharacterSelectionMode) {
            btnCharSelectMode.classList.add('active');
            btnCharSelectMode.textContent = '🎯 Character Mode: ON';
            previewPane.style.cursor = 'crosshair';
        } else {
            btnCharSelectMode.classList.remove('active');
            btnCharSelectMode.textContent = '🎯 Character Select Mode';
            previewPane.style.cursor = 'default';

            // Clear selections
            if (selectedChordElement) {
                selectedChordElement.classList.remove('selected');
                selectedChordElement = null;
            }
            if (selectedCharacterElement) {
                selectedCharacterElement.classList.remove('char-selected');
                selectedCharacterElement = null;
            }
        }

        // Update preview to re-render with or without character spans
        updatePreview();
    }

    // Add event listeners for preview update
    lyricsInput.addEventListener('input', updatePreview);
    fontSizeInput.addEventListener('input', updatePreview);

    // Function to toggle between sharp and flat notation
    function toggleAccidentalsInText() {
        // Determine if we should convert to flats or sharps
        // Check if there are more sharps than flats in the text
        const text = lyricsInput.value;
        const sharpCount = (text.match(/[A-G]#/g) || []).length;
        const flatCount = (text.match(/[A-G]b/g) || []).length;

        // Convert to flats if there are more sharps, otherwise convert to sharps
        const toFlat = sharpCount >= flatCount;

        // Apply the conversion
        lyricsInput.value = toggleAccidentals(text, toFlat);

        // Update preview
        updatePreview();

        // Update key detection
        detectKey();

        // Show message
        const message = toFlat ? "Converted sharps to flats" : "Converted flats to sharps";
        alert(message);
    }

    function updateHtmlPreview() {
        if (htmlPreviewOpen && htmlPreviewWindow && !htmlPreviewWindow.closed) {
            // Generate preview HTML
            const lyrics = lyricsInput.value;
            const capo = parseInt(capoInput.value);
            const fontSize = parseInt(fontSizeInput.value);
            const chords = extractChords(lyrics);
            const [majorKey, _] = detectSongKey(chords);
            const keyChords = MAJOR_KEYS[majorKey] || [];

            currentHtml = generateHtml(lyrics, capo, keyChords, fontSize);

            // Update the preview window
            htmlPreviewWindow.document.open();
            htmlPreviewWindow.document.write(currentHtml);
            htmlPreviewWindow.document.close();
        }
    }

    function toggleHtmlPreview() {
        if (htmlPreviewOpen && htmlPreviewWindow && !htmlPreviewWindow.closed) {
            htmlPreviewWindow.close();
            htmlPreviewOpen = false;
            return;
        }

        // Generate preview HTML
        const lyrics = lyricsInput.value;
        const capo = parseInt(capoInput.value);
        const fontSize = parseInt(fontSizeInput.value);
        const chords = extractChords(lyrics);
        const [majorKey, _] = detectSongKey(chords);
        const keyChords = MAJOR_KEYS[majorKey] || [];

        currentHtml = generateHtml(lyrics, capo, keyChords, fontSize);

        // Open preview window
        htmlPreviewWindow = window.open('', 'html_preview', 'width=800,height=600,menubar=no,toolbar=no');
        htmlPreviewWindow.document.open();
        htmlPreviewWindow.document.write(currentHtml);
        htmlPreviewWindow.document.close();

        htmlPreviewOpen = true;

        // Set up window close listener
        htmlPreviewWindow.addEventListener('beforeunload', () => {
            htmlPreviewOpen = false;
        });
    }

    function transpose(step) {
        const original = lyricsInput.value;
        lyricsInput.value = transposeText(original, step);
        detectKey();
        updatePreview();
    }

    function applyCapo() {
        const newCapo = parseInt(capoInput.value);
        const oldCapo = capoInput.oldValue !== undefined ? parseInt(capoInput.oldValue) : 0;
        const steps = oldCapo - newCapo;  // Calculate the difference between old and new capo

        // Store the current capo value for next change
        capoInput.oldValue = newCapo;

        // Transpose the chords based on the difference
        if (steps !== 0) {
            const original = lyricsInput.value;
            lyricsInput.value = transposeText(original, steps);
            detectKey();
            updatePreview();

            if (lastDetectedKey) {
                const suggestedKey = INDEX_TO_NOTE[(NOTE_INDEX[lastDetectedKey] + newCapo + 12) % 12];
                alert(`Try playing in key of ${suggestedKey} with capo ${newCapo}.`);
            }
        }
    }

    function detectKey() {
        const chords = extractChords(lyricsInput.value);
        const [majorKey, minorKey] = detectSongKey(chords);
        lastDetectedKey = majorKey;
        keyInfo.textContent = `🎼 Major: ${majorKey} | Minor: ${minorKey}`;
        updatePreview();
    }

    function saveLyrics() {
        const content = lyricsInput.value;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'lyrics.txt';
        a.click();

        URL.revokeObjectURL(url);
    }

    function loadLyrics() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';

        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = event => {
                lyricsInput.value = event.target.result;
                updatePreview();
                detectKey();
            };

            reader.readAsText(file);
        };

        input.click();
    }

    function exportHtml() {
        const lyrics = lyricsInput.value;
        const capo = parseInt(capoInput.value);
        const fontSize = parseInt(fontSizeInput.value);
        const chords = extractChords(lyrics);
        const [majorKey, _] = detectSongKey(chords);
        const keyChords = MAJOR_KEYS[majorKey] || [];

        currentHtml = generateHtml(lyrics, capo, keyChords, fontSize);

        const blob = new Blob([currentHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'lyrics.html';
        a.click();

        URL.revokeObjectURL(url);

        // Show preview
        if (!htmlPreviewOpen || !htmlPreviewWindow || htmlPreviewWindow.closed) {
            toggleHtmlPreview();
        } else {
            updateHtmlPreview();
        }
    }

    function loadHtml() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.html';

        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = event => {
                try {
                    const html = event.target.result;
                    currentHtml = html;
                    const reconstructed = parseHtml(html);
                    lyricsInput.value = reconstructed;
                    updatePreview();
                    detectKey();

                    // Show preview
                    if (htmlPreviewOpen && htmlPreviewWindow && !htmlPreviewWindow.closed) {
                        htmlPreviewWindow.document.open();
                        htmlPreviewWindow.document.write(html);
                        htmlPreviewWindow.document.close();
                    } else {
                        toggleHtmlPreview();
                    }
                } catch (error) {
                    alert('Error loading HTML: ' + error.message);
                }
            };

            reader.readAsText(file);
        };

        input.click();
    }

    function moveChord(direction) {
        const textarea = lyricsInput;
        const fullText = textarea.value;
        const pos = textarea.selectionStart;

        // Search for chord boundaries around cursor
        const left = fullText.lastIndexOf('[', pos);
        const right = fullText.indexOf(']', pos);

        if (left === -1 || right === -1 || left >= right) {
            alert('Cursor must be inside a chord like [C].');
            return;
        }

        const chord = fullText.substring(left, right + 1);
        const before = fullText.substring(0, left);
        const after = fullText.substring(right + 1);

        // Track cursor offset inside chord
        const offsetInChord = pos - left;

        let newText;
        let newLeft;

        if (direction === -1 && left > 0) {  // Move left
            newText = before.slice(0, -1) + chord + before.slice(-1) + after;
            newLeft = left - 1;
        } else if (direction === 1 && right + 1 < fullText.length) {  // Move right
            newText = before + after[0] + chord + after.substring(1);
            newLeft = left + 1;
        } else {
            return;  // Cannot move further
        }

        textarea.value = newText;

        // Reposition cursor relative to moved chord
        const newPos = newLeft + offsetInChord;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();

        updatePreview();
    }

    function cutChord() {
        const textarea = lyricsInput;
        const fullText = textarea.value;
        const pos = textarea.selectionStart;

        const left = fullText.lastIndexOf('[', pos);
        const right = fullText.indexOf(']', pos);

        if (left === -1 || right === -1 || left >= right) {
            alert('Cursor must be inside a chord like [C].');
            return;
        }

        // Store chord
        cutChordBuffer = fullText.substring(left, right + 1);

        // Remove chord from text
        const newText = fullText.substring(0, left) + fullText.substring(right + 1);
        textarea.value = newText;

        // Set cursor back to position after cut
        textarea.selectionStart = left;
        textarea.selectionEnd = left;
        textarea.focus();

        updatePreview();
    }

    function pasteChord() {
        if (!cutChordBuffer) {
            alert('No chord in buffer. Use Cut Chord first.');
            return;
        }

        const textarea = lyricsInput;
        const pos = textarea.selectionStart;
        const fullText = textarea.value;

        // Insert chord at cursor
        const newText = fullText.substring(0, pos) + cutChordBuffer + fullText.substring(pos);
        textarea.value = newText;

        // Place cursor inside pasted chord
        const newPos = pos + 1;  // Inside the chord
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();

        updatePreview();
    }

    // Function to paste chord with dash
    function pasteChordWithDash() {
        if (!cutChordBuffer) {
            alert('No chord in buffer. Use Cut Chord first.');
            return;
        }

        const textarea = lyricsInput;
        const pos = textarea.selectionStart;
        const fullText = textarea.value;

        // Extract the chord part without brackets
        const chordOnly = cutChordBuffer.substring(1, cutChordBuffer.length - 1);

        // Insert chord with dash format at cursor
        const insertion = `[${chordOnly}]---`;
        const newText = fullText.substring(0, pos) + insertion + fullText.substring(pos);
        textarea.value = newText;

        // Place cursor after the inserted content
        const newPos = pos + insertion.length;
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();

        updatePreview();
    }

    // Function to flip chords on the current line
    function flipChordsOnLine() {
        const textarea = lyricsInput;
        const fullText = textarea.value;
        const pos = textarea.selectionStart;

        // Find the current line boundaries
        const lines = fullText.split('\n');
        let lineStart = 0;
        let lineEnd = 0;
        let currentLineIndex = 0;
        let charCount = 0;

        // Find which line the cursor is on
        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length;
            if (charCount + lineLength >= pos) {
                currentLineIndex = i;
                lineStart = charCount;
                lineEnd = charCount + lineLength;
                break;
            }
            charCount += lineLength + 1; // +1 for newline character
        }

        const currentLine = lines[currentLineIndex];

        // Extract all chords and their positions on the current line
        const chordPattern = /\[([A-Ga-g][#b]?(?:[^/\]]*)(?:\/[^/\]]*)?)\]/g;
        const chordsInfo = [];
        let match;

        while ((match = chordPattern.exec(currentLine)) !== null) {
            chordsInfo.push({
                chord: match[0],
                startIndex: match.index,
                endIndex: match.index + match[0].length
            });
        }

        // If there are fewer than 2 chords, nothing to flip
        if (chordsInfo.length < 2) {
            alert('Current line must have at least 2 chords to flip.');
            return;
        }

        // Extract text segments between chords
        let newLine = '';
        let lastEnd = 0;

        // Build the new line by reversing chord order but keeping text positions
        for (let i = 0; i < chordsInfo.length; i++) {
            const currentPos = chordsInfo[i];
            const reversedChord = chordsInfo[chordsInfo.length - 1 - i].chord;

            // Add text before chord
            newLine += currentLine.substring(lastEnd, currentPos.startIndex);
            // Add the flipped chord
            newLine += reversedChord;

            lastEnd = currentPos.endIndex;
        }

        // Add remaining text after last chord
        newLine += currentLine.substring(lastEnd);

        // Reconstruct the full text
        lines[currentLineIndex] = newLine;
        const newText = lines.join('\n');

        textarea.value = newText;

        // Maintain cursor position relative to line start
        const cursorOffset = pos - lineStart;
        const newPos = lineStart + Math.min(cursorOffset, newLine.length);
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();

        updatePreview();
    }

    // Function to add --- after the current chord
    function addDashAfterChord() {
        const textarea = lyricsInput;
        const fullText = textarea.value;
        const pos = textarea.selectionStart;

        // Search for chord boundaries around cursor
        const left = fullText.lastIndexOf('[', pos);
        const right = fullText.indexOf(']', pos);

        if (left === -1 || right === -1 || left >= right) {
            alert('Cursor must be inside a chord like [C].');
            return;
        }

        // Insert --- after the closing bracket
        const newText = fullText.substring(0, right + 1) + '---' + fullText.substring(right + 1);
        textarea.value = newText;

        // Place cursor after the inserted dashes
        const newPos = right + 4; // right + 1 (bracket) + 3 (dashes)
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();

        updatePreview();
    }

    // Function to add / before the current chord
    function addSlashAfterChord() {
        const textarea = lyricsInput;
        const fullText = textarea.value;
        const pos = textarea.selectionStart;

        // Search for chord boundaries around cursor
        const left = fullText.lastIndexOf('[', pos);
        const right = fullText.indexOf(']', pos);

        if (left === -1 || right === -1 || left >= right) {
            alert('Cursor must be inside a chord like [C].');
            return;
        }

        // Insert / before the opening bracket
        const newText = fullText.substring(0, left) + '/' + fullText.substring(left);
        textarea.value = newText;

        // Place cursor after the slash (which is now before the chord)
        const newPos = left + 2; // left + 1 (slash) + 1 (to be inside the chord)
        textarea.selectionStart = newPos;
        textarea.selectionEnd = newPos;
        textarea.focus();

        updatePreview();
    }

    // Function to undo dash or slash from current chord
    function undoChordModification() {
        const textarea = lyricsInput;
        const fullText = textarea.value;
        const pos = textarea.selectionStart;

        // Search for chord boundaries around cursor
        const left = fullText.lastIndexOf('[', pos);
        const right = fullText.indexOf(']', pos);

        if (left === -1 || right === -1 || left >= right) {
            alert('Cursor must be inside a chord like [C].');
            return;
        }

        let modified = false;
        let newText = fullText;
        let newPos = pos;

        // Check for --- after the chord (after closing bracket)
        if (right + 3 < fullText.length && fullText.substring(right + 1, right + 4) === '---') {
            // Remove the ---
            newText = fullText.substring(0, right + 1) + fullText.substring(right + 4);
            newPos = pos; // Keep cursor in same position
            modified = true;
        }
        // Check for / before the chord (before opening bracket)
        else if (left > 0 && fullText.charAt(left - 1) === '/') {
            // Remove the /
            newText = fullText.substring(0, left - 1) + fullText.substring(left);
            newPos = pos - 1; // Adjust cursor position
            modified = true;
        }

        if (modified) {
            textarea.value = newText;
            textarea.selectionStart = newPos;
            textarea.selectionEnd = newPos;
            textarea.focus();
            updatePreview();
        } else {
            alert('No --- or / found near the current chord.');
        }
    }
});
