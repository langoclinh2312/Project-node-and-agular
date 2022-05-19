var AbstractModel = require('./AbstractModel');
class Category extends AbstractModel{
	#id;
    #name;
    #status;
    get Id() {
        return this.id;
    }
    set Id(id){
        this.id = id;
    }

    get Name() {
        return this.name;
    }
    set Name(name){
        this.name = name;
    }

    get Status() {
        return this.status;
    }
    set Status(status){
        this.status = status;
    }
}
module.exports = Category;