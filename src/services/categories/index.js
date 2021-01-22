const router = require("express").Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../lib/cloudinary");

const Model = require("../../utils/model");

const Categories = new Model("categories");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "amazon-marketplace",
  },
});

const cloudinaryMulter = multer({ storage: storage });

router.get("/", async (req, res, next) => {
  try {
    const response = await Categories.findOne();

    res.send(JSON.parse(JSON.stringify(response.rows)));
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await Categories.findById(req.params.id);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Categories.save(req.body);
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Categories.findByIdAndDelete(req.params.id);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post(
  "/:id/upload",
  cloudinaryMulter.single("catImage"),
  async (req, res, next) => {
    try {
      const updatePicture = await Categories.findByIdAndUpdate(req.params.id, {
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
