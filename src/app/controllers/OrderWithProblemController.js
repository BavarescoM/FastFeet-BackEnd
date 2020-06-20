import Order from "../models/Order";
import DeliveryProblem from "../models/DeliveryProblem";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

class OrderWithProblemController {
  async index(req, res) {
    const problem = await DeliveryProblem.findByPk(req.params.id);
    return res.json(problem);
  }
  async store(req, res) {
    console.log(req.body.description);
    console.log(req.params.id);
    const order = await Order.findByPk(req.params.id);
    try {
      const problem = await DeliveryProblem.create({
        order_id: req.params.id,
        description: req.body.description,
      });
      return res.json(problem);
    } catch (err) {
      console.log("erro" + err);
      return res.json("erro");
    }
  }
  async cancel(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (order.canceled_at !== null) {
      return res.json({ error: "Entrega já encerada" });
    }
    order.update({
      canceled_at: new Date(),
    });
    return res.json(order);
  }
}

export default new OrderWithProblemController();
