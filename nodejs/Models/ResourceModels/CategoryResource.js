var AbstractResource = require('./AbstractResource');

class CategoryResource extends AbstractResource {
	constructor(){
		super();
		this._init("category","id");
	}
}
module.exports = CategoryResource;