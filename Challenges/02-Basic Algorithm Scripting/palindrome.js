function palindrome(str) {
  const replace = str.replace(/\W|_/gmi, '').toLowerCase();
  for (let i = 0; i < replace.length; i++) {
    if (replace[i] !== replace[replace.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

palindrome('eye');