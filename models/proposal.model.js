module.exports = (sequelize, Sequelize) => {
    const Proposal = sequelize.define("proposal", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
          }
        }, {
          timestamps: false
        });
    
    return Proposal;
  };