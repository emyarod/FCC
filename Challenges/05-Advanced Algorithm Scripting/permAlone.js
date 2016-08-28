// shoutout @GorkaJS
function heap(string) {
  const letters = string.split('');
  const permutations = [];

  function swap(a, b) {
    [letters[a], letters[b]] = [letters[b], letters[a]];
  }

  function generate(n) {
    if (n === 1) {
      permutations.push(letters.join(''));
    } else {
      for (let i = 0; i != n; i++) {
        generate(n - 1);
        
        // swap(n % 2 ? 0 : i, n - 1);
        if (n % 2) {
          // n is odd
          swap(0, n - 1);
        } else {
          // n is even
          swap(i, n - 1);
        }
      }
    }
  }

  generate(letters.length);
  return permutations;
}

function permAlone(string) {
  const consecutive = /(.)\1/;

  return heap(string).filter((currentPerm) => (
    !consecutive.test(currentPerm))
  ).length;
}

console.log(permAlone("aab")); // should return 2.
console.log(permAlone("aaa")); // should return 0.
console.log(permAlone("aabb")); // should return 8.
console.log(permAlone("abcdefa")); // should return 3600.
console.log(permAlone("abfdefa")); // should return 2640.
console.log(permAlone("zzzzzzzz")); // should return 0.
console.log(permAlone("a")); // should return 1.
console.log(permAlone("aaab")); // should return 0.
console.log(permAlone("aaabb")); // should return 12.