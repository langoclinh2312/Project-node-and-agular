var AbstractCollection = require('./AbstractCollection');

var Favourite = require('../../Favourite');

class FavouriteCollection extends AbstractCollection{

	constructor(){
		super();
		this._init("favourite",new Favourite())
		.Join("tours","id","tours_id","name")
		.Join("account","id","account_id","name,id")
		.OrderBy("id");
	}
}
module.exports = FavouriteCollection;