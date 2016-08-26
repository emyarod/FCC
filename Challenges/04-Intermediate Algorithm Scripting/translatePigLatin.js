function translatePigLatin(str) {
  const vowels = 'aeiou';
  let found = false;
  let thirdVowel = false;
  for (let i = 0; i < vowels.length; i++) {
    if (str.charAt(0) === vowels[i]) {
      found = true;
    }
  }

  for (let i = 0; i < vowels.length; i++) {
    if (str.charAt(2) === vowels[i]) {
      thirdVowel = true;
    }
  }


  if (found) {
    return `${str}way`;
  }

  if (thirdVowel) {
    return `${str.slice(2)}${str.charAt(0)}${str.charAt(1)}ay`;
  }

  return `${str.slice(1)}${str.charAt(0)}ay`;
}

translatePigLatin("consonant");
console.log(translatePigLatin("consonant"));

console.log(translatePigLatin("california"));
// "aliforniacay".
console.log(translatePigLatin("paragraphs"));
// "aragraphspay".
console.log(translatePigLatin("glove"));
// "oveglay".
console.log(translatePigLatin("algorithm"));
// "algorithmway".
console.log(translatePigLatin("eight"));
// "eightway".