const db = require("../models");
const config = require("../config/auth.config");
const Todo = db.todo;

const { todoCreateSchema, todoUpdateSchema } = require('./../helpers/validation');
const { collectErrors, customErrors } = require('./../helpers/collectErrors');

exports.create = (req, res) => {
  // Validate before create
  const validation = todoCreateSchema(req.body);

  if (validation.error) {
    const errors = collectErrors(validation.error);
    return res.status(422).send(errors)
  };

  Todo.create({
    user_id: req.userId,
    task: req.body.task,
    status: 'ToDo',
  })
    .then(todo => {
      res.status(200).send({ message: "Todo created successfully!", data: todo });
    })
    .catch(err => {
      return res.status(500).send(customErrors([{ field: "email", message: err.message }]));
    });
};

exports.getAll = (req, res) => {
  Todo.findAll({
    where: {
      user_id: req.userId
    }
  })
    .then(todos => {
      if (!todos) {
        return res.status(404).send(customErrors([{ field: "todo", message: "Todos Not found." }]));
      }

      res.status(200).send(todos);
    })
    .catch(err => {
      return res.status(500).send(customErrors([{ field: "todo", message: err.message }]));
    });
};

exports.update = (req, res) => {
  // Validate before update
  const validation = todoUpdateSchema(req.body);

  if (validation.error) {
    const errors = collectErrors(validation.error);
    return res.status(422).send(errors)
  };

  Todo.update({ task: req.body.task, status: req.body.status }, {
    where: {
      id: req.body.id,
      user_id: req.userId
    }
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send(customErrors([{ field: "todo", message: "Todo Not found." }]));
      }

      Todo.findOne({
        where: {
          id: req.body.id,
        }
      })
        .then(todo => {
          if (!todo) {
            return res.status(404).send(customErrors([{ field: "todo", message: "Todo Not found." }]));
          }

          res.status(200).send({ message: "Todo updated successfully!", data: todo });
        })
        .catch(err => {
          return res.status(500).send(customErrors([{ field: "todo", message: err.message }]));
        });
    })
    .catch(err => {
      return res.status(500).send(customErrors([{ field: "todo", message: err.message }]));
    });
};

exports.delete = (req, res) => {
  Todo.destroy({
    where: {
      id: req.body.id,
      user_id: req.userId
    }
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send(customErrors([{ field: "todo", message: "Todo Not found." }]));
      }

      res.status(200).send({ message: "Todo deleted successfully!" });
    })
    .catch(err => {
      return res.status(500).send(customErrors([{ field: "todo", message: err.message }]));
    });
};