import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Select from "react-select";

const Dashboard = () => {
  const [allYears, setYearsSelected] = useState([]);
  const [yearSelected, setYearSelected] = useState([
    { value: 2024, label: 2024 },
  ]);
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  const navigate = useNavigate();

  const { salary, uvt, transport } = useLoaderData();

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

  return (
    <div>
      <h1 className="text-4xl font-semibold dark:text-white">
        Indicadores Colombia Dashboard
      </h1>
      <div className="my-5">
        <div className="max-w-xs">
          <Select
            options={allYears}
            value={yearSelected[0]}
            onChange={(year) => setYearSelected(year)}
          ></Select>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-cyan-500 shadow-xl to-blue-500 space-y-5 border-2 rounded-3xl p-5 max-w-sm text-center text-white font-bold">
          <h3>Salario Mínimo</h3>
          <p className="text-2xl">{formatter.format(salary?.value)}</p>
        </div>
        <div className="bg-gradient-to-r space-y-5  shadow-xl border-2 rounded-3xl p-5 from-green-500 to-cyan-500 max-w-sm text-center text-white font-bold">
          <h3>Auxilio de transporte</h3>
          <p className=" text-2xl">{formatter.format(transport?.value)}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 shadow-xl to-yellow-500 space-y-5 border-2 rounded-3xl p-5  max-w-sm text-center text-white font-bold">
          <h3>UVT</h3>
          <p className=" text-2xl">{formatter.format(uvt?.value)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
