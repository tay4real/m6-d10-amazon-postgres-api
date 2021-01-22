/** put all routes together here and export out  */

const router = require("express").Router();

const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const productsRouter = require("./products");
const cartsRouter = require("./carts");
const reviewsRouter = require("./reviews");

const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler,
} = require("../errorHandlers");

router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/reviews", reviewsRouter);

// ERROR HANDLERS
router.use(notFoundHandler);
router.use(unauthorizedHandler);
router.use(forbiddenHandler);
router.use(badRequestHandler);
router.use(catchAllHandler);

module.exports = router;
