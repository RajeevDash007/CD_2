WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
    init();
  }
});

function init() {
  // Initialize Tone.js
  Tone.start();

  const noteMap = {
    ml: "F3",
    Ml: "Gb3",
    pl: "G3",
    Dl: "Ab3",
    dl: "A3",
    Nl: "Bb3",
    nl: "B3",
    s: "C4",
    R: "Db4",
    r: "D4",
    G: "D#4",
    g: "Eb4",
    m: "F4",
    M: "Gb4",
    p: "G4",
    D: "Ab4",
    d: "A4",
    N: "Bb4",
    n: "B4",
    su: "C5",
    Ru: "Db5",
    ru: "D5",
    Gu: "D#5",
    gu: "Eb5",
    mu: "F5",
    Mu: "Gb5",
    pu: "G5",
    Du: "Ab5",
    du: "A5",
    Nu: "Bb5",
    nu: "B5",
  };

  const synth = new Tone.Sampler({
    "F3": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/F2.mp3",
    "Gb3": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Fs2.mp3",
    "G3": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/G2.mp3",
    "Ab3": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Gs2.mp3",
    "A3": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/A2.mp3",
    "Bb3": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/As2.mp3",
    "B3": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/B2.mp3",
    "C4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/C3.mp3",
    "Db4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Cs3.mp3",
    "D4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/D3.mp3",
    "Eb4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Ds3.mp3",
    "E4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/E3.mp3",
    "F4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/F3.mp3",
    "Gb4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Fs3.mp3",
    "G4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/G3.mp3",
    "Ab4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Gs3.mp3",
    "A4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/A3.mp3",
    "Bb4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/As3.mp3",
    "B4": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/B3.mp3",
    "C5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/C4.mp3",
    "Db5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Cs4.mp3",
    "D5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/D4.mp3",
    "Eb5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Ds4.mp3",
    "E5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/E4.mp3",
    "F5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/F4.mp3",
    "Gb5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Fs4.mp3",
    "G5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/G4.mp3",
    "Ab5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/Gs4.mp3",
    "A5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/A4.mp3",
    "Bb5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/As4.mp3",
    "B5": "https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/B4.mp3",
  }).toDestination();

  let sequence = [];

  let currentNoteIndex = 0;
  let isPlaying = false;

  const notesContainer = document.getElementById("notes-container");

  document
    .getElementById("play")
    .addEventListener("click", () => play(sequence));
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("stop").addEventListener("click", stop);

  // Function to handle XML file input
  document
    .getElementById("xmlInput")
    .addEventListener("change", handleFileSelect);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const xmlText = event.target.result;
      parseXML(xmlText);
    };

    reader.readAsText(file);
  }

  function parseXML(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const contentTags = xmlDoc.getElementsByTagName("CONTENT");
    const newSequence = [];

    for (let i = 0; i < contentTags.length; i++) {
      const content = contentTags[i].childNodes[0].nodeValue;
      const notes = content.trim().split(" ");
      newSequence.push(...notes);
    }

    // Clear existing notes
    notesContainer.innerHTML = "";

    // Add new notes to sequence and frontend
    newSequence.forEach((note, index) => {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.textContent = note;
      noteElement.setAttribute("data-seq-index", index); // Set a data attribute for the sequence index
      notesContainer.appendChild(noteElement);
    });

    // Update the sequence with new notes
    sequence.length = 0;
    sequence.push(...newSequence);
  }

  function play(sequence) {
    if (!isPlaying && sequence.length > 0) {
      isPlaying = true;
      playNote();
    }
  }

  function playNote() {
    if (currentNoteIndex >= sequence.length) {
      stop();
      return;
    }

    const appNote = sequence[currentNoteIndex];
    const noteToPlay = noteMap[appNote];
    if (noteToPlay) {
      // Trigger the animation right before playing the sound
      animateNote(appNote); // Move this line before synth.triggerAttackRelease
      synth.triggerAttackRelease(noteToPlay, "0.5s");
    }

    currentNoteIndex++;

    setTimeout(() => {
      if (isPlaying) {
        playNote();
      }
    }, 500); // This timing controls the gap between notes, adjust as necessary
  }

  function animateNote() {
    const noteElement = document.querySelector(`.note[data-seq-index="${currentNoteIndex}"]`);
    if (noteElement && !noteElement.classList.contains("active")) {
        noteElement.classList.add("active");
        setTimeout(() => {
            noteElement.classList.remove("active");
        }, 500); // Match this duration with the note play duration for synchronization

        // Scroll the note into view
        noteElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

  function pause() {
    isPlaying = false;
  }

  function stop() {
    isPlaying = false;
    currentNoteIndex = 0;
    document.querySelectorAll(".note").forEach((noteElement) => {
      noteElement.classList.remove("active");
    });
  }
}
