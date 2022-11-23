const db = require("../models/index.cjs");
const News = db.news;
const Op = db.Sequelize.Op;

// Create and Save new News
exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    
    // Create News
    const news = {
        text: req.body.text,
        source: req.body.source,
        date: req.body.date,
        isAccepted: req.body.isAccepted
    };
    
    // Save News in the database
    News.create(news)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating News."
        });
      });
};

// Retrieve all News from the database (or search by source, date or accepted).
exports.findAll = (req, res) => {
    const source = req.query.source;
    const date = req.query.date;
    const isAccepted = req.query.isAccepted;
    var condition = source ? { source: { [Op.like]: `%${source}%` } } :
                  (date ? { date: { [Op.like]: `%${date}`}} :
                   (isAccepted ? { isAccepted: { [Op.like]: `%${isAccepted}`}} : null));
  
    News.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving news."
        });
      });
};

// Find a single News with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving News with id=" + id
        });
      });
};

// Update News by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  News.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating News with id=" + id
      });
    });
};

// Delete News with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    News.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "News were deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete News with id=${id}. Maybe News was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete News with id=" + id
        });
      });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    News.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} News were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all news."
          });
        });
};