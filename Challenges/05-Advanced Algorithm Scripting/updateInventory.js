function updateInventory(curInv, newInv) {
  const currentItems = [];
  const newItems = [];
  curInv.forEach(([, item]) => currentItems.push(item));
  newInv.forEach(([, item]) => newItems.push(item));

  const overlap = [];
  const uniques = [];
  newInv.forEach((newInvElement) => {
    const [newAmount, newItem] = newInvElement;
    if (currentItems.includes(newItem)) {
      // update amount for overlapping items
      const [oldAmount] = curInv[currentItems.indexOf(newItem)];
      overlap.push([oldAmount + newAmount, newItem]);
    } else {
      // consolidate uniques
      uniques.push(newInvElement)
    }
  });

  curInv.forEach((curInvElement) => {
    const [curAmount, curItem] = curInvElement;
    if (!newItems.includes(curItem)) {
      // consolidate uniques
      uniques.push(curInvElement);
    }
  });

  const combined = overlap.concat(uniques).sort((arr1, arr2) => {
    const item1 = arr1[1].toUpperCase();
    const item2 = arr2[1].toUpperCase();
    if (item1 < item2) {
      return -1;
    }

    if (item1 > item2) {
      return 1;
    }

    return 0;
  });

  return combined;
}

// Example inventory lists
var curInv = [
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"]
];

var newInv = [
  [2, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [67, "Bowling Ball"],
  [7, "Toothpaste"]
];

updateInventory(curInv, newInv);
console.log(updateInventory(curInv, newInv));