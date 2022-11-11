// import { MongoClient } from "mongodb";
const { MongoClient } = require("mongodb");

function myMongoDb() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const DB_NAME = "PROJECT-3";

  const COLLECTION_SPENDING = "spending";

  // CRUD
  myDB.createSpendingRecord = async (data = {}) => {
    let client;

    try {
      client = new MongoClient(uri);
      const spendingCol = client.db(DB_NAME).collection(COLLECTION_SPENDING);

      return spendingCol.insertOne(data, (err, resp) => {
        let ret;
        if (err) ret = "Error occured in createSpending";
        else ret = "Inserted spending" + data;

        return ret;
      });
    } finally {
      console.log("createSpending: Closing db connection");
      client.close();
    }
  };

  myDB.getUserSpending = async (user) => {
    let client;
    const query = { user: user };

    try {
      client = new MongoClient(uri);
      const spendingCol = client.db(DB_NAME).collection(COLLECTION_SPENDING);

      return await spendingCol.find(query).toArray();
    } finally {
      console.log("getSpending: Closing db connection");
      client.close();
    }
  };

  return myDB;
}

module.exports = myMongoDb();
