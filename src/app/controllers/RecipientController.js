import Recipient from "../models/Recipient";

import { Op } from "sequelize";

class RecipientsController {
  async store(req, res) {
    const { name, street, number, complement, state, city, zipcode } = req.body;
    const RecipientExist = await Recipient.findOne({ where: { name } });
    console.log(RecipientExist);
    if (RecipientExist) {
      return res.json({ error: "Usuário já cadastrado" });
    }
    const recipient = await Recipient.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
    return res.json({ message: `${name} cadastrado com sucesso` });
  }

  async show(req, res) {
    try {
      const limit = 5;
      const where = {};
      const { search, page = 1 } = req.query;
      if (search) {
        where.name = { [Op.iLike]: `%${search}%` };
      }
      const total = await Recipient.count({ where });
      const recipient = await Recipient.findAll({
        where,
        order: [["id", "DESC"]],
        limit,
        offset: (page - 1) * limit,
      });
      return res.json({
        limit,
        page: Number(page),
        pages: Math.ceil(total / limit),
        total,
        items: recipient,
      });
    } catch (err) {
      return res.json({ error: "Falha na busca!" + err });
    }
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    recipient.destroy();
    return res.json({ message: "Usuário Deletado" });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    recipient.update(req.body);
    recipient.save();
    return res.json(recipient);
  }
  async showById(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    return res.json(recipient);
  }
}

export default new RecipientsController();
