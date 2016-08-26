function whatIsInAName(collection, source) {
  // What's in a name?
  const arr = [];
  // Only change code below this line
  const sourceKeys = Object.keys(source);
  collection.forEach((object) => {
    const objectKeys = Object.keys(object);
    let allFound = true;
    let allEqual = true;
    sourceKeys.forEach((key) => {
      if (!object.hasOwnProperty(key)) {
        allFound = false;
      } else if (object[key] !== source[key]) {
        allEqual = false;
      }
    });

    if (allFound && allEqual) {
      arr.push(object);
    }
  });


  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));
console.log(whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 }));

// collection
// [
//   { "a": 1, "b": 2 },
//   { "a": 1 },
//   { "a": 1, "b": 2, "c": 2 }
// ]
// source
// {
//   "a": 1,
//   "b": 2
// }
// result
// [
//   { "a": 1, "b": 2 },
//   { "a": 1, "b": 2, "c": 2 }
// ]
