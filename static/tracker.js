WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
    init();
  }
});

function init() {
  const noteMap = {
    s: "C4",
    r: "D4",
    g: "E4",
    m: "F4",
    p: "G4",
    d: "A4",
    n: "B4",
    su: "C5",
    ru: "D5",
    gu: "E5",
  };
  
  const synth = new Tone.Sampler({
    urls: {
      C4: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/C3.mp3',
      D4: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/D3.mp3',
      E4: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/E3.mp3',
      F4: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/F3.mp3',
      G4: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/G3.mp3',
      A4: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/A3.mp3',
      B4: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/B3.mp3',
      C5: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/C4.mp3',
      D5: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/D4.mp3',
      E5: 'https://raw.githubusercontent.com/nbrosowsky/tonejs-instruments/master/samples/harmonium/E4.mp3',
    },
    release: 2,
}).toDestination();
  
  const midiToNoteMap = {
    60: "s", // C4
    62: "r", // D4
    64: "g", // E4
    65: "m", // F4
    67: "p", // G4
    69: "d", // A4
    71: "n", // B4
    72: "su", // C5
    74: "ru", // D5
    76: "gu", // D5
    // Add more mappings as needed
  };
  
  const sequence = [
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "r",
    "g",
    "r",
    "p",
    "g",
    "d",
    "p",
    "g",
    "g",
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "r",
    "g",
    "r",
    "p",
    "g",
    "d",
    "p",
    "g",
    "g",
    "g",
    "p",
    "d",
    "su",
    "ru",
    "su",
    "d",
    "p",
    "su",
    "p",
    "d",
    "p",
    "g",
    "r",
    "s",
    "s",
    "g",
    "p",
    "d",
    "su",
    "ru",
    "su",
    "d",
    "p",
    "su",
    "p",
    "d",
    "p",
    "g",
    "r",
    "s",
    "s",
    "g",
    "g",
    "p",
    "d",
    "p",
    "su",
    "su",
    "su",
    "d",
    "d",
    "su",
    "ru",
    "gu",
    "ru",
    "su",
    "d",
    "g",
    "g",
    "p",
    "d",
    "p",
    "su",
    "su",
    "su",
    "d",
    "d",
    "su",
    "ru",
    "gu",
    "ru",
    "su",
    "d",
    "gu",
    "gu",
    "ru",
    "su",
    "ru",
    "ru",
    "su",
    "d",
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "s",
    "gu",
    "gu",
    "ru",
    "su",
    "ru",
    "ru",
    "su",
    "d",
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "s",
  ].map((note) => noteMap[note]);
  
  let currentNoteIndex = 0;
  let isPlaying = false;
  
  const inputs = WebMidi.inputs;
  if (inputs.length > 0) {
    const input = inputs[0];
    input.addListener('noteon', 'all', onMIDIMessage);
  } else {
    console.log('No MIDI devices available.');
  }
  
  
  const notesContainer = document.getElementById("notes-container");
  const originalSequence = [
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "r",
    "g",
    "r",
    "p",
    "g",
    "d",
    "p",
    "g",
    "-",
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "r",
    "g",
    "r",
    "p",
    "g",
    "d",
    "p",
    "g",
    "-",
    "g",
    "p",
    "d",
    "su",
    "ru",
    "su",
    "d",
    "p",
    "su",
    "p",
    "d",
    "p",
    "g",
    "r",
    "s",
    "-",
    "g",
    "p",
    "d",
    "su",
    "ru",
    "su",
    "d",
    "p",
    "su",
    "p",
    "d",
    "p",
    "g",
    "r",
    "s",
    "-",
    "g",
    "g",
    "p",
    "d",
    "p",
    "su",
    "-",
    "su",
    "d",
    "d",
    "su",
    "ru",
    "gu",
    "ru",
    "su",
    "d",
    "g",
    "g",
    "p",
    "d",
    "p",
    "su",
    "-",
    "su",
    "d",
    "d",
    "su",
    "ru",
    "gu",
    "ru",
    "su",
    "d",
    "gu",
    "gu",
    "ru",
    "su",
    "ru",
    "ru",
    "su",
    "d",
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "-",
    "gu",
    "gu",
    "ru",
    "su",
    "ru",
    "ru",
    "su",
    "d",
    "su",
    "su",
    "d",
    "p",
    "g",
    "r",
    "s",
    "-",
  ];
  originalSequence.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.textContent = note;
    notesContainer.appendChild(noteElement);
});
  
  document.getElementById("play").addEventListener("click", play);
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("stop").addEventListener("click", stop);
  
  function onMIDIMessage(event) {
    const note = event.note.number;
    const appNote = midiToNoteMap[note];
    if (appNote) {
      playAppNote(appNote);
    }
  }
  
  function playAppNote(appNote) {
    const noteToPlay = noteMap[appNote];
    if (noteToPlay && isPlaying) {
      synth.triggerAttackRelease(noteToPlay, "0.5s");
    }
  }
  
  function playNote() {
    if (currentNoteIndex >= sequence.length) {
        stop();
        return;
    }

    if (!isPlaying) {
        return;
    }

    const note = sequence[currentNoteIndex];
    synth.triggerAttackRelease(note, "0.5s");

    document.querySelectorAll(".note").forEach((el, i) => {
        el.classList.toggle("active", i === currentNoteIndex);
    });
    currentNoteIndex++;

    if (currentNoteIndex % 16 === 0) {
        scrollPage(200); // Scroll the page by 50px after every 8 notes
    }

    setTimeout(() => {
        if (isPlaying) {
            playNote();
        }
    }, 500);
}

function scrollPage(scrollAmount) {
    window.scrollBy(0, scrollAmount);
}
  
  function play() {
    if (!isPlaying) {
      isPlaying = true;
      Tone.start();
      playNote();
    }
  }
  
  function pause() {
    isPlaying = false;
  }
  
  function stop() {
    isPlaying = false;
    currentNoteIndex = 0;
    document
      .querySelectorAll(".note")
      .forEach((noteElement) => noteElement.classList.remove("active"));
  }
}