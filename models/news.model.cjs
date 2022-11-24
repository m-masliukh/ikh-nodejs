module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        source: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
          }
        }, {
          timestamps: false
        });

    return News;
  };

