function mutation(arr) {
  const [first, second] = arr;
  let counter = 0;
  for (let i = 0; i < second.length; i++) {
    if (first.toLowerCase().indexOf(second[i].toLowerCase()) === -1) {
      return false;
    }
  }

  return true;
}

mutation(['hello', 'hey']);
console.log(mutation(['hello', 'hey']));
