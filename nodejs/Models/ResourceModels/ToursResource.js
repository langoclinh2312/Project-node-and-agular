var AbstractResource = require('./AbstractResource');

class ToursResource extends AbstractResource {
	constructor(){
		super();
		this._init("tours","id");
	}
}
module.exports = ToursResource;