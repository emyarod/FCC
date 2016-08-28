function ordinalIndicator(num) {
  const lastDigit = num.toString().slice(-1);
  if (lastDigit === '1') {
    return `${num}st`;
  } else if (num === 2 || num === 22) {
    return `${num}nd`;
  } else if (num === 3 || num === 23) {
    return `${num}rd`;
  }

  return `${num}th`;
}

function makeFriendlyDates(arr) {
  const [start, end] = arr;
  let [startYear, startMonth, startDay] = start.split('-');
  let [endYear, endMonth, endDay] = end.split('-');
  startYear = parseInt(start);
  startMonth = parseInt(startMonth);
  startDay = parseInt(startDay);
  endYear = parseInt(end);
  endMonth = parseInt(endMonth);
  endDay = parseInt(endDay);
  const months = [,
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const withinAYear = (startYear === endYear - 1) && ((startMonth <= endMonth) && (startDay > endDay) || (startMonth > endMonth));
  const currentYear = new Date().getFullYear();
  if (start === end) {
    // same date
    return [`${months[startMonth]} ${ordinalIndicator(startDay)}, ${startYear}`];
  } else if (startYear === endYear && startMonth === endMonth) {
    // same month, same year
    return [`${months[startMonth]} ${ordinalIndicator(startDay)}`, ordinalIndicator(endDay)];
  } else if (startYear === endYear) {
    // same year
    return [`${months[startMonth]} ${ordinalIndicator(startDay)}, ${startYear}`, `${months[endMonth]} ${ordinalIndicator(endDay)}`];
  } else if (withinAYear) {
    if (startYear === currentYear) {
      // start year === current year
      return [`${months[startMonth]} ${ordinalIndicator(startDay)}`, `${months[endMonth]} ${ordinalIndicator(endDay)}`];
    }

    // within a year
    return [`${months[startMonth]} ${ordinalIndicator(startDay)}, ${startYear}`, `${months[endMonth]} ${ordinalIndicator(endDay)}`];
  }

  return [`${months[startMonth]} ${ordinalIndicator(startDay)}, ${startYear}`, `${months[endMonth]} ${ordinalIndicator(endDay)}, ${endYear}`];
}

console.log(makeFriendlyDates(["2016-07-01", "2016-07-04"]));
// ["July 1st","4th"].

console.log(makeFriendlyDates(["2016-12-01", "2017-02-03"]));
// ["December 1st","February 3rd"].

console.log(makeFriendlyDates(["2016-12-01", "2018-02-03"]));
// ["December 1st, 2016","February 3rd, 2018"].

console.log(makeFriendlyDates(["2017-03-01", "2017-05-05"]));
// ["March 1st, 2017","May 5th"]

console.log(makeFriendlyDates(["2018-01-13", "2018-01-13"]));
// ["January 13th, 2018"].

console.log(makeFriendlyDates(["2022-09-05", "2023-09-04"]));
// ["September 5th, 2022","September 4th"].

console.log(makeFriendlyDates(["2022-09-05", "2023-09-05"]));
// ["September 5th, 2022","September 5th, 2023"].
