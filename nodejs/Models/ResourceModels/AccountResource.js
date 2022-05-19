var AbstractResource = require('./AbstractResource');

class AccountResource extends AbstractResource {
	constructor(){
		super();
		this._init("account","id");
	}
}
module.exports = AccountResource;

