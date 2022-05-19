var AbstractCollection = require('./AbstractCollection');
var Tours = require('../../Tours');

class ToursCollection extends AbstractCollection{

	constructor(){
		super();
		this._init("tours",new Tours())
		.Join("category","id","category_id","name,id,status")
		.OrderBy("id");
	}
}
module.exports = ToursCollection;