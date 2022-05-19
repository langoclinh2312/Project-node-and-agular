const Joi = require('joi'); 
// add
const CategoryAddMiddleware = (schema, property) => { 
          const schema = Joi.object().keys({ 
          name: Joi.string().min(3).max(100).required(),
          status: Joi.number().integer().min(1).max(6), 
        }); 

      const result = schema.validate(req.body); 
      const { value, error } = result;
      if (error) { 
        let msg = [];
         msg['name'] = "Tên danh mục không được để trống";

        if(error.details[0].type == 'string.min'){
         msg['name'] = "Tên danh mục ít nhất là 3 ký tự";
        }
        res.render('admin/category/create',{
            message: msg
        });
      } else { 
        
      } 
} 
module.exports = CategoryAddMiddleware;
// update
