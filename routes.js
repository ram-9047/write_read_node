const fs = require("fs");

const requestHandler = (req, res) => {
  const pathName = req.url;
  const method = req.method;
  if (pathName == "/") {
    // console.log("/ path");
    fs.readFile("./message.txt", "utf-8", (err, data) => {
      if (!err) {
        res.write("<html>");
        res.write("<head><title>Enter the message</title></head>");
        res.write("<body>");
        res.write(`<p>${data}</p>`);
        res.write(
          "<form action='/message' method = 'POST' ><input type='text' name = 'message'> <button type = 'Summit'>Send</button>  </form>"
        );
        res.write("</body>");
        res.write("</html>");
        return res.end();
      } else {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title> This is title. </title></head>");
        res.write(
          "<body><form action='/message' method = 'POST' ><input type='text' name = 'message'> <button type = 'Summit'>Send</button>  </form></body>"
        );
        res.write("<body><h1>This is the body</h1></body>");
        res.write("</html>");
        res.end();
      }
    });
  }
  if (pathName == "/message" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsed Body", parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, { flag: "a" }, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

//------1st way to exports
// module.exports = requestHandler;

//--------- 2nd way to exports

module.exports = {
  handler: requestHandler,
};

//  OR
// module.exports.handler = requestHandler;
