const express = require("express");
const path = require("path");
const app = express();
// const API_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:4000'
//     // : 'http://localhost:4000'
//     : 'http://api-server:4000'
// const API_URL = "http://api-server:4000";
app.use(express.static(path.join(__dirname, "../")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on ${port}`));
