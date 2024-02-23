import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  normalized: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Gráfica para analizar el crecimiento del Salario Aux. transporte y UVT",
    },
  },
};

const AreaChart = ({ years }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [uvtData, setUvtData] = useState([]);

  const GetSaralyData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/salary/");
    const data = await res.json();
    data.sort((a, b) => a.value - b.value);
    setSalaryData(data.map((year) => year.value));
  };

  const GetTransportData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/transport-assistance/");
    const data = await res.json();
    data.sort((a, b) => a.value - b.value);
    setTransportData(data.map((year) => year.value));
  };

  const GetUvtData = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/uvt/");
    const data = await res.json();
    data.sort((a, b) => a.value - b.value);
    setUvtData(data.map((year) => year.value));
  };

  useEffect(() => {
    GetSaralyData();
    GetTransportData();
    GetUvtData();
  }, []);

  const dataChart = {
    labels: years,
    datasets: [
      {
        fill: true,
        label: "Uvt",
        data: uvtData,
        borderColor: "rgb(201, 203, 207)",
        backgroundColor: "rgba(201, 203, 207, 0.2)",
      },
      {
        fill: true,
        label: "Salario",
        data: salaryData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        fill: true,
        label: "Auxilio de transporte",
        data: transportData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return <Line options={options} data={dataChart} className="h-[500px]"></Line>;
};

export default AreaChart;
