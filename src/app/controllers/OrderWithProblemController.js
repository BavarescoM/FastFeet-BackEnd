import Order from "../models/Order";
import DeliveryProblem from "../models/DeliveryProblem";

class OrderWithProblemController {
  async index(req, res) {
    const problem = await DeliveryProblem.findAll({
      where: { id: req.params.id },
    });
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
    return res.json();
  }
}

export default new OrderWithProblemController();
