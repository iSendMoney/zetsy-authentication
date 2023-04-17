const express = require('express');
const { authenticateToken } = require('../middlewares/protected');
const { saveStore, getStore } = require('../controllers/store');

const StoreRouter = express.Router();

StoreRouter.post("/save", authenticateToken, saveStore);
StoreRouter.get("/", authenticateToken, getStore);


module.exports = StoreRouter;