module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING
          },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
        }, {
          timestamps: false
        });

    return Contact;
  };
