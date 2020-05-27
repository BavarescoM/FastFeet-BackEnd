import Order from "../models/Order";

class OrderController {
  async update(req, res) {
    const order = await Order.findByPk(req.params.id);
    order.update(req.body);
    return res.json(order);
  }
  async store(req, res) {
    const order = await Order.create(req.body);

    return res.json(order);
  }
  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);
    order.destroy();
    return res.json({ message: "Order deletada" });
  }
  async show(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }
  async getpackge(req, res) {
    const order = await Order.findAll({
      where: { deliveryman_id: req.params.id },
    });
    return res.json(order);
  }
}

export default new OrderController();
