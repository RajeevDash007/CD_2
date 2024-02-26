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
  };
  
  const synth = new Tone.Synth().toDestination();
  const volumeNode = new Tone.Volume(0).toDestination();
  synth.connect(volumeNode);
  
  const midiToNoteMap = {
    60: "s", // C4
    62: "r", // D4
    64: "g", // E4
    65: "m", // F4
    67: "p", // G4
    69: "d", // A4
    71: "n", // B4
    72: "su", // C5
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
    "g",
    "-",
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
  
  document.getElementById('volumeControl').addEventListener('input', function (e) {
    const volumeValue = e.target.value;
    volumeNode.volume.value = volumeValue;
  });
  
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

    setTimeout(() => {
        if (isPlaying) {
            playNote();
        }
    }, 500);
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