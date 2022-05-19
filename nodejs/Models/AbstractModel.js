class AbstractModel {

    constructor(data) {
        if (Array.isArray(data)) {
            Object.assign(this,data[0]);
        } 
        else if (data !== null) {
            Object.assign(this,data);
        }
    }

    SetData(data) {
        if (Array.isArray(data)) {
            Object.assign(this,data[0]);
        } 
        else if(data !== null) {
            Object.assign(this,data);
        }
    }
};
module.exports = AbstractModel;
