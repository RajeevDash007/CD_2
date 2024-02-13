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

const sequence = [
  "Sa",
  "Sa",
  "Re",
  "Sa",
  "Ma",
  "Pa",
  "Sa",
  "Sa",
  "Re",
  "Sa",
  "Pa",
  "Ma",
  "Sa",
  "Sa",
].map((note) => noteMap[note]);
let currentNoteIndex = 0;
let isPlaying = false;

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    D4: "D4.mp3",
    E4: "E4.mp3",
    F4: "F4.mp3",
    G4: "G4.mp3",
    A4: "A4.mp3",
    B4: "B4.mp3",
    C5: "C5.mp3",
  },
  release: 1,
  baseUrl: "https://fuhton.com/piano-mp3/piano-mp3/",
}).toDestination();

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const originalSequence = [
    "Sa",
    "Sa",
    "Re",
    "Sa",
    "Ma",
    "Pa",
    "Sa",
    "Sa",
    "Re",
    "Sa",
    "Pa",
    "Ma",
    "Sa",
    "Sa",
  ];
  originalSequence.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.textContent = note; // Set text to "Sa", "Re", "Ma", etc.
    notesContainer.appendChild(noteElement);
  });

  document.getElementById("play").addEventListener("click", play);
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("stop").addEventListener("click", stop);
});

function playNote() {
  if (currentNoteIndex >= sequence.length) {
    stop();
    return;
  }

  if (!isPlaying) {
    return;
  }

  const note = sequence[currentNoteIndex];
  sampler.triggerAttackRelease(note, "0.5s");

  // Highlight the current note
  document.querySelectorAll(".note").forEach((el, i) => {
    el.classList.toggle("active", i === currentNoteIndex);
  });

  currentNoteIndex++;

  // Schedule the next note
  setTimeout(() => {
    if (isPlaying) {
      playNote();
    }
  }, 500);
}

