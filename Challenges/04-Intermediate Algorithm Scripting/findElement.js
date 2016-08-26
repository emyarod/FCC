function findElement(arr, func) {
  let num;
  let found = false;

  arr.forEach((element) => {
    if (func(element) && !found) {
      found = true;
      num = element;
    }
  });

  return num;
}

console.log(findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; })); // 8.
console.log(findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; })); // undefined.
