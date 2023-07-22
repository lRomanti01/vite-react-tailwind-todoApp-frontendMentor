import { useState } from "react";

const TodoCreate = ({ createTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return setTitle("");
    }

    createTodo(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md overflow-hidden p-3 flex gap-3 items-center mt-8 dark:bg-gray-800 transition-all duration-500"
    >
      <span className="rounded-full border-2 inline-block h-5 w-5"></span>
      <input
        className="w-full text-gray-500 outline-none dark:bg-gray-800 transition-all duration-500"
        type="text"
        placeholder="Create a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default TodoCreate;
