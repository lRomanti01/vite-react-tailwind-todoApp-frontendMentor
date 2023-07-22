const TodoFilter = ({ changeFilter }) => {
  return (
    <section className="container mx-auto mt-8">
      <div className="bg-white p-4 rounded-md flex justify-center gap-4 font-bold dark:bg-gray-800 text-gray-400 transition-all duration-500">
        <button className="text-blue-600" onClick={() => changeFilter("all")}>
          All
        </button>
        <button
          className="hover:text-blue-600"
          onClick={() => changeFilter("active")}
        >
          Active
        </button>
        <button
          className="hover:text-blue-600"
          onClick={() => changeFilter("completed")}
        >
          Completed
        </button>
      </div>
    </section>
  );
};

export default TodoFilter;
