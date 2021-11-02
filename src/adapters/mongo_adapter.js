const e = require("express");
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
      console.log("Connection established...");
    } catch (err) {
      console.log(err);
    } finally {
      console.log("I am connected...");
    }
  }

  async load(query) {
    await this.connect();
    console.log("mongo adapter - load: ", query);
    if(query.unique_id === undefined){
      query = {email: query.email}
    }
    this.#database = await this.#client.db("accounts");
    const accounts = this.#database.collection("accounts");
    const retrieved_account = await accounts.find(query).toArray();
    await this.#client.close();
    if (retrieved_account.length > 0) {
      return retrieved_account[0];
    } else {
      return "NON_EXISTENT_ACCOUNT";
    }
  }

  async save(account) {
    let result_id = null;
    await this.connect();
    const accounts = this.#database.collection("accounts");
    let result = await accounts.insertOne({
      unique_id: account.unique_id,
      name: account.name,
      email: account.email,
      balance: account.balance,
      password: account.password,
    });
    console.log(`
        A document was inserted with the id: ${result.insertedId}
        `);
    result_id = result.insertedId;
    await this.#client.close();
    return {
      unique_id: account.unique_id,
      name: account.name,
      email: account.email,
      balance: account.balance,
      id: result_id,
      password: account.password,
    };
  }

  async load_all() {
    let result = null;
    await this.connect();
    const accounts = this.#database.collection("accounts");
    let cursor = await accounts.find();
    result = await cursor.toArray();
    await this.#client.close();
    return result;
  }

  async updateBalance(query) {
    var internal_query = {
      unique_id: query.unique_id,
      email: query.email
    };
    var newValues = { $inc: { balance: query.amount } };
    console.log("mongo adapter - updateBalance: (query)", query);
    console.log(
      "mongo adapter - updateBalance(internal query): ",
      internal_query
    );
    await this.connect();
    const accounts = this.#database.collection("accounts");
    accounts.updateOne(
      internal_query,
      newValues,
      async (err, res) => {
        if (err) throw err;
        await this.#client.close();
      }
    );
    return "DONE"
  }
}

module.exports = { MongoStorageAdapter: MongoStorageAdapter };
