import { useState } from "react";
import { Todo, TodoUpdateInput } from "@/types";
import EditForm from "@/components/EditForm";

interface TodoItemProps {
  todo: Todo;
  handleUpdateTodo: (
    id: number,
    todoUpdateInput: TodoUpdateInput
  ) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: string;
}

const TodoItem = ({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
  setError,
  setTodos,
  setIsLoading,
  isLoading,
  error,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [localTitle, setLocalTitle] = useState(todo.title);
  const [localDescription, setLocalDescription] = useState(
    todo.description || ""
  );

  // Tailwind CSS styling
  const errorCss =
    "bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded";

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md mb-4 transition-all ${
        isLoading ? "opacity-60" : ""
      }`}
    >
      {error && <div className={errorCss}>{error}</div>}

      {isEditing ? (
        <EditForm
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          setError={setError}
          setIsLoading={setIsLoading}
          setIsEditing={setIsEditing}
          isLoading={isLoading}
          error={error}
          todo={todo}
          setLocalTitle={setLocalTitle}
          setLocalDescription={setLocalDescription}
          localTitle={localTitle}
          localDescription={localDescription}
        />
      ) : (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) =>
              handleUpdateTodo(todo.id, { completed: e.target.checked })
            }
            disabled={isLoading}
            className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />

          <ul>
            <li
              className={`text-lg font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.title}
            </li>
            {todo.description && (
              <li
                className={`text-lg font-medium ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {todo.description}
              </li>
            )}
            <li className="text-xs text-gray-400 mt-1">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </li>
          </ul>
          <div className="flex gap-2">
            <button
              className="text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setLocalTitle(todo.title);
                setLocalDescription(todo.description || "");
                setIsEditing(true);
              }}
              disabled={isLoading}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
