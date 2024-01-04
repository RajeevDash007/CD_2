let sequence = '';

function addToSequence(sur) {
  sequence += sur + ' ';
  document.getElementById('sequence-box').innerHTML = sequence;

  // Send the sequence to Python for numbering
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
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function updateNumberedSequenceBox(numberedSequence) {
  const numberedSequenceBox = document.getElementById('numbered-sequence-box');
  numberedSequenceBox.innerHTML = numberedSequence;
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
updateSequenceBox();

