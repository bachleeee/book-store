const ApiError = require("../api-error");
const userService = require("../services/user.service");
const productService = require("../services/product.service");
const cartService = require("../services/cart.service");
const orderService = require("../services/order.service");
const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshtoken');

exports.createUser = async (req, res, next) => {
  const existingUser = await userService.findUser(req.body.email);

  if (existingUser) {
    return next(new ApiError("User already exists", 400));
  }

  try {
    const result = await userService.create(req.body);
    res.send(result);
  } catch (error) {
    next(new ApiError("An error occurred while creating the user", 500));
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.findUser(email);
  const refreshToken = await generateRefreshToken(user?._id);

  res.cookie("token", refreshToken, {
    maxAge: 72 * 60 * 60 * 1000,
  });
  if (!user) {
    return next(new ApiError("User not found", 401));
  }

  if (user.password !== password) {
    return next(new ApiError("Invalid password", 401));
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    token: generateToken(user?._id),
  });
};
exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.findUser(email);

  if (!user) {
    return next(new ApiError("User not found", 401));
  }

  if (user.password !== password || user.role !== 'admin') {
    return next(new ApiError("Login fail", 401));
  }

  res.json(user);
};

exports.findAll = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || "";
    let sort = req.query.sort;

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const result = await userService.findAll(page, limit, search, sort);

    return res.send(result);
  } catch (error) {
    next(new ApiError("An error occurred while retrieving products", 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await userService.findById(id);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving user ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  const _data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  try {
    const document = await userService.update(id, _data);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating user ${id}`, 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await userService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send({
      message: `User with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting user ${id}`, 500));
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const result = await userService.deleteAll();
    return res.send({
      message: `${result.deletedCount} users were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting users", 500));
  }
};

exports.logoutUser = async (req, res, next) => {
  // Có thể có các bước xóa token hoặc phiên đăng nhập khác ở đây
  // Ví dụ: Xóa token khỏi cơ sở dữ liệu hoặc danh sách token đã phát hành

  // Sau khi xóa token, có thể gửi phản hồi về thành công
  res.json({ message: "Logout successful" });
};

exports.addUserCart = async (req, res, next) => {
  const { cart } = req.body;
  const { id } = req.user;
  try {
    let products = [];
    const user = await userService.findById(id);

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      let getProduct = await productService.findById(cart[i]._id);
      object.price = getProduct.price;
      object.img = getProduct.img;
      object.name = getProduct.name;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = ({
      products,
      cartTotal,
      orderby: user?._id,
    })

    await userService.addCart(user?._id, products)

    const savedCart = await cartService.createCart(newCart);

    res.json(savedCart);

  } catch (error) {
    next(new ApiError("An error occurred while add to cart", 500));
  }
};

exports.deleteuserCart = async (req, res, next) => {
  const { id } = req.user;
  const { cart_id, product_id } = req.body;
  try {

    const document = await userService.deleteOneCart(id, product_id);
    const documentDelete = await cartService.deleteOneCart(cart_id);
    if (!document && !documentDelete) {
      return next(new ApiError(`cart not found`, 404));
    }
    return res.send({
      message: `cart was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting cart`, 500));
  }
};

exports.getUserCart = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      const documents = await cartService.findById(req.user.id);
      return res.send(documents);
    } else {
      return res.status(400).send({ error: 'Invalid user information.' });
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving user's cart", 500));
  }
};

exports.createOrder = async (req, res) => {
  const { id } = req.user;
  const { total } = req.body;
  const { products } = req.body;

  try {
    const user = await userService.findById(id);

    let newOrder = ({
      detail: products,
      amount: total,
      orderby: user._id,
      orderStatus: "placed",
    });

    const savedOrder = await orderService.createOrder(newOrder);

    res.json(savedOrder);

  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserOrder = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      // res.send(req.user.id)
      const documents = await orderService.findById(req.user.id);
      return res.send(documents);
    } else {
      return res.status(400).send({ error: 'Invalid user information.' });
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving user's Order", 500));
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || "";
    let sort = req.query.sort;

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const result = await orderService.findAll(page, limit, search, sort);

    return res.send(result);
  } catch (error) {
    next(new ApiError("An error accurred while retrieving order", 500));
  }
  return res.send(documents);
};

exports.deleteUserOrder = async (req, res, next) => {
  const { order_id } = req.body;
  try {

    const documentDelete = await orderService.deleteOneOrder(order_id);
    if (!documentDelete) {
      return next(new ApiError(`order not found`, 404));
    }
    return res.send({
      message: `order was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting order`, 500));
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const id = req.params;
  const newStatus = req.body.newStatus;
  try {
    const document = await orderService.updateOrderStatus(id, newStatus);
    if (!document) {
      return next(new ApiError(`order with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating order ${id}`, 500));
  }
};

exports.reduceProductQuantity = async (req, res, next) => {
  const { product_id, count } = req.body;
  const getProduct = await productService.findById(product_id);
  const newQuantity = getProduct.quantity - count;
  const _data = {
    quantity: newQuantity
  }

  try {
    const document = await productService.update(product_id, _data);
    if (!document) {
      return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating product ${id}`, 500));
  }
}