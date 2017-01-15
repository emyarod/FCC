{
  let simonMoves = [];
  const playerMoves = [];
  let step = 0;
  let level = 0;
  let ready = false;
  let strict = false;
  let sequence;
  let timeout;
  const easyButton = document.querySelector('#easy');
  const strictButton = document.querySelector('#strict');
  const restartButton = document.querySelector('#restart');
  const levelText = document.querySelector('#level');
  const moves = [...document.querySelectorAll('.move')];

  // play note audio
  function playNote(note) {
    const noteButton = document.querySelector(`#${note}`);
    const audio = document.querySelector(`audio[data-id="${note}"]`);

    // light up note when clicked
    noteButton.focus();

    // light up note when played by simon
    setTimeout(() => noteButton.blur(), (strict ? 500 : 350) / 2);

    // play sound
    audio.currentTime = 0;
    audio.play();
  }

  // generate random moves
  function randomMoves() {
    const numbers = [];

    while (numbers.length <= 20) {
      numbers.push(Math.floor(Math.random() * 4));
    }

    return numbers.map(num => moves.map(move => move.id)[num]);
  }

  function reset() {
    simonMoves = randomMoves();
    levelText.textContent = 'Level: 0';
    playerMoves.length = 0;
    step = 0;
    level = 0;
  }

  // play notes up to current level
  function playNoteSeq() {
    // make notes unclickable
    moves.forEach(move => move.style.pointerEvents = 'none');

    // wait 1 second after player move
    timeout = setTimeout(() => {
      level = 0;

      // wait between notes
      sequence = setInterval(() => {
        // play interval
        playNote(simonMoves[level]);

        // play notes up to current step
        if (step <= level) {
          // make notes clickable
          moves.forEach(move => move.style.pointerEvents = 'auto');

          // stop setInterval
          clearInterval(sequence);
        }

        // increment level
        level++;

        // check win condition
        if (level === 20) {
          alert('Victory');
          reset();
          playNoteSeq();
        }
      }, strict ? 500 : 350);
    }, 1000);
  }

  // start game
  function start() {
    reset();
    playNoteSeq();
  }

  // increment level
  function nextLevel() {
    step++;
    levelText.textContent = `Level: ${step}`;
    playNoteSeq();
    playerMoves.length = 0;
  }

  // error function
  function fail() {
    playerMoves.length = 0;
    playNoteSeq();
    levelText.textContent = `Try level ${step} again`;

    // restart if strict mode is on
    if (strict) reset();
  }

  // checks all moves
  function checkAllMoves() {
    for (let i = 0; i <= step; i++) {
      if (simonMoves[i] !== playerMoves[i]) return false;
    }

    return true;
  }

  // checks each move
  function checkMove() {
    for (let i = 0; i < playerMoves.length; i++) {
      if (simonMoves[i] !== playerMoves[i]) return false;
    }

    return true;
  }

  easyButton.addEventListener('click', () => {
    ready = true;
    strict = false;
    easyButton.style.display = 'none';
    strictButton.style.display = 'none';
    start();
    restartButton.style.display = 'inline-block';
  });

  strictButton.addEventListener('click', () => {
    ready = true;
    strict = true;
    easyButton.style.display = 'none';
    strictButton.style.display = 'none';
    start();
    restartButton.style.display = 'inline-block';
  });

  restartButton.addEventListener('click', event => {
    clearInterval(sequence);
    clearTimeout(timeout);
    easyButton.style.display = 'inline-block';
    strictButton.style.display = 'inline-block';
    event.currentTarget.style.display = 'none';
    ready = false;
  });

  moves.forEach(move => move.addEventListener('click', (event) => {
    playNote(move.id);

    // notes to be played if game hasnt started
    if (ready) {
      const note = event.currentTarget.id;
      playerMoves.push(note);

      if (playerMoves.length === (step + 1)) {
        checkAllMoves() ? nextLevel() : fail();
      } else if (!checkMove()) {
        fail();
      }
    }
  }));
}
