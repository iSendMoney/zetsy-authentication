const authRoutes = require("express").Router();
var jwt = require('jsonwebtoken');


/**
 * @dev login routes for shops
 */
authRoutes.post("/login", (req,res)=>{
    const {email, password} = req.body;
    
    
    const _token = jwt.sign({data:"sss"},"shhh",{expiresIn:"1h"})
    res.json({_token});
})

module.exports = {authRoutes};