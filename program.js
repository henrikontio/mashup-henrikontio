var http = require('http');

var serviceUrl = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';
var pageBody = '<html><head><title>Mashup</title></head><body>No data.</body></html>';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(pageBody);
}).listen(13666, '127.0.0.1');

console.log('server running at http://127.0.0.1:13666');

http.get(serviceUrl, function (res) {
  console.log('load books...');
  var body = '';

  res.on('data', function (chunk) {
    console.log('chunk of data received...')
    body += chunk;
  });

  res.on('end', function () {
    console.log('end of data event...')
    var books = JSON.parse(body).records;
    var booksHtml = books.map(function(book) {
      return '<h2>' + book.title + ' (' + book.year + ')</h2>' +
        '<span class="author">- ' + book.author + '</span>';
    });
    pageBody = '<html><head><title>Mashup</title></head><body>' + booksHtml + '</body></html>';
  });
}).on('error', function(e) {
      console.log('Error: ', e);
});