const data = require('../../../connect');
class AbstractCollection {
    #table;
    #model;
    #query;
    #join;
    #cat;
    #field;
    #order;
    #where;
    #whereParam;
    #page;
    #pageParam;
    #arrayData = [];
    _init(table, model) {
        this.table = table;
        this.model = model;
        this.join = "";
        this.field = "";
        this.order = "";
        this.field = "";
        this.where = "";
        this.whereParam = [];
        this.page = "";
        this.pageParam = [];
        this.andParam = [];
        this.andTowParam = [];
        this.arrayData = [];
        return this;
    }

    Query() {

        this.query = "select " + this.table + ".* " + this.field + " from " + this.table + this.join + " " + this.where + " " + this.order + " " + this.page;
        this.arrayData = [];

        if (this.whereParam.length >= 0) {
            this.arrayData.push(this.whereParam);
        }
        if (this.pageParam.length > 0) {
            this.arrayData.push(this.pageParam);
        }
        if (this.andParam.length >= 0) {
            this.arrayData.push(this.andParam);
            this.andParam = [];
        }
        if (this.andTowParam.length >= 0) {
            this.arrayData.push(this.andTowParam);
            this.andTowParam = [];
        }
    }

    Join(joinTb, joinTbId, mainTbId, field, mainTb = this.table) {

        var tablemain = mainTb + "." + mainTbId;
        var tablejoin = joinTb + "." + joinTbId;

        var fieldStr = (field + "");

        var fields = fieldStr.split(",");

        var joinField = "";

        fields.forEach(element => {
            joinField += joinTb + "." + element + " as " + joinTb + element + ",";
        });

        this.field += ",";

        this.field += joinField.slice(0, -1);

        this.join += " Join " + joinTb + " ON " + tablemain + "=" + tablejoin + " ";

        return this;
    }

    OrderBy(OrderBy, dev = "ASC") {
        this.order = " ORDER BY " + OrderBy + " " + dev;
        return this;
    }

    Where(cond) {
        this.where += " WHERE ";
        Object.entries(cond).forEach(([key, value]) => {
            this.where += key + " = ? ";
            this.whereParam.push(value);
        });
        return this;
    }

    Like(cond) {
        this.where += " WHERE ";
        Object.entries(cond).forEach(([key, value]) => {
            this.where += key + ' LIKE ? ';
            value = "%" + value + "%"
            this.whereParam.push(value);
        });
        return this;
    }

    And(cond) {
        this.where += " AND ";
        Object.entries(cond).forEach(([key, value]) => {
            this.where += key + " = ?";
            this.andParam.push(value);
        });
        return this;
    }
    AndTow(cond) {
        this.where += " AND ";
        Object.entries(cond).forEach(([key, value]) => {
            this.where += key + " = ?";
            this.andTowParam.push(value);
        });
        return this;
    }
    AndLike(cond) {
        this.where += " AND ";
        Object.entries(cond).forEach(([key, value]) => {
            this.where += key + ' LIKE ? ';
            value = "%" + value + "%"
            this.andParam.push(value);
        });
        return this;
    }

    Or(cond) {
        this.where += " OR ";

        Object.entries(cond).forEach(([key, value]) => {
            this.where += " ? ";
            this.whereParam.push(cond);
        });
        return this;
    }

    OrLike(cond) {
        this.where += " OR ";

        Object.entries(cond).forEach(([key, value]) => {
            this.where += key + ' LIKE ? ';
            value = "%" + value + "%"
            this.whereParam.push(value);
        });
        return this;
    }

    Page(pageNum, limit) {
        this.page += " LIMIT ";
        var start = (pageNum - 1) * limit;
        this.pageParam = [start, limit];
        this.page += "?";
        return this;
    }

    execute(callback) {
        this.Query();
        data.query(this.query, this.arrayData, (err, cat) => {
            if (err)
                callback(err, null);
            else {
                var newData = [];
                cat.forEach(element => {
                    var newModel = Object.create(this.model);
                    newModel.SetData(element);
                    newData.push(newModel);
                });
                cat = [];
                callback(null, newData);
            }
        });
        this.page = "";
        this.where = "";
        this.whereParam = [];
        this.pageParam = [];
    }
}
module.exports = AbstractCollection;