import { isSaturday, isSunday } from "date-fns";
import Order from "../models/Order";
import { Op } from "sequelize";

module.exports = {
  async isSabado(date) {
    const saturday = isSaturday(date);
    if (saturday) {
      if (date <= 7 || date >= 12) {
        return true;
      }
    }
  },
  async normalDay(date) {
    if (date <= 7 || date >= 18) {
      return true;
    }
  },
  async nowDay(dayNow) {
    const { count } = await Order.findAndCountAll({
      where: {
        start_date: {
          [Op.between]: [`${dayNow}T00:00:00`, `${dayNow}T20:59:59`],
        },
      },
    });
    return count;
  },
};
