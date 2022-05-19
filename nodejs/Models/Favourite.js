var AbstractModel = require('./AbstractModel');

class Favourite extends AbstractModel{
	#id;
    #account_id;
    #status;
    get Id() {
        return this.id;
    }
    set Id(id){
        this.id = id;
    }

    get Account_id() {
        return this.account_id;
    }
    set Account_id(account_id){
        this.account_id = account_id;
    }

    get Tours_id() {
        return this.tours_id;
    }
    set Tours_id(tours_id){
        this.tours_id = tours_id;
    }

    get Created_at() {
        return this.created_at;
    }
    set Created_at(created_at){
        this.created_at = created_at;
    }
}
module.exports = Favourite;