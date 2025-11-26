import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Lifting tracker backend is running");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});