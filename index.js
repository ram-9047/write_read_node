const http = require("http");

const routes = require("./routes");
const port = 8080;
// const server = http.createServer(routes);

const server = http.createServer(routes.handler);

server.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
