function spinalCase(str) {
  let s = str;
  const capitals = s.match(/[A-Z]/gm);
  capitals.forEach((letter) => {
    s = s.replace(letter, ` ${letter.toLowerCase()}`);
  });

  return s.trim().replace(/ |_/gmi, '-').replace(/--/gmi, '-');
}

spinalCase('This Is Spinal Tap');
console.log(spinalCase("This Is Spinal Tap"));
// "this-is-spinal-tap".
console.log(spinalCase("thisIsSpinalTap"));
// "this-is-spinal-tap".
console.log(spinalCase("The_Andy_Griffith_Show"));
// "the-andy-griffith-show".
console.log(spinalCase("Teletubbies say Eh-oh"));
// "teletubbies-say-eh-oh".
console.log(spinalCase("AllThe-small Things"));
// "all-the-small-things".