import express from "express";
import axios from "axios";

const app = express();
const PORT = 4000;
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4001/users");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4002/products");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway Service running on port ${PORT}`);
});
