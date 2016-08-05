function repeatStringNumTimes(str, num) {
  const origStr = str;
  let newstr = '';
  for (let i = 0; i < num; i++) {
    newstr += origStr;
  }

  return newstr;
}

repeatStringNumTimes('abc', 3);
console.log(repeatStringNumTimes('abc', 3));