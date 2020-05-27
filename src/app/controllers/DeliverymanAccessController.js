import { isSaturday } from "date-fns";

class DeliverymanAccessController {
  async start(req, res) {
    const date = new Date(2020, 03, 03, 09, 50).getHours();
    if (date <= 7 || date >= 18) {
      return res.json({ error: "fora do horario" + date });
    }
    // const sab = isSaturday();

    return res.json(date);
  }
}

export default new DeliverymanAccessController();
