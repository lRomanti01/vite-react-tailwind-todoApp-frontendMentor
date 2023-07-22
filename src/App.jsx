import { DragDropContext } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import Header from "./components/header";

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const App = () => {
  const [todos, setTodos] = useState(initialStateTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const computedItemLeft = todos.filter((todo) => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const [filter, setFilter] = useState("all");

  const changeFilter = (filter) => setFilter(filter);

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const items = [...todos];
    // con splice estamos eliminando un elemento del array y devolviendo ese elemento
    const [reorderedItem] = items.splice(startIndex, 1);

    // con splice estamos insertando un elemento en el array
    items.splice(endIndex, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <div
      className="min-h-screen bg-[url('./assets/images/bg-mobile-light.jpg')] bg-no-repeat bg-contain bg-gray-200
      dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] dark:bg-gray-900 transition-all duration-500	
      md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]"
    >
      <br />
      <br />
      <Header />

      <main className="container mx-auto px-4 md:max-w-xl">
        <TodoCreate createTodo={createTodo} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <TodoList
            todos={filteredTodos()}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        </DragDropContext>

        <TodoComputed
          computedItemLeft={computedItemLeft}
          clearCompleted={clearCompleted}
        />

        <TodoFilter changeFilter={changeFilter} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
