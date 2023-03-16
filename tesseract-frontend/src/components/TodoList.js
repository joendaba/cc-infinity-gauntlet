import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import { getTodosList } from "./API.js";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const updateTodos = async () => {
    const todos = await getTodosList();
    setTodos(todos);
  }

  useEffect(() => {
    getTodosList().then((todos)=>{
      console.log(todos);
      setTodos(todos);
    });
  }, []);

  const addTodo = async (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    const newToDo = await axios.post('http://localhost:3000/v1/to-do', todo);
    updateTodos();
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {

      return;
    }

    const updatedTodo = await axios.patch(
      `http://localhost:3000/v1/to-do/${todoId}`, 
      newValue
    );
    updateTodos();
  };

  const removeTodo = async (id) => {
    const removeTodo = await axios.delete(
      `http://localhost:3000/v1/to-do/${id}`
    );

    updateTodos();
  };

  const completeTodo = async (id) => {
    
    const [todoFound] = todos.filter((todo) => todo.id === id);
    console.log(todoFound);
    await axios.patch(
      `http://localhost:3000/v1/to-do/${id}`, 
      {
        isDone: todoFound.is_done === 0 ? 1 : 0
        
      }
    );

    updateTodos();
  };



  return (
    <>
      <h1>Josemiguel's To-Do List <span id='date-time'></span></h1>
      <script>
var dt = new Date();
document.getElementById('date-time').innerHTML=dt;
</script>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
