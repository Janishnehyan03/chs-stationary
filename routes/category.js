const router = require("express").Router();
const {
  verifyToken,
  verifyAdminToken,
} = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");

router.route("/").get(categoryController.getAllCategories);
router.post(
  "/",
  verifyToken,
  verifyAdminToken,
  categoryController.addNewCategory
);

router.route("/:id").get(categoryController.getCategory);
router
  .route("/:id")
  .delete(categoryController.deleteCategory)
  .patch(categoryController.updateCategory);

module.exports = router;
