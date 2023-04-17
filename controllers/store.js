const Store = require("../models/store");

module.exports = {
    saveStore: async(req,res)=>{
        try {
        const {businessInfo, customerInfo, socialInfo} = req.body;
        const { userId } = req.user;
        const data = {
            ...businessInfo,
            ...customerInfo,
            ...socialInfo,
            owner: userId
        }
        const store = await Store.create(data);
        res.json({store, message:"Store Saved"});
            
        } catch (error) {
            if(error?.code===11000){
                res.status(400).send("Shop Name Already Exist")
            }
        }
        
    },

    getStore: async(req,res) => {
        const {userId} = req.user;
        const store = await Store.find({owner: userId});
        res.json({store});
    }

}