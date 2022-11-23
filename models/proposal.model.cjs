module.exports = (sequelize, Sequelize) => {
    const Proposal = sequelize.define("proposal", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
          },
        contactId: {
            type: Sequelize.INTEGER
        }
        }, {
          timestamps: false
        });
    
    return Proposal;
  };

