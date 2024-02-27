import React, { Suspense, useCallback, useEffect, useState } from "react";
// import Select from "react-select";
// import AreaChart from "../components/AreaChart";

const Dashboard = () => {
  const date = new Date();
  const [allYears, setYearsSelected] = useState([]);
  const [yearSelected, setYearSelected] = useState(date.getFullYear());
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
  const [data, setData] = useState({});

  const { salary, uvt, transport } = data;

  useEffect(() => {
    const fetchYears = async () => {
      const res = await fetch("http://localhost:8000/api/year/");
      const years = await res.json();
      if (res.status === 200) {
        const sortYears = years.sort((a, b) => b.year - a.year);
        setYearsSelected(
          sortYears.map(({ year }) => {
            return {
              label: year,
              value: year,
            };
          })
        );
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      // call salary api
      const salary = await fetch(
        `http://127.0.0.1:8000/api/salary/${yearSelected}/`
      );
      const dataSalary = await salary.json();

      // call tranport asistance api
      const assistance = await fetch(
        `http://127.0.0.1:8000/api/transport-assistance/${yearSelected}/`
      );
      const dataAssistance = await assistance.json();

      // call tranport asistance api
      const uvt = await fetch(`http://127.0.0.1:8000/api/uvt/${yearSelected}/`);
      const dataUvt = await uvt.json();

      // console.log({
      //   salary: dataSalary,
      //   transport: dataAssistance,
      //   uvt: dataUvt,
      // });
      setData({
        salary: dataSalary,
        transport: dataAssistance,
        uvt: dataUvt,
      });
    };
    fetchApi();
  }, [yearSelected]);

  const LazyAreaChart = React.lazy(() => import("../components/AreaChart"));
  const LazySelect = React.lazy(() => import("react-select"));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1 className="text-4xl font-semibold dark:text-white">
        Indicadores Colombia Dashboard
      </h1>
      <div className="my-5">
        <div className="max-w-xs">
          <LazySelect
            options={allYears}
            value={{ label: yearSelected, value: yearSelected }}
            onChange={(year) => setYearSelected(year.label)}
          ></LazySelect>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-cyan-500 shadow-xl to-blue-500 space-y-5 border-2 rounded-3xl p-5 max-w-sm text-center text-white font-bold">
          <h3>Salario Mínimo</h3>
          <p className="text-2xl">{formatter.format(salary?.value)}</p>
        </div>
        <div className="bg-gradient-to-r space-y-5  shadow-xl border-2 rounded-3xl p-5 from-green-500 to-cyan-500 max-w-sm text-center text-white font-bold">
          <h3>Auxilio de transporte</h3>
          <p className="text-2xl">{formatter.format(transport?.value)}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 shadow-xl to-yellow-500 space-y-5 border-2 rounded-3xl p-5  max-w-sm text-center text-white font-bold">
          <h3>UVT</h3>
          <p className=" text-2xl">{formatter.format(uvt?.value)}</p>
        </div>
      </div>
      <div className="py-10">
        <LazyAreaChart
          years={allYears
            .map((year) => year.value)
            .filter((year) => year >= 2010)
            .reverse()}
        />
      </div>
    </Suspense>
  );
};

export default Dashboard;
