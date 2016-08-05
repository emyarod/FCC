function findLongestWord(str) {
  let arr = str.split(' ');
  arr.sort((a, b) => {
    return b.length - a.length;
  });

  return arr[0].length;
}

findLongestWord('The quick brown fox jumped over the lazy dog');