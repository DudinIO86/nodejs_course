const express = require("express");
const joi = require("joi");
const fs = require("fs");
const path = require("path");
const { CLIENT_RENEG_LIMIT } = require("tls");
const writting = require('./writes.js')
// const axios = require('axios');
// const jQuery=require('jQuery');

const app = express();

const users = [];

app.use(express.json());

const ar = JSON.parse(fs.readFileSync(path.join(__dirname, "database.json"), "utf-8"));

let uniqueID = ar.length;


const userScheme = joi.object({
  firstName: joi.string().min(1).required(),
  secondName: joi.string().min(1).required(),
  age: joi.number().min(0).max(150).required(),
  city: joi.string().min(1).required(),
});




app.get("/users", (req, res) => {
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2), { flag: "w" });
  writting();
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "database.json"), "utf-8")
  );


  res.send({ data });
});

app.post("/users", (req, res) => {
  const result = userScheme.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }

  uniqueID += 1;

  users.push({
    id: uniqueID,
    ...req.body,
  });


  res.send({ id: uniqueID, ...req.body });
  
});



app.put("/users/:id", (req, res) => {
  const result = userScheme.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const userId = +req.params.id;
  const user = users.find((user) => user.id === userId);
  if (user) {
    user.firstName = req.body.firstName;
    user.secondName = req.body.secondName;
    user.age = req.body.age;
    user.city = req.body.city;
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.get("/users/:id", (req, res) => {
  const userId = +req.params.id;
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = +req.params.id;
  const user = users.find((user) => user.id === userId);
  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});



app.listen(3000);
