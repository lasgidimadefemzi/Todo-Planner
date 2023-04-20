const Todo = require("../models/Todo");

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todoItems = await Todo.find().sort({ _id: -1 }).lean();
      const itemsLeft = await Todo.countDocuments({ completed: false });
      //   const result = { todoItems, itemsLeft };
      res.json(todoItems);
      // res.render("todos.ejs", { todos: todoItems, left: itemsLeft });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (req, res) => {
    console.log(req.body);
    const { todoTask, progress } = req.body;
    try {
      const todo = await Todo.create({
        todo: todoTask,
        completed: false,
      });
      res.json(todo)
      console.log("Todo has been added!");
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
     try {
      const message = await Todo.findOneAndDelete({ _id: req.params.id });
      console.log('Todo has been deleted!')
      res.json(message);
    } catch (err) {
      console.log(err);
    }
  },
};
