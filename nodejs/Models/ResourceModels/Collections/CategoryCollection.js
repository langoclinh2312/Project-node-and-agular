var AbstractCollection = require('./AbstractCollection');

var Category = require('../../Category');

class CategoryCollection extends AbstractCollection{

	constructor(){
		super();
		this._init("category",new Category());
	}
}

module.exports = CategoryCollection;