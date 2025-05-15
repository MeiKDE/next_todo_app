"use client";
import { useState, useEffect } from "react";
import { Todo, TodoUpdateInput } from "@/types";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Tailwind CSS styling
  const errorCss =
    "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6";
  const errorBtn = "underline mt-2 text-red-800";

  // Grab data when this component mounts
  useEffect(() => {
    handleGetData();
  }, []);

  //Setup CRUD (create (POST), read (GET), update (PUT/PATCH), delete (DELETE)) calls to the API

  // Read (GET) - Get is default, to read extract all data.
  const handleGetData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/todos");
      //validate for HTTP errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get/fetch todos");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      // Validate for Run-time errors
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error has occurred";
      console.error("Error get/fetching todos", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update (PUT/PATCH) an existing todo
  const handleUpdateTodo = async (id: number, data: TodoUpdateInput) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update todo");
      }

      const updatedTodo = await response.json();
      //Replace updated todo in state
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      // Handle both expected and unexpected errors in one place
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Error updating todo:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete (DELETE) a todo
  const handleDeleteTodo = async (id: number) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete todo");
      }

      // Remove deleted todo from state
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      // Handle both expected and unexpected errors in one place
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Error deleting todo:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // UI rendering
  return (
    <div
      id="container"
      className={`flex flex-row gap-8 p-4 ${isLoading ? "opacity-60" : ""}`}
    >
      {/* Error message display */}
      {error && (
        <div className={errorCss}>
          <p>{error}</p>
          <button onClick={handleGetData} className={errorBtn}>
            Try Again
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <TodoForm
            setTodos={setTodos}
            setError={setError}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <div>
          <TodoList
            todos={todos}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
