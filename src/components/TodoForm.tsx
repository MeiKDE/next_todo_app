import React from "react";
import { Todo, TodoInput } from "@/types";
import { useState } from "react";

interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: string;
}

const TodoForm = ({
  setTodos,
  setError,
  setIsLoading,
  isLoading,
  error,
}: TodoFormProps) => {
  // Create (POST) a new todo
  const handleCreateTodo = async (todoInput: TodoInput) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoInput),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create todo");
      }

      const newTodo = await response.json();
      console.log("New todo created:", newTodo);
      setTodos((prev) => [newTodo, ...prev]); //prepend to the list
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error has occurred";
      console.error("Failed to create todo", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setTitle("");
      setDescription("");
    }
  };

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
        e.preventDefault();
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
