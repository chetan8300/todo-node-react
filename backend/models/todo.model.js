module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    user_id: {
      type: Sequelize.NUMBER
    },
    task: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return Todo;
};