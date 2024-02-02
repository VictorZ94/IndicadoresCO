import DataTable from "react-data-table-component";
import { useLoaderData } from "react-router-dom";

const columns = [
  {
    name: "Id",
    selector: (row) => row.id.split("-")[4],
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: "Valor",
    selector: (row) => new Intl.NumberFormat().format(row.value),
    sortable: true,
  },
];

const BasicDataTable = ({ title }) => {
  const { data } = useLoaderData();

  return <DataTable title={title} columns={columns} data={data} pagination />;
};

export default BasicDataTable;
