let totalCalc = [];
let currentCalc = [0];
const operators = ['/', '*', '-', '+'];

// clear
$('#clear').click(() => {
  currentCalc = [0];
  totalCalc = [0];
  $('#answer').text(currentCalc);
  $('#history').html(`<small>${currentCalc}</small>`);
});

// clear entry
$('#clear-entry').click(() => {
  if (totalCalc.length === 0) {
    totalCalc = [0];
  }

  currentCalc = totalCalc;
  $('#history').html(`<small>${currentCalc}</small>`);
});

// numpad
$('.number').click((event) => {
  // disallow 0 after operator
  if (operators.includes(currentCalc[currentCalc.length - 1]) && $(event.currentTarget).text() === '0') {
    return;
  }

  const number = $(event.currentTarget).text();
  if (currentCalc[0] === 0 && currentCalc.length === 1) {
    currentCalc[0] = '';
  }

  currentCalc.push(number);
  $('#history').html(`<small>${currentCalc.join('')}</small>`);
  console.log(currentCalc);
});

// decimal
$('#decimal').click((event) => {
  // disallow double decimal input
  if (currentCalc[currentCalc.length - 1] === '.') {
    return;
  }

  if (operators.includes(currentCalc[currentCalc.length - 1])) {
    currentCalc = [currentCalc.join('')];
    currentCalc.push('0.');
    $('#history').html(`<small>${currentCalc.join('')}</small>`);
    console.log(currentCalc);
    return;
  }

  const decimal = $(event.currentTarget).text();
  let operatorBetween = true;
  currentCalc = [currentCalc.join('')];

  // disallow double decimal inside an input
  if (currentCalc[0].includes(decimal)) {
    const start = currentCalc[0].lastIndexOf(decimal);
    const end = currentCalc[0].length - 1;
    for (let i = start; i < end; i++) {
      if (!operators.includes(currentCalc[0][i])) {
        operatorBetween = false;
      } else {
        operatorBetween = true;
      }
    }
  }

  if (!operatorBetween) {
    return;
  }

  currentCalc.push(decimal);
  $('#history').html(`<small>${currentCalc.join('')}</small>`);
  console.log(currentCalc);
});

// operations
$('.operation').click((event) => {
  // disallow double operator input
  if (operators.includes(currentCalc[currentCalc.length - 1])) {
    return;
  }

  let operation = $(event.currentTarget).text();
  currentCalc = [currentCalc.join('')];
  if (operation === '÷') {
    // divide
    operation = '/';
  } else if (operation === '×') {
    // multiply
    operation = '*';
  } else if (operation === '-') {
    // subtract
    operation = '-';
  } else if (operation === '+') {
    // add
    operation = '+';
  }

  currentCalc.push(operation);
  $('#history').html(`<small>${currentCalc.join('')}</small>`);
  console.log(currentCalc);
});

// backspace
$('#backspace').click(() => {
  // current calc is not 0
  if (currentCalc.length > 1 || (currentCalc.length === 1 && currentCalc[0] !== 0)) {
    if (currentCalc[currentCalc.length - 1].length > 1) {
      currentCalc[currentCalc.length - 1] = currentCalc[currentCalc.length - 1].slice(0, -1);
    } else {
      currentCalc.pop();

      if (currentCalc.length === 0 || (currentCalc.length === 1 && currentCalc[0] === '')) {
        currentCalc = [0];
      }
    }

    $('#history').html(`<small>${currentCalc.join('')}</small>`);
    console.log(currentCalc);
  }
});

// equals
$('#equals').click(() => {
  // disallow equals after operator
  if (operators.includes(currentCalc[currentCalc.length - 1])) {
    return;
  }

  let answer = eval(currentCalc.join('')).toString();
  if (answer.length > 8) {
    answer = answer.slice(0, 8);
  }

  currentCalc = [answer];
  totalCalc = [answer];
  $('#answer').text(currentCalc);
});
