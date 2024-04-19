const catchAsync = require("./../util/catchAsync");
const APIFeatures = require("./../util/ApiFeuture");

exports.getAllDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      docs: doc,
    });
  });

exports.createDoc = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      state: "success",
      data: {
        doc,
      },
    });
  });
};
exports.getDoc = (Model, populate) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populate) query = query.populate(populate);
    const doc = await query;

    if (!doc) {
      return res.status(404).json({
        state: "fail",
        message: "no product found with that id",
      });
    }
    res.status(200).json({
      state: "success",
      data: doc,
    });
  });
};
exports.updateDoc = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);
    if (!doc) {
      return res.status(404).json({
        state: "fail",
        message: "no product found with that id",
      });
    }
    res.status(200).json({
      state: "success",
      data: {
        doc,
      },
    });
  });
};
exports.deleteDoc = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({
        state: "fail",
        message: "no product found with that id",
      });
    }
    res.status(204).json();
  });
};
