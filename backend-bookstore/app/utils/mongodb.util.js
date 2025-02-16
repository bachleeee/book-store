const config = require("../config/index");
const { MongoClient } = require("mongodb");
class DatabaseServices {
  constructor() {
    this.client = new MongoClient(config.db.uri);
    this.db = this.client.db(config.db.name);
  }
  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });
      console.log(
        "You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      // await this.client.close()
    }
  }
  get users() {
    return this.db.collection("users");
  }
  get products() {
    return this.db.collection("products");
  }
  get cart() {
    return this.db.collection("cart");
  }
  get order() {
    return this.db.collection("order");
  }
}
const databaseSetvices = new DatabaseServices();
module.exports = databaseSetvices;