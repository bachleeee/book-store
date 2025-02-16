const { ObjectId } = require("mongodb");

class OrderService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractOrderData(order) {
    const _order = { ...order };

    Object.keys(_order).forEach(
      (key) => _order[key] === undefined && delete _order[key]
    );
    return _order;
  }

  async createOrder(data) {
    const order = this.extractOrderData(data);
    const result = await this.databaseServices.order.findOneAndUpdate(
      order,
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
      const order = await this.databaseServices.order
        .find({
          orderby: new ObjectId(user_id)
        })
        .toArray();
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page = 1, limit = 10, search = "", sort) {
    try {
      const skip = (page - 1) * limit;

      let filter = {};
      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }

      let sortOption = {};
      if (sort === "asc") {
        sortOption.price = 1;
      } else if (sort === "desc") {
        sortOption.price = -1;
      }

      const query = this.databaseServices.order.find(filter);

      if (Object.keys(sortOption).length > 0) {
        query.sort(sortOption);
      }

      const order = await query.skip(skip).limit(limit).toArray();

      const totalItems = await this.databaseServices.order.countDocuments(filter);

      return {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        pageSize: limit,
        data: order,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneOrder(order_id) {
    try {
      const order = await this.databaseServices.order.findOneAndDelete({
        _id: new ObjectId(order_id),
      });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateOrder) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractOrderData(updateOrder);
    const options = {
      returnDocument: "after",
    };
    try {
      const order = await this.databaseServices.order.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOrderStatus(id, status) { 
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = {
      orderStatus: status,
    };
    const options = {
      returnDocument: "after",
    };
    try {
      const order = await this.databaseServices.order.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

}
const databaseSetvices = require("../utils/mongodb.util");
const orderService = new OrderService(databaseSetvices);
module.exports = orderService;;