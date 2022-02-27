const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  tasks: {
    type: Object,
  },
});

const ToDo = mongoose.model("ToDo",ToDoSchema);
module.exports = ToDo;
