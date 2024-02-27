import { createBrowserRouter } from "react-router-dom";

// @Pages
import Home from "../pages/Home";
import AuxilioTransporte from "../pages/AuxilioTransporte";

// @components
import Uvt from "../pages/Uvt";
import Trm from "../pages/Trm";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "salario",
        element: <Home />,
        loader: async () => {
          const res = await fetch("http://127.0.0.1:8000/api/salary/");
          const data = await res.json();
          return { data };
        },
      },
      {
        path: "auxilio-transporte",
        element: <AuxilioTransporte />,
        loader: async () => {
          const res = await fetch(
            "http://127.0.0.1:8000/api/transport-assistance/"
          );
          const data = await res.json();
          return { data };
        },
      },
      {
        path: "uvt",
        element: <Uvt />,
        loader: async () => {
          const res = await fetch("http://127.0.0.1:8000/api/uvt/");
          const data = await res.json();
          return { data };
        },
      },
      {
        path: "trm",
        element: <Trm />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
