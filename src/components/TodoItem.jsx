import IconCross from "./icons/IconCross";
import IconCheck from "./icons/IconCheck";
import React from "react";

const TodoItem = React.forwardRef(
  ({ todo, removeTodo, updateTodo, ...props }, ref) => {
    const { id, title, completed } = todo;

    return (
      <article
        {...props}
        ref={ref}
        className="flex gap-4 border-b dark:border-b-gray-700"
      >
        <button
          onClick={() => updateTodo(id)}
          className={`flex items-center justify-center rounded-full border-2 h-6 w-6 hover:border-violet-600 
          ${
            completed
              ? "bg-gradient-to-r from-blue-400 via-violet-500 to-violet-600"
              : "inline-block"
          } `}
        >
          {completed && <IconCheck />}
        </button>
        <p
          className={`grow ${
            completed
              ? "text-gray-400 dark:text-gray-500 line-through"
              : "text-gray-500 dark:text-gray-300"
          }`}
        >
          {title}
        </p>

        <button onClick={() => removeTodo(id)}>
          <IconCross />
        </button>
      </article>
    );
  }
);

export default TodoItem;
