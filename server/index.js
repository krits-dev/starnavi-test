const express = require("express");
const app = express();

const axios = require("axios");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.post("/", (req, res) => {
  const requestConfig = req.body;
  axios(requestConfig)
    .then(r => r.data)
    .then(data => {
      res.send(data);
    })
    .catch(() => {
      res.sendStatus(400)
    });
});

app.listen(8080);