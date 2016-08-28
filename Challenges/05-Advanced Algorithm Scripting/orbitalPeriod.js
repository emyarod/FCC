function getOrbitalPeriod(avgAlt) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  return Math.round(2 * Math.PI * Math.sqrt(Math.pow(avgAlt + earthRadius, 3) / GM));
}

function orbitalPeriod(arr) {
  const results = [];
  arr.forEach((element) => {
    const name = element.name;
    const orbitalPeriod = getOrbitalPeriod(element.avgAlt);
    results.push({ name, orbitalPeriod });
  });

  return results;
}

console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));
// should return [{name: "sputnik", orbitalPeriod: 86400}]

console.log(orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]));
// should return [{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}]