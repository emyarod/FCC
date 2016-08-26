function fearNotLetter(str) {
  const charCodes = [];
  const range = [];
  for (let i = 0; i < str.length; i++) {
    charCodes.push(str.charCodeAt(i));
  }

  let missing = 0;
  let found = false;

  range.push(charCodes[0]);
  charCodes.reduce((previousValue, currentValue, currentIndex, array) => {
    if (!found) {
      if (currentValue === (previousValue + 1)) {
        missing = previousValue;
        found = true;
        range.push(currentValue);
        return currentValue;
      }

      range.push(previousValue + 1);
      return currentValue + 1;
    }
  }, charCodes[0]);

  if (!missing) {
    return undefined;
  }

  return String.fromCharCode(missing);
}

fearNotLetter("abcdefghjklmno");
console.log(fearNotLetter("abcdefghjklmno"));
