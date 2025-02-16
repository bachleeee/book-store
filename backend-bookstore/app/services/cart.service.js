const { ObjectId } = require("mongodb");

class CartService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractCartData(cart) {
    const _cart = { ...cart };

    Object.keys(_cart).forEach(
      (key) => _cart[key] === undefined && delete _cart[key]
    );
    return _cart;
  }

  async createCart(data) {
    const cart = this.extractCartData(data);
    const result = await this.databaseServices.cart.findOneAndUpdate(
      cart,
      {
        $setOnInsert: {},
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async findById(user_id) {
    try {
      const cart = await this.databaseServices.cart
        .find({ 
          orderby: new ObjectId(user_id)
        })
        .toArray();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneCart(cart_id) {
    try {
      const cart = await this.databaseServices.cart.findOneAndDelete({
        _id: new ObjectId(cart_id),
      });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

}
const databaseSetvices = require("../utils/mongodb.util");
const cartService = new CartService(databaseSetvices);
module.exports = cartService;;