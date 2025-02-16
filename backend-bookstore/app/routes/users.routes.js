const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createUser,
  findOne,
  update,
  deleteUser,
  deleteAllUsers,
  loginUser,
  logoutUser,
  addUserCart,
  getUserCart,
  deleteuserCart,
  createOrder,
  getUserOrder,
  deleteUserOrder,
  updateOrderStatus,
  getAllOrder,
  reduceProductQuantity,
  loginAdmin
} = require("../controllers/users.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllUsers);

router.route('/cart').post(authenticateToken,addUserCart);
router.route('/cart').get(authenticateToken,getUserCart);
router.route('/cart').delete(authenticateToken,deleteuserCart);

router.route('/order').post(authenticateToken,createOrder);
router.route('/order').get(authenticateToken,getUserOrder);
router.route('/order/getall').get(getAllOrder);
router.route('/order').delete(authenticateToken,deleteUserOrder);
router.route('/order/:id').put(updateOrderStatus);

router.route('/reduce').put(reduceProductQuantity);

router.route('/register').post(createUser)
router.route('/login').post(loginUser)

router.route('/login-admin').post(loginAdmin)

router.route('/:id').get(findOne).put(update).delete(deleteUser);
router.route('/logout').post(authenticateToken, logoutUser);

module.exports = router;