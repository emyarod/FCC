function reverseString(str) {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }

  str = arr.reverse().join('');
  return str;
}

reverseString('hello');
