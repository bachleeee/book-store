const ApiError = require("../api-error");
const productService = require("../services/product.service");
const { convertToSlug } = require('../utils/createSlug');
exports.createProduct = async (req, res, next) => {
  try {
    const slug = convertToSlug(req.body.name);
    const productData = {
      ...req.body,
      slug,
    };
    const result = await productService.create(productData);
    res.send(result);
  } catch (error) {
    next(new ApiError("An error accurred while creating the product", 500));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || "";  
    let sort = req.query.sort;  

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const result = await productService.findAll(page, limit, search, sort);

    return res.send(result);
  } catch (error) {
    next(new ApiError("An error occurred while retrieving products", 500));
  }
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await productService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Product with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving product ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await productService.findById(id);
    if (!document) {
      return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving product ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  const _data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    img: req.body.img,
    category: req.body.category,

  };
  try {
    const document = await productService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating product ${id}`, 500));
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await productService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    return res.send({
      message: `Product with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting product ${id}`, 500));
  }
};

exports.deleteAllProducts = async (req, res, next) => {
  try {
    const result = await productService.deleteAll();
    return res.send({
      message: `${result.deletedCount} products were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting products", 500));
  }
};

