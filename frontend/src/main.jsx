import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Flowbite } from "flowbite-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Flowbite>
      <RouterProvider router={router} />
    </Flowbite>
  </React.StrictMode>
);
