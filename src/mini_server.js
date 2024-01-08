const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Project is running!");
})

app.get("/", (req, res) => {
  res.send("Testing...");
})