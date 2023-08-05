import fs from "fs";

const requestHandler = (req, res) => {
  const {url, method} = req;
  //~ HOME /////////////////////////////////////
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(Pages.index);
    return res.end();
  }

  //~ SIGNUP //////////////////////////////////
  if (url === "/signup") {
    res.setHeader("Content-Type", "text/html");
    res.write(Pages.form);
    return res.end();
  }

  //~ RESULT //////////////////////////////////
  if (url === "/result" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log("CHUNKS", chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const userInfo = parsedBody.split("=")[1];

      fs.writeFile("userInfo.txt", userInfo, (err) => {
        res.setHeader("Content-Type", "text/html");
        res.write(Pages.result);
        res.statusCode = 302;
        return res.end();
      });
    });
  }
  //~ 404 /////////////////////////////////////
  res.setHeader("Content-Type", "text/html");
  res.write(Pages.notFound);
  res.end();
};

export default requestHandler;

var Pages = {
  index: `
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
`,
  form: `
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
`,

  result: `
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
`,

  notFound: `
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
`,
};
