function uniteUnique(...arr) {
  let combined = [];
  const uniques = [];
  arr.forEach((element) => {
    combined = combined.concat(element);
  });

  combined.forEach((number) => {
    if (uniques.indexOf(number) === -1) {
      uniques.push(number);
    }
  });

  return uniques;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));