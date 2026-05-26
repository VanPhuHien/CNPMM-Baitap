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

// Cart routes
const { getCart, addToCart, updateCart, removeFromCart, clearCart } = require('../controllers/cartController');
routerAPI.get("/cart", getCart);
routerAPI.post("/cart", addToCart);
routerAPI.put("/cart", updateCart);
routerAPI.delete("/cart/:productId", removeFromCart);
routerAPI.delete("/cart", clearCart);

// Order routes
const { createOrder, getOrders, getOrderById, cancelOrder } = require('../controllers/orderController');
routerAPI.post("/orders", createOrder);
routerAPI.get("/orders", getOrders);
routerAPI.get("/orders/:id", getOrderById);
routerAPI.put("/orders/:id/cancel", cancelOrder);

// Admin simulator routes
const { getAllOrders, updateOrderStatus } = require('../controllers/adminController');
routerAPI.get("/admin/orders", getAllOrders);
routerAPI.put("/admin/orders/:id/status", updateOrderStatus);

module.exports = routerAPI; //export default