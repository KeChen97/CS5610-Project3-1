const myDB = require("../db/myMongoDb.js");
// import myDB from "../db/myMongoDb.js";

const FAKE_USER = "test"; // TODO: remove later

exports.addRecord = async (req, res) => {
  // TODO: Check w/ passport.js structure
  const user = req.user ? req.user : FAKE_USER;
  console.log("addRecord called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }

  let data = {
    user: user,
    category: req.body.category,
    item: req.body.item,
    cost: req.body.cost,
  };

  const spendings = await myDB.createSpendingRecord(data);
  res.json(spendings);
};

exports.getUser = async (req, res) => {
  // TODO: Check w/ passport.js structure
  const user = req.user ? req.user : FAKE_USER;
  console.log("getUser called with user=" + user);

  if (!user) {
    res.status(401).send("User unauthorized");
    return;
  }

  const spendings = await myDB.getUserSpending(user);
  res.json(spendings);
};
