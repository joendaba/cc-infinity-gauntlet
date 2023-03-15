import axios from "axios";

export const getToDo = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/v1/to-dos"
    );
    return data.todos;
  } catch (error) {
    alert(
      `An error has occurred, trying to get a To Do: ${error.message}. Verify the information and try again`
    );
    return [];
  }
  //@todo implementar lógica de manejo de errores try-catch
};
