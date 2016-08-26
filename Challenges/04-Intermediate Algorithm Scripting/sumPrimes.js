function isPrime(value) {
  for (let i = 2; i < value; i++) {
    if (!(value % i)) {
      return false;
    }
  }

  return value > 1;
}

function sumPrimes(num) {
  const primes = [];
  let total = 0;
  for (let i = 2; i <= num; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  primes.forEach((prime) => {
    total += prime;
  });

  return total;
}

sumPrimes(10);
console.log(sumPrimes(977));
