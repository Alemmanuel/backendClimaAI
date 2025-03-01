require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error("Error details:", err);
  res.status(500).json({
    success: false,
    message: "An error occurred",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
