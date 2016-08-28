function pairwise(arr, arg) {
  const sumIndices = [];
  if (!arr.length) {
    return 0;
  }

  arr.forEach((element1, index1) => {
    arr.forEach((element2, index2) => {
      if (index1 !== index2 && arr[index1] + arr[index2] === arg && !sumIndices.includes(index1) && !sumIndices.includes(index2)) {
        sumIndices.push(index1, index2);
      }
    });
  });

  return sumIndices.reduce((a, b) => a + b);
}

console.log(pairwise([1, 4, 2, 3, 0, 5], 7)); // should return 11.
console.log(pairwise([1, 3, 2, 4], 4)); // should return 1.
console.log(pairwise([1, 1, 1], 2)); // should return 1.
console.log(pairwise([0, 0, 0, 0, 1, 1], 1)); // should return 10.
console.log(pairwise([], 100)); // should return 0.
