import { Todo, TodoUpdateInput } from "@/types";
import { useState } from "react";

interface EditFormProps {
  onUpdate: (id: number, data: TodoUpdateInput) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setLocalTitle: React.Dispatch<React.SetStateAction<string>>;
  setLocalDescription: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string;
  todo: Todo;
  localTitle: string;
  localDescription: string;
}

const EditForm = ({
  onUpdate,
  onDelete,
  setError,
  setIsLoading,
  setIsEditing,
  setLocalTitle,
  setLocalDescription,
  isLoading,
  error,
  todo,
  localTitle,
  localDescription,
}: EditFormProps) => {
  const handleSave = async () => {
    if (!localTitle.trim()) {
      setError("Title is required");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      await onUpdate(todo.id, {
        title: localTitle,
        description: localDescription || "",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      console.error("Failed to save todo", err);

      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  //Tailwind CSS Styling
  const input =
    "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const textarea =
    "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const saveBtn =
    "px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const cancelBtn =
    "px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500";

  return (
    <div>
      <input
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        className={input}
        placeholder="Todo title"
      />

      <textarea
        value={localDescription}
        onChange={(e) => setLocalDescription(e.target.value)}
        className={textarea}
        rows={3}
        placeholder="Description (optional)"
      />

      <div>
        <button disabled={isLoading} className={saveBtn} onClick={handleSave}>
          Save
        </button>
        <button
          disabled={isLoading}
          className={cancelBtn}
          onClick={() => {
            setIsEditing(false);
            setLocalTitle(todo.title);
            setLocalDescription(todo.description || "");
            setError("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;
