function largestOfFour(arr) {
  const largest = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i].sort((a, b) => {
      return a < b;
    });

    largest.push(arr[i][0]);
  }

  return largest;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));