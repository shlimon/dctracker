const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const memberSchema = new Schema({
    name:{
        type: String, 
        required : true
    }, 
    ndis:{
        type:String, 
        required: true
    },
    community:{
        type:String,
        required: true
    },
    isOver:{
        type:Boolean,
        default: false
    },
    isUnder:{
        type:Boolean,
        default: false
    },
    
})

module.exports = mongoose.model('Member', memberSchema)