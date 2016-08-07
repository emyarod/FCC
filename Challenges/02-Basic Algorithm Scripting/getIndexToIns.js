function getIndexToIns(arr, num) {
  arr.push(num);
  const sortedArr = arr.sort((a, b) => {
    return a - b;
  });

  return sortedArr.indexOf(num);
}

getIndexToIns([40, 60], 50);
console.log(getIndexToIns([40, 60], 50));