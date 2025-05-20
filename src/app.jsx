// App.jsx
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoList from "./components/pages/todoConForm";
import TodoForm from "./components/templates/TodoForm";
import TodoCardCon from "./components/pages/TodoCardCon";
import TodoCard from "./components/templates/TodoCard";
import SearchInputCard from "./components/templates/SearchInputCard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <TodoList>
          <TodoForm />
        </TodoList>
      ),
    },
    {
      path: "/data",
      element: (
        <TodoCardCon>
          <TodoCard />
        </TodoCardCon>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
