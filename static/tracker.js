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
    Sa: "C4",
    Re: "D4",
    Ga: "E4",
    Ma: "F4",
    Pa: "G4",
    Dha: "A4",
    Ni: "B4",
    "Sa.": "C5",
  };
  
  const synth = new Tone.Synth().toDestination();
  const volumeNode = new Tone.Volume(0).toDestination();
  synth.connect(volumeNode);
  
  const midiToNoteMap = {
    60: "Sa", // C4
    62: "Re", // D4
    64: "Ga", // E4
    65: "Ma", // F4
    67: "Pa", // G4
    69: "Dha", // A4
    71: "Ni", // B4
    72: "Sa.", // C5
    // Add more mappings as needed
  };
  
  const sequence = [
    "Sa",
    "Sa",
    "Re",
    "Sa",
    "Ma",
    "Ga",
    "Sa",
    "Sa",
    "Re",
    "Sa",
    "Pa",
    "Ma",
    "Sa",
    "Sa",
    "Sa.",
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
    "Sa",
    "Sa",
    "Re",
    "Sa",
    "Ma",
    "Ga",
    "Sa",
    "Sa",
    "Re",
    "Sa",
    "Pa",
    "Ma",
    "Sa",
    "Sa",
    "Sa.",
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