import Sequelize, { Model } from "sequelize";

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zipcode: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  // static associate(models) {
  //   this.belongsTo(models.File, {
  //     foreignKey: "file_id",
  //     as: "recipient_avatar_id",
  //   });
  // }
}

export default Recipient;
