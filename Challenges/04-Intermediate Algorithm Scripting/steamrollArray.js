function steamrollArray(arr) {
  return arr.reduce((previousValue, currentValue) => {
    if (Array.isArray(currentValue)) {
      return previousValue.concat(steamrollArray(currentValue));
    }

    return previousValue.concat(currentValue);
  }, []);
}

steamrollArray([1, [2], [3, [[4]]]]);
console.log(steamrollArray([1, [2], [3, [[4]]]]));
console.log(steamrollArray([[3, [[4]]]]));
console.log(steamrollArray([[[2]]]));
