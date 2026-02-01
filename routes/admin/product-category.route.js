const express = require("express")
const multer = require('multer');
const upload = multer();
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controllers")
const uploadCloud = require("../../milddlewares/admin/uploadCloud.milddlewares")
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);
router.get("/create", controller.create);

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    validate.createPost,
    uploadCloud.upload,
    controller.editPatch,

);



module.exports = router;