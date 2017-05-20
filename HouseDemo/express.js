
var http=require("http");

var assert=require("assert");

console.log(assert(1))

var app=http.createServer(function (req, res) {

	res.writeHead(200,{"content-type":"text/plats"})

	res.end("box")

})





app.listen(3000)