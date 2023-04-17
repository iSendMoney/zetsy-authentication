const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const storeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    subdomain: {type: String, unique: true, required:true},
    no_of_emp: {type: String, required:true},
    estimated_revenue: {type: String, required: true},
    category: { type: String, required:true}, 
    target_location: {type: String, required: true},
    target_age_group: {type: String, required:true},
    target_gender: {type: String, required: true},
    target_audience: {type: String, required: true},
    facebook: {type:String, required:true},
    instagram: { type:String, required:true},
    // making twitter and linkedin social optional
    twitter: {type:String, required: false},   
    linkedin: {type:String, required: false},
    owner:{type: mongoose.Schema.Types.ObjectId, required: true, }   
});

module.exports = mongoose.model("Store", storeSchema);
