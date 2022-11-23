const db = require("../models/index.cjs");
const Proposal = db.proposals;
const Op = db.Sequelize.Op;

// Create and Save a new Proposal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Proposal
    const proposal = {
        name: req.body.name,
        description: req.body.description,
        contactId: req.body.contactId
    };
    
    // Save Proposal in the database
    Proposal.create(proposal)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Proposal."
        });
      });
};

// Retrieve all Proposals from the database (or search by name).
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Proposal.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving proposals."
        });
      });
};

// Find a single Proposal with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Proposal.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Proposal with id=" + id
        });
      });
};

// Update a Proposal by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  Proposal.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proposal was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Proposal with id=${id}. Maybe Proposal was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Proposal with id=" + id
      });
    });
};

// Delete a Proposal with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Proposal.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Proposal was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Proposal with id=${id}. Maybe Proposal was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Proposal with id=" + id
        });
      });
};

// Delete all Proposals from the database.
exports.deleteAll = (req, res) => {
    Proposal.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Proposals were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all proposals."
          });
        });
};