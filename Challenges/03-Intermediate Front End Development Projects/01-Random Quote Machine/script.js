const quoteURL = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

console.log('asdf');

$.getJSON('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=?', (a) => {
  console.log(a);
  // $('body').append(a[0].content + '<p>— ' + a[0].title + '</p>')
});

$.ajax({
  headers: {
    'X-Mashape-Key': 'OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V',
    // Accept: 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  },
  url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
  success: (response) => {
    console.log(response);
  },
});

$.ajax({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
  success: (response) => {
    console.log(response);
  },
});
