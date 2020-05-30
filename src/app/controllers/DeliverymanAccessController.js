import { isSaturday, isSunday } from "date-fns";
import Order from "../models/Order";
import { isSabado, normalDay, nowDay } from "../utils/validationDate";

class DeliverymanAccessController {
  async index(req, res) {
    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: null,
        canceled_at: null,
      },
    });
    return res.json(deliveries);
  }
  async start(req, res) {
    let date = new Date();
    const satDay = await isSabado(date);
    if (satDay) {
      return res.json({
        error: "Expediente aos sabados das 8:00hrs ao 12:00hrs",
      });
    }
    if (isSunday(date)) {
      return res.json({
        error: "Fechado aos domingos",
      });
    }
    date = date.getHours();
    const dayNormal = await normalDay(date);
    if (dayNormal) {
      return res.json({
        error: "Expediente de segunda a sexta das 8:00hrs às 18:00hrs",
      });
    }
    let dayNow = new Date().toJSON().slice(0, 10);
    let count = await nowDay(dayNow);
    if (count >= 5) {
      return res.json({
        error:
          "Limite de entregas diaria execedido, que tal um descanso tente novamente amanhã",
      });
    }
    const startdeliveries = await Order.findByPk(req.params.id);
    startdeliveries.update({
      start_date: new Date(),
    });

    return res.json({ message: "Libera para a entrega" });
  }
  async end(req, res) {
    const order = await Order.findByPk(req.params.id);
    order.update({
      end_date: new Date(),
      file_id: req.body.file_id,
    });
    return res.json({ message: `Entrega ${order} encerada` });
  }
}

export default new DeliverymanAccessController();
