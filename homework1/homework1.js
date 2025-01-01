const http = require("http");

var countAbout = 0;
var countHome = 0;

const myServer = http.createServer((req, res) => {

  if (req.url === "/") {
    countHome++;
    res.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8",
    });
    console.log('Count visit Home:' +countHome);
   
    res.write('<a href="/about">About Me</a>');
    res.end();
    // console.log(countHome);
  } else if (req.url === "/about") {
    countAbout++;
    res.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8",
    });

    res.write('<a href="/">Home!</a>');
    console.log('Count visit About:' +countAbout);
    
    res.end();
    // console.log(countAbout);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html;charset=utf-8",
    });
    res.end("<h1>Страница 404</h1>");
  }
});

myServer.listen(3000);
