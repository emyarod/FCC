function pairElement(str) {
  const pairs = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'A') {
      pairs.push([str[i], 'T']);
    } else if (str[i] === 'T') {
      pairs.push([str[i], 'A']);
    } else if (str[i] === 'C') {
      pairs.push([str[i], 'G']);
    } else if (str[i] === 'G') {
      pairs.push([str[i], 'C']);
    }
  }

  return pairs;
}

pairElement("GCG");
