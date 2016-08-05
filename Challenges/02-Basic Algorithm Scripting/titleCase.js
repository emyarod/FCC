function titleCase(str) {
  const arr = str.split(' ');
  arr.forEach((element, index) => {
    element = element.toLowerCase();
    arr[index] = `${element.charAt(0).toUpperCase()}${element.slice(1)}`;
  });

  return arr.join(' ');
}


titleCase('I\'m a little tea pot');