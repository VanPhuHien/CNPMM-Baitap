const express = require('express');
const {
    createUser, handleLogin, getUser,
    getAccount
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world Phú Hiền")
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

// Product & Category routes
const { getProducts, getProductById, getCategories } = require('../controllers/productController');
routerAPI.get("/products", getProducts);
routerAPI.get("/products/:id", getProductById);
routerAPI.get("/categories", getCategories);

routerAPI.use(auth);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

module.exports = routerAPI; //export default