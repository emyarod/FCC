function addTogether(...args) {
  // one argument
  if (args.length === 1) {
    // argument is not an integer
    if (!Number.isInteger(args[0])) {
      return undefined;
    }

    // return function that takes another number to sum
    return function(num) {
      // make sure 2nd argument is an integer
      if (Number.isInteger(num)) {
        return args[0] + num;
      }

      return undefined;
    }
  }

  // two arguments
  if (args.length === 2) {
    if (!Number.isInteger(args[0]) || !Number.isInteger(args[1])) {
      return undefined;
    }

    return args[0] + args[1];
  }

  return undefined;
}

addTogether(2,3);
console.log(addTogether(2, 3)); //  should return 5.
console.log(addTogether(2)(3)); //  should return 5.
console.log(addTogether("http://bit.ly/IqT6zt")); //  should return undefined.
console.log(addTogether(2, "3")); //  should return undefined.
console.log(addTogether(2)([3])); //  should return undefined.