function truncateString(str, num) {
  if (str.length > num) {
    if (num > 3) {
      str = str.slice(0, num - 3);
    } else {
      str = str.slice(0, num);
    }

    str += '...';
  }

  return str;
}

truncateString('A-tisket a-tasket A green and yellow basket', 11);
console.log(truncateString('A-tisket a-tasket A green and yellow basket', 11));