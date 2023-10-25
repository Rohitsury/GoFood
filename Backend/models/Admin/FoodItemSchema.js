const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jwt = require("jsonwebtoken")
const FoodItemSchema = new Schema({
    CategoryName:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    options:[
        {
            half:{
                type:String,
                default:"Half"
            },
            full:{
                type:String,
                default:"Full"
            }
        }
    ],
    description:{
        type:String
    }
    
})

 
const fooditem = mongoose.model('fooditem', FoodItemSchema)

module.exports = fooditem