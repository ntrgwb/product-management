const ProductCategory = require("../../model/product-category.model")
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/createTree");
const Product = require("../../model/product_model");


// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/products-category/index', {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    });
};


// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/products-category/create', {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    });
};

// [POST] /admin/products/createPost
module.exports.createPost = async (req, res) => {

    req.body.status = req.body.status ? "active" : "inactive";
    
    if (req.body.position == "" || isNaN(req.body.position)) {
        const countProducts = await ProductCategory.countDocuments();
        req.body.position = countProducts + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
};

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {

    try {

        const id = req.params.id;

        // console.log(id);

        const data = await ProductCategory.findOne({
            _id: id,
            deleted: false
        });

        const records = await ProductCategory.find({
            deleted: false
        });


        // console.log(records);

        const newRecords = createTreeHelper.tree(records);

        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);


    }
};

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);

    // console.log(id);
    // console.log(req.body);

    await ProductCategory.updateOne({ _id: id }, req.body);

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);

};