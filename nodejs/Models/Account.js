var AbstractModel = require('./AbstractModel');
class Account extends AbstractModel {
    #id;
    #name;
    #email;
    #password;
    #role;
    #creaed_at;
    #last_login;

    get Id() {
        return this.id;
    }
    set Id(id) {
        this.id = id;
    }

    get Name() {
        return this.name;
    }
    set Name(name) {
        this.name = name;
    }

    get Email() {
        return this.email;
    }
    set Email(email) {
        this.email = email;
    }

    get Password() {
        return this.password;
    }
    set Password(password) {
        this.password = password;
    }

    get Role() {
        return this.role;
    }
    set Role(role) {
        this.role = role;
    }

    get Creaed_at() {
        return this.creaed_at;
    }
    set Creaed_at(creaed_at) {
        this.creaed_at = creaed_at;
    }

    get Last_login() {
        return this.last_login;
    }
    set Last_login(last_login) {
        this.last_login = last_login;
    }
};
module.exports = Account;