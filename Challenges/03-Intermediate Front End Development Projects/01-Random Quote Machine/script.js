function getNewQuote() {
  // fade out quote
  $('#quote').fadeOut();
  $('#author').fadeOut();

  $.ajax({
    headers: {
      'X-Mashape-Key': 'OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V',
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: (response) => {
      const res = JSON.parse(response);
      const quote = res.quote;
      const author = res.author;
      $('#quote').text(`"${quote}"`).fadeIn();
      $('#author').text(`—${author}`).fadeIn();

      // edit tweet
      $('#tweet').attr('href', `https://twitter.com/intent/tweet?text="${quote}" —${author}`);
    },
  });
}

getNewQuote();

$('#newquote').click(() => getNewQuote());
