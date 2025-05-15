/*Use interface for component props and object shapes.*/

// Defines the full structure of a Todo item as stored in the system (e.g. database)
export interface Todo {
  id: number; // Unique identifier for the todo item
  title: string; // The main text/title of the todo
  description?: string | null; // Optional detailed text; can be undefined or null
  completed: boolean; // Whether the todo is marked as completed
  createdAt: Date; // Timestamp when the todo was created
  updatedAt: Date; // Timestamp when the todo was last updated
}

/* Use type for union types, aliases, and complex compositions.
 */

// Defines the shape of data used to create a new todo (e.g. from a form)
export type TodoInput = {
  title: string; // Required title for the new todo
  description?: string; // Optional description (can be omitted)
};

// Defines the shape of data used when updating an existing todo
export type TodoUpdateInput = {
  title?: string; // Optional new title
  description?: string; // Optional new description
  completed?: boolean; // Optional toggle for completion status
};
