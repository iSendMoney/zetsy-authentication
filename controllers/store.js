const Store = require("../models/store");
const slugify = require("slugify");

module.exports = {
  saveStore: async (req, res) => {
    try {
      const { businessInfo, customerInfo, socialInfo } = req.body;
      const { userId } = req.user;
      const subdomain = slugify(businessInfo.name, {
        remove: /[*+~.()'"!:@]/g,
      });
      const data = {
        ...businessInfo,
        ...customerInfo,
        ...socialInfo,
        owner: userId,
        subdomain,
      };
      const store = await Store.create(data);
      res.json({ store, message: "Store Saved" });
    } catch (error) {
      if (error?.code === 11000) {
        res.status(400).send("Shop Name Already Exist");
      }
    }
  },

  getStore: async (req, res) => {
    const { userId } = req.user;
    const store = await Store.findOne({ owner: userId });
    res.json({ store });
  },

  getStoreById: async (req, res) => {
    try {
      const { store } = req.params;
      const _store = await Store.findOne({ subdomain: store });
      res.json({ store: _store });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
