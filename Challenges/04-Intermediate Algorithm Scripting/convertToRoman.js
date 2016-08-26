function romanizer(num, one, four, five, nine) {
  let value = '';
  if (num === 9) { return nine; }
  if (num === 5) { return five; }
  if (num === 4) { return four }
  if (num == 0) { return ''; }

  if (num > 5) {
    // under 9
    value = five;
    for (let i = 5; i < num; i++) {
      value += one;
    }
  } else {
    // under 4
    for (let i = 0; i < num; i++) {
      value += one;
    }
  }

  return value;
}

function convertToRoman(num) {
  let number = num;
  let roman = '';
  const numLen = num.toString().length;
  const digits = [];
  for (let i = 0; i < 3; i++) {
    digits.push(number % 10)
    number = Math.floor(number / 10);
  }

  digits.push(number);
  const [ones, tens, hundreds, thousands] = digits;
  for (let i = 0; i < thousands; i++) {
    roman += 'M';
  }

  roman += romanizer(hundreds, 'C', 'CD', 'D', 'CM');
  roman += romanizer(tens, 'X', 'XL', 'L', 'XC');
  roman += romanizer(ones, 'I', 'IV', 'V', 'IX');

  return roman;
}

convertToRoman(36);
console.log(convertToRoman(39999));