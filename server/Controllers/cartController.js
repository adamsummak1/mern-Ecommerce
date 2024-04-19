const Cart = require("../Model/cartModel");
const { createDoc, deleteDoc } = require("./handleFactory");

exports.addToCart = createDoc(Cart);
exports.deleteFromCart = deleteDoc(Cart);

exports.setId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};
