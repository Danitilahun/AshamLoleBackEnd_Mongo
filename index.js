// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const helmet = require("helmet");
// const morgan = require("morgan");
// require("dotenv").config();
// const connectToDB = require("./config/database");
// const cookieParser = require("cookie-parser");
// const apiRoutes = require("./routes/api");
// const authRoutes = require("./routes/auth/route");
// const verifyJWT = require("./middlewares/verifyJWT");

// const app = express();

// app.use(express.json({ limit: "60mb", extended: true }));
// app.use(express.urlencoded({ extended: false, limit: "50mb" }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// connectToDB();

// app.get("/", (req, res) => {
//   res.send("GET request received!");
// });

// app.use("/auth", authRoutes);
// app.use("/api", verifyJWT, apiRoutes);

// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { setupSocketIO } = require("./socket");
const connectToDB = require("./config/database");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth/route");
const verifyJWT = require("./middlewares/verifyJWT");

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "60mb", extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

connectToDB();
setupSocketIO(server);

app.use("/auth", authRoutes);
app.use("/api", verifyJWT, apiRoutes);

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
