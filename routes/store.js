const express = require('express');
const { authenticateToken } = require('../middlewares/protected');
const { saveStore, getStore, getStoreById } = require('../controllers/store');

const StoreRouter = express.Router();

StoreRouter.post("/save", authenticateToken, saveStore);
StoreRouter.get("/", authenticateToken, getStore);
StoreRouter.get("/getstore/:store", getStoreById)

module.exports = StoreRouter;