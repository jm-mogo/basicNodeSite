const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const filename = "." + q.pathname;

    if (filename == "./") {
        fs.readFile("./index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            return res.end(data);
        });
    } else {
        fs.readFile(filename + ".html", function (err, data) {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                return res.end("404 Not Found");
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
        });
    }
});

server.listen(8080);
