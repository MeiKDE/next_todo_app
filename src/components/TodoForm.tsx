import React from "react";
import { TodoInput } from "@/types";

interface TodoFormProps {
  handleCreateTodo: (todoInput: TodoInput) => Promise<void>;
  setTitle: (title: string) => void;
  title: string;
  setDescription: (description: string) => void;
  description: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const TodoForm = ({
  handleCreateTodo,
  setTitle,
  title,
  setDescription,
  description,
  setIsLoading,
  isLoading,
}: TodoFormProps) => {
  // Tailwind CSS styling
  const label = "block text-sm font-medium text-gray-700";
  const input =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border";
  const textarea =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border";

  const button = `inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
    isLoading ? "opacity-75 cursor-not-allowed" : ""
  }`;

  console.log("check isLoading value: ", isLoading);

  return (
    <form
      id="add_new_todo"
      onSubmit={(e) => {
        e.preventDefault(); //Stop the page from refreshing
        handleCreateTodo({ title, description });
      }}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-800">Add New Todo:</h2>

      <div>
        <label id="title" className={label}>
          Title *
        </label>
        <input
          type="text"
          placeholder="Enter todo title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={input}
        />
      </div>
      <div>
        <label id="description" className={label}>
          {" "}
          Description{" "}
        </label>
        <textarea
          placeholder="Enter todo description"
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={textarea}
        />
      </div>
      <div>
        <button id="submit_button" type="submit" className={button}>
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
