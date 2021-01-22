const router = require("express").Router();

const Model = require("../../utils/model");

const Carts = new Model("carts");

router.get("/:userId", async (req, res, next) => {
  try {
    const { rows } = await Carts.findById(req.params.userId);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/:userId/:productId", async (req, res, next) => {
  try {
    const saveCart = req.body;
    saveCart.userId = req.params.userId;
    saveCart.productId = req.params.productId;
    const response = await Carts.save(saveCart);

    if (response) {
      res.send(response);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Carts.findByIdAndUpdate(req.params.id, req.body);

    res.send(response);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Carts.findByIdAndDelete(req.params.id);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
