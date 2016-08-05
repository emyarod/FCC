function destroyer(arr, ...args) {
  return arr.filter((value) => {
    if (args.indexOf(value) === -1) {
      return value;
    }
  });
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));