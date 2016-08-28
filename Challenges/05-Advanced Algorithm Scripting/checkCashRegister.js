function checkCashRegister(price, cash, cid) {
  // convert dollar and cent values to cents only
  let change = (cash - price) * 100;
  const remainingCID = [];
  const values = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  cid.reverse();
  cid.forEach((element, index) => {
    // push legal tender values to array
    element[1] = Math.round(element[1] * 100);
    element.push(values[index]);

    // check if bill/coin is of equal or smaller value than the amount owed
    const [key, amount, value] = element;
    let wholeDivisible = parseInt(change / value);
    if (wholeDivisible >= 1) {
      // check if drawer contains a positive amount for this coin/bill
      if (amount > 0) {
        // decrease multiple if drawer does not have enough of the coin/bill
        if (wholeDivisible * value > amount) {
          wholeDivisible--;
        }

        remainingCID.push([key, wholeDivisible * value / 100]);

        // assign new values to remaining amount in drawer and change owed
        element[1] -= (value * wholeDivisible);
        change -= wholeDivisible * value;
      }
    }
  });

  if (cid.every((element) => { return element[1] === 0; })) {
    return 'Closed';
  }

  if (cid.some((element) => { return element[1] < 0; })) {
    return 'Insufficient Funds';
  }

  return remainingCID;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

console.log(checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));
// should return [["QUARTER", 0.50]].

console.log(checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));
// should return [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].

console.log(checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// should return "Insufficient Funds".

console.log(checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// should return "Insufficient Funds".

console.log(checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// should return "Closed".