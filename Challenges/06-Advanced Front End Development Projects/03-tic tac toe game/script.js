let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let myMove = false;

function getWinner(b) {
  // Check if someone won
  const vals = [true, false];
  let allNotNull = true;
  for (let k = 0; k < vals.length; k++) {
    const value = vals[k];

    // Check rows, columns, and diagonals
    let diagonalComplete1 = true;
    let diagonalComplete2 = true;
    for (let i = 0; i < 3; i++) {
      if (b[i][i] !== value) {
        diagonalComplete1 = false;
      }
      if (b[2 - i][i] !== value) {
        diagonalComplete2 = false;
      }
      let rowComplete = true;
      let colComplete = true;
      for (let j = 0; j < 3; j++) {
        if (b[i][j] !== value) {
          rowComplete = false;
        }
        if (b[j][i] !== value) {
          colComplete = false;
        }
        if (b[i][j] === null) {
          allNotNull = false;
        }
      }
      if (rowComplete || colComplete) {
        return value ? 1 : 0;
      }
    }
    if (diagonalComplete1 || diagonalComplete2) {
      return value ? 1 : 0;
    }
  }
  if (allNotNull) {
    return -1;
  }
  return null;
}

function recurseMinimax(bo, player) {
  const b = bo;
  const winner = getWinner(b);
  if (winner !== null) {
    if (winner === 1) {
      // AI wins
      return [1, b];
    } else if (winner === 0) {
      // opponent wins
      return [-1, b];
    } else if (winner === -1) {
      // Tie
      return [0, b];
    }
  } else {
    // Next states
    let nextVal = null;
    let nextBoard = null;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (b[i][j] === null) {
          b[i][j] = player;
          const [value] = recurseMinimax(b, !player);
          if (
            (player && (nextVal === null || value > nextVal)) ||
            (!player && (nextVal === null || value < nextVal))
          ) {
            nextBoard = b.map((arr) => arr.slice());
            nextVal = value;
          }
          b[i][j] = null;
        }
      }
    }
    return [nextVal, nextBoard];
  }

  return null;
}

function minimaxMove(b) {
  return recurseMinimax(b, true)[1];
}

function updateButtons() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === false) {
        [...document.querySelectorAll(`#c${i}${j}`)]
          .forEach(n => {
            n.setAttribute('disabled', 'disabled');
            n.textContent = 'x';
          });
      } else if (board[i][j]) {
        [...document.querySelectorAll(`#c${i}${j}`)]
          .forEach(n => {
            n.setAttribute('disabled', 'disabled');
            n.textContent = 'o';
          });
      } else {
        [...document.querySelectorAll(`#c${i}${j}`)]
          .forEach(n => n.textContent = '');
      }
    }
  }
}

function updateMove() {
  updateButtons();
  const winner = getWinner(board);

  if (winner === 1) {
    [...document.querySelectorAll('#winner')][0].textContent = 'AI Won!';
    [...document.querySelectorAll('#move')][0].textContent = '';
    [...document.querySelectorAll('button')].forEach(button =>
      button.setAttribute('disabled', 'disabled')
    );
    return;
  } else if (winner === 0) {
    [...document.querySelectorAll('#winner')][0].textContent = 'You Won!';
    [...document.querySelectorAll('#move')][0].textContent = '';
    [...document.querySelectorAll('button')].forEach(button =>
      button.setAttribute('disabled', 'disabled')
    );
    return;
  } else if (winner === -1) {
    [...document.querySelectorAll('#winner')][0].textContent = 'Tie!';
    [...document.querySelectorAll('#move')][0].textContent = '';
    [...document.querySelectorAll('button')].forEach(button =>
      button.setAttribute('disabled', 'disabled')
    );
    return;
  }

  [...document.querySelectorAll('#winner')][0].textContent = '';
  [...document.querySelectorAll('#move')]
    .forEach(n => myMove
      ? n.textContent = `AI's Move`
      : n.textContent = 'Your move'
    );
}

function makeMove() {
  board = minimaxMove(board);
  myMove = false;
  updateMove();
}

function restartGame() {
  [...document.querySelectorAll('button')].forEach(button =>
    button.removeAttribute('disabled')
  );
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  myMove = false;
  updateMove();
}

if (myMove) {
  makeMove();
}

[...document.querySelectorAll('button')]
  .forEach(n => n.addEventListener('click', () => {
    const [, row, col] = event.currentTarget.getAttribute('id');
    if (!myMove) {
      board[parseInt(row, 10)][parseInt(col, 10)] = false;
      myMove = true;
      updateMove();
      makeMove();
    }
  }));

[...document.querySelectorAll('#restart')][0]
  .addEventListener('click', restartGame);
updateMove();
