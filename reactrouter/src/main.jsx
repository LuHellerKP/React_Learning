//Create and render a browser router:
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    // This is the first route -> root route -> the rest of the routes will render inside of it.
    // It server as the root layout of the UI.
    path: "/",
    element: <div>Hello World!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
