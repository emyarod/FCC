
function myReplace(str, before, after) {
  let s = str;
  let oldWord = before;
  let newWord = after;
  const replaceOld = new RegExp(before, 'gi');
  s = s.replace(replaceOld, after);
  if (before.charAt(0) === before.toUpperCase().charAt(0)) {
    newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
    const capitalize = new RegExp(after, 'gi');
    s = s.replace(capitalize, newWord);
    return s;
  }

  return s;
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");