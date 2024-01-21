const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const connectToDB = require("./config/database");
const apiRoutes = require("./routes/api");
const verifyJWT = require("./middlewares/verifyJWT");

const app = express();

app.use(express.json({ limit: "60mb", extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connectToDB();

app.get("/", (req, res) => {
  res.send("GET request received!");
});

app.use("/api", verifyJWT, apiRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
