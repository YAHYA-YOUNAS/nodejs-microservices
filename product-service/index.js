import express from "express";

const app = express();
const PORT = 4002;
app.use(express.json());

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
