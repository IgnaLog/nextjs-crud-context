import Layout from "@/components/Layout";
import { useTasks } from "@/context/taskContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TaskForm = () => {
  const { push, query } = useRouter();
  const { createTask, updateTask, tasks } = useTasks();
  const [task, setTask] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.id) {
      createTask(task.title, task.description);
    } else {
      updateTask(query.id, task);
    }
    push("/");
  };

  useEffect(() => {
    if (query.id) {
      const taskFound = tasks.find((task) => task.id === query.id);
      setTask({ title: taskFound.title, description: taskFound.description });
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4">
          <h1 className="text-3xl mb-7">
            {query.id ? "Update a Task" : "Create a Task"}
          </h1>
          <input
            onChange={handleChange}
            name="title"
            value={task.title}
            type="text"
            placeholder="Write a title"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
          />
          <textarea
            onChange={handleChange}
            name="description"
            value={task.description}
            placeholder="Write a description"
            rows="2"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
          />
          <button
            className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30"
            disabled={!task.title}
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TaskForm;
