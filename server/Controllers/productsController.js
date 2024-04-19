const Product = require("./../Model/productModel");
const {
  getAllDoc,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} = require("./handleFactory");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./../client/src/assets/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const src = `user-${Date.now()}.${ext}`;
    if (!req.body.images) {
      req.body.images = [];
    }
    req.body.images.push(src);

    cb(null, src);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductsImages = upload.fields([{ name: "images", maxCount: 3 }]);

exports.getAllProducts = getAllDoc(Product);
exports.createProduct = createDoc(Product);
exports.getProduct = getDoc(Product);
exports.updateProduct = updateDoc(Product);
exports.deleteProduct = deleteDoc(Product);
