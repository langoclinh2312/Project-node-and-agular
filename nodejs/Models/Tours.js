var AbstractModel = require('./AbstractModel');
class Tours extends AbstractModel{
	#id;
    #name;
    #status;
    #categoryname;
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

    get Price() {
        return this.price;
    }
    set Price(price){
        this.price = price;
    }

    get Sale_price() {
        return this.sale_price;
    }
    set Sale_price(sale_price){
        this.sale_price = sale_price;
    }

    get Image() {
        return this.image;
    }
    set Image(image){
        this.image = image;
    }

    get Status() {
        return this.status;
    }
    set Status(status){
        this.status = status;
    }

    get Description() {
        return this.description;
    }
    set Description(description){
        this.description = description;
    }

    get Created_at() {
        return this.created_at;
    }
    set Created_at(created_at){
        this.created_at = created_at;
    }
    get Categoryname() {
        return this.categoryname;
    }
    set Categoryname(categoryname){
        this.categoryname = categoryname;
    }
}
module.exports = Tours;