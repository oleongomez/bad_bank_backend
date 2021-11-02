class Account {
  #unique_id = null;
  #name = "no_name";
  #email = "no_email";
  #balance = 0.0;
  #storage = null;

  constructor(unique_id, name, email, storage) {
    this.#unique_id = unique_id;
    this.#email = email;
    this.#storage = storage;
    this.#name = name;
    console.log("account constructor value: ", email);
  }
  get unique_id() {
    return this.#unique_id;
  }
  get name() {
    return this.#name;
  }
  get email() {
    return this.#email;
  }
  get balance() {
    return this.#balance;
  }
  set unique_id(new_unique_id) {
    this.#unique_id = new_unique_id;
  }
  set name(new_name) {
    this.#name = new_name;
  }

  set email(new_email) {
    this.#email = new_email;
  }

  set balance(new_balance) {
    this.#balance = new_balance;
  }

  loadFromStorage() {
    return this.#storage.load({
      unique_id: this.#unique_id,
      email: this.#email,
    });
  }

  async saveToStorage() {
    return await this.#storage.save(this);
  }

  async updateBalance(amount) {
    let result = this.loadFromStorage().then(async (value) => {
      console.log("Account stored value: ", value);
      console.log("new balance: ", value.balance + amount);
      if (value === "NON_EXISTENT_ACCOUNT") return value;
      if (value.balance + amount < 0) {
        return "INVALID_OPERATION_OVERDRAFT";
      }
      return await this.#storage.updateBalance({
        unique_id: value.unique_id,
        email: value.email,
        amount: amount,
      });
    });
    return result;
  }

  dump() {
    console.log(this.#name, this.#email);
  }
}

module.exports = Account;
