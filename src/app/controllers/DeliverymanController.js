import Deliveryman from "../models/Deliveryman";
class DeliverymanController {
  async store(req, res) {
    const deliverymanExist = await Deliveryman.findOne({
      where: { name: req.body.name },
    });
    if (deliverymanExist) {
      return res.json({ error: "Usuário já esta cadastrado" });
    }
    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }
  async show(req, res) {
    const deliveryman = await Deliveryman.findAll();
    return res.json(deliveryman);
  }
  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    deliveryman.update(req.body);
    return res.json(deliveryman);
  }
  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    if (!deliveryman) {
      return res.json({ error: "Usário não existe" });
    }
    deliveryman.destroy();
    return res.json({ message: "Usário Deletado" });
  }
}

export default new DeliverymanController();
a;
