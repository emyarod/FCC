function dropElements(arr, func) {
  if (!arr.length) {
    return [];
  }

  if (func(arr[0])) {
    return arr;
  }

  arr.shift();
  return dropElements(arr, func);
}

console.log(dropElements([1, 2, 3, 4], function(n) {return n >= 3;}));
// should return[3, 4].

console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));
// should return[1, 0, 1].

console.log(dropElements([1, 2, 3], function(n) {return n > 0;}));
// should return[1, 2, 3].

console.log(dropElements([1, 2, 3, 4], function(n) {return n > 5;}));
// should return[].

console.log(dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;}));
// should return[7, 4].

console.log(dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;}));
// should return[3, 9, 2].
