function telephoneCheck(str) {
  if (str.length < 10) {
    return false;
  }

  if (str.length > 16) {
    return false;
  }

  const split = str.split(/ |-/);
  const oneGroup = /((1)(\d{3})(\d{3})(\d{4}))|((\d{3})(\d{3})(\d{4}))/gmi;
  if (split.length === 1) {
    if (!str.search(oneGroup) && str.match(oneGroup)[0] === str) {
      return true;
    }

    return false;
  }

  const twoGroup = /((1)(\(\d{3}\))(\d{3}))|((\(\d{3}\))(\d{3}))/gmi;
  if (split.length === 2) {
    if (!split[0].search(twoGroup)) {
      return true;
    }

    return false;
  }

  const threeGroup = /(\d{3})|(\(\d{3}\))/gmi;
  if (split.length === 3) {
    if (!split[0].search(threeGroup) && str.match(threeGroup)[0] === split[0]) {
      return true;
    }

    return false;
  }

  if (split.length === 4) {
    if (split[0] === '1') {
      return true;
    }

    return false;
  }
}

console.log(telephoneCheck('5555555555'));        // true
console.log(telephoneCheck('(555)555-5555'));     // true
console.log(telephoneCheck('1(555)555-5555'));    // true
console.log(telephoneCheck('(555) 555-5555'));    // true
console.log(telephoneCheck('555 555 5555'));      // true
console.log(telephoneCheck('1 555-555-5555'));    // true
console.log(telephoneCheck('1 (555) 555-5555'));  // true
console.log(telephoneCheck('1 555 555 5555'));    // true
console.log(telephoneCheck('1 456 789 4444'));    // true
console.log(telephoneCheck('555-5555'));          // false
console.log(telephoneCheck('5555555'));           // false
console.log(telephoneCheck('123**&!!asdf#'));     // false
console.log(telephoneCheck('55555555'));          // false
console.log(telephoneCheck('(6505552368)'));      // false
console.log(telephoneCheck('-1 (757) 622-7382')); // false
console.log(telephoneCheck('10 (757) 622-7382')); // false
console.log(telephoneCheck('27576227382'));       // false
console.log(telephoneCheck('(275)76227382'));     // false
console.log(telephoneCheck('2(757)6227382'));     // false
console.log(telephoneCheck('2(757)622-7382'));    // false
console.log(telephoneCheck('(555)5(55?)-5555'));  // false
console.log(telephoneCheck('555)-555-5555'));     // false
console.log(telephoneCheck('(555-555-5555'));     // false
console.log(telephoneCheck('1 555)555-5555'));    // false
console.log(telephoneCheck('2 (757) 622-7382'));  // false
console.log(telephoneCheck('0 (757) 622-7382'));  // false
console.log(telephoneCheck('2 757 622-7382'));    // false