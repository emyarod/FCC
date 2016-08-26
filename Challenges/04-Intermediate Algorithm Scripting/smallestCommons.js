// shoutout http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/
function findPrimeFactors(num) {
  const primeFactors = [];
  while (num > 1) {
    const root = Math.sqrt(num);
    let x = 2;

    // not divisible by 2
    if (num % x) {
      x = 3;
      while ((num % x) && ((x += 2) < root)) {}
    }

    if (x > root) {
      x = num;
    }

    primeFactors.push(x);
    num /= x;
  }

  return primeFactors;
}

function smallestCommons(arr) {
  let min = Math.min.apply(null, arr);
  let max = Math.max.apply(null, arr);
  const range = [];

  // create an array of numbers from range [min, max]
  for (let i = min; i <= max; i++) {
    range.push(i);
  }

  // create an array of arrays containing prime factors of each number in the range
  const allPrimeFactorArrays = [];
  range.forEach((number) => {
    allPrimeFactorArrays.push(findPrimeFactors(number));
  });

  // create an object where the keys are prime factors and the values are the highest number of occurrences of that key in prime factorization
  const factors = {};
  allPrimeFactorArrays.forEach((primeFactorArray) => {
    primeFactorArray.forEach((factor) => {
      const count = primeFactorArray.filter((x) => x === factor).length;
      if (factors[factor] === undefined || factors[factor] < count) {
        factors[factor] = count;
      }
    });
  });

  let LCM = 1;
  Object.keys(factors).forEach((key) => {
    LCM *= Math.pow(key, factors[key]);
  });

  return LCM;
}

// smallestCommons([1,5]);
console.log(smallestCommons([1, 13]));
