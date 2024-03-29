let sequence = '';

function addToSequence(sur) {
  sequence += sur + ' ';
  document.getElementById('sequence-box').innerHTML = sequence;
}

function matchSequence() {
  sendSequenceToPython(sequence);
}

function sendSequenceToPython(sequence) {
  fetch('/process_sequence', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sequence: sequence }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Received response from Python:', data);
    updateNumberedSequenceBox(data.numbered_sequence);
    displayMatchResults(data.match_results);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function updateNumberedSequenceBox(numberedSequence) {
  const numberedSequenceBox = document.getElementById('numbered-sequence-box');
  numberedSequenceBox.innerHTML = numberedSequence;
}

function displayMatchResults(matchResults) {
  const matchResultsBox = document.getElementById('match-results-box');
  const resultsArray = Object.entries(matchResults).map(([raga, percentage]) => ({ raga, percentage }));

  resultsArray.sort((a, b) => b.percentage - a.percentage);

  matchResultsBox.innerHTML = '';

  resultsArray.forEach(result => {
    const resultString = `${result.raga}: ${result.percentage}%`;

    const resultElement = document.createElement('p');
    resultElement.textContent = resultString;

    matchResultsBox.appendChild(resultElement);
  });
}

document.addEventListener('keydown', function(event) {
  const key = event.key.toLowerCase();
  const button = document.querySelector(`button[data-key="${key}"]`);

  if (button) {
    button.click();
  }
});

function reloadPage() {
    location.reload();
}
