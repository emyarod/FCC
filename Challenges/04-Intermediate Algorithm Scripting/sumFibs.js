function sumFibs(num) {
  let total = 0;
  const fib = [0, 1];

  // create array of Fibonacci numbers up including num
  for (let i = 2; i <= num; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }

  // sum only odd Fibonacci numbers
  fib.forEach((number) => {
    if (number % 2 !== 0 && number <= num) {
      total += number;
    }
  });

  return total;
}

sumFibs(4);
console.log((sumFibs(10)));
console.log(sumFibs(1000)); // 1785.
console.log(sumFibs(4000000)); // 4613732.
console.log(sumFibs(4)); // 5.
console.log(sumFibs(75024)); // 60696.
console.log(sumFibs(75025)); // 135721.