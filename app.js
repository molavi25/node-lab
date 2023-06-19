const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(
    `
    URL: ${req.url}

    METHOD: ${req.method}

  `,
    "HEADERS: \n",
    req.headers
  );
});

server.listen(4000);
