# 🎶 Chords Editor

A powerful lyrics editor with chord notation and interactive right-click context menu functionality.

## ✨ Features

### Right-Click Context Menu
- **Copy Chord**: Right-click on any chord to copy it
- **Cut Chord**: Right-click on any chord to cut it (removes from text)
- **Paste Chord**: Right-click anywhere to paste a copied chord
- **Add New Chord**: Right-click on any character (in Character Select Mode) to add a new chord

### Chord Manipulation
- **Transpose**: Transpose all chords up or down by semitones
- **Toggle Accidentals**: Switch between sharp (♯) and flat (♭) notation
- **Move Chords**: Move chords left or right character by character
- **Flip Chords**: Reverse the order of chords on a line
- **Add Markers**: Add `---` or `/` markers to chords
- **Key Detection**: Automatically detect the song's key (major and minor)

### Display Options
- **Character Select Mode**: Enable interactive character selection for precise chord placement
- **Capo Support**: Automatically transpose chords based on capo position
- **Font Size Control**: Adjust preview font size
- **HTML Export**: Export lyrics with chords to standalone HTML file
- **PDF Export**: Export to PDF via browser print dialog
- **HTML Preview**: Live preview in separate window with auto-scroll

## 🚀 Live Demo

**Try it online:** [https://rasouli87.github.io/chords-editor/](https://rasouli87.github.io/chords-editor/)

## 📖 How to Use

### Basic Usage

1. **Enter lyrics with chords** in the text area on the left using the format: `[ChordName]lyrics`
   ```
   [C]Hello [G]world
   [F]Welcome [Am]back
   ```

2. **View the preview** on the right side with chords displayed above the lyrics

3. **Right-click on chords** in the preview to copy, cut, or manipulate them

### Context Menu Operations

#### Normal Mode
- **Right-click on a chord** → Choose "Copy Chord" or "Cut Chord"
- **Right-click anywhere** → Choose "Paste Chord" (if you've copied a chord)

#### Character Select Mode
1. Click the **"🎯 Character Select Mode"** button to enable
2. **Right-click on any character** → Choose "Add New Chord Here" or "Paste Chord"
3. **Click on a chord** → Then click on a character to move the chord there

### Keyboard Shortcuts
- Use the buttons in the control panel for various operations
- All chord manipulation can be done via the preview pane

### Advanced Features

#### Capo
- Set capo position (0-11)
- Chords automatically transpose to show what you actually play

#### Export
- **HTML Export**: Creates a standalone HTML file with auto-scroll feature
- **PDF Export**: Opens print dialog to save as PDF
- **Save/Load**: Save and load your lyrics as `.txt` files

#### Key Detection
- Click **"🎼 Detect Key"** to analyze the chords
- Shows both major and minor key suggestions
- Key chords are highlighted in green in the preview

## 🛠️ Installation

### Option 1: Use Online
Simply visit [https://rasouli87.github.io/chords-editor/](https://rasouli87.github.io/chords-editor/)

### Option 2: Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/rasouli87/chords-editor.git
   cd chords-editor
   ```

2. Open `index.html` in your web browser:
   ```bash
   xdg-open index.html  # Linux
   open index.html      # macOS
   start index.html     # Windows
   ```

No build process or dependencies required!

## 📝 Chord Format

Chords are enclosed in square brackets: `[ChordName]`

**Supported formats:**
- Basic chords: `[C]`, `[G]`, `[Am]`, `[F]`
- Sharp/Flat: `[C#]`, `[Db]`, `[F#m]`, `[Bbm]`
- Extended chords: `[Cmaj7]`, `[G7]`, `[Am7]`, `[Dsus4]`
- Slash chords: `[C/G]`, `[Am/E]`, `[D/F#]`
- Special markers: `[C]---` (sustain), `/[C]` (lead-in)

## 🎯 Tips & Tricks

1. **Precise Placement**: Use Character Select Mode for pixel-perfect chord placement
2. **Quick Copy**: Right-click to quickly copy a chord and paste it multiple times
3. **Batch Operations**: Use "Flip Chords" to reverse chord order on a line
4. **Export for Performance**: Export to HTML with auto-scroll for live performance

## 🧩 Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - All functionality (no frameworks!)

## 📂 Project Structure

```
chords-editor/
├── index.html          # Main HTML file with UI
├── js/
│   └── scripts.js      # All JavaScript functionality
└── README.md           # This file
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available for personal and educational use.

## 👤 Author

**Hossein Rasouli** (rasouli87)

## 🙏 Acknowledgments

Built with assistance from Claude Sonnet 4.5

---

**Enjoy making music!** 🎸🎹🎤
