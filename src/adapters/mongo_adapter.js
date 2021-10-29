const { MongoClient, Collection } = require("mongodb");
var storages = require("../domain/istorage");
let IStorage = storages.IStorage;

class MongoStorageAdapter extends IStorage {
  #client = null;
  #database = null;
  constructor(url) {
    super();
    this.url = url;
  }
  async connect() {
    try {
      this.#client = new MongoClient(this.url);
      await this.#client.connect();
      this.#database = await this.#client.db("accounts");
      console.log("Connection stablished...");
    } catch (err) {
      console.log(err);
    } finally {
      console.log("I have finished...");
    }
  }

  async load(account) {
    await this.connect();
    await this.#client.close();
    return "NOT IMPLEMENTED";
  }

  async save(account) {
    let result_id = null;
    await this.connect();
    const accounts = this.#database.collection("accounts");
    let result = await accounts.insertOne({
      name: account.name,
      email: account.email,
      balance: account.balance,
      password: account.password
    });
    console.log(`
        A document was inserted with the id: ${result.insertedId}
        `);
    result_id = result.insertedId;
    await this.#client.close();
    return {
      name: account.name,
      email: account.email,
      balance: account.balance,
      id: result_id,
      password: account.password
    };
  }

  async load_all() {
    let result = null
    await this.connect();
    const accounts = this.#database.collection("accounts");
    let cursor =  await accounts.find()
    result = await cursor.toArray()
    await this.#client.close();
    return result
  }
}

module.exports = { MongoStorageAdapter: MongoStorageAdapter };
