function factorialize(num) {
  for (let i = num - 1; i > 0; i--) {
    num *= (i);
  }

  if (num === 0) {
    return 1;
  }
  return num;
}

factorialize(5);
