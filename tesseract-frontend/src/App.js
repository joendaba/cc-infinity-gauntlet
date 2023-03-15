import "./App.css";
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [data, setData] = useState([]);
  
  
  useEffect(()=>{
    llamarLista()
  }, []);
  const llamarLista = async () => {
        const respuesta = await fetch('http://localhost:3000/v1/to-dos');
        const respuestaJson = await respuesta.json()
        setData(respuestaJson.todos);
    };


  return (
    <div className="todo-app">
      <TodoList />
      
    </div>
  );
}

export default App;
