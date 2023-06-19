const http = require("http");
const fs = require("fs");

const index = `
  <html>
    <head>
      <title>My First page</title>
    </head>
    <body>
      <center>
        <h1>Hello from Node.js server!</h1>
      </center>
    </body>
  </html>
`;

const form = `
  <html>
    <head>
      <title>signup</title>
    </head>
    <body>
      <center>
        <form action='result' method='POST' >
          <input type="text" name='userName' />

          <button type='submit'>send</button>
        </form>
      </center>
    </body>
  </html>
`;

const result = `
  <html>
    <head>
      <title>result</title>
    </head>
    <body>
      <center>
        <h1>You logged in :)</h1>
      </center>
    </body>
  </html>
`;

const notFound = `
  <html>
    <head>
      <title>404</title>
    </head>
    <body>
      <center>
        <h1>PAGE NOT FOUND 404 :(</h1>
      </center>
    </body>
  </html>
`;

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(index);
    return res.end();
  }

  if (req.url === "/signup") {
    res.setHeader("Content-Type", "text/html");
    res.write(form);
    return res.end();
  }

  if (req.url === "/result") {
    res.setHeader("Content-Type", "text/html");
    res.write(result);

    if (req.method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
        console.log("CHUNKS", chunk);
        body.push(chunk);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const userInfo = parsedBody.split("=")[1];

        fs.writeFileSync("userInfo.txt", userInfo);
      });

      res.statusCode = 302;
      return res.end();
    }
  }
  res.setHeader("Content-Type", "text/html");
  res.write(notFound);
  res.end();
});

server.listen(4000);
