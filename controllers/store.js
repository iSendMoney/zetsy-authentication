const Store = require("../models/store");

module.exports = {
    saveStore: async(req,res)=>{
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
    },

    getStore: async(req,res) => {
        const {userId} = req.user;
        const store = await Store.find({owner: userId});
        res.json({store});
    }

}