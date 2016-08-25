function ajaxQuery(searchTerm) {
  return new Promise((resolve) => {
    const articles = [];

    // query wikipedia API
    $.ajax({
      url: '//en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: searchTerm,
        format: 'json',
      },
      dataType: 'jsonp',
      success: (response) => {
        const results = response.query.search;
        console.log(response);
        results.forEach((element) => {
          articles.push({
            title: element.title,
            snippet: element.snippet,
          });
        }, this);

        resolve(articles);
      },
    });
  });
}

function articleMarkup(title, snippet) {
  return `
    <a href="https://en.wikipedia.org/wiki/${title}" class="list-group-item">
      <h4 class="list-group-item-heading">${title}</h4>
      <p class="list-group-item-text">${snippet}</p>
    </a>`.trim();
}

function searchWiki() {
  $('#results').empty();
  const searchTerm = $('#searchbar').val();
  ajaxQuery(searchTerm).then((data) => {
    const articles = data;
    articles.forEach((element) => {
      $('#results').append(articleMarkup(element.title, element.snippet));
    }, this);
  });
}

$('#searchform').submit(() => searchWiki());
$('#search').click(() => searchWiki());
