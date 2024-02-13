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

