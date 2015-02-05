var http = require('http');
var _ = require('lodash');

var htmlBody = "<html><body>Hello world!</body></html>";

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(htmlBody);
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');

var booksUrl = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';

http.get(booksUrl, function(res) {

	var body = "";

	res.on("data", function (data) {
		body += data;
	});

	res.on("end", function() {
		var bookList = _.map(JSON.parse(body).records, function(book) {
			return { title: book.title, author: book.author, year: book.year };
		});

		console.log(bookList);

		htmlBody = "<html>\n<body>\n";
		htmlBody = "<h1>List of books</h1>\n";

		_.map(bookList, function(book) {
			htmlBody += "\n<h3>" + book.author + ": " + book.title + " (" + book.year + ")</h3>";
		});

		htmlBody += "\n</body></html>";

	});


});


