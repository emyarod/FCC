function bouncer(arr) {
  const newArr = arr.filter((value) => {
    return value;
  });

  return newArr;
}

bouncer([7, 'ate', '', false, 9]);
console.log(bouncer([7, 'ate', '', false, 9]));