const Bought = require("./../Model/boughtModel");
const { createDoc, deleteDoc } = require("./handleFactory");

exports.buyProduct = createDoc(Bought);
exports.deleteBought = deleteDoc(Bought);

exports.setId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};
