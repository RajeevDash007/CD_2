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
