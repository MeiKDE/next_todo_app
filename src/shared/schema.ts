import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

// Define the todos table schema
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Export types for type safety
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
