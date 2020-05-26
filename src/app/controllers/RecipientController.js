import Recipient from "../models/Recipient";

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
    const recipient = await Recipient.findAll();
    return res.json(recipient);
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
}

export default new RecipientsController();
