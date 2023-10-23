const net = require("net");

function checkFreePort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false); // Port is in use
      } else {
        reject(err); // Other error occurred
      }
    });

    server.once("listening", () => {
      server.close(() => {
        resolve(true); // Port is free
      });
    });

    server.listen(port, "localhost");
  });
}

const portToCheck = 9095;

checkFreePort(portToCheck)
  .then((isFree) => {
    if (isFree) {
      console.log(`Port ${portToCheck} is free.`);
    } else {
      console.log(`Port ${portToCheck} is in use.`);
    }
  })

  .catch((err) => {
    console.error("Error occurred:", err);
  });
