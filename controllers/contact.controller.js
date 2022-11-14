const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;

// Create and Save a new Contact
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Contact
    const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type
    };
    
    // Save Contact in the database
    Contact.create(contact)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Contact."
        });
      });
};

// Retrieve all Contacts from the database (or search by name, email or type).
exports.findAll = (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const type = req.query.type;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } :
                  (email ? { email: { [Op.like]: `%${email}`}} :
                   (type ? { type: { [Op.like]: `%${type}`}} : null));
  
    Contact.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contacts."
        });
      });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contact.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Contact with id=" + id
        });
      });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  Contact.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Contact was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Contact with id=" + id
        });
      });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
    Contact.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Contacts were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all contacts."
          });
        });
};