class IStorage {
  save(account) {
    throw new Error("Abstract Method");
  }
  load(account) {
    throw new Error("Abstract Method");
  }
  load_all() {
    throw new Error("Abstract Method");
  }
}

module.exports = { IStorage: IStorage };
