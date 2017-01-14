let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let cpuMove = false;

function getWinner(b) {
  // check for winner
  const vals = [true, false];
  let allNotNull = true;
  for (let k = 0; k < vals.length; k++) {
    const value = vals[k];

    // check rows, columns, and diagonals
    let diagonalComplete1 = true;
    let diagonalComplete2 = true;
    for (let row = 0; row < 3; row++) {
      if (b[row][row] !== value) {
        diagonalComplete1 = false;
      }
      if (b[2 - row][row] !== value) {
        diagonalComplete2 = false;
      }
      let rowComplete = true;
      let colComplete = true;
      for (let col = 0; col < 3; col++) {
        if (b[row][col] !== value) {
          rowComplete = false;
        }
        if (b[col][row] !== value) {
          colComplete = false;
        }
        if (b[row][col] === null) {
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

  return allNotNull ? -1 : null;
}

function minimax(b, player) {
  const winner = getWinner(b);
  if (winner !== null) {
    if (winner === 1) {
      // CPU wins
      return [1, b];
    } else if (winner === 0) {
      // player wins
      return [-1, b];
    } else if (winner === -1) {
      // tie
      return [0, b];
    }
  } else {
    // Next states
    let nextVal = null;
    let nextBoard = null;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (b[row][col] === null) {
          b[row][col] = player;
          const [value] = minimax(b, !player);
          if (
            (player && (nextVal === null || value > nextVal)) ||
            (!player && (nextVal === null || value < nextVal))
          ) {
            nextBoard = b.map((arr) => arr.slice());
            nextVal = value;
          }
          b[row][col] = null;
        }
      }
    }
    return [nextVal, nextBoard];
  }

  return null;
}

function updateButtons() {
  const labelButtons = (row, col, letter, disable = true) => {
    [...document.querySelectorAll(`#c${row}${col}`)]
      .forEach(n => {
        disable ? n.setAttribute('disabled', 'disabled') : null;
        n.textContent = letter;
      });
  };

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === false) {
        labelButtons(row, col, 'x');
      } else if (board[row][col]) {
        labelButtons(row, col, 'o');
      } else {
        labelButtons(row, col, '', false);
      }
    }
  }
}

function updateMove() {
  updateButtons();
  const winner = getWinner(board);
  const endGame = (endstate) => {
    [...document.querySelectorAll('#winner')][0].textContent = `${endstate}`;
    [...document.querySelectorAll('#move')][0].textContent = '';
    [...document.querySelectorAll('button')].forEach(button =>
      button.setAttribute('disabled', 'disabled')
    );
  };

  if (winner === 1) {
    endGame('CPU won!');
    return;
  } else if (winner === 0) {
    endGame('You won!');
    return;
  } else if (winner === -1) {
    endGame('Tie!');
    return;
  }

  [...document.querySelectorAll('#winner')][0].textContent = '';
  [...document.querySelectorAll('#move')]
    .forEach(n => cpuMove
      ? n.textContent = 'CPU\'s Move'
      : n.textContent = 'Your move'
    );
}

function makeMove() {
  [, board] = minimax(board, true);
  cpuMove = false;
  updateMove();
}

function restartGame(cpuTurn) {
  [...document.querySelectorAll('button')].forEach(button =>
    button.removeAttribute('disabled')
  );

  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  cpuMove = cpuTurn === 'cpu';
  updateMove();

  if (cpuMove) makeMove();
}


[...document.querySelectorAll('button')]
  .forEach(n => n.addEventListener('click', event => {
    const [, row, col] = event.currentTarget.getAttribute('id');
    if (!cpuMove) {
      board[parseInt(row, 10)][parseInt(col, 10)] = false;
      cpuMove = true;
      updateMove();
      makeMove();
    }
  }));

[...document.querySelectorAll('#cpustart')][0]
  .addEventListener('click', () => restartGame('cpu'));

[...document.querySelectorAll('#playerstart')][0]
  .addEventListener('click', () => restartGame('player'));
