var AbstractCollection = require('./AbstractCollection');
var Account = require('../../Account');

class AccountCollection extends AbstractCollection{
	constructor(){
		super();
		this._init("account",new Account());
	}
}
module.exports = AccountCollection;


