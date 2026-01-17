import express from "express";

const app = express();
const PORT = 4001;
app.use(express.json());

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
