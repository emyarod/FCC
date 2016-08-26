function sumAll(arr) {
  const max = Math.max.apply(null, arr);
  const min = Math.min.apply(null, arr);
  const array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }

  return array.reduce((previous, current, index, array) => {
    return previous + current;
  });
}

sumAll([1, 4]);
console.log(sumAll([1, 4]));
