import { Todo, TodoUpdateInput } from "@/types";
import TodoItem from "./TodoItem";
interface TodoListProps {
  todos: Todo[];
  handleUpdateTodo: (id: number, data: TodoUpdateInput) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: string;
}

const TodoList = ({
  todos,
  handleUpdateTodo,
  handleDeleteTodo,
  setError,
  setIsLoading,
  isLoading,
  error,
}: TodoListProps) => {
  console.log("check isLoading value: ", isLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500">
          Data is loading...
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No todos yet. Create your first todo!</p>
      </div>
    );
  }

  return (
    <div id="show_todo_list" className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">My Todo List</h2>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
            setError={setError}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            error={error}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
