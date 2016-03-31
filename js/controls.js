var randomized = false,
  playingRandomized = false;

function reset() {
  ifNotEmpty('droppedIn1');
  ifNotEmpty('droppedIn2');
  ifNotEmpty('droppedIn3');
  ifNotEmpty('droppedIn4');
  stop();
  rhythm = [];
  rhythmRandomized = [];
  randomized = false;
  document.getElementById('playRandomized').classList.add('hide');
  document.getElementById('stopRandomized').classList.add('hide');
}

function stop() {
  for (var i = 0; i < sources.length; i++) {
    sources[i].stop();
  }
  sources = [];

  clearTimeout(timer);

  playingRandomized = false;

  document.getElementById('play').classList.remove('hide');
  document.getElementById('stop').classList.add('hide');

  if (randomized) {
    document.getElementById('playRandomized').classList.remove('hide');
    }
  document.getElementById('stopRandomized').classList.add('hide');
}

function randomize() {
  reset(true);
  randomized = true;

  rhythmRandomized[0] = chooseRandom(),
      rhythmRandomized[1] = chooseRandom(),
      rhythmRandomized[2] = chooseRandom(),
      rhythmRandomized[3] = chooseRandom();

  function chooseRandom() {
  allAvailable = document.getElementsByClassName('yes-drop'),
    rand = allAvailable[Math.floor(Math.random() * allAvailable.length)].getAttribute('data-oorsprong');
    return rand;
  }

  RhythmSample.play(true);
}
