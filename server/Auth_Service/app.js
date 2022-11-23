const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { db } = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

app.use(cookieParser());

const bodyParser = require("body-parser");

const errorMiddleware = require("./src/middleware/error");
const user = require("./src/user/user.routes");

dotenv.config();

// eslint-disable-next-line no-undef
const PORT = parseInt(process.env.PORT, 10);
const HOST = process.env.HOST || "localhost";

app.use(helmet());
const corsOption = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", user);
app.use(errorMiddleware);

app.listen(PORT, HOST, () => {
  db();
  console.log(`Listening on port http://${HOST}:${PORT}`);
});
