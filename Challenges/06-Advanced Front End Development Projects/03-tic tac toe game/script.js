{
  const state = { symbol: 'x' };
  const labels = [...document.querySelectorAll('label')];
  const buttons = [...document.querySelectorAll('button')];

  function render(event, symbol) {
    event.currentTarget.setAttribute('disabled', 'disabled');
    event.currentTarget.setAttribute('data-content', symbol);
  }

  function reset() {
    document.querySelector('.buttons').style.display = 'flex';
    // clear board
  }

  function checkForWinner() {
    const board = labels.map(square => {
      const letter = square.getAttribute('data-content');
      return !letter ? '' : letter;
    });

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombos.find(combo => {
      const [sq1, sq2, sq3] = combo;
      const condition = board[sq1] && board[sq1] === board[sq2] && board[sq2] === board[sq3];
      return condition ? combo : false;
    });
  }

  function clickListener(event) {
    const switchSymbol = symbol => (symbol === 'x' ? 'o' : 'x');
    render(event, state.symbol);

    if (checkForWinner()) {
      console.log(`${state.symbol} wins`);
      labels.forEach(element => element.removeEventListener('click', clickListener, false), this);
      reset();
      return;
    }

    state.symbol = switchSymbol(state.symbol);
    event.currentTarget.removeEventListener('click', clickListener, false);
  }

  function pickSide(event) {
    state.symbol = event.currentTarget.innerHTML;
    // if user picks o, start AI {need to comment out line above}
    event.currentTarget.removeEventListener('click', pickSide, false);
    labels.forEach(element => element.addEventListener('click', clickListener, false), this);
    document.querySelector('.buttons').style.display = 'none';
  }

  buttons.forEach(element => element.addEventListener('click', pickSide, false), this);
}
