const express = require("express");
const app = express();
const port = 1997;
const url = `http://localhost:` + port;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server is runing on ${url}`);
});

console.log("------------------------------------------------------------");
