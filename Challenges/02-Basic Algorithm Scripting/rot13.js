function rot13(str) { // LBH QVQ VG!
  let newStr = '';
  for (var i = 0; i < str.length; i++) {
    // check if character is alphabetic
    if (/[a-z]/i.test(str[i])) {
      /**
       * a-z = 97-122, A-Z = 65-90
       */
      if (str[i] === str[i].toUpperCase()) {
        // capital letters
        if (str.charCodeAt(i) + 13 > 90) {
          newStr += String.fromCharCode(64 + (str.charCodeAt(i) + 13 - 90));
        } else {
          newStr += String.fromCharCode((str.charCodeAt(i) + 13));
        }
      } else if (str[i] === str[i].toLowerCase()) {
        // lowercase letters
        if (str.charCodeAt(i) + 13 > 122) {
          newStr += String.fromCharCode(64 + (str.charCodeAt(i) + 13 - 122));
        } else {
          newStr += String.fromCharCode((str.charCodeAt(i) + 13));
        }
      }
      // newStr += (String.fromCharCode(str.charCodeAt(i) + 13));
    } else {
      // character is not a letter
      newStr += (String.fromCharCode(str.charCodeAt(i)));
    }
  }

  return newStr;
}

// Change the inputs below to test
rot13('SERR PBQR PNZC');