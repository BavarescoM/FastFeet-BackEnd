import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        file_id: Sequelize.INTEGER,
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  // static associate(models) {
  //   this.belongsTo(models.File, { foreignKey: "file_id", as: "signature" });
  //   this.belongsTo(models.Deliveryman, {
  //     foreignKey: "deliveryman_id",
  //     as: "deliveryman",
  //   });
  //   this.belongsTo(models.Recipient, {
  //     foreignKey: "recipient_id",
  //     as: "recipient",
  //   });
  // }
}

export default Order;
