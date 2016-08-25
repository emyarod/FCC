function diffArray(arr1, arr2) {
  const combined = arr1.concat(arr2);
  const uniques = [];
  var aCount = new Map([...new Set(combined)].map(
    x => [x, combined.filter(y => y === x).length]
  ));

  combined.forEach((element) => {
    if (aCount.get(element) === 1) {
      uniques.push(element);
    }
  });

  return uniques;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);