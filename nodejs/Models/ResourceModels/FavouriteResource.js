var AbstractResource = require('./AbstractResource');

class FavouriteResource extends AbstractResource {
	constructor(){
		super();
		this._init("favourite","id");
	}
}
module.exports = FavouriteResource;