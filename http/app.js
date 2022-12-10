const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const formidable = require("formidable");

http
  .createServer(async (req, res) => {
    if (req.url === "/") {
      res.end("Hello world");
    }
    if (req.url === "/home") {
      // res.end("page Home");
      const filePath = path.join(__dirname, "/text.txt");
      const file = await fs.readFile(filePath);
      res.writeHead(200);
      res.write(file);
      res.end();
    }
    if (req.url === "/about") {
      // res.end("page About");
      if (req.method.toLowerCase() === "post") {
        console.log("run");
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
          if (err) {
            res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
            res.end(String(err));
            return;
          }
          // console.log(files.file.originalFilename, files.file.mimetype);
          sendRes(files.file.originalFilename, files.file.mimetype, res);
        });
      }
    }
  })
  .listen(3001, () => {
    console.log("server is running");
  });

function sendRes(url, contentType, res) {
  console.log("url");
  let file = path.join(__dirname, url);
  fs.readFile(file, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.write("File not found");
      res.end();
      throw new Error("File not found");
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.write(content);
    res.end();
  });
}
