const testRouter = require("express").Router();

testRouter.get("/", (req,res)=>{
    res.json({"msg": "test"});
})

module.exports = {testRouter};