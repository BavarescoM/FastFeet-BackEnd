import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,

        product: Sequelize.STRING,

        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "file_id", as: "avatar" });
    this.belongsTo(models.Deliveryman, {
      foreignKey: "deliveryman_id",
      as: "deliveryman",
    });
    this.belongsTo(models.Recipient, {
      foreignKey: "recipient_id",
      as: "recipient",
    });
  }
}

export default Order;
