import { createBrowserRouter } from "react-router-dom";

// @Pages
import Home from "../pages/Home";
import AuxilioTransporte from "../pages/AuxilioTransporte";

// @components
import SideNavbar from "../components/SideNavbar";
import Uvt from "../pages/Uvt";
import Trm from "../pages/Trm";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SideNavbar />,
    children: [
      {
        path: "dashboard/:year",
        element: <Dashboard />,
        loader: async ({ params }) => {
          // call salary api
          const salary = await fetch(
            `http://127.0.0.1:8000/api/salary/${params.year}/`
          );
          const dataSalary = await salary.json();

          // call tranport asistance api
          const assistance = await fetch(
            `http://127.0.0.1:8000/api/transport-assistance/${params.year}/`
          );
          const dataAssistance = await assistance.json();

          // call tranport asistance api
          const uvt = await fetch(
            `http://127.0.0.1:8000/api/uvt/${params.year}/`
          );
          const dataUvt = await uvt.json();

          // console.log({
          //   salary: dataSalary,
          //   transport: dataAssistance,
          //   uvt: dataUvt,
          // });
          return {
            salary: dataSalary,
            transport: dataAssistance,
            uvt: dataUvt,
          };
        },
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
