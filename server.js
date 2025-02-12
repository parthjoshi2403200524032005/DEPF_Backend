require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");

 // server.js

const cors = require("cors");

const app = express();

// Connect to the database
connectDB();
 // app.use(cors(corsOptions));
app.use(cors({ origin: "*" }));

app.use(express.json());

 // Routes
app.get("/", (req, res) => res.send("Hello, world!"));
app.use("/employees", require("./routes/EmployeesRoute.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
