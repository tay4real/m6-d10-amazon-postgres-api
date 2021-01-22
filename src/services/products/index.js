const router = require("express").Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../lib/cloudinary");

const Model = require("../../utils/model");

const Products = new Model("products");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "amazon-marketplace",
  },
});

const cloudinaryMulter = multer({ storage: storage });

router.get("/", async (req, res, next) => {
  try {
    const response = await Products.findOne();
    if (response) {
      res.send(JSON.parse(JSON.stringify(response.rows)));
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { product } = await Products.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Products.save(req.body);

    res.status(201).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const modifiedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (modifiedProduct) {
      res.send(modifiedProduct);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { product } = await Products.findByIdAndDelete(req.params.id);
    if (product) {
      res.send("Deleted");
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post(
  "/:id/upload",
  cloudinaryMulter.single("productImage"),
  async (req, res, next) => {
    try {
      const updatePicture = await Products.findByIdAndUpdate(req.params.id, {
        imageUrl: req.file.path,
      });
      if (updatePicture) {
        res.status(201).send("Image Loaded Successfully");
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
