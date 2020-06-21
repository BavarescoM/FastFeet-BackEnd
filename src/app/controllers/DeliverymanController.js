import Deliveryman from "../models/Deliveryman";
import { Op } from "sequelize";
import File from "../models/File";

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
    try {
      const limit = 5;
      const where = {};
      const { search, page = 1 } = req.query;
      if (search) {
        where.name = { [Op.iLike]: `%${search}%` };
      }
      const total = await Deliveryman.count({ where });
      const deliveryman = await Deliveryman.findAll({
        where,
        attributes: ["id", "name", "email"],
        order: [["id", "DESC"]],
        limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: File,
            as: "avatar",
            attributes: ["id", "path", "url"],
          },
        ],
      });
      return res.json({
        limit,
        page: Number(page),
        pages: Math.ceil(total / limit),
        total,
        items: deliveryman,
      });
    } catch (err) {
      return res.json({ error: "Falha na busca!" + err });
    }
  }
  async showById(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
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
