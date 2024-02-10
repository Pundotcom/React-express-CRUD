const express = require("express");
const mysql2 = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json());

let conn = null;

const initMySQL = async () => {
  conn = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorials",
    port: 8889,
  });
};

app.get("/users", async (req, res) => {
  try {
    let results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/users", async (req, res) => {
  const data = req.body;

  try {
    const result = await conn.query("INSERT INTO users SET ?", data);
    const userId = result[0].insertId;
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let [results] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      data,
      id,
    ]);
    res.json({
      message: "User updated successfully",
      userId: `อัพเดทข้อมูล user id ที่ ${id}`,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Error updating user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await conn.query("DELETE FROM users WHERE id = ?", [id]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", userId: id });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
});
app.listen(port, async () => {
  await initMySQL();
  console.log(`server running in port${port}`);
});
