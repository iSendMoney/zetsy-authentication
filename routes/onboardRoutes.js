const onboardRoutes = require("express").Router();

onboardRoutes.post("/", (req,res)=>{
    
    res.json({"msg": "test"});
})

module.exports = {onboardRoutes};