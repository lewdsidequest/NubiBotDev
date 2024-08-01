import express from "express";
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Testing...");
});

export default app;
