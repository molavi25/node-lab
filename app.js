const http = require("http");

const html = `
<html>
  <head>
    <title>My First page</title>
  </head>
  <body>
    <h1>Hello from Node.js server!</h1>
  </body>
</html>
`;

const server = http.createServer(function (req, res) {
  console.log(
    `
    URL: ${req.url}

    METHOD: ${req.method}

  `,
    "HEADERS: \n",
    req.headers
  );

  res.setHeader("Content-Type", "text/html");
  res.write(html);
  res.end();
});

server.listen(4000);
