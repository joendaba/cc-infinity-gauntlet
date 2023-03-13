const { createServer } = require("http");

const server = createServer((request, response) => {
    response.writeHead(200);
    response.write("Hello world");
    response.end();
});


server.listen(3000, () => {
    console.log("Server is running ;)");
});
