let sequence = '';

function addToSequence(sur) {
  sequence += sur + ' ';
  document.getElementById('sequence-box').innerHTML = sequence;
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

