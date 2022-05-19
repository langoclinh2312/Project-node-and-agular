const data = require('../../connect');
class AbstractResource {
	#table;
	#id;
	#query;
	#dataQuery;

	_init(table,id){
		this.table = table;
		this.id = id;
		this.query = "";
		return this;
	}

	Get(id) {
		var tableId = this.id;
		
		var value = id + "";
		
        id = {};
        id[tableId] = value;

		this.query = "SELECT * FROM " + this.table + " where  ?" ;
		this.dataQuery = id;
		return this;
	}

	Save(model) {

		if (model.Id == null) {
			this.dataQuery = model;
			this.query = 'INSERT INTO '+this.table+' SET ?';
		}else{
			this.dataQuery = [model,model.Id];
			this.query = 'UPDATE '+this.table+' SET ? WHERE ' +this.id +" = ?";
		}
		return this;
	}

	Delete(id) {
		this.dataQuery = id;
		this.query = 'DELETE FROM '+this.table+' WHERE '+this.id+' = ?';
		return this;
	}

	Count(){
		this.query = "SELECT COUNT(*) AS countResult FROM " + this.table;
		return this;
	}

	execute(callback) {
	data.query(this.query,this.dataQuery, (err, cat) => {
			if (err) 
				callback(err,null);
			else
				callback(null,cat);
		});
		this.query = "";
		this.dataQuery = null;
	}
}
module.exports = AbstractResource;