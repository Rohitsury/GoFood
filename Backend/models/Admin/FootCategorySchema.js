const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FoodCategorySchema = new Schema({
    CategoryName:{
        type:String,
        required:true
    },
  
    
})

// generate authtoke

 
const foodcategory = mongoose.model('foodcategory', FoodCategorySchema)

module.exports = foodcategory