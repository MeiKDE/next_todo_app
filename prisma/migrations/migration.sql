-- Create a new table named "Todo"
CREATE TABLE "Todo" (
    -- "id" is the primary key, auto-incrementing (SERIAL), and cannot be null
    "id" SERIAL NOT NULL,

    -- "title" is a required text field for the todo title
    "title" TEXT NOT NULL,

    -- "description" is an optional text field (can be NULL)
    "description" TEXT,

    -- "completed" is a boolean flag indicating whether the todo is done; defaults to false
    "completed" BOOLEAN NOT NULL DEFAULT false,

    -- "createdAt" stores the creation timestamp; defaults to current time
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- "updatedAt" stores the last updated timestamp; must be manually managed by the application
    "updatedAt" TIMESTAMP(3) NOT NULL,

    -- Define the primary key constraint on the "id" column
    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
