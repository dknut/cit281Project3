//Imports
//Node import
const fs = require("fs");
//Fastify import
const fastify = require("fastify")();
//Module import
const { coinCount } = require(`${__dirname}/p3-module.js`);

//Home page
fastify.get("/", (request, reply) => {
  //Reads html
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    //If error, throw code
    if (err) {
      reply.code(500);
    }
    //Otherwise send data formatted with header and code
    reply.header("Content-Type", "text/html").send(data).code(200);
  });
});

//Coin directory
fastify.get("/coin", (request, reply) => {
  //Destructure from query
  const { denom = 0, count = 0 } = request.query;

  //Calls coinCount to find the value
  const coinValue = coinCount({
    //Converts to integers
    denom: parseInt(denom),
    count: parseInt(count),
  });

  //Send html
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(
      `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

//Coins Directory
fastify.get("/coins", (request, reply) => {
  //Destructure option
  let { option } = request.query;

  //Switch statement for option #
  switch (parseInt(option)) {
    case 1:
      coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
      break;
    case 2:
      coinValue = coinCount({ denom: 5, count: 10 });
      break;
    default:
      coinValue = 0;
  }

  //Reply with option and value
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .send(
      `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

//Listening IP/Port
const listenIP = "localhost";
const listenPort = 8080;
//Listening
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    //Log error and exit
    console.log(err);
    process.exit(1);
  }
  //Display IP and Port of running server
  console.log(`Server listening on ${address}`);
});
