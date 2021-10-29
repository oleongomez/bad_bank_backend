class Account {
    #name = 'no_name'
    #email = 'no_email'
    #balance = 0
    #storage = null
    #password = ''

  constructor(name, email, password, storage) {
    this.#name = name;
    this.#email = email;
    this.#balance = 0;
    this.#storage = storage;
    this.#password = password
    console.log(name, email, storage);
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
  get password(){
      return this.#password
  }
  set name(new_name) {
      this.#name = new_name
    return this.#name;
  }

  set email(new_email) {
      this.#email = new_email
    return this.#email;
  }

  set balance(new_balance) {
    this.#balance = new_balance;
  }
  set password(new_password){
      this.#password =  new_password
  }
  loadFromStorage() {
    return this.#storage.load(this);
  }

  async saveToStorage() {
    return await this.#storage.save(this);
  }
  dump(){
      console.log(this.#name, this.#email)
  }
}

module.exports = Account;
